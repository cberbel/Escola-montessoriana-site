-- Ponto Celular · Escola Montessoriana
-- Cole este arquivo inteiro no SQL Editor do Supabase e clique em "Run".
--
-- Modelo de segurança: as tabelas ficam bloqueadas (RLS sem policies) e todo
-- acesso passa pelas funções RPC abaixo (security definer), que validam o PIN
-- do funcionário ou do administrador a cada chamada. O horário da batida é
-- SEMPRE o do servidor, nunca o do celular.

create extension if not exists pgcrypto;

-- ---------- Tabelas ----------

create table if not exists config (
  chave text primary key,
  valor jsonb not null
);

insert into config (chave, valor) values ('pin_admin', '"1234"'::jsonb)
  on conflict (chave) do nothing;

create table if not exists funcionarios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cargo text not null default '',
  pin text not null,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  -- Horário esperado, para calcular atrasos, faltas e banco de horas.
  -- Ficam null quando o funcionário ainda não tem horário definido (não entra nas métricas).
  hora_entrada time,
  hora_saida time,
  dias_semana int[] not null default '{1,2,3,4,5}', -- 0=domingo .. 6=sábado (padrão PostgreSQL)
  data_admissao date
);

create table if not exists registros (
  id uuid primary key default gen_random_uuid(),
  funcionario_id uuid not null references funcionarios(id) on delete cascade,
  ts timestamptz not null default now(),
  manual boolean not null default false,
  lat double precision,
  lng double precision,
  precisao_m double precision,
  dispositivo text -- código anônimo do aparelho, para detectar ponto batido pelo colega
);

create index if not exists idx_registros_func_ts on registros (funcionario_id, ts);
create index if not exists idx_registros_ts on registros (ts);

-- Garante as colunas de horário mesmo em bancos criados antes desta versão do schema.
alter table funcionarios add column if not exists hora_entrada time;
alter table funcionarios add column if not exists hora_saida time;
alter table funcionarios add column if not exists dias_semana int[] not null default '{1,2,3,4,5}';
alter table funcionarios add column if not exists data_admissao date;
update funcionarios set data_admissao = criado_em::date where data_admissao is null;
alter table registros add column if not exists dispositivo text;

-- Tabelas trancadas: sem policies, o papel anon não lê nem escreve nada direto.
alter table config enable row level security;
alter table funcionarios enable row level security;
alter table registros enable row level security;
revoke all on config, funcionarios, registros from anon, authenticated;

-- ---------- Funções auxiliares ----------

create or replace function _pin_admin_ok(p text) returns boolean
language sql security definer set search_path = public as $$
  select exists (select 1 from config where chave = 'pin_admin' and valor = to_jsonb(p));
$$;

-- Distância em metros entre duas coordenadas (fórmula de Haversine).
create or replace function _distancia_m(lat1 float8, lng1 float8, lat2 float8, lng2 float8) returns float8
language sql immutable as $$
  select 2 * 6371000 * asin(sqrt(
    pow(sin(radians(lat2 - lat1) / 2), 2) +
    cos(radians(lat1)) * cos(radians(lat2)) * pow(sin(radians(lng2 - lng1) / 2), 2)
  ));
$$;

-- Batidas de hoje (fuso de São Paulo) de um funcionário, como JSON.
create or replace function _batidas_hoje(p_funcionario_id uuid) returns json
language sql security definer set search_path = public as $$
  select coalesce(json_agg(json_build_object('id', r.id, 'ts', r.ts, 'lat', r.lat, 'lng', r.lng) order by r.ts), '[]'::json)
  from registros r
  where r.funcionario_id = p_funcionario_id
    and (r.ts at time zone 'America/Sao_Paulo')::date = (now() at time zone 'America/Sao_Paulo')::date;
$$;

-- ---------- Atrasos, faltas e banco de horas ----------

-- Dias em que o funcionário deveria trabalhar, dentro do período [p_de, p_ate],
-- considerando a data de admissão e os dias da semana cadastrados.
create or replace function _dias_esperados(p_data_admissao date, p_dias_semana int[], p_de date, p_ate date)
returns setof date
language sql stable as $$
  select d::date
  from generate_series(
    greatest(p_de, coalesce(p_data_admissao, p_de)),
    least(p_ate, current_date),
    interval '1 day'
  ) d
  where extract(dow from d)::int = any(p_dias_semana);
$$;

-- Horário (fuso de São Paulo) da primeira batida do funcionário no dia, ou null se faltou.
create or replace function _primeira_entrada_hora(p_funcionario_id uuid, p_dia date) returns time
language sql stable as $$
  select (min(ts) at time zone 'America/Sao_Paulo')::time
  from registros
  where funcionario_id = p_funcionario_id
    and (ts at time zone 'America/Sao_Paulo')::date = p_dia;
$$;

-- Minutos trabalhados no dia, pareando as batidas em sequência (1ª=entrada, 2ª=saída, ...).
create or replace function _minutos_trabalhados_dia(p_funcionario_id uuid, p_dia date) returns int
language sql stable as $$
  with batidas as (
    select ts, row_number() over (order by ts) as rn
    from registros
    where funcionario_id = p_funcionario_id
      and (ts at time zone 'America/Sao_Paulo')::date = p_dia
  ),
  pares as (
    select e.ts as entrada, s.ts as saida
    from batidas e
    join batidas s on s.rn = e.rn + 1
    where e.rn % 2 = 1
  )
  select coalesce(sum(greatest(0, round(extract(epoch from (saida - entrada)) / 60)))::int, 0)
  from pares;
$$;

-- Métricas de frequência de cada funcionário com horário cadastrado, no período [p_de, p_ate]:
-- dias esperados, faltas, atrasos (tolerância de 10 min), minutos trabalhados/esperados e saldo.
create or replace function admin_metricas_horas(p_pin_admin text, p_de date, p_ate date) returns json
language plpgsql security definer set search_path = public as $$
declare resultado json;
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN de administrador incorreto.');
  end if;

  select coalesce(json_agg(row_to_json(m) order by m.nome), '[]'::json) into resultado
  from (
    select
      f.id as funcionario_id,
      f.nome,
      count(*)::int as dias_esperados,
      count(*) filter (where pe.hora is null)::int as faltas,
      count(*) filter (where pe.hora is not null and pe.hora > f.hora_entrada + interval '10 minutes')::int as atrasos,
      coalesce(sum(
        case when pe.hora is not null and pe.hora > f.hora_entrada + interval '10 minutes'
          then (extract(epoch from (pe.hora - f.hora_entrada)) / 60)::int
          else 0
        end
      ), 0)::int as minutos_atraso_total,
      coalesce(sum(mt.minutos), 0)::int as minutos_trabalhados,
      (count(*) * (extract(epoch from (f.hora_saida - f.hora_entrada)) / 60))::int as minutos_esperados,
      (coalesce(sum(mt.minutos), 0) - (count(*) * (extract(epoch from (f.hora_saida - f.hora_entrada)) / 60)))::int as saldo_min
    from funcionarios f
    cross join lateral _dias_esperados(f.data_admissao, f.dias_semana, p_de, p_ate) dia(d)
    cross join lateral (select _primeira_entrada_hora(f.id, dia.d) as hora) pe
    cross join lateral (select _minutos_trabalhados_dia(f.id, dia.d) as minutos) mt
    where f.hora_entrada is not null and f.hora_saida is not null
    group by f.id, f.nome
  ) m;

  return json_build_object('ok', true, 'metricas', resultado);
end $$;

-- ---------- Funcionário (celular) ----------

create or replace function entrar_funcionario(p_pin text) returns json
language plpgsql security definer set search_path = public as $$
declare f funcionarios;
begin
  select * into f from funcionarios where pin = p_pin and ativo limit 1;
  if f.id is null then
    return json_build_object('ok', false, 'erro', 'PIN não encontrado.');
  end if;
  return json_build_object(
    'ok', true,
    'funcionario', json_build_object('id', f.id, 'nome', f.nome, 'cargo', f.cargo),
    'batidas', _batidas_hoje(f.id)
  );
end $$;

-- Remove a assinatura antiga (sem dispositivo) para não criar sobrecarga ambígua.
drop function if exists bater_ponto(text, float8, float8, float8);

create or replace function bater_ponto(
  p_pin text, p_lat float8, p_lng float8, p_precisao float8, p_dispositivo text default null
) returns json
language plpgsql security definer set search_path = public as $$
declare
  f funcionarios;
  v_ultima timestamptz;
  v_local jsonb;
  v_exigir boolean;
  v_dist float8;
begin
  select * into f from funcionarios where pin = p_pin and ativo limit 1;
  if f.id is null then
    return json_build_object('ok', false, 'erro', 'PIN não encontrado.');
  end if;
  select max(ts) into v_ultima from registros where funcionario_id = f.id;
  if v_ultima is not null and now() - v_ultima < interval '1 minute' then
    return json_build_object('ok', false, 'erro', 'Ponto já registrado há menos de 1 minuto.');
  end if;

  -- Bloqueio por localização: quando ativado nas Configurações, só aceita a
  -- batida dentro do raio da escola (validado aqui no servidor).
  select valor into v_local from config where chave = 'local_escola';
  v_exigir := coalesce((select (valor #>> '{}')::boolean from config where chave = 'exigir_presenca'), false);
  if v_exigir and v_local is not null then
    if p_lat is null or p_lng is null then
      return json_build_object('ok', false, 'erro',
        'Para registrar o ponto é preciso permitir o acesso à localização (GPS).');
    end if;
    v_dist := _distancia_m(p_lat, p_lng, (v_local->>'lat')::float8, (v_local->>'lng')::float8);
    if v_dist > (v_local->>'raio_m')::float8 then
      return json_build_object('ok', false, 'erro',
        format('Você está a %s m da escola. Aproxime-se para registrar o ponto.', round(v_dist)::int));
    end if;
  end if;

  insert into registros (funcionario_id, lat, lng, precisao_m, dispositivo)
  values (f.id, p_lat, p_lng, p_precisao, p_dispositivo);
  return entrar_funcionario(p_pin);
end $$;

-- ---------- Administração ----------

create or replace function admin_listar_funcionarios(p_pin_admin text) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN de administrador incorreto.');
  end if;
  return json_build_object('ok', true, 'funcionarios', coalesce((
    select json_agg(json_build_object(
      'id', f.id, 'nome', f.nome, 'cargo', f.cargo, 'pin', f.pin, 'ativo', f.ativo,
      'hora_entrada', f.hora_entrada, 'hora_saida', f.hora_saida,
      'dias_semana', f.dias_semana, 'data_admissao', f.data_admissao) order by f.nome)
    from funcionarios f), '[]'::json));
end $$;

create or replace function admin_salvar_funcionario(
  p_pin_admin text, p_id uuid, p_nome text, p_cargo text, p_pin text, p_ativo boolean,
  p_hora_entrada time default null, p_hora_saida time default null,
  p_dias_semana int[] default '{1,2,3,4,5}', p_data_admissao date default null
) returns json
language plpgsql security definer set search_path = public as $$
declare v_ativos int;
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN de administrador incorreto.');
  end if;
  if p_nome is null or btrim(p_nome) = '' then
    return json_build_object('ok', false, 'erro', 'Informe o nome.');
  end if;
  if p_pin !~ '^\d{4}$' then
    return json_build_object('ok', false, 'erro', 'O PIN deve ter exatamente 4 números.');
  end if;
  if p_hora_entrada is not null and p_hora_saida is not null and p_hora_saida <= p_hora_entrada then
    return json_build_object('ok', false, 'erro', 'O horário de saída deve ser depois do de entrada.');
  end if;
  if p_ativo and exists (select 1 from funcionarios where ativo and pin = p_pin and (p_id is null or id <> p_id)) then
    return json_build_object('ok', false, 'erro', 'Este PIN já está em uso por outro funcionário.');
  end if;
  select count(*) into v_ativos from funcionarios where ativo and (p_id is null or id <> p_id);
  if p_ativo and v_ativos >= 25 then
    return json_build_object('ok', false, 'erro', 'Limite de 25 funcionários ativos atingido.');
  end if;
  if p_id is null then
    insert into funcionarios (nome, cargo, pin, ativo, hora_entrada, hora_saida, dias_semana, data_admissao)
    values (btrim(p_nome), coalesce(btrim(p_cargo), ''), p_pin, p_ativo,
      p_hora_entrada, p_hora_saida, coalesce(p_dias_semana, '{1,2,3,4,5}'), coalesce(p_data_admissao, current_date));
  else
    update funcionarios
    set nome = btrim(p_nome), cargo = coalesce(btrim(p_cargo), ''), pin = p_pin, ativo = p_ativo,
      hora_entrada = p_hora_entrada, hora_saida = p_hora_saida,
      dias_semana = coalesce(p_dias_semana, '{1,2,3,4,5}'),
      data_admissao = coalesce(p_data_admissao, data_admissao, current_date)
    where id = p_id;
  end if;
  return json_build_object('ok', true);
end $$;

create or replace function admin_listar_registros(p_pin_admin text, p_de timestamptz, p_ate timestamptz) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN de administrador incorreto.');
  end if;
  return json_build_object('ok', true, 'registros', coalesce((
    select json_agg(json_build_object(
      'id', r.id, 'funcionario_id', r.funcionario_id, 'nome', f.nome, 'ts', r.ts,
      'manual', r.manual, 'lat', r.lat, 'lng', r.lng, 'precisao_m', r.precisao_m,
      'dispositivo', r.dispositivo) order by r.ts)
    from registros r join funcionarios f on f.id = r.funcionario_id
    where r.ts >= p_de and r.ts < p_ate), '[]'::json));
end $$;

create or replace function admin_lancar_batida(p_pin_admin text, p_funcionario_id uuid, p_ts timestamptz) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN de administrador incorreto.');
  end if;
  insert into registros (funcionario_id, ts, manual) values (p_funcionario_id, p_ts, true);
  return json_build_object('ok', true);
end $$;

create or replace function admin_excluir_registro(p_pin_admin text, p_id uuid) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN de administrador incorreto.');
  end if;
  delete from registros where id = p_id;
  return json_build_object('ok', true);
end $$;

create or replace function admin_trocar_pin(p_pin_admin text, p_novo text) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN atual incorreto.');
  end if;
  if p_novo !~ '^\d{4,8}$' then
    return json_build_object('ok', false, 'erro', 'O novo PIN deve ter de 4 a 8 números.');
  end if;
  update config set valor = to_jsonb(p_novo) where chave = 'pin_admin';
  return json_build_object('ok', true);
end $$;

create or replace function admin_obter_config(p_pin_admin text) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN de administrador incorreto.');
  end if;
  return json_build_object(
    'ok', true,
    'local', (select valor from config where chave = 'local_escola'),
    'exigir_presenca', coalesce((select (valor #>> '{}')::boolean from config where chave = 'exigir_presenca'), false),
    'pin_padrao', (select valor = to_jsonb('1234'::text) from config where chave = 'pin_admin'));
end $$;

-- Liga/desliga o bloqueio de batidas fora do raio da escola.
create or replace function admin_definir_exigencia(p_pin_admin text, p_exigir boolean) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN de administrador incorreto.');
  end if;
  if p_exigir and not exists (select 1 from config where chave = 'local_escola') then
    return json_build_object('ok', false, 'erro',
      'Defina primeiro a localização da escola para ativar o bloqueio.');
  end if;
  insert into config (chave, valor) values ('exigir_presenca', to_jsonb(p_exigir))
  on conflict (chave) do update set valor = excluded.valor;
  return json_build_object('ok', true);
end $$;

create or replace function admin_definir_local(p_pin_admin text, p_lat float8, p_lng float8, p_raio float8) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not _pin_admin_ok(p_pin_admin) then
    return json_build_object('ok', false, 'erro', 'PIN de administrador incorreto.');
  end if;
  insert into config (chave, valor)
  values ('local_escola', jsonb_build_object('lat', p_lat, 'lng', p_lng, 'raio_m', p_raio))
  on conflict (chave) do update set valor = excluded.valor;
  return json_build_object('ok', true);
end $$;
