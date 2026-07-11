import React, { useMemo, useState } from 'react';
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
} from 'lucide-react';
import { Funcionario, LIMITE_FUNCIONARIOS, RegistroPonto } from './types';
import {
  chaveDia,
  chaveMes,
  definirPinAdmin,
  formatarData,
  formatarHora,
  formatarMinutos,
  gerarId,
  listarFuncionarios,
  listarRegistros,
  minutosTrabalhados,
  obterPinAdmin,
  PIN_ADMIN_PADRAO,
  registrosDoDia,
  rotuloBatida,
  salvarFuncionarios,
  salvarRegistros,
} from './storage';

type Aba = 'funcionarios' | 'registros' | 'config';

export const AdminPonto: React.FC = () => {
  const [autenticado, setAutenticado] = useState(false);

  return (
    <div className="min-h-screen bg-montessori-cream font-sans text-montessori-dark">
      <header className="bg-montessori-green text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={22} className="text-montessori-gold" />
          <span className="font-serif text-lg">Ponto · Administração</span>
        </div>
        <Link to="/ponto" className="flex items-center gap-1 text-sm text-white/80 hover:text-white">
          <ArrowLeft size={16} /> Relógio de ponto
        </Link>
      </header>

      {autenticado ? <Painel /> : <Login aoEntrar={() => setAutenticado(true)} />}
    </div>
  );
};

const Login: React.FC<{ aoEntrar: () => void }> = ({ aoEntrar }) => {
  const [pin, setPin] = useState('');
  const [erro, setErro] = useState('');

  function entrar(e: React.FormEvent) {
    e.preventDefault();
    if (pin === obterPinAdmin()) {
      aoEntrar();
    } else {
      setErro('PIN incorreto.');
      setPin('');
    }
  }

  return (
    <main className="flex items-center justify-center px-4 py-16">
      <form onSubmit={entrar} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <KeyRound size={40} className="mx-auto text-montessori-green mb-3" />
        <h1 className="font-serif text-2xl mb-1">Área restrita</h1>
        <p className="text-sm text-montessori-stone mb-6">Digite o PIN do administrador.</p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => { setPin(e.target.value); setErro(''); }}
          className="w-full border-2 border-montessori-stone/30 rounded-lg px-4 py-3 text-center text-2xl tracking-[0.5em] focus:border-montessori-green outline-none"
          maxLength={8}
        />
        {erro && <p className="text-red-600 mt-3">{erro}</p>}
        {obterPinAdmin() === PIN_ADMIN_PADRAO && (
          <p className="text-xs text-montessori-stone mt-3">
            Primeiro acesso: o PIN padrão é <span className="font-bold">1234</span>. Troque-o em Configurações.
          </p>
        )}
        <button className="mt-5 w-full bg-montessori-green text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors">
          Entrar
        </button>
      </form>
    </main>
  );
};

const Painel: React.FC = () => {
  const [aba, setAba] = useState<Aba>('registros');
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(listarFuncionarios);
  const [registros, setRegistros] = useState<RegistroPonto[]>(listarRegistros);

  function atualizarFuncionarios(novos: Funcionario[]) {
    setFuncionarios(novos);
    salvarFuncionarios(novos);
  }

  function atualizarRegistros(novos: RegistroPonto[]) {
    setRegistros(novos);
    salvarRegistros(novos);
  }

  const abas: { id: Aba; rotulo: string; icone: React.ReactNode }[] = [
    { id: 'registros', rotulo: 'Registros', icone: <CalendarDays size={18} /> },
    { id: 'funcionarios', rotulo: 'Funcionários', icone: <Users size={18} /> },
    { id: 'config', rotulo: 'Configurações', icone: <KeyRound size={18} /> },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <nav className="flex gap-2 mb-6 flex-wrap">
        {abas.map((a) => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-colors ${
              aba === a.id
                ? 'bg-montessori-green text-white'
                : 'bg-white text-montessori-dark hover:bg-white/70'
            }`}
          >
            {a.icone} {a.rotulo}
          </button>
        ))}
      </nav>

      {aba === 'funcionarios' && (
        <AbaFuncionarios funcionarios={funcionarios} onChange={atualizarFuncionarios} />
      )}
      {aba === 'registros' && (
        <AbaRegistros
          funcionarios={funcionarios}
          registros={registros}
          onChange={atualizarRegistros}
        />
      )}
      {aba === 'config' && <AbaConfig />}
    </main>
  );
};

// ---------- Funcionários ----------

const AbaFuncionarios: React.FC<{
  funcionarios: Funcionario[];
  onChange: (f: Funcionario[]) => void;
}> = ({ funcionarios, onChange }) => {
  const [editando, setEditando] = useState<Funcionario | null>(null);
  const [criando, setCriando] = useState(false);

  const ativos = funcionarios.filter((f) => f.ativo).length;

  function salvar(dados: { nome: string; cargo: string; pin: string }, existente?: Funcionario) {
    const pinEmUso = funcionarios.some(
      (f) => f.ativo && f.pin === dados.pin && f.id !== existente?.id
    );
    if (pinEmUso) return 'Este PIN já está em uso por outro funcionário.';

    if (existente) {
      onChange(funcionarios.map((f) => (f.id === existente.id ? { ...f, ...dados } : f)));
      setEditando(null);
    } else {
      if (ativos >= LIMITE_FUNCIONARIOS) return `Limite de ${LIMITE_FUNCIONARIOS} funcionários ativos atingido.`;
      onChange([
        ...funcionarios,
        { id: gerarId(), ativo: true, criadoEm: new Date().toISOString(), ...dados },
      ]);
      setCriando(false);
    }
    return '';
  }

  function alternarAtivo(f: Funcionario) {
    if (!f.ativo && ativos >= LIMITE_FUNCIONARIOS) {
      alert(`Limite de ${LIMITE_FUNCIONARIOS} funcionários ativos atingido.`);
      return;
    }
    onChange(funcionarios.map((x) => (x.id === f.id ? { ...x, ativo: !x.ativo } : x)));
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className="text-montessori-stone">
          {ativos} de {LIMITE_FUNCIONARIOS} funcionários ativos
        </p>
        <button
          onClick={() => setCriando(true)}
          disabled={ativos >= LIMITE_FUNCIONARIOS}
          className="flex items-center gap-2 bg-montessori-green text-white font-bold px-4 py-2 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-40"
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
          <p className="p-6 text-montessori-stone">
            Nenhum funcionário cadastrado. Clique em “Novo funcionário” para começar.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-montessori-cream text-sm uppercase tracking-wide text-montessori-stone">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Cargo</th>
                  <th className="px-4 py-3">PIN</th>
                  <th className="px-4 py-3">Situação</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((f) => (
                  <tr key={f.id} className="border-t border-montessori-cream">
                    <td className="px-4 py-3 font-bold">{f.nome}</td>
                    <td className="px-4 py-3">{f.cargo || '—'}</td>
                    <td className="px-4 py-3 tabular-nums">{f.pin}</td>
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
                        className="text-montessori-green hover:text-blue-800 p-1"
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
  onSalvar: (dados: { nome: string; cargo: string; pin: string }) => string;
  onCancelar: () => void;
}> = ({ inicial, onSalvar, onCancelar }) => {
  const [nome, setNome] = useState(inicial?.nome ?? '');
  const [cargo, setCargo] = useState(inicial?.cargo ?? '');
  const [pin, setPin] = useState(inicial?.pin ?? '');
  const [erro, setErro] = useState('');

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return setErro('Informe o nome.');
    if (!/^\d{4}$/.test(pin)) return setErro('O PIN deve ter exatamente 4 números.');
    const msg = onSalvar({ nome: nome.trim(), cargo: cargo.trim(), pin });
    if (msg) setErro(msg);
  }

  return (
    <form onSubmit={enviar} className="bg-white rounded-2xl shadow p-4 mb-4 grid gap-3 sm:grid-cols-4">
      <input
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border-2 border-montessori-stone/30 rounded-lg px-3 py-2 focus:border-montessori-green outline-none sm:col-span-2"
        autoFocus
      />
      <input
        placeholder="Cargo (opcional)"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
        className="border-2 border-montessori-stone/30 rounded-lg px-3 py-2 focus:border-montessori-green outline-none"
      />
      <input
        placeholder="PIN (4 números)"
        value={pin}
        inputMode="numeric"
        maxLength={4}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        className="border-2 border-montessori-stone/30 rounded-lg px-3 py-2 focus:border-montessori-green outline-none tabular-nums"
      />
      {erro && <p className="text-red-600 sm:col-span-4">{erro}</p>}
      <div className="flex gap-2 sm:col-span-4">
        <button className="bg-montessori-green text-white font-bold px-5 py-2 rounded-full hover:bg-blue-800 transition-colors">
          {inicial ? 'Salvar alterações' : 'Cadastrar'}
        </button>
        <button type="button" onClick={onCancelar} className="text-montessori-stone hover:text-montessori-dark px-3">
          Cancelar
        </button>
      </div>
    </form>
  );
};

// ---------- Registros ----------

const AbaRegistros: React.FC<{
  funcionarios: Funcionario[];
  registros: RegistroPonto[];
  onChange: (r: RegistroPonto[]) => void;
}> = ({ funcionarios, registros, onChange }) => {
  const mesAtual = chaveMes(new Date().toISOString());
  const [mes, setMes] = useState(mesAtual);
  const [funcionarioId, setFuncionarioId] = useState('todos');
  const [adicionando, setAdicionando] = useState(false);

  const nomePorId = useMemo(
    () => new Map<string, string>(funcionarios.map((f) => [f.id, f.nome])),
    [funcionarios]
  );

  const selecionados = useMemo(
    () =>
      registros
        .filter((r) => chaveMes(r.timestamp) === mes)
        .filter((r) => funcionarioId === 'todos' || r.funcionarioId === funcionarioId)
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
    [registros, mes, funcionarioId]
  );

  // Agrupa por dia para exibição e totais
  const porDia = useMemo(() => {
    const mapa = new Map<string, RegistroPonto[]>();
    for (const r of selecionados) {
      const dia = chaveDia(r.timestamp);
      if (!mapa.has(dia)) mapa.set(dia, []);
      mapa.get(dia)!.push(r);
    }
    return [...mapa.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [selecionados]);

  function excluir(id: string) {
    if (!confirm('Excluir este registro de ponto?')) return;
    onChange(registros.filter((r) => r.id !== id));
  }

  function adicionarManual(dados: { funcionarioId: string; dataHora: string }) {
    const novo: RegistroPonto = {
      id: gerarId(),
      funcionarioId: dados.funcionarioId,
      timestamp: new Date(dados.dataHora).toISOString(),
      manual: true,
    };
    onChange([...registros, novo]);
    setAdicionando(false);
  }

  function exportarCsv() {
    const linhas: string[] = ['Funcionário;Data;Batidas;Total trabalhado'];
    const alvo = funcionarios.filter((f) => funcionarioId === 'todos' || f.id === funcionarioId);
    for (const f of alvo) {
      const dias = new Set<string>(
        registros
          .filter((r) => r.funcionarioId === f.id && chaveMes(r.timestamp) === mes)
          .map((r) => chaveDia(r.timestamp))
      );
      for (const dia of [...dias].sort()) {
        const batidas = registrosDoDia(registros, f.id, dia);
        const horarios = batidas.map((b) => formatarHora(b.timestamp)).join(' ');
        linhas.push(`${f.nome};${dia};${horarios};${formatarMinutos(minutosTrabalhados(batidas))}`);
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

  // Total do mês por funcionário (para o resumo)
  const resumoMensal = useMemo(() => {
    return funcionarios
      .filter((f) => funcionarioId === 'todos' || f.id === funcionarioId)
      .map((f) => {
        const dias = new Set<string>(
          registros
            .filter((r) => r.funcionarioId === f.id && chaveMes(r.timestamp) === mes)
            .map((r) => chaveDia(r.timestamp))
        );
        let total = 0;
        for (const dia of dias) total += minutosTrabalhados(registrosDoDia(registros, f.id, dia));
        return { funcionario: f, dias: dias.size, total };
      })
      .filter((x) => x.dias > 0)
      .sort((a, b) => a.funcionario.nome.localeCompare(b.funcionario.nome));
  }, [funcionarios, registros, mes, funcionarioId]);

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="month"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="border-2 border-montessori-stone/30 rounded-lg px-3 py-2 bg-white focus:border-montessori-green outline-none"
        />
        <select
          value={funcionarioId}
          onChange={(e) => setFuncionarioId(e.target.value)}
          className="border-2 border-montessori-stone/30 rounded-lg px-3 py-2 bg-white focus:border-montessori-green outline-none"
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
          className="flex items-center gap-2 bg-montessori-green text-white font-bold px-4 py-2 rounded-full hover:bg-blue-800 transition-colors ml-auto"
        >
          <Download size={18} /> Exportar CSV
        </button>
      </div>

      {adicionando && (
        <FormBatidaManual
          funcionarios={funcionarios}
          onSalvar={adicionarManual}
          onCancelar={() => setAdicionando(false)}
        />
      )}

      {resumoMensal.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
          <h2 className="font-bold uppercase tracking-wide text-sm text-montessori-stone mb-2">
            Resumo do mês
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-montessori-stone">
                <tr>
                  <th className="py-1 pr-4">Funcionário</th>
                  <th className="py-1 pr-4">Dias com registro</th>
                  <th className="py-1">Total trabalhado</th>
                </tr>
              </thead>
              <tbody>
                {resumoMensal.map(({ funcionario, dias, total }) => (
                  <tr key={funcionario.id} className="border-t border-montessori-cream">
                    <td className="py-2 pr-4 font-bold">{funcionario.nome}</td>
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
        <p className="text-montessori-stone bg-white rounded-2xl shadow p-6">
          Nenhum registro neste período.
        </p>
      ) : (
        porDia.map(([dia, doDia]) => (
          <div key={dia} className="bg-white rounded-2xl shadow p-4 mb-3">
            <h3 className="font-bold capitalize mb-2">{formatarData(dia)}</h3>
            <ul className="divide-y divide-montessori-cream">
              {doDia
                .slice()
                .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
                .map((r) => {
                  const doFuncionarioNoDia = registrosDoDia(registros, r.funcionarioId, dia);
                  const indice = doFuncionarioNoDia.findIndex((x) => x.id === r.id);
                  return (
                    <li key={r.id} className="flex items-center gap-3 py-2 text-sm">
                      <span className="tabular-nums font-bold w-14">{formatarHora(r.timestamp)}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          indice % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rotuloBatida(indice)}
                      </span>
                      <span className="flex-grow">
                        {nomePorId.get(r.funcionarioId) ?? 'Funcionário removido'}
                        {r.manual && <span className="text-montessori-stone"> · manual</span>}
                      </span>
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
    </section>
  );
};

const FormBatidaManual: React.FC<{
  funcionarios: Funcionario[];
  onSalvar: (dados: { funcionarioId: string; dataHora: string }) => void;
  onCancelar: () => void;
}> = ({ funcionarios, onSalvar, onCancelar }) => {
  const [funcionarioId, setFuncionarioId] = useState(funcionarios[0]?.id ?? '');
  const [dataHora, setDataHora] = useState('');
  const [erro, setErro] = useState('');

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!funcionarioId) return setErro('Selecione um funcionário.');
    if (!dataHora) return setErro('Informe data e hora.');
    onSalvar({ funcionarioId, dataHora });
  }

  return (
    <form onSubmit={enviar} className="bg-white rounded-2xl shadow p-4 mb-4 flex flex-wrap items-center gap-3">
      <select
        value={funcionarioId}
        onChange={(e) => setFuncionarioId(e.target.value)}
        className="border-2 border-montessori-stone/30 rounded-lg px-3 py-2 focus:border-montessori-green outline-none"
      >
        {funcionarios.map((f) => (
          <option key={f.id} value={f.id}>{f.nome}</option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={dataHora}
        onChange={(e) => setDataHora(e.target.value)}
        className="border-2 border-montessori-stone/30 rounded-lg px-3 py-2 focus:border-montessori-green outline-none"
      />
      <button className="bg-montessori-green text-white font-bold px-5 py-2 rounded-full hover:bg-blue-800 transition-colors">
        Lançar
      </button>
      <button type="button" onClick={onCancelar} className="text-montessori-stone hover:text-montessori-dark px-2">
        Cancelar
      </button>
      {erro && <p className="text-red-600 w-full">{erro}</p>}
    </form>
  );
};

// ---------- Configurações ----------

const AbaConfig: React.FC = () => {
  const [pinAtual, setPinAtual] = useState('');
  const [novoPin, setNovoPin] = useState('');
  const [mensagem, setMensagem] = useState<{ tipo: 'ok' | 'erro'; texto: string } | null>(null);

  function trocarPin(e: React.FormEvent) {
    e.preventDefault();
    if (pinAtual !== obterPinAdmin()) {
      return setMensagem({ tipo: 'erro', texto: 'PIN atual incorreto.' });
    }
    if (!/^\d{4,8}$/.test(novoPin)) {
      return setMensagem({ tipo: 'erro', texto: 'O novo PIN deve ter de 4 a 8 números.' });
    }
    definirPinAdmin(novoPin);
    setPinAtual('');
    setNovoPin('');
    setMensagem({ tipo: 'ok', texto: 'PIN do administrador atualizado.' });
  }

  return (
    <section className="max-w-md">
      <form onSubmit={trocarPin} className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="font-serif text-xl">Trocar PIN do administrador</h2>
        <input
          type="password"
          inputMode="numeric"
          placeholder="PIN atual"
          value={pinAtual}
          onChange={(e) => setPinAtual(e.target.value)}
          className="w-full border-2 border-montessori-stone/30 rounded-lg px-3 py-2 focus:border-montessori-green outline-none"
        />
        <input
          type="password"
          inputMode="numeric"
          placeholder="Novo PIN (4 a 8 números)"
          value={novoPin}
          onChange={(e) => setNovoPin(e.target.value.replace(/\D/g, ''))}
          maxLength={8}
          className="w-full border-2 border-montessori-stone/30 rounded-lg px-3 py-2 focus:border-montessori-green outline-none"
        />
        {mensagem && (
          <p className={mensagem.tipo === 'ok' ? 'text-green-700' : 'text-red-600'}>{mensagem.texto}</p>
        )}
        <button className="w-full bg-montessori-green text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors">
          Salvar novo PIN
        </button>
      </form>

      <div className="bg-white rounded-2xl shadow p-6 mt-4 text-sm text-montessori-stone space-y-2">
        <h2 className="font-serif text-xl text-montessori-dark">Como funciona</h2>
        <p>
          Os dados (funcionários e registros) ficam salvos <strong>neste dispositivo</strong>. Use
          sempre o mesmo tablet ou computador na recepção para registrar os pontos.
        </p>
        <p>
          Exporte o CSV mensalmente como cópia de segurança — ele abre direto no Excel ou no Google
          Planilhas.
        </p>
      </div>
    </section>
  );
};
