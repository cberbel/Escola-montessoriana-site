import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Delete,
  LogIn,
  LogOut,
  Settings,
  CheckCircle2,
  MapPin,
  MapPinOff,
  Loader2,
  CloudOff,
} from 'lucide-react';
import { Batida, Funcionario } from './types';
import { idDispositivo, obterPosicao, rpc, temConfig } from './api';
import { formatarHora, rotuloBatida } from './utils';

interface RespostaFuncionario {
  ok: boolean;
  erro?: string;
  funcionario?: Funcionario;
  batidas?: Batida[];
}

const CHAVE_PIN_SALVO = 'ponto.pinFuncionario';

type Fase = 'pin' | 'carregando' | 'home';

export const PontoFuncionario: React.FC = () => {
  const [fase, setFase] = useState<Fase>('pin');
  const [pin, setPin] = useState('');
  const [erro, setErro] = useState('');
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [batidas, setBatidas] = useState<Batida[]>([]);
  const [registrando, setRegistrando] = useState<'' | 'gps' | 'enviando'>('');
  const [sucesso, setSucesso] = useState('');
  const [semGps, setSemGps] = useState(false);
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Entra automaticamente com o PIN salvo da última vez
  useEffect(() => {
    const salvo = localStorage.getItem(CHAVE_PIN_SALVO);
    if (salvo && temConfig()) entrar(salvo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function entrar(pinDigitado: string) {
    setFase('carregando');
    setErro('');
    try {
      const r = await rpc<RespostaFuncionario>('entrar_funcionario', { p_pin: pinDigitado });
      if (!r.ok || !r.funcionario) {
        localStorage.removeItem(CHAVE_PIN_SALVO);
        setErro(r.erro ?? 'Não foi possível entrar.');
        setPin('');
        setFase('pin');
        return;
      }
      localStorage.setItem(CHAVE_PIN_SALVO, pinDigitado);
      setFuncionario(r.funcionario);
      setBatidas(r.batidas ?? []);
      setFase('home');
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
      setPin('');
      setFase('pin');
    }
  }

  function sair() {
    localStorage.removeItem(CHAVE_PIN_SALVO);
    setFuncionario(null);
    setBatidas([]);
    setPin('');
    setErro('');
    setSucesso('');
    setFase('pin');
  }

  function digitar(digito: string) {
    setErro('');
    if (pin.length >= 4) return;
    const novo = pin + digito;
    setPin(novo);
    if (novo.length === 4) entrar(novo);
  }

  async function registrar() {
    const pinSalvo = localStorage.getItem(CHAVE_PIN_SALVO);
    if (!pinSalvo) return sair();
    setErro('');
    setSucesso('');
    setSemGps(false);
    setRegistrando('gps');
    const pos = await obterPosicao();
    setRegistrando('enviando');
    try {
      const r = await rpc<RespostaFuncionario>('bater_ponto', {
        p_pin: pinSalvo,
        p_lat: pos.lat,
        p_lng: pos.lng,
        p_precisao: pos.precisao,
        p_dispositivo: idDispositivo(),
      });
      if (!r.ok) {
        setErro(r.erro ?? 'Não foi possível registrar.');
      } else {
        const novas = r.batidas ?? [];
        setBatidas(novas);
        setSemGps(pos.lat === null);
        const ultima = novas[novas.length - 1];
        setSucesso(
          `${rotuloBatida(novas.length - 1)} registrada às ${ultima ? formatarHora(ultima.ts) : ''}!`
        );
      }
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setRegistrando('');
    }
  }

  const horaFormatada = agora.toLocaleTimeString('pt-BR');
  const dataFormatada = agora.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="min-h-screen bg-ponto-claro font-sans text-ponto-escuro flex flex-col">
      <header className="bg-ponto-azul text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={22} className="text-ponto-dourado" />
          <span className="font-serif text-lg">Escola Montessoriana · Ponto</span>
        </div>
        <Link to="/admin" className="flex items-center gap-1 text-sm text-white/80 hover:text-white">
          <Settings size={16} /> Admin
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        {!temConfig() ? (
          <ConfigPendente />
        ) : (
          <>
            <p className="text-ponto-cinza capitalize">{dataFormatada}</p>
            <p className="font-serif text-5xl tabular-nums mt-1 mb-8">{horaFormatada}</p>

            {fase === 'carregando' && (
              <Loader2 size={40} className="animate-spin text-ponto-azul" aria-label="Carregando" />
            )}

            {fase === 'pin' && (
              <div className="w-full max-w-xs">
                <p className="text-center text-lg mb-4">Digite seu PIN para entrar</p>
                <div className="flex justify-center gap-3 mb-4" aria-label="PIN digitado">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`w-4 h-4 rounded-full border-2 border-ponto-azul ${
                        pin.length > i ? 'bg-ponto-azul' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                {erro && <p className="text-center text-red-600 mb-3">{erro}</p>}
                <div className="grid grid-cols-3 gap-3">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                    <TeclaPin key={d} onClick={() => digitar(d)}>{d}</TeclaPin>
                  ))}
                  <span />
                  <TeclaPin onClick={() => digitar('0')}>0</TeclaPin>
                  <TeclaPin onClick={() => { setPin(pin.slice(0, -1)); setErro(''); }} ariaLabel="Apagar">
                    <Delete size={22} className="mx-auto" />
                  </TeclaPin>
                </div>
              </div>
            )}

            {fase === 'home' && funcionario && (
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 text-center">
                <p className="text-ponto-cinza">Olá,</p>
                <p className="font-serif text-2xl mb-1">{funcionario.nome}</p>
                {funcionario.cargo && (
                  <p className="text-sm text-ponto-cinza mb-4">{funcionario.cargo}</p>
                )}

                <div className="bg-ponto-claro rounded-lg p-3 mb-4 text-left">
                  <p className="text-sm font-bold uppercase tracking-wide text-ponto-cinza mb-1">Hoje</p>
                  {batidas.length === 0 ? (
                    <p className="text-sm text-ponto-cinza">Nenhum registro ainda.</p>
                  ) : (
                    <ul className="text-sm space-y-0.5">
                      {batidas.map((b, i) => (
                        <li key={b.id} className="flex items-center justify-between gap-2">
                          <span>{rotuloBatida(i)}</span>
                          <span className="flex items-center gap-1 tabular-nums">
                            {b.lat === null ? (
                              <MapPinOff size={13} className="text-ponto-cinza" aria-label="Sem localização" />
                            ) : (
                              <MapPin size={13} className="text-green-600" aria-label="Com localização" />
                            )}
                            {formatarHora(b.ts)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {erro && <p className="text-red-600 mb-3">{erro}</p>}
                {sucesso && (
                  <p className="flex items-center justify-center gap-1 text-green-700 mb-3">
                    <CheckCircle2 size={18} /> {sucesso}
                  </p>
                )}
                {semGps && (
                  <p className="text-amber-700 text-sm mb-3">
                    Registrado sem localização — ative o GPS e permita o acesso à localização.
                  </p>
                )}

                <button
                  onClick={registrar}
                  disabled={registrando !== ''}
                  className="w-full bg-ponto-azul text-white text-lg font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {registrando === 'gps' ? (
                    <>
                      <Loader2 size={22} className="animate-spin" /> Obtendo localização…
                    </>
                  ) : registrando === 'enviando' ? (
                    <>
                      <Loader2 size={22} className="animate-spin" /> Registrando…
                    </>
                  ) : (
                    <>
                      <LogIn size={22} /> Registrar {rotuloBatida(batidas.length)} agora
                    </>
                  )}
                </button>
                <button
                  onClick={sair}
                  className="mt-3 flex items-center gap-1 mx-auto text-ponto-cinza hover:text-ponto-escuro"
                >
                  <LogOut size={16} /> Não sou {funcionario.nome.split(' ')[0]} · sair
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

const ConfigPendente: React.FC = () => (
  <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center">
    <CloudOff size={48} className="mx-auto text-ponto-cinza mb-3" />
    <p className="font-serif text-2xl mb-2">Configuração pendente</p>
    <p className="text-ponto-cinza text-sm">
      O aplicativo ainda não foi conectado ao banco de dados. Siga as instruções do arquivo
      README para concluir a instalação.
    </p>
  </div>
);

const TeclaPin: React.FC<{ onClick: () => void; children: React.ReactNode; ariaLabel?: string }> = ({
  onClick,
  children,
  ariaLabel,
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className="bg-white rounded-xl shadow text-2xl font-bold py-4 hover:bg-ponto-claro active:scale-95 transition-all"
  >
    {children}
  </button>
);
