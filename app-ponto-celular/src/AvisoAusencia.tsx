import React, { useState } from 'react';
import { CalendarOff, Clock3, Loader2, X } from 'lucide-react';
import { AvisoAusencia as Aviso } from './types';
import { idDispositivo, rpc } from './api';
import { formatarData } from './utils';

interface Resposta {
  ok: boolean;
  erro?: string;
  ausencias?: Aviso[];
}

type Tipo = 'falta' | 'atraso';

function hojeLocal(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${`${d.getDate()}`.padStart(2, '0')}`;
}

function periodo(a: Aviso): string {
  if (a.dia === a.dia_ate) return formatarData(a.dia);
  return `${formatarData(a.dia)} a ${formatarData(a.dia_ate)}`;
}

/**
 * "Vou faltar" / "Vou me atrasar": a pessoa avisa pelo proprio app, antes.
 * O aviso nao e abono — o desconto do fechamento continua valendo e quem decide
 * e a direcao. O que muda e que quem avisou nao fica como falta "sem explicacao",
 * o robo nao cobra e a direcao fica sabendo na hora.
 */
export const AvisoAusencia: React.FC<{
  pin: string;
  horaEntrada?: string | null;
  avisos: Aviso[];
  aoMudar: (avisos: Aviso[]) => void;
}> = ({ pin, horaEntrada, avisos, aoMudar }) => {
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [dia, setDia] = useState(hojeLocal());
  const [diaAte, setDiaAte] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [ok, setOk] = useState('');

  function abrir(t: Tipo) {
    setTipo(t);
    setErro('');
    setOk('');
    setDia(hojeLocal());
    setDiaAte('');
    setHora('');
    setMotivo('');
  }

  function fechar() {
    setTipo(null);
    setErro('');
  }

  async function enviar() {
    if (!tipo) return;
    setEnviando(true);
    setErro('');
    try {
      const r = await rpc<Resposta>('ponto_avisar_ausencia', {
        p_pin: pin,
        p_tipo: tipo,
        p_dia: dia || null,
        p_dia_ate: tipo === 'falta' && diaAte ? diaAte : null,
        p_hora_prevista: tipo === 'atraso' ? hora || null : null,
        p_motivo: motivo.trim(),
        p_dispositivo: idDispositivo(),
      });
      if (!r.ok) {
        setErro(r.erro ?? 'Não foi possível avisar.');
        return;
      }
      aoMudar(r.ausencias ?? []);
      setTipo(null);
      setOk(
        tipo === 'falta'
          ? 'Aviso de falta registrado. A direção já fica sabendo.'
          : `Aviso de atraso registrado: a direção sabe que você chega às ${hora}.`
      );
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setEnviando(false);
    }
  }

  async function cancelar(id: string) {
    setErro('');
    setOk('');
    try {
      const r = await rpc<Resposta>('ponto_cancelar_aviso', { p_pin: pin, p_id: id });
      if (!r.ok) setErro(r.erro ?? 'Não foi possível cancelar.');
      else aoMudar(r.ausencias ?? []);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    }
  }

  const campo =
    'mt-1 block w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 bg-white outline-none focus:border-ponto-azul';

  return (
    <div className="mt-4 text-left">
      {!tipo && (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => abrir('falta')}
            className="flex items-center justify-center gap-1.5 border-2 border-ponto-cinza/30 rounded-xl py-2.5 text-sm font-bold text-ponto-escuro hover:bg-white"
          >
            <CalendarOff size={16} className="text-red-700" /> Vou faltar
          </button>
          <button
            onClick={() => abrir('atraso')}
            className="flex items-center justify-center gap-1.5 border-2 border-ponto-cinza/30 rounded-xl py-2.5 text-sm font-bold text-ponto-escuro hover:bg-white"
          >
            <Clock3 size={16} className="text-amber-700" /> Vou me atrasar
          </button>
        </div>
      )}

      {ok && !tipo && <p className="text-green-700 text-sm mt-2 text-center">{ok}</p>}
      {erro && !tipo && <p className="text-red-600 text-sm mt-2 text-center">{erro}</p>}

      {tipo && (
        <div className="border border-ponto-azul/40 bg-blue-50 rounded-xl p-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-sm font-bold text-ponto-escuro">
              {tipo === 'falta' ? 'Avisar falta' : 'Avisar atraso'}
            </p>
            <button onClick={fechar} aria-label="Fechar" className="text-ponto-cinza hover:text-ponto-escuro">
              <X size={18} />
            </button>
          </div>

          {tipo === 'falta' ? (
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-sm text-ponto-cinza">
                De
                <input type="date" value={dia} min={hojeLocal()} onChange={(e) => setDia(e.target.value)} className={campo} />
              </label>
              <label className="block text-sm text-ponto-cinza">
                Até <span className="text-xs">(se for mais de um dia)</span>
                <input type="date" value={diaAte} min={dia} onChange={(e) => setDiaAte(e.target.value)} className={campo} />
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-sm text-ponto-cinza">
                Dia
                <input type="date" value={dia} min={hojeLocal()} onChange={(e) => setDia(e.target.value)} className={campo} />
              </label>
              <label className="block text-sm text-ponto-cinza">
                Chego às{horaEntrada ? <span className="text-xs"> (entrada {horaEntrada})</span> : null}
                <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className={campo} />
              </label>
            </div>
          )}

          <label className="block text-sm text-ponto-cinza mt-2">
            Motivo
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              maxLength={500}
              placeholder={tipo === 'falta' ? 'Ex.: consulta médica marcada; atestado vai por WhatsApp.' : 'Ex.: ônibus quebrou na Lapa.'}
              className={`${campo} text-sm min-h-[64px]`}
            />
          </label>

          {erro && <p className="text-red-600 text-sm mt-2">{erro}</p>}

          <button
            onClick={enviar}
            disabled={enviando || motivo.trim().length < 3 || (tipo === 'atraso' && !hora)}
            className="mt-3 w-full bg-ponto-azul text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {enviando ? <><Loader2 size={18} className="animate-spin" /> Enviando…</> : 'Enviar aviso à direção'}
          </button>
          <p className="text-xs text-ponto-cinza mt-2">
            O aviso não substitui o ponto nem abona o dia: o desconto segue a regra do contrato, e
            quem decide se abona é a direção. Mas quem não bate <b>e não avisa</b> fica como falta
            ou atraso sem explicação.
          </p>
        </div>
      )}

      {avisos.length > 0 && (
        <div className="mt-3 border border-ponto-cinza/25 rounded-xl p-3 bg-white/60">
          <p className="text-xs font-bold uppercase tracking-wide text-ponto-cinza mb-1">Seus avisos</p>
          <ul className="text-sm divide-y divide-ponto-claro">
            {avisos.map((a) => (
              <li key={a.id} className="py-1.5 flex items-start justify-between gap-2">
                <span>
                  <b className={a.tipo === 'falta' ? 'text-red-700' : 'text-amber-700'}>
                    {a.tipo === 'falta' ? 'Falta' : 'Atraso'}
                  </b>{' '}
                  <span className="capitalize">{periodo(a)}</span>
                  {a.tipo === 'atraso' && a.hora_prevista && <> · chega às {a.hora_prevista}</>}
                  {a.motivo && <span className="block text-xs text-ponto-cinza">{a.motivo}</span>}
                </span>
                <button onClick={() => cancelar(a.id)} className="text-xs text-ponto-cinza underline shrink-0">
                  cancelar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
