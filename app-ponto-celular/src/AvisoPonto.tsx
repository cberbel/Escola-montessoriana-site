import React, { useEffect, useState } from 'react';
import { Bell, BellOff, BellRing, Loader2, Share } from 'lucide-react';
import { desligarAviso, estadoDoAviso, ligarAviso, EstadoAviso } from './avisos';

/**
 * Liga o aviso "você esqueceu de bater o ponto" neste aparelho.
 * Não aparece na estação da recepção: lá o aparelho é de todo mundo, e o aviso
 * acabaria tocando para quem usou por último.
 */
export const AvisoPonto: React.FC<{ pin: string }> = ({ pin }) => {
  const [estado, setEstado] = useState<EstadoAviso | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    estadoDoAviso().then(setEstado);
  }, []);

  if (estado === null || estado === 'indisponivel') return null;

  async function ligar() {
    setOcupado(true);
    setErro('');
    try {
      const r = await ligarAviso(pin);
      setEstado(r.estado);
      if (!r.ok && r.erro) setErro(r.erro);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não deu para ligar o aviso.');
    } finally {
      setOcupado(false);
    }
  }

  async function desligar() {
    setOcupado(true);
    await desligarAviso();
    setEstado('desligado');
    setOcupado(false);
  }

  const caixa = 'mt-4 rounded-xl border border-ponto-cinza/25 bg-white/60 px-4 py-3 text-sm';

  if (estado === 'ligado') {
    return (
      <div className={caixa}>
        <p className="flex items-center justify-center gap-2 text-ponto-escuro">
          <BellRing size={16} className="text-ponto-azul" />
          Aviso ligado neste celular
        </p>
        <button
          onClick={desligar}
          disabled={ocupado}
          className="mt-1 mx-auto flex items-center gap-1 text-ponto-cinza hover:text-ponto-escuro disabled:opacity-60"
        >
          <BellOff size={14} /> desligar
        </button>
      </div>
    );
  }

  if (estado === 'precisa_instalar') {
    return (
      <div className={caixa}>
        <p className="flex items-center gap-2 text-ponto-escuro font-bold mb-1">
          <Share size={16} className="text-ponto-azul" /> Para receber o aviso no iPhone
        </p>
        <p className="text-ponto-cinza">
          Toque em <strong>Compartilhar</strong> na barra do Safari e escolha{' '}
          <strong>Adicionar à Tela de Início</strong>. Depois abra o app por esse ícone e ligue o aviso aqui.
        </p>
      </div>
    );
  }

  if (estado === 'bloqueado') {
    return (
      <div className={caixa}>
        <p className="flex items-center gap-2 text-ponto-escuro font-bold mb-1">
          <BellOff size={16} /> Notificação bloqueada
        </p>
        <p className="text-ponto-cinza">
          O aparelho já guardou um “não” e não pergunta de novo. Abra os ajustes do site no navegador
          (o cadeado ao lado do endereço) e mude <strong>Notificações</strong> para <strong>Permitir</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className={caixa}>
      <button
        onClick={ligar}
        disabled={ocupado}
        className="w-full flex items-center justify-center gap-2 text-ponto-azul font-bold disabled:opacity-60"
      >
        {ocupado ? <Loader2 size={16} className="animate-spin" /> : <Bell size={16} />}
        Me avisar se eu esquecer de bater
      </button>
      <p className="text-ponto-cinza text-center mt-1">
        Chega um aviso 1h depois do seu horário de entrada, só se você não tiver batido.
      </p>
      {erro && <p className="text-red-700 text-center mt-1">{erro}</p>}
    </div>
  );
};
