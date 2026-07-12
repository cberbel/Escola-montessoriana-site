import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Download,
  Pencil,
  Plus,
  Trash2,
  Users,
  CalendarDays,
  KeyRound,
  MapPin,
  MapPinOff,
  Loader2,
  Crosshair,
  Wallet,
} from 'lucide-react';
import { Funcionario, LIMITE_FUNCIONARIOS, LocalEscola, MetricaHoras, RegistroAdmin } from './types';
import { obterPosicao, rpc, temConfig } from './api';
import {
  chaveDia,
  chaveMesAtual,
  distanciaMetros,
  formatarData,
  formatarDiasSemana,
  formatarDistancia,
  formatarHora,
  formatarHoraSimples,
  formatarMinutos,
  formatarSaldo,
  limitesDoMes,
  minutosTrabalhados,
  NOMES_DIAS_SEMANA,
  rotuloBatida,
} from './utils';

type Aba = 'registros' | 'funcionarios' | 'banco' | 'config';

interface RespostaBase { ok: boolean; erro?: string }
interface RespostaConfig extends RespostaBase { local: LocalEscola | null; pin_padrao: boolean }
interface RespostaFuncionarios extends RespostaBase { funcionarios: Funcionario[] }
interface RespostaRegistros extends RespostaBase { registros: RegistroAdmin[] }
interface RespostaMetricas extends RespostaBase { metricas: MetricaHoras[] }

const CHAVE_SESSAO = 'ponto.adminSessao';

export const AdminNuvem: React.FC = () => {
  const [pinAdmin, setPinAdmin] = useState<string | null>(() => sessionStorage.getItem(CHAVE_SESSAO));
  const [localEscola, setLocalEscola] = useState<LocalEscola | null>(null);
  const [pinPadrao, setPinPadrao] = useState(false);

  function autenticado(pin: string, cfg: RespostaConfig) {
    sessionStorage.setItem(CHAVE_SESSAO, pin);
    setPinAdmin(pin);
    setLocalEscola(cfg.local);
    setPinPadrao(cfg.pin_padrao);
  }

  function sair() {
    sessionStorage.removeItem(CHAVE_SESSAO);
    setPinAdmin(null);
  }

  return (
    <div className="min-h-screen bg-ponto-claro font-sans text-ponto-escuro">
      <header className="bg-ponto-azul text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={22} className="text-ponto-dourado" />
          <span className="font-serif text-lg">Ponto · Administração</span>
        </div>
        <div className="flex items-center gap-4">
          {pinAdmin && (
            <button onClick={sair} className="text-sm text-white/80 hover:text-white">
              Sair
            </button>
          )}
          <Link to="/" className="flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft size={16} /> Registrar ponto
          </Link>
        </div>
      </header>

      {!temConfig() ? (
        <main className="flex items-center justify-center px-4 py-16">
          <p className="bg-white rounded-2xl shadow p-6 max-w-sm text-ponto-cinza">
            O aplicativo ainda não foi conectado ao banco de dados. Siga as instruções do
            arquivo README para concluir a instalação.
          </p>
        </main>
      ) : pinAdmin ? (
        <Painel
          pinAdmin={pinAdmin}
          localEscola={localEscola}
          setLocalEscola={setLocalEscola}
          pinPadrao={pinPadrao}
          aoTrocarPin={(novo) => { sessionStorage.setItem(CHAVE_SESSAO, novo); setPinAdmin(novo); setPinPadrao(false); }}
        />
      ) : (
        <Login aoEntrar={autenticado} />
      )}
    </div>
  );
};

const Login: React.FC<{ aoEntrar: (pin: string, cfg: RespostaConfig) => void }> = ({ aoEntrar }) => {
  const [pin, setPin] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    try {
      const r = await rpc<RespostaConfig>('admin_obter_config', { p_pin_admin: pin });
      if (!r.ok) {
        setErro(r.erro ?? 'PIN incorreto.');
        setPin('');
      } else {
        aoEntrar(pin, r);
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex items-center justify-center px-4 py-16">
      <form onSubmit={entrar} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <KeyRound size={40} className="mx-auto text-ponto-azul mb-3" />
        <h1 className="font-serif text-2xl mb-1">Área restrita</h1>
        <p className="text-sm text-ponto-cinza mb-6">Digite o PIN do administrador.</p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => { setPin(e.target.value); setErro(''); }}
          className="w-full border-2 border-ponto-cinza/30 rounded-lg px-4 py-3 text-center text-2xl tracking-[0.5em] focus:border-ponto-azul outline-none"
          maxLength={8}
        />
        {erro && <p className="text-red-600 mt-3">{erro}</p>}
        <button
          disabled={carregando}
          className="mt-5 w-full bg-ponto-azul text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-60"
        >
          {carregando ? 'Entrando…' : 'Entrar'}
        </button>
        <p className="text-xs text-ponto-cinza mt-3">
          Primeiro acesso: o PIN padrão é <span className="font-bold">1234</span>. Troque-o em Configurações.
        </p>
      </form>
    </main>
  );
};

const Painel: React.FC<{
  pinAdmin: string;
  localEscola: LocalEscola | null;
  setLocalEscola: (l: LocalEscola | null) => void;
  pinPadrao: boolean;
  aoTrocarPin: (novo: string) => void;
}> = ({ pinAdmin, localEscola, setLocalEscola, pinPadrao, aoTrocarPin }) => {
  const [aba, setAba] = useState<Aba>('registros');

  const abas: { id: Aba; rotulo: string; icone: React.ReactNode }[] = [
    { id: 'registros', rotulo: 'Registros', icone: <CalendarDays size={18} /> },
    { id: 'funcionarios', rotulo: 'Funcionários', icone: <Users size={18} /> },
    { id: 'banco', rotulo: 'Banco de Horas', icone: <Wallet size={18} /> },
    { id: 'config', rotulo: 'Configurações', icone: <KeyRound size={18} /> },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      {pinPadrao && (
        <p className="bg-amber-100 text-amber-900 rounded-xl px-4 py-3 mb-4 text-sm">
          Você ainda está usando o PIN padrão <strong>1234</strong>. Troque-o na aba Configurações.
        </p>
      )}
      <nav className="flex gap-2 mb-6 flex-wrap">
        {abas.map((a) => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-colors ${
              aba === a.id ? 'bg-ponto-azul text-white' : 'bg-white text-ponto-escuro hover:bg-white/70'
            }`}
          >
            {a.icone} {a.rotulo}
          </button>
        ))}
      </nav>

      {aba === 'registros' && <AbaRegistros pinAdmin={pinAdmin} localEscola={localEscola} />}
      {aba === 'funcionarios' && <AbaFuncionarios pinAdmin={pinAdmin} />}
      {aba === 'banco' && <AbaBancoHoras pinAdmin={pinAdmin} />}
      {aba === 'config' && (
        <AbaConfig
          pinAdmin={pinAdmin}
          localEscola={localEscola}
          setLocalEscola={setLocalEscola}
          aoTrocarPin={aoTrocarPin}
        />
      )}
    </main>
  );
};

const Carregando: React.FC = () => (
  <div className="flex justify-center py-12">
    <Loader2 size={36} className="animate-spin text-ponto-azul" aria-label="Carregando" />
  </div>
);

// ---------- Funcionários ----------

const AbaFuncionarios: React.FC<{ pinAdmin: string }> = ({ pinAdmin }) => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[] | null>(null);
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState<Funcionario | null>(null);
  const [criando, setCriando] = useState(false);

  const carregar = useCallback(async () => {
    try {
      const r = await rpc<RespostaFuncionarios>('admin_listar_funcionarios', { p_pin_admin: pinAdmin });
      if (r.ok) setFuncionarios(r.funcionarios);
      else setErro(r.erro ?? 'Erro ao carregar.');
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    }
  }, [pinAdmin]);

  useEffect(() => { carregar(); }, [carregar]);

  const ativos = (funcionarios ?? []).filter((f) => f.ativo).length;

  async function salvar(
    dados: {
      nome: string; cargo: string; pin: string;
      horaEntrada: string; horaSaida: string; diasSemana: number[]; dataAdmissao: string;
    },
    existente?: Funcionario
  ): Promise<string> {
    const r = await rpc<RespostaBase>('admin_salvar_funcionario', {
      p_pin_admin: pinAdmin,
      p_id: existente?.id ?? null,
      p_nome: dados.nome,
      p_cargo: dados.cargo,
      p_pin: dados.pin,
      p_ativo: existente?.ativo ?? true,
      p_hora_entrada: dados.horaEntrada || null,
      p_hora_saida: dados.horaSaida || null,
      p_dias_semana: dados.diasSemana,
      p_data_admissao: dados.dataAdmissao || null,
    });
    if (!r.ok) return r.erro ?? 'Erro ao salvar.';
    setEditando(null);
    setCriando(false);
    await carregar();
    return '';
  }

  async function alternarAtivo(f: Funcionario) {
    const r = await rpc<RespostaBase>('admin_salvar_funcionario', {
      p_pin_admin: pinAdmin,
      p_id: f.id,
      p_nome: f.nome,
      p_cargo: f.cargo,
      p_pin: f.pin,
      p_ativo: !f.ativo,
      p_hora_entrada: f.hora_entrada ?? null,
      p_hora_saida: f.hora_saida ?? null,
      p_dias_semana: f.dias_semana ?? [1, 2, 3, 4, 5],
      p_data_admissao: f.data_admissao ?? null,
    });
    if (!r.ok) alert(r.erro ?? 'Erro ao salvar.');
    await carregar();
  }

  if (erro) return <p className="text-red-600 bg-white rounded-2xl shadow p-6">{erro}</p>;
  if (!funcionarios) return <Carregando />;

  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className="text-ponto-cinza">
          {ativos} de {LIMITE_FUNCIONARIOS} funcionários ativos
        </p>
        <button
          onClick={() => setCriando(true)}
          disabled={ativos >= LIMITE_FUNCIONARIOS}
          className="flex items-center gap-2 bg-ponto-azul text-white font-bold px-4 py-2 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-40"
        >
          <Plus size={18} /> Novo funcionário
        </button>
      </div>

      {(criando || editando) && (
        <FormFuncionario
          inicial={editando ?? undefined}
          onCancelar={() => { setCriando(false); setEditando(null); }}
          onSalvar={(dados) => salvar(dados, editando ?? undefined)}
        />
      )}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {funcionarios.length === 0 ? (
          <p className="p-6 text-ponto-cinza">
            Nenhum funcionário cadastrado. Clique em “Novo funcionário” para começar.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-ponto-claro text-sm uppercase tracking-wide text-ponto-cinza">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Cargo</th>
                  <th className="px-4 py-3">PIN</th>
                  <th className="px-4 py-3">Horário</th>
                  <th className="px-4 py-3">Situação</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((f) => (
                  <tr key={f.id} className="border-t border-ponto-claro">
                    <td className="px-4 py-3 font-bold">{f.nome}</td>
                    <td className="px-4 py-3">{f.cargo || '—'}</td>
                    <td className="px-4 py-3 tabular-nums">{f.pin}</td>
                    <td className="px-4 py-3 text-sm">
                      {f.hora_entrada && f.hora_saida ? (
                        <>
                          {formatarHoraSimples(f.hora_entrada)}–{formatarHoraSimples(f.hora_saida)}
                          <span className="text-ponto-cinza"> · {formatarDiasSemana(f.dias_semana ?? [1, 2, 3, 4, 5])}</span>
                        </>
                      ) : (
                        <span className="text-ponto-cinza">Sem horário definido</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => alternarAtivo(f)}
                        className={`text-sm font-bold px-3 py-1 rounded-full ${
                          f.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {f.ativo ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => { setEditando(f); setCriando(false); }}
                        className="text-ponto-azul hover:text-blue-800 p-1"
                        aria-label={`Editar ${f.nome}`}
                      >
                        <Pencil size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

const FormFuncionario: React.FC<{
  inicial?: Funcionario;
  onSalvar: (dados: {
    nome: string; cargo: string; pin: string;
    horaEntrada: string; horaSaida: string; diasSemana: number[]; dataAdmissao: string;
  }) => Promise<string>;
  onCancelar: () => void;
}> = ({ inicial, onSalvar, onCancelar }) => {
  const [nome, setNome] = useState(inicial?.nome ?? '');
  const [cargo, setCargo] = useState(inicial?.cargo ?? '');
  const [pin, setPin] = useState(inicial?.pin ?? '');
  const [horaEntrada, setHoraEntrada] = useState(inicial?.hora_entrada ? formatarHoraSimples(inicial.hora_entrada) : '');
  const [horaSaida, setHoraSaida] = useState(inicial?.hora_saida ? formatarHoraSimples(inicial.hora_saida) : '');
  const [diasSemana, setDiasSemana] = useState<number[]>(inicial?.dias_semana ?? [1, 2, 3, 4, 5]);
  const [dataAdmissao, setDataAdmissao] = useState(
    inicial?.data_admissao ?? new Date().toISOString().slice(0, 10)
  );
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  function alternarDia(dia: number) {
    setDiasSemana((atual) =>
      atual.includes(dia) ? atual.filter((d) => d !== dia) : [...atual, dia].sort((a, b) => a - b)
    );
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return setErro('Informe o nome.');
    if (!/^\d{4}$/.test(pin)) return setErro('O PIN deve ter exatamente 4 números.');
    if ((horaEntrada && !horaSaida) || (!horaEntrada && horaSaida)) {
      return setErro('Informe entrada e saída, ou deixe os dois em branco.');
    }
    if (horaEntrada && horaSaida && horaSaida <= horaEntrada) {
      return setErro('O horário de saída deve ser depois do de entrada.');
    }
    setSalvando(true);
    const msg = await onSalvar({
      nome: nome.trim(), cargo: cargo.trim(), pin,
      horaEntrada, horaSaida, diasSemana, dataAdmissao,
    });
    setSalvando(false);
    if (msg) setErro(msg);
  }

  return (
    <form onSubmit={enviar} className="bg-white rounded-2xl shadow p-4 mb-4 grid gap-3 sm:grid-cols-4">
      <input
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none sm:col-span-2"
        autoFocus
      />
      <input
        placeholder="Cargo (opcional)"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
        className="border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none"
      />
      <input
        placeholder="PIN (4 números)"
        value={pin}
        inputMode="numeric"
        maxLength={4}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        className="border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none tabular-nums"
      />

      <div className="sm:col-span-4 border-t border-ponto-claro pt-3">
        <p className="text-sm font-bold uppercase tracking-wide text-ponto-cinza mb-2">
          Horário esperado (opcional — usado para atrasos, faltas e banco de horas)
        </p>
        <div className="grid gap-3 sm:grid-cols-4">
          <label className="text-sm text-ponto-cinza">
            Entrada
            <input
              type="time"
              value={horaEntrada}
              onChange={(e) => setHoraEntrada(e.target.value)}
              className="mt-1 w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none"
            />
          </label>
          <label className="text-sm text-ponto-cinza">
            Saída
            <input
              type="time"
              value={horaSaida}
              onChange={(e) => setHoraSaida(e.target.value)}
              className="mt-1 w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none"
            />
          </label>
          <label className="text-sm text-ponto-cinza sm:col-span-2">
            Admitido(a) em
            <input
              type="date"
              value={dataAdmissao}
              onChange={(e) => setDataAdmissao(e.target.value)}
              className="mt-1 w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none"
            />
          </label>
        </div>
        <div className="mt-3">
          <p className="text-sm text-ponto-cinza mb-1">Dias trabalhados</p>
          <div className="flex flex-wrap gap-2">
            {NOMES_DIAS_SEMANA.map((rotulo, dia) => (
              <button
                key={dia}
                type="button"
                onClick={() => alternarDia(dia)}
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  diasSemana.includes(dia)
                    ? 'bg-ponto-azul text-white'
                    : 'bg-ponto-claro text-ponto-cinza'
                }`}
              >
                {rotulo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {erro && <p className="text-red-600 sm:col-span-4">{erro}</p>}
      <div className="flex gap-2 sm:col-span-4">
        <button
          disabled={salvando}
          className="bg-ponto-azul text-white font-bold px-5 py-2 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-60"
        >
          {salvando ? 'Salvando…' : inicial ? 'Salvar alterações' : 'Cadastrar'}
        </button>
        <button type="button" onClick={onCancelar} className="text-ponto-cinza hover:text-ponto-escuro px-3">
          Cancelar
        </button>
      </div>
    </form>
  );
};

// ---------- Registros ----------

const AbaRegistros: React.FC<{ pinAdmin: string; localEscola: LocalEscola | null }> = ({
  pinAdmin,
  localEscola,
}) => {
  const [mes, setMes] = useState(chaveMesAtual());
  const [funcionarioId, setFuncionarioId] = useState('todos');
  const [registros, setRegistros] = useState<RegistroAdmin[] | null>(null);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [erro, setErro] = useState('');
  const [adicionando, setAdicionando] = useState(false);

  const carregar = useCallback(async () => {
    setRegistros(null);
    setErro('');
    try {
      const { de, ate } = limitesDoMes(mes);
      const [rr, rf] = await Promise.all([
        rpc<RespostaRegistros>('admin_listar_registros', { p_pin_admin: pinAdmin, p_de: de, p_ate: ate }),
        rpc<RespostaFuncionarios>('admin_listar_funcionarios', { p_pin_admin: pinAdmin }),
      ]);
      if (!rr.ok) return setErro(rr.erro ?? 'Erro ao carregar registros.');
      if (rf.ok) setFuncionarios(rf.funcionarios);
      setRegistros(rr.registros);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    }
  }, [pinAdmin, mes]);

  useEffect(() => { carregar(); }, [carregar]);

  const filtrados = useMemo(
    () => (registros ?? []).filter((r) => funcionarioId === 'todos' || r.funcionario_id === funcionarioId),
    [registros, funcionarioId]
  );

  // Batidas do mesmo funcionário no mesmo dia, para rotular Entrada/Saída
  const indiceNoDia = useCallback(
    (r: RegistroAdmin) => {
      const doDia = (registros ?? [])
        .filter((x) => x.funcionario_id === r.funcionario_id && chaveDia(x.ts) === chaveDia(r.ts))
        .sort((a, b) => a.ts.localeCompare(b.ts));
      return doDia.findIndex((x) => x.id === r.id);
    },
    [registros]
  );

  const porDia = useMemo(() => {
    const mapa = new Map<string, RegistroAdmin[]>();
    for (const r of filtrados) {
      const dia = chaveDia(r.ts);
      if (!mapa.has(dia)) mapa.set(dia, []);
      mapa.get(dia)!.push(r);
    }
    return [...mapa.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtrados]);

  const resumoMensal = useMemo(() => {
    const porFuncionario = new Map<string, { nome: string; dias: Map<string, RegistroAdmin[]> }>();
    for (const r of filtrados) {
      if (!porFuncionario.has(r.funcionario_id)) {
        porFuncionario.set(r.funcionario_id, { nome: r.nome, dias: new Map() });
      }
      const entrada = porFuncionario.get(r.funcionario_id)!;
      const dia = chaveDia(r.ts);
      if (!entrada.dias.has(dia)) entrada.dias.set(dia, []);
      entrada.dias.get(dia)!.push(r);
    }
    return [...porFuncionario.values()]
      .map(({ nome, dias }) => {
        let total = 0;
        for (const batidas of dias.values()) {
          total += minutosTrabalhados(batidas.slice().sort((a, b) => a.ts.localeCompare(b.ts)));
        }
        return { nome, dias: dias.size, total };
      })
      .sort((a, b) => a.nome.localeCompare(b.nome));
  }, [filtrados]);

  function distancia(r: RegistroAdmin): number | null {
    if (!localEscola || r.lat === null || r.lng === null) return null;
    return distanciaMetros(r.lat, r.lng, localEscola.lat, localEscola.lng);
  }

  function foraDaEscola(r: RegistroAdmin): boolean {
    const d = distancia(r);
    return d !== null && localEscola !== null && d > localEscola.raio_m;
  }

  async function excluir(id: string) {
    if (!confirm('Excluir este registro de ponto?')) return;
    const r = await rpc<RespostaBase>('admin_excluir_registro', { p_pin_admin: pinAdmin, p_id: id });
    if (!r.ok) alert(r.erro ?? 'Erro ao excluir.');
    await carregar();
  }

  async function lancarManual(dados: { funcionarioId: string; dataHora: string }): Promise<string> {
    const r = await rpc<RespostaBase>('admin_lancar_batida', {
      p_pin_admin: pinAdmin,
      p_funcionario_id: dados.funcionarioId,
      p_ts: new Date(dados.dataHora).toISOString(),
    });
    if (!r.ok) return r.erro ?? 'Erro ao lançar.';
    setAdicionando(false);
    await carregar();
    return '';
  }

  function exportarCsv() {
    const linhas: string[] = ['Funcionário;Data;Batidas (* = fora da escola);Total trabalhado'];
    const porFuncionarioDia = new Map<string, Map<string, RegistroAdmin[]>>();
    for (const r of filtrados) {
      if (!porFuncionarioDia.has(r.nome)) porFuncionarioDia.set(r.nome, new Map());
      const dias = porFuncionarioDia.get(r.nome)!;
      const dia = chaveDia(r.ts);
      if (!dias.has(dia)) dias.set(dia, []);
      dias.get(dia)!.push(r);
    }
    for (const [nome, dias] of [...porFuncionarioDia.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      for (const [dia, batidas] of [...dias.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        const ordenadas = batidas.slice().sort((a, b) => a.ts.localeCompare(b.ts));
        const horarios = ordenadas
          .map((b) => formatarHora(b.ts) + (foraDaEscola(b) ? '*' : ''))
          .join(' ');
        linhas.push(`${nome};${dia};${horarios};${formatarMinutos(minutosTrabalhados(ordenadas))}`);
      }
    }
    const blob = new Blob(['﻿' + linhas.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ponto-${mes}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (erro) return <p className="text-red-600 bg-white rounded-2xl shadow p-6">{erro}</p>;

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="month"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 bg-white focus:border-ponto-azul outline-none"
        />
        <select
          value={funcionarioId}
          onChange={(e) => setFuncionarioId(e.target.value)}
          className="border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 bg-white focus:border-ponto-azul outline-none"
        >
          <option value="todos">Todos os funcionários</option>
          {funcionarios.map((f) => (
            <option key={f.id} value={f.id}>{f.nome}</option>
          ))}
        </select>
        <button
          onClick={() => setAdicionando(true)}
          className="flex items-center gap-2 bg-white font-bold px-4 py-2 rounded-full hover:bg-white/70 transition-colors"
        >
          <Plus size={18} /> Lançar batida manual
        </button>
        <button
          onClick={exportarCsv}
          className="flex items-center gap-2 bg-ponto-azul text-white font-bold px-4 py-2 rounded-full hover:bg-blue-800 transition-colors ml-auto"
        >
          <Download size={18} /> Exportar CSV
        </button>
      </div>

      {!localEscola && (
        <p className="bg-amber-100 text-amber-900 rounded-xl px-4 py-3 mb-4 text-sm">
          Defina a localização da escola em Configurações para ver se cada batida foi feita na escola.
        </p>
      )}

      {adicionando && (
        <FormBatidaManual
          funcionarios={funcionarios}
          onSalvar={lancarManual}
          onCancelar={() => setAdicionando(false)}
        />
      )}

      {registros === null ? (
        <Carregando />
      ) : (
        <>
          {resumoMensal.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-4 mb-4">
              <h2 className="font-bold uppercase tracking-wide text-sm text-ponto-cinza mb-2">
                Resumo do mês
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-ponto-cinza">
                    <tr>
                      <th className="py-1 pr-4">Funcionário</th>
                      <th className="py-1 pr-4">Dias com registro</th>
                      <th className="py-1">Total trabalhado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumoMensal.map(({ nome, dias, total }) => (
                      <tr key={nome} className="border-t border-ponto-claro">
                        <td className="py-2 pr-4 font-bold">{nome}</td>
                        <td className="py-2 pr-4">{dias}</td>
                        <td className="py-2 tabular-nums">{formatarMinutos(total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {porDia.length === 0 ? (
            <p className="text-ponto-cinza bg-white rounded-2xl shadow p-6">
              Nenhum registro neste período.
            </p>
          ) : (
            porDia.map(([dia, doDia]) => (
              <div key={dia} className="bg-white rounded-2xl shadow p-4 mb-3">
                <h3 className="font-bold capitalize mb-2">{formatarData(dia)}</h3>
                <ul className="divide-y divide-ponto-claro">
                  {doDia
                    .slice()
                    .sort((a, b) => a.ts.localeCompare(b.ts))
                    .map((r) => {
                      const indice = indiceNoDia(r);
                      const dist = distancia(r);
                      return (
                        <li key={r.id} className="flex items-center gap-3 py-2 text-sm flex-wrap">
                          <span className="tabular-nums font-bold w-14">{formatarHora(r.ts)}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              indice % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {rotuloBatida(indice)}
                          </span>
                          <span className="flex-grow">
                            {r.nome}
                            {r.manual && <span className="text-ponto-cinza"> · manual</span>}
                          </span>
                          {r.lat === null ? (
                            !r.manual && (
                              <span className="flex items-center gap-1 text-xs text-ponto-cinza">
                                <MapPinOff size={13} /> Sem localização
                              </span>
                            )
                          ) : (
                            <a
                              href={`https://maps.google.com/?q=${r.lat},${r.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                                dist === null
                                  ? 'bg-blue-100 text-blue-800'
                                  : foraDaEscola(r)
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-green-100 text-green-800'
                              }`}
                              title="Abrir no Google Maps"
                            >
                              <MapPin size={13} />
                              {dist === null
                                ? 'Ver local'
                                : foraDaEscola(r)
                                  ? `${formatarDistancia(dist)} da escola`
                                  : 'Na escola'}
                            </a>
                          )}
                          <button
                            onClick={() => excluir(r.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            aria-label="Excluir registro"
                          >
                            <Trash2 size={16} />
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))
          )}
        </>
      )}
    </section>
  );
};

const FormBatidaManual: React.FC<{
  funcionarios: Funcionario[];
  onSalvar: (dados: { funcionarioId: string; dataHora: string }) => Promise<string>;
  onCancelar: () => void;
}> = ({ funcionarios, onSalvar, onCancelar }) => {
  const [funcionarioId, setFuncionarioId] = useState(funcionarios[0]?.id ?? '');
  const [dataHora, setDataHora] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!funcionarioId) return setErro('Selecione um funcionário.');
    if (!dataHora) return setErro('Informe data e hora.');
    setSalvando(true);
    const msg = await onSalvar({ funcionarioId, dataHora });
    setSalvando(false);
    if (msg) setErro(msg);
  }

  return (
    <form onSubmit={enviar} className="bg-white rounded-2xl shadow p-4 mb-4 flex flex-wrap items-center gap-3">
      <select
        value={funcionarioId}
        onChange={(e) => setFuncionarioId(e.target.value)}
        className="border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none"
      >
        {funcionarios.map((f) => (
          <option key={f.id} value={f.id}>{f.nome}</option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={dataHora}
        onChange={(e) => setDataHora(e.target.value)}
        className="border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none"
      />
      <button
        disabled={salvando}
        className="bg-ponto-azul text-white font-bold px-5 py-2 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-60"
      >
        {salvando ? 'Lançando…' : 'Lançar'}
      </button>
      <button type="button" onClick={onCancelar} className="text-ponto-cinza hover:text-ponto-escuro px-2">
        Cancelar
      </button>
      {erro && <p className="text-red-600 w-full">{erro}</p>}
    </form>
  );
};

// ---------- Banco de Horas ----------

const DATA_MINIMA = '2000-01-01';

const AbaBancoHoras: React.FC<{ pinAdmin: string }> = ({ pinAdmin }) => {
  const [metricas, setMetricas] = useState<MetricaHoras[] | null>(null);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    setMetricas(null);
    setErro('');
    try {
      const hoje = new Date().toISOString().slice(0, 10);
      const r = await rpc<RespostaMetricas>('admin_metricas_horas', {
        p_pin_admin: pinAdmin,
        p_de: DATA_MINIMA,
        p_ate: hoje,
      });
      if (!r.ok) return setErro(r.erro ?? 'Erro ao carregar.');
      setMetricas(r.metricas);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    }
  }, [pinAdmin]);

  useEffect(() => { carregar(); }, [carregar]);

  if (erro) return <p className="text-red-600 bg-white rounded-2xl shadow p-6">{erro}</p>;
  if (!metricas) return <Carregando />;

  return (
    <section>
      <p className="text-ponto-cinza mb-4">
        Acumulado desde a admissão de cada funcionário, com tolerância de 10 minutos para atrasos.
        Só aparecem aqui os funcionários com horário cadastrado (aba Funcionários).
      </p>

      {metricas.length === 0 ? (
        <p className="text-ponto-cinza bg-white rounded-2xl shadow p-6">
          Nenhum funcionário com horário cadastrado ainda. Defina o horário esperado na aba
          Funcionários para começar a acompanhar atrasos, faltas e banco de horas.
        </p>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-ponto-claro text-sm uppercase tracking-wide text-ponto-cinza">
                <tr>
                  <th className="px-4 py-3">Funcionário</th>
                  <th className="px-4 py-3">Dias esperados</th>
                  <th className="px-4 py-3">Faltas</th>
                  <th className="px-4 py-3">Atrasos</th>
                  <th className="px-4 py-3">Minutos de atraso</th>
                  <th className="px-4 py-3">Saldo (banco de horas)</th>
                </tr>
              </thead>
              <tbody>
                {metricas.map((m) => (
                  <tr key={m.funcionario_id} className="border-t border-ponto-claro">
                    <td className="px-4 py-3 font-bold">{m.nome}</td>
                    <td className="px-4 py-3">{m.dias_esperados}</td>
                    <td className="px-4 py-3">
                      {m.faltas > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
                          {m.faltas}
                        </span>
                      ) : (
                        0
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {m.atrasos > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                          {m.atrasos}
                        </span>
                      ) : (
                        0
                      )}
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {m.minutos_atraso_total > 0 ? formatarMinutos(m.minutos_atraso_total) : '—'}
                    </td>
                    <td className="px-4 py-3 tabular-nums font-bold">
                      <span className={m.saldo_min < 0 ? 'text-red-700' : 'text-green-700'}>
                        {formatarSaldo(m.saldo_min)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

// ---------- Configurações ----------

const AbaConfig: React.FC<{
  pinAdmin: string;
  localEscola: LocalEscola | null;
  setLocalEscola: (l: LocalEscola | null) => void;
  aoTrocarPin: (novo: string) => void;
}> = ({ pinAdmin, localEscola, setLocalEscola, aoTrocarPin }) => {
  const [novoPin, setNovoPin] = useState('');
  const [mensagemPin, setMensagemPin] = useState<{ tipo: 'ok' | 'erro'; texto: string } | null>(null);
  const [raio, setRaio] = useState(localEscola?.raio_m ?? 100);
  const [mensagemLocal, setMensagemLocal] = useState<{ tipo: 'ok' | 'erro'; texto: string } | null>(null);
  const [obtendo, setObtendo] = useState(false);

  async function trocarPin(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{4,8}$/.test(novoPin)) {
      return setMensagemPin({ tipo: 'erro', texto: 'O novo PIN deve ter de 4 a 8 números.' });
    }
    const r = await rpc<RespostaBase>('admin_trocar_pin', { p_pin_admin: pinAdmin, p_novo: novoPin });
    if (!r.ok) return setMensagemPin({ tipo: 'erro', texto: r.erro ?? 'Erro ao trocar o PIN.' });
    aoTrocarPin(novoPin);
    setNovoPin('');
    setMensagemPin({ tipo: 'ok', texto: 'PIN do administrador atualizado.' });
  }

  async function definirLocalAqui() {
    setObtendo(true);
    setMensagemLocal(null);
    const pos = await obterPosicao();
    setObtendo(false);
    if (pos.lat === null || pos.lng === null) {
      return setMensagemLocal({
        tipo: 'erro',
        texto: 'Não foi possível obter sua localização. Permita o acesso ao GPS e tente de novo.',
      });
    }
    const r = await rpc<RespostaBase>('admin_definir_local', {
      p_pin_admin: pinAdmin,
      p_lat: pos.lat,
      p_lng: pos.lng,
      p_raio: raio,
    });
    if (!r.ok) return setMensagemLocal({ tipo: 'erro', texto: r.erro ?? 'Erro ao salvar.' });
    setLocalEscola({ lat: pos.lat, lng: pos.lng, raio_m: raio });
    setMensagemLocal({ tipo: 'ok', texto: 'Localização da escola salva.' });
  }

  return (
    <section className="max-w-md space-y-4">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-serif text-xl mb-2">Localização da escola</h2>
        <p className="text-sm text-ponto-cinza mb-4">
          Estando <strong>dentro da escola</strong>, toque no botão abaixo. As batidas feitas a mais
          de {raio} m daqui serão marcadas como “fora da escola”.
        </p>
        {localEscola && (
          <p className="text-sm mb-3">
            Local atual definido:{' '}
            <a
              href={`https://maps.google.com/?q=${localEscola.lat},${localEscola.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ponto-azul underline"
            >
              ver no mapa
            </a>{' '}
            · raio {localEscola.raio_m} m
          </p>
        )}
        <label className="block text-sm mb-3">
          Raio de tolerância (metros)
          <input
            type="number"
            min={30}
            max={2000}
            value={raio}
            onChange={(e) => setRaio(Number(e.target.value))}
            className="mt-1 w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none"
          />
        </label>
        {mensagemLocal && (
          <p className={`mb-3 ${mensagemLocal.tipo === 'ok' ? 'text-green-700' : 'text-red-600'}`}>
            {mensagemLocal.texto}
          </p>
        )}
        <button
          onClick={definirLocalAqui}
          disabled={obtendo}
          className="w-full bg-ponto-azul text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {obtendo ? <Loader2 size={20} className="animate-spin" /> : <Crosshair size={20} />}
          {obtendo ? 'Obtendo localização…' : 'Usar minha localização atual'}
        </button>
      </div>

      <form onSubmit={trocarPin} className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="font-serif text-xl">Trocar PIN do administrador</h2>
        <input
          type="password"
          inputMode="numeric"
          placeholder="Novo PIN (4 a 8 números)"
          value={novoPin}
          onChange={(e) => setNovoPin(e.target.value.replace(/\D/g, ''))}
          maxLength={8}
          className="w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 focus:border-ponto-azul outline-none"
        />
        {mensagemPin && (
          <p className={mensagemPin.tipo === 'ok' ? 'text-green-700' : 'text-red-600'}>
            {mensagemPin.texto}
          </p>
        )}
        <button className="w-full bg-ponto-azul text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors">
          Salvar novo PIN
        </button>
      </form>

      <div className="bg-white rounded-2xl shadow p-6 text-sm text-ponto-cinza space-y-2">
        <h2 className="font-serif text-xl text-ponto-escuro">Como funciona</h2>
        <p>
          Cada funcionário registra o ponto pelo <strong>próprio celular</strong>, com dia e hora do
          servidor (não dá para burlar mudando o relógio do aparelho) e localização GPS.
        </p>
        <p>
          Os dados ficam na nuvem — você acessa esta administração de qualquer lugar. Exporte o CSV
          mensalmente para fechamento; ele abre no Excel ou Google Planilhas.
        </p>
      </div>
    </section>
  );
};
