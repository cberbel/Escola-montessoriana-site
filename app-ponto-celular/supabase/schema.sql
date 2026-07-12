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
  criado_em timestamptz not null default now()
);

create table if not exists registros (
  id uuid primary key default gen_random_uuid(),
  funcionario_id uuid not null references funcionarios(id) on delete cascade,
  ts timestamptz not null default now(),
  manual boolean not null default false,
  lat double precision,
  lng double precision,
  precisao_m double precision
);

create index if not exists idx_registros_func_ts on registros (funcionario_id, ts);
create index if not exists idx_registros_ts on registros (ts);

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

-- Batidas de hoje (fuso de São Paulo) de um funcionário, como JSON.
create or replace function _batidas_hoje(p_funcionario_id uuid) returns json
language sql security definer set search_path = public as $$
  select coalesce(json_agg(json_build_object('id', r.id, 'ts', r.ts, 'lat', r.lat, 'lng', r.lng) order by r.ts), '[]'::json)
  from registros r
  where r.funcionario_id = p_funcionario_id
    and (r.ts at time zone 'America/Sao_Paulo')::date = (now() at time zone 'America/Sao_Paulo')::date;
$$;

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

create or replace function bater_ponto(p_pin text, p_lat float8, p_lng float8, p_precisao float8) returns json
language plpgsql security definer set search_path = public as $$
declare f funcionarios; v_ultima timestamptz;
begin
  select * into f from funcionarios where pin = p_pin and ativo limit 1;
  if f.id is null then
    return json_build_object('ok', false, 'erro', 'PIN não encontrado.');
  end if;
  select max(ts) into v_ultima from registros where funcionario_id = f.id;
  if v_ultima is not null and now() - v_ultima < interval '1 minute' then
    return json_build_object('ok', false, 'erro', 'Ponto já registrado há menos de 1 minuto.');
  end if;
  insert into registros (funcionario_id, lat, lng, precisao_m) values (f.id, p_lat, p_lng, p_precisao);
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
    select json_agg(json_build_object('id', f.id, 'nome', f.nome, 'cargo', f.cargo, 'pin', f.pin, 'ativo', f.ativo) order by f.nome)
    from funcionarios f), '[]'::json));
end $$;

create or replace function admin_salvar_funcionario(
  p_pin_admin text, p_id uuid, p_nome text, p_cargo text, p_pin text, p_ativo boolean
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
  if p_ativo and exists (select 1 from funcionarios where ativo and pin = p_pin and (p_id is null or id <> p_id)) then
    return json_build_object('ok', false, 'erro', 'Este PIN já está em uso por outro funcionário.');
  end if;
  select count(*) into v_ativos from funcionarios where ativo and (p_id is null or id <> p_id);
  if p_ativo and v_ativos >= 25 then
    return json_build_object('ok', false, 'erro', 'Limite de 25 funcionários ativos atingido.');
  end if;
  if p_id is null then
    insert into funcionarios (nome, cargo, pin, ativo)
    values (btrim(p_nome), coalesce(btrim(p_cargo), ''), p_pin, p_ativo);
  else
    update funcionarios
    set nome = btrim(p_nome), cargo = coalesce(btrim(p_cargo), ''), pin = p_pin, ativo = p_ativo
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
      'manual', r.manual, 'lat', r.lat, 'lng', r.lng, 'precisao_m', r.precisao_m) order by r.ts)
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
    'pin_padrao', (select valor = to_jsonb('1234'::text) from config where chave = 'pin_admin'));
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
