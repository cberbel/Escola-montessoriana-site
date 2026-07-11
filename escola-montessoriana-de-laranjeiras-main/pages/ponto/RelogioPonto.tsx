import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Delete, LogIn, Settings, CheckCircle2 } from 'lucide-react';
import { Funcionario, RegistroPonto } from './types';
import {
  adicionarRegistro,
  buscarPorPin,
  chaveDia,
  formatarHora,
  gerarId,
  listarRegistros,
  registrosDoDia,
  rotuloBatida,
} from './storage';

type Etapa = 'pin' | 'confirmar' | 'sucesso';

const INTERVALO_MINIMO_MS = 60_000; // evita batida dupla em menos de 1 minuto

export const RelogioPonto: React.FC = () => {
  const [agora, setAgora] = useState(new Date());
  const [pin, setPin] = useState('');
  const [erro, setErro] = useState('');
  const [etapa, setEtapa] = useState<Etapa>('pin');
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [batidasHoje, setBatidasHoje] = useState<RegistroPonto[]>([]);
  const [ultimaBatida, setUltimaBatida] = useState<RegistroPonto | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Volta sozinho para a tela de PIN após confirmação ou inatividade
  useEffect(() => {
    if (etapa === 'pin') return;
    const tempo = etapa === 'sucesso' ? 5000 : 30000;
    const timer = setTimeout(reiniciar, tempo);
    return () => clearTimeout(timer);
  }, [etapa]);

  const hoje = useMemo(() => chaveDia(agora.toISOString()), [agora]);

  function reiniciar() {
    setPin('');
    setErro('');
    setEtapa('pin');
    setFuncionario(null);
    setBatidasHoje([]);
    setUltimaBatida(null);
  }

  function digitar(digito: string) {
    setErro('');
    if (pin.length >= 4) return;
    const novoPin = pin + digito;
    setPin(novoPin);
    if (novoPin.length === 4) {
      const encontrado = buscarPorPin(novoPin);
      if (!encontrado) {
        setErro('PIN não encontrado. Tente novamente.');
        setPin('');
        return;
      }
      setFuncionario(encontrado);
      setBatidasHoje(registrosDoDia(listarRegistros(), encontrado.id, hoje));
      setEtapa('confirmar');
    }
  }

  function registrar() {
    if (!funcionario) return;
    const batidas = registrosDoDia(listarRegistros(), funcionario.id, hoje);
    const ultima = batidas[batidas.length - 1];
    if (ultima && Date.now() - new Date(ultima.timestamp).getTime() < INTERVALO_MINIMO_MS) {
      setErro('Ponto já registrado há menos de 1 minuto.');
      return;
    }
    const registro: RegistroPonto = {
      id: gerarId(),
      funcionarioId: funcionario.id,
      timestamp: new Date().toISOString(),
    };
    adicionarRegistro(registro);
    setUltimaBatida(registro);
    setBatidasHoje([...batidas, registro]);
    setEtapa('sucesso');
  }

  const dataFormatada = agora.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const horaFormatada = agora.toLocaleTimeString('pt-BR');

  return (
    <div className="min-h-screen bg-montessori-cream font-sans text-montessori-dark flex flex-col">
      <header className="bg-montessori-green text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={22} className="text-montessori-gold" />
          <span className="font-serif text-lg">Escola Montessoriana · Ponto</span>
        </div>
        <Link
          to="/ponto/admin"
          className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors"
        >
          <Settings size={16} /> Administração
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <p className="text-montessori-stone capitalize">{dataFormatada}</p>
        <p className="font-serif text-5xl sm:text-6xl tabular-nums mt-1 mb-8">{horaFormatada}</p>

        {etapa === 'pin' && (
          <div className="w-full max-w-xs">
            <p className="text-center text-lg mb-4">Digite seu PIN para registrar o ponto</p>
            <div className="flex justify-center gap-3 mb-4" aria-label="PIN digitado">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 border-montessori-green ${
                    pin.length > i ? 'bg-montessori-green' : 'bg-transparent'
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

        {etapa === 'confirmar' && funcionario && (
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-montessori-stone">Olá,</p>
            <p className="font-serif text-2xl mb-1">{funcionario.nome}</p>
            {funcionario.cargo && <p className="text-sm text-montessori-stone mb-4">{funcionario.cargo}</p>}

            <div className="bg-montessori-cream rounded-lg p-3 mb-4 text-left">
              <p className="text-sm font-bold uppercase tracking-wide text-montessori-stone mb-1">Hoje</p>
              {batidasHoje.length === 0 ? (
                <p className="text-sm text-montessori-stone">Nenhum registro ainda.</p>
              ) : (
                <ul className="text-sm space-y-0.5">
                  {batidasHoje.map((b, i) => (
                    <li key={b.id} className="flex justify-between">
                      <span>{rotuloBatida(i)}</span>
                      <span className="tabular-nums">{formatarHora(b.timestamp)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {erro && <p className="text-red-600 mb-3">{erro}</p>}

            <button
              onClick={registrar}
              className="w-full bg-montessori-green text-white text-lg font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={22} />
              Registrar {rotuloBatida(batidasHoje.length)} agora
            </button>
            <button onClick={reiniciar} className="mt-3 text-montessori-stone hover:text-montessori-dark">
              Cancelar
            </button>
          </div>
        )}

        {etapa === 'sucesso' && funcionario && ultimaBatida && (
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center">
            <CheckCircle2 size={56} className="mx-auto text-green-600 mb-3" />
            <p className="font-serif text-2xl mb-1">Ponto registrado!</p>
            <p className="text-montessori-stone">
              {funcionario.nome} · {rotuloBatida(batidasHoje.length - 1)} às{' '}
              <span className="font-bold tabular-nums">{formatarHora(ultimaBatida.timestamp)}</span>
            </p>
            <button
              onClick={reiniciar}
              className="mt-6 w-full border-2 border-montessori-green text-montessori-green font-bold py-3 rounded-xl hover:bg-montessori-cream transition-colors"
            >
              Concluir
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

const TeclaPin: React.FC<{ onClick: () => void; children: React.ReactNode; ariaLabel?: string }> = ({
  onClick,
  children,
  ariaLabel,
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className="bg-white rounded-xl shadow text-2xl font-bold py-4 hover:bg-montessori-cream active:scale-95 transition-all"
  >
    {children}
  </button>
);
