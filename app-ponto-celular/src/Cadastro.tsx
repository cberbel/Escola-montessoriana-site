import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, UserPlus, CloudOff } from 'lucide-react';
import { rpc, temConfig } from './api';

interface RespostaBase { ok: boolean; erro?: string }

export const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [loginTxt, setLoginTxt] = useState('');
  const [pin, setPin] = useState('');
  const [confirmarPin, setConfirmarPin] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [pronto, setPronto] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    if (!nome.trim()) return setErro('Informe seu nome completo.');
    if (!loginTxt.trim()) return setErro('Informe seu e-mail ou CPF.');
    if (!/^\d{4,6}$/.test(pin)) return setErro('O PIN deve ter de 4 a 6 números.');
    if (pin !== confirmarPin) return setErro('Os PINs não são iguais.');

    setEnviando(true);
    try {
      // sem senha: a entrada no ponto e por PIN, e senha guardada sem uso e so
      // risco - gente reusa a senha do e-mail e do banco
      const r = await rpc<RespostaBase>('autocadastro', {
        p_nome: nome.trim(),
        p_cargo: cargo.trim(),
        p_login: loginTxt.trim(),
        p_pin: pin,
      });
      if (!r.ok) setErro(r.erro ?? 'Não foi possível concluir o cadastro.');
      else setPronto(true);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen bg-ponto-claro font-sans text-ponto-escuro flex flex-col">
      <header className="bg-ponto-azul text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={22} className="text-ponto-dourado" />
          <span className="font-serif text-lg">Escola Montessoriana · Ponto</span>
        </div>
        <Link to="/" className="flex items-center gap-1 text-sm text-white/80 hover:text-white">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        {!temConfig() ? (
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center">
            <CloudOff size={48} className="mx-auto text-ponto-cinza mb-3" />
            <p className="font-serif text-2xl mb-2">Configuração pendente</p>
            <p className="text-ponto-cinza text-sm">
              O aplicativo ainda não foi conectado ao banco de dados.
            </p>
          </div>
        ) : pronto ? (
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center">
            <CheckCircle2 size={56} className="mx-auto text-green-600 mb-3" />
            <p className="font-serif text-2xl mb-2">Cadastro enviado!</p>
            <p className="text-ponto-cinza mb-6">
              A direção da escola vai aprovar seu cadastro. Depois disso, é só entrar com o seu
              PIN para registrar o ponto.
            </p>
            <Link
              to="/"
              className="inline-block w-full bg-ponto-azul text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Voltar ao início
            </Link>
          </div>
        ) : (
          <form onSubmit={enviar} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-6">
              <UserPlus size={40} className="mx-auto text-ponto-azul mb-3" />
              <h1 className="font-serif text-2xl mb-1">Cadastro de funcionário</h1>
              <p className="text-sm text-ponto-cinza">
                Preencha seus dados. A direção precisa aprovar antes do primeiro registro.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-ponto-cinza">
                Nome completo
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  autoComplete="name"
                  className="mt-1 w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 font-normal text-ponto-escuro focus:border-ponto-azul outline-none"
                />
              </label>

              <label className="block text-sm font-bold text-ponto-cinza">
                Cargo (opcional)
                <input
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  placeholder="Ex.: Professora"
                  className="mt-1 w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 font-normal text-ponto-escuro focus:border-ponto-azul outline-none"
                />
              </label>

              <label className="block text-sm font-bold text-ponto-cinza">
                E-mail ou CPF
                <input
                  value={loginTxt}
                  onChange={(e) => setLoginTxt(e.target.value)}
                  autoComplete="username"
                  placeholder="seu@email.com ou 000.000.000-00"
                  className="mt-1 w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 font-normal text-ponto-escuro focus:border-ponto-azul outline-none"
                />
              </label>

              <div className="bg-ponto-claro rounded-xl p-4">
                <p className="text-sm text-ponto-cinza mb-3">
                  Escolha um <strong className="text-ponto-escuro">PIN de 4 a 6 números</strong>.
                  É ele que você vai digitar todos os dias para bater o ponto.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block text-sm font-bold text-ponto-cinza">
                    PIN
                    <input
                      type="password"
                      inputMode="numeric"
                      value={pin}
                      maxLength={6}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                      className="mt-1 w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 font-normal text-ponto-escuro tabular-nums tracking-[0.3em] focus:border-ponto-azul outline-none"
                    />
                  </label>
                  <label className="block text-sm font-bold text-ponto-cinza">
                    Repita o PIN
                    <input
                      type="password"
                      inputMode="numeric"
                      value={confirmarPin}
                      maxLength={6}
                      onChange={(e) => setConfirmarPin(e.target.value.replace(/\D/g, ''))}
                      className="mt-1 w-full border-2 border-ponto-cinza/30 rounded-lg px-3 py-2 font-normal text-ponto-escuro tabular-nums tracking-[0.3em] focus:border-ponto-azul outline-none"
                    />
                  </label>
                </div>
              </div>
            </div>

            {erro && <p className="text-red-600 mt-4">{erro}</p>}

            <button
              disabled={enviando}
              className="mt-6 w-full bg-ponto-azul text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-60"
            >
              {enviando ? 'Enviando…' : 'Enviar cadastro'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
};
