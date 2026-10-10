import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronUp, HelpCircle, Loader2, Undo2, UserX } from 'lucide-react';
import { rpc } from './api';

// ---------- Rostos (conferência do reconhecimento pelas câmeras) ----------
// O PC de casa acha os rostos nas câmeras Entrada e HALL e agrupa os parecidos
// (OpenCV local; a biometria não sobe). Aqui o Claudio diz quem é cada grupo.
// O nome confirmado vira referência para as próximas rodadas.

interface Passagem { id: string; camera: string; ts: string; dia: string; excluida: boolean }
interface Grupo {
  id: string;
  status: 'pendente' | 'confirmado' | 'nao_equipe' | 'incerto';
  funcionario_id: string | null;
  sugestao_funcionario_id: string | null;
  similaridade: number | null;
  capa: string | null;
  amostras: string[];
  comentario: string | null;
  passagens: Passagem[];
}
interface Pessoa { id: string; nome: string; cargo: string | null }
interface Batida { funcionario_id: string; dia: string; hora: string }
interface RespostaRostos {
  ok: boolean;
  erro?: string;
  funcionarios: Pessoa[];
  grupos: Grupo[];
  batidas: Batida[];
}

type Filtro = 'pendente' | 'decididos' | 'todos';
type Visao = 'grupos' | 'dias';

const img = (b64: string | null) => (b64 ? `data:image/jpeg;base64,${b64}` : '');
const hora = (ts: string) => ts.slice(11, 16);
const diaCurto = (d: string) => {
  const [a, m, dd] = d.split('-').map(Number);
  const sem = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'][new Date(a, m - 1, dd).getDay()];
  return `${sem} ${String(dd).padStart(2, '0')}/${String(m).padStart(2, '0')}`;
};
const primeiroNome = (n: string) => n.split(' ')[0];

export const AbaRostos: React.FC<{ pinAdmin: string }> = ({ pinAdmin }) => {
  const [dados, setDados] = useState<RespostaRostos | null>(null);
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('pendente');
  const [visao, setVisao] = useState<Visao>('grupos');
  // 'a…' = recepção/HALL em alta resolução (desde 09/10); 'g…' = Entrada em baixa (rodada de 08/10)
  const [fonte, setFonte] = useState<'alta' | 'antigo'>('alta');

  const carregar = useCallback(async () => {
    setErro('');
    try {
      const r = await rpc<RespostaRostos>('admin_rostos_lista', { p_pin_admin: pinAdmin });
      if (!r.ok) return setErro(r.erro ?? 'Erro ao carregar.');
      setDados(r);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    }
  }, [pinAdmin]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const nomes = useMemo(() => {
    const m = new Map<string, string>();
    dados?.funcionarios.forEach((f) => m.set(f.id, f.nome));
    return m;
  }, [dados]);

  // decide sem recarregar a lista inteira (o cartão muda na hora)
  async function decidir(g: Grupo, status: Grupo['status'], funcionarioId: string | null) {
    const r = await rpc<{ ok: boolean; erro?: string }>('admin_rostos_decidir', {
      p_pin_admin: pinAdmin,
      p_grupo: g.id,
      p_status: status,
      p_funcionario_id: funcionarioId,
    });
    if (!r.ok) return alert(r.erro ?? 'Não deu para salvar.');
    setDados((d) =>
      d && {
        ...d,
        grupos: d.grupos.map((x) =>
          x.id === g.id ? { ...x, status, funcionario_id: status === 'confirmado' ? funcionarioId : null } : x
        ),
      }
    );
  }

  async function excluirPassagem(g: Grupo, p: Passagem) {
    const r = await rpc<{ ok: boolean }>('admin_rostos_excluir_passagem', {
      p_pin_admin: pinAdmin,
      p_passagem: p.id,
      p_excluida: !p.excluida,
    });
    if (!r.ok) return;
    setDados((d) =>
      d && {
        ...d,
        grupos: d.grupos.map((x) =>
          x.id === g.id
            ? { ...x, passagens: x.passagens.map((y) => (y.id === p.id ? { ...y, excluida: !y.excluida } : y)) }
            : x
        ),
      }
    );
  }

  if (erro) return <p className="text-red-600 bg-white rounded-2xl shadow p-6">{erro}</p>;
  if (!dados)
    return (
      <div className="flex justify-center py-12">
        <Loader2 size={36} className="animate-spin text-ponto-azul" aria-label="Carregando" />
      </div>
    );

  const daFonte = dados.grupos.filter((g) => (fonte === 'alta') === g.id.startsWith('a'));
  const pendentes = daFonte.filter((g) => g.status === 'pendente').length;
  const lista = daFonte.filter((g) =>
    filtro === 'todos' ? true : filtro === 'pendente' ? g.status === 'pendente' : g.status !== 'pendente'
  );

  return (
    <section>
      <p className="text-ponto-cinza mb-3 text-sm">
        Rostos achados nas câmeras <strong>recepção</strong> e <strong>HALL</strong> em alta resolução (manhã e fim de
        tarde).
        Cada cartão junta as passagens que parecem ser da mesma pessoa. Diga quem é: o nome confirmado passa a
        ensinar o reconhecimento. A sugestão vem só de quem tem foto na ficha ou de grupos já confirmados.
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(
          [
            ['grupos', 'Quem é quem'],
            ['dias', 'Por dia × ponto'],
          ] as [Visao, string][]
        ).map(([v, r]) => (
          <button
            key={v}
            onClick={() => setVisao(v)}
            className={`px-3 py-1.5 rounded-full text-sm font-bold ${
              visao === v ? 'bg-ponto-escuro text-white' : 'bg-white text-ponto-escuro'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {visao === 'dias' ? (
        <VisaoDias dados={dados} nomes={nomes} />
      ) : (
        <>
          <div className="flex gap-2 mb-2 flex-wrap text-xs">
            {(
              [
                ['alta', 'Recepção e HALL (alta resolução)'],
                ['antigo', 'Entrada, 05–07/10 (baixa, rodada antiga)'],
              ] as ['alta' | 'antigo', string][]
            ).map(([f, r]) => (
              <button
                key={f}
                onClick={() => setFonte(f)}
                className={`px-3 py-1 rounded-full font-bold ${
                  fonte === f ? 'bg-ponto-escuro text-white' : 'bg-white text-ponto-cinza'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-4 flex-wrap text-sm">
            {(
              [
                ['pendente', `Para conferir (${pendentes})`],
                ['decididos', 'Já decididos'],
                ['todos', 'Todos'],
              ] as [Filtro, string][]
            ).map(([f, r]) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-3 py-1 rounded-full font-bold ${
                  filtro === f ? 'bg-ponto-azul text-white' : 'bg-white text-ponto-escuro'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          {lista.length === 0 && (
            <p className="bg-white rounded-2xl shadow p-6 text-ponto-cinza">
              {dados.grupos.length ? 'Nada aqui.' : 'Ainda não subiu nenhum rosto. Os vídeos estão sendo processados.'}
            </p>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {lista.map((g) => (
              <CartaoGrupo
                key={g.id}
                g={g}
                pinAdmin={pinAdmin}
                pessoas={dados.funcionarios}
                nomes={nomes}
                aoDecidir={decidir}
                aoExcluir={excluirPassagem}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

const CartaoGrupo: React.FC<{
  g: Grupo;
  pinAdmin: string;
  pessoas: Pessoa[];
  nomes: Map<string, string>;
  aoDecidir: (g: Grupo, s: Grupo['status'], f: string | null) => Promise<void>;
  aoExcluir: (g: Grupo, p: Passagem) => Promise<void>;
}> = ({ g, pinAdmin, pessoas, nomes, aoDecidir, aoExcluir }) => {
  const [escolha, setEscolha] = useState('');
  const [aberto, setAberto] = useState(false);
  const [fotos, setFotos] = useState<Record<string, string> | null>(null);
  const [salvando, setSalvando] = useState(false);

  const sugestao = g.sugestao_funcionario_id ? nomes.get(g.sugestao_funcionario_id) : undefined;
  const dias = useMemo(() => {
    const m = new Map<string, Passagem[]>();
    g.passagens.forEach((p) => m.set(p.dia, [...(m.get(p.dia) ?? []), p]));
    return [...m.entries()];
  }, [g.passagens]);

  async function abrir() {
    setAberto(!aberto);
    if (!fotos) {
      const r = await rpc<{ ok: boolean; fotos: Record<string, string> }>('admin_rostos_fotos', {
        p_pin_admin: pinAdmin,
        p_grupo: g.id,
      });
      if (r.ok) setFotos(r.fotos);
    }
  }

  async function d(status: Grupo['status'], f: string | null) {
    setSalvando(true);
    await aoDecidir(g, status, f);
    setSalvando(false);
  }

  const faixa =
    g.status === 'confirmado'
      ? 'border-green-500'
      : g.status === 'nao_equipe'
        ? 'border-ponto-cinza'
        : g.status === 'incerto'
          ? 'border-amber-400'
          : 'border-ponto-azul';

  return (
    <article className={`bg-white rounded-2xl shadow p-4 border-l-4 ${faixa}`}>
      <div className="flex gap-3">
        {g.capa && <img src={img(g.capa)} alt="" className="w-24 h-24 rounded-xl object-cover bg-ponto-claro" />}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1">
            {g.amostras.slice(0, 6).map((a, i) => (
              <img key={i} src={img(a)} alt="" className="w-11 h-11 rounded-lg object-cover bg-ponto-claro" />
            ))}
          </div>
          <p className="text-xs text-ponto-cinza mt-2">
            {g.passagens.length} passage{g.passagens.length === 1 ? 'm' : 'ns'} · {dias.length} dia
            {dias.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      <ul className="text-sm mt-3 space-y-0.5">
        {dias.map(([dia, ps]) => (
          <li key={dia} className="tabular-nums">
            <span className="font-bold">{diaCurto(dia)}</span>{' '}
            <span className="text-ponto-cinza">
              {ps
                .filter((p) => !p.excluida)
                .map((p) => `${hora(p.ts)}${p.camera === 'HALL' ? 'ʰ' : ''}`)
                .join(' · ')}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-ponto-cinza">ʰ = câmera do HALL</p>

      <div className="mt-3">
        {g.status === 'pendente' ? (
          <>
            {sugestao && (
              <button
                disabled={salvando}
                onClick={() => d('confirmado', g.sugestao_funcionario_id)}
                className="w-full mb-2 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-green-600 text-white font-bold"
              >
                <Check size={18} /> É {primeiroNome(sugestao)}
                {g.similaridade != null && (
                  <span className="font-normal text-xs opacity-80">
                    (parecença {Math.round(g.similaridade * 100)}%)
                  </span>
                )}
              </button>
            )}
            <div className="flex gap-2">
              <select
                value={escolha}
                onChange={(e) => setEscolha(e.target.value)}
                className="flex-1 min-w-0 rounded-xl border border-ponto-claro px-2 py-2 text-sm"
              >
                <option value="">{sugestao ? 'Outra pessoa…' : 'Quem é?'}</option>
                {pessoas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
              <button
                disabled={!escolha || salvando}
                onClick={() => d('confirmado', escolha)}
                className="px-3 py-2 rounded-xl bg-ponto-azul text-white font-bold disabled:opacity-40"
              >
                Confirmar
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                disabled={salvando}
                onClick={() => d('nao_equipe', null)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-ponto-claro text-ponto-escuro text-sm font-bold"
              >
                <UserX size={16} /> Não é da equipe
              </button>
              <button
                disabled={salvando}
                onClick={() => d('incerto', null)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-amber-100 text-amber-900 text-sm font-bold"
              >
                <HelpCircle size={16} /> Não dá para saber
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <p className="font-bold">
              {g.status === 'confirmado'
                ? `✓ ${g.funcionario_id ? nomes.get(g.funcionario_id) ?? '—' : '—'}`
                : g.status === 'nao_equipe'
                  ? 'Não é da equipe'
                  : 'Não dá para saber'}
            </p>
            <button
              disabled={salvando}
              onClick={() => d('pendente', null)}
              className="flex items-center gap-1 text-sm text-ponto-azul font-bold"
            >
              <Undo2 size={16} /> Desfazer
            </button>
          </div>
        )}
      </div>

      <button onClick={abrir} className="mt-3 flex items-center gap-1 text-sm text-ponto-azul font-bold">
        {aberto ? <ChevronUp size={16} /> : <ChevronDown size={16} />} Ver cada passagem
      </button>
      {aberto && (
        <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
          {g.passagens.map((p) => (
            <button
              key={p.id}
              onClick={() => aoExcluir(g, p)}
              title={p.excluida ? 'Voltar para o grupo' : 'Não é esta pessoa: tirar do grupo'}
              className={`text-left rounded-xl overflow-hidden border ${
                p.excluida ? 'opacity-40 border-red-300' : 'border-ponto-claro'
              }`}
            >
              {fotos?.[p.id] ? (
                <img src={img(fotos[p.id])} alt="" className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-ponto-claro" />
              )}
              <p className="text-[11px] px-1 py-0.5 tabular-nums">
                {diaCurto(p.dia)} {hora(p.ts)} {p.camera === 'HALL' ? 'ʰ' : ''}
                {p.excluida && <span className="text-red-600"> · fora</span>}
              </p>
            </button>
          ))}
          <p className="col-span-full text-[11px] text-ponto-cinza">
            Toque numa foto que não é desta pessoa para tirá-la do grupo.
          </p>
        </div>
      )}
    </article>
  );
};

// Para cada dia: quando a câmera viu cada pessoa confirmada × as batidas do ponto.
const VisaoDias: React.FC<{ dados: RespostaRostos; nomes: Map<string, string> }> = ({ dados, nomes }) => {
  const linhas = useMemo(() => {
    const vistos = new Map<string, Map<string, string[]>>(); // dia -> funcionario -> horas
    dados.grupos
      .filter((g) => g.status === 'confirmado' && g.funcionario_id)
      .forEach((g) =>
        g.passagens
          .filter((p) => !p.excluida)
          .forEach((p) => {
            const porDia = vistos.get(p.dia) ?? new Map<string, string[]>();
            porDia.set(g.funcionario_id!, [...(porDia.get(g.funcionario_id!) ?? []), hora(p.ts)]);
            vistos.set(p.dia, porDia);
          })
      );
    return [...vistos.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [dados]);

  if (!linhas.length)
    return (
      <p className="bg-white rounded-2xl shadow p-6 text-ponto-cinza">
        Assim que você confirmar quem é quem, aqui aparece, por dia, quando a câmera viu cada pessoa ao lado das
        batidas do ponto.
      </p>
    );

  return (
    <div className="space-y-4">
      {linhas.map(([dia, porFunc]) => (
        <div key={dia} className="bg-white rounded-2xl shadow overflow-hidden">
          <p className="px-4 py-2 bg-ponto-claro font-bold">{diaCurto(dia)}</p>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-ponto-cinza">
              <tr>
                <th className="px-4 py-2 text-left">Pessoa</th>
                <th className="px-4 py-2 text-left">Câmera viu</th>
                <th className="px-4 py-2 text-left">Ponto</th>
              </tr>
            </thead>
            <tbody>
              {[...porFunc.entries()]
                .sort((a, b) => (nomes.get(a[0]) ?? '').localeCompare(nomes.get(b[0]) ?? ''))
                .map(([fid, horas]) => {
                  const hs = [...horas].sort();
                  const bat = dados.batidas.filter((b) => b.funcionario_id === fid && b.dia === dia).map((b) => b.hora);
                  return (
                    <tr key={fid} className="border-t border-ponto-claro align-top">
                      <td className="px-4 py-2 font-bold">{nomes.get(fid) ?? '—'}</td>
                      <td className="px-4 py-2 tabular-nums">
                        {hs[0]}
                        {hs.length > 1 && ` … ${hs[hs.length - 1]}`}
                        <span className="text-xs text-ponto-cinza"> ({hs.length}×)</span>
                      </td>
                      <td className="px-4 py-2 tabular-nums">
                        {bat.length ? bat.join(' → ') : <span className="text-red-700">sem batida</span>}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
