import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Send, CheckCircle, Calendar } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/tracking';

const WHATSAPP_ESCOLA = '5521993311000';
const FORMSUBMIT_EMAIL = 'contato@escolamontessoriana.com.br';
const FORMSUBMIT_URL = `https://formsubmit.co/${FORMSUBMIT_EMAIL}`;

/** false = o formulário envia por e-mail (FormSubmit); o WhatsApp fica como opção secundária. */
const USE_WHATSAPP_ONLY = false;

// IMPORTANTE – Para receber os e-mails do formulário:
// 1. Na primeira vez, o FormSubmit envia um e-mail de ATIVAÇÃO para contato@escolamontessoriana.com.br
// 2. Abra esse e-mail (verifique a pasta de SPAM) e clique no link de ativação
// 3. Depois disso, todos os contatos passam a chegar na caixa de entrada (submissões feitas antes são guardadas por 30 dias)

type FormState = {
  responsibleName: string;
  childName: string;
  childAge: string;
  phone: string;
  email: string;
  neighborhood: string;
  comments: string;
};

function buildWhatsAppMessage(data: FormState) {
  const lines = [
    '*Contato pelo site – Escola Montessoriana*',
    '',
    `Nome do responsável: ${data.responsibleName}`,
    `Nome da criança: ${data.childName}`,
    `Idade da criança: ${data.childAge}`,
    `Telefone: ${data.phone}`,
    `E-mail: ${data.email}`,
    data.neighborhood.trim() ? `Bairro: ${data.neighborhood.trim()}` : '',
    data.comments.trim() ? `Comentários: ${data.comments.trim()}` : ''
  ].filter(Boolean);
  return lines.join('\n');
}

/** Envio por POST em iframe – não depende de CORS e é o método mais confiável do FormSubmit */
function submitViaFormPost(data: FormState, iframeName: string) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = FORMSUBMIT_URL;
  form.target = iframeName;
  form.style.display = 'none';

  const fields: Record<string, string> = {
    responsibleName: data.responsibleName,
    childName: data.childName,
    childAge: data.childAge,
    phone: data.phone,
    email: data.email,
    neighborhood: data.neighborhood,
    comments: data.comments,
    _subject: 'Contato pelo site – Escola Montessoriana',
    _replyto: data.email,
    _captcha: 'false',
    _template: 'table'
  };
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
  form.remove();
}

export const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    responsibleName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    neighborhood: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const IFRAME_NAME = 'formsubmit-hidden-iframe';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      submitViaFormPost(formState, IFRAME_NAME);
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 1800);
    } catch {
      setError('Não foi possível enviar. Tente o WhatsApp.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick();
    const message = buildWhatsAppMessage(formState);
    window.open(`https://wa.me/${WHATSAPP_ESCOLA}?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <Section id="contact" className="bg-montessori-cream py-24 border-t border-montessori-green/10">
      <div className="text-center mb-10 sm:mb-14 min-w-0">
        <div className="w-16 h-1.5 bg-montessori-gold rounded-full mx-auto mb-5 sm:mb-6" />
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-montessori-green px-1 break-words leading-tight">
          Contato
        </h2>
      </div>
      <iframe
        ref={iframeRef}
        name={IFRAME_NAME}
        title="Envio do formulário"
        className="absolute w-0 h-0 border-0 -left-[9999px]"
        tabIndex={-1}
        aria-hidden
      />
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row min-w-0 w-full">
        
        {/* Left Side: Copy */}
        <div className="md:w-1/2 bg-montessori-green text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden min-w-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 leading-tight break-words">
              Fale conosco agora
            </h3>
            <p className="text-montessori-cream/80 text-base sm:text-lg mb-4 leading-relaxed">
              Preencha o formulário e retornaremos em breve. Sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-1 text-base text-yellow-400 uppercase tracking-wider font-bold mb-6">
              <span>• Resposta rápida</span>
            </div>
            <p className="text-white/90 text-sm">
              Preencha os dados abaixo e clique em &quot;Enviar&quot;. Sua mensagem chega direto no e-mail da escola.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-6 sm:p-8 md:p-12 bg-white min-w-0 overflow-x-hidden">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
              <CheckCircle size={64} className="text-yellow-400 mb-4" />
              <h3 className="font-serif text-2xl text-montessori-green mb-2">Mensagem Enviada</h3>
              <p className="text-gray-600 mb-6">
                {USE_WHATSAPP_ONLY
                  ? 'A mensagem foi preparada. Conclua o envio no WhatsApp que abriu.'
                  : 'Sua mensagem foi enviada. Responderemos em breve.'}
              </p>
              <Link to="/agendamento" className="text-montessori-green font-semibold underline hover:no-underline">Agendar visita →</Link>
            </div>
          ) : (
            <form onSubmit={USE_WHATSAPP_ONLY ? handleSubmitWhatsApp : handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="responsibleName" className="block text-base font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Nome completo do responsável <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="responsibleName"
                  name="responsibleName"
                  required
                  autoComplete="name"
                  value={formState.responsibleName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-montessori-green focus:ring-1 focus:ring-montessori-green outline-none transition-all"
                  placeholder="Escreva seu nome"
                />
              </div>

              <div>
                <label htmlFor="childName" className="block text-base font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Nome da criança <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  required
                  value={formState.childName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-montessori-green focus:ring-1 focus:ring-montessori-green outline-none transition-all"
                  placeholder="Escreva o nome dos seus filhos"
                />
              </div>

              <div>
                <label htmlFor="childAge" className="block text-base font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Idade da criança <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="childAge"
                  name="childAge"
                  required
                  value={formState.childAge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-montessori-green focus:ring-1 focus:ring-montessori-green outline-none transition-all"
                  placeholder="Coloque idade dos seus filhos"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-base font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-montessori-green focus:ring-1 focus:ring-montessori-green outline-none transition-all"
                  placeholder="Seu telefone"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-montessori-green focus:ring-1 focus:ring-montessori-green outline-none transition-all"
                  placeholder="Escreva seu email"
                />
              </div>

              <div>
                <label htmlFor="neighborhood" className="block text-base font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Bairro
                </label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  value={formState.neighborhood}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-montessori-green focus:ring-1 focus:ring-montessori-green outline-none transition-all"
                  placeholder="Em qual bairro você mora?"
                />
              </div>

              <div>
                <label htmlFor="comments" className="block text-base font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Comentários
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows={4}
                  value={formState.comments}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-montessori-green focus:ring-1 focus:ring-montessori-green outline-none transition-all resize-none"
                  placeholder="Tire suas dúvidas"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm">
                  {error}
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      trackWhatsAppClick();
                      const message = buildWhatsAppMessage(formState);
                      window.open(`https://wa.me/${WHATSAPP_ESCOLA}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="ml-2 font-semibold underline"
                  >
                    Abrir WhatsApp
                  </button>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={USE_WHATSAPP_ONLY ? false : loading}
                className="w-full flex justify-center items-center gap-2 group"
              >
                {USE_WHATSAPP_ONLY ? (
                  <>
                    <span>Enviar por WhatsApp</span>
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                ) : loading ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <span>Enviar mensagem</span>
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {!USE_WHATSAPP_ONLY && (
                <p className="text-sm text-center text-gray-500">
                  Ou{' '}
                  <button
                    type="button"
                    onClick={() => {
                      trackWhatsAppClick();
                      const message = buildWhatsAppMessage(formState);
                      window.open(`https://wa.me/${WHATSAPP_ESCOLA}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="text-montessori-green font-semibold underline hover:no-underline"
                  >
                    enviar por WhatsApp
                  </button>
                </p>
              )}

              <p className="text-sm text-center text-gray-400 mt-4">
                Seus dados estão seguros. Não enviamos spam.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* CTA Agendar visita - reforço de conversão */}
      <div className="max-w-2xl mx-auto mt-16 sm:mt-20 text-center px-4 p-6 sm:p-8 bg-montessori-green/5 rounded-sm border border-montessori-green/10">
        <p className="text-montessori-dark font-semibold text-lg mb-2">
          Pronto para conhecer a escola?
        </p>
        <p className="text-montessori-dark/80 text-base mb-5">
          Agende uma visita. Sem compromisso. Resposta em minutos.
        </p>
        <a
          href="https://wa.me/5521993311000?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20%C3%A0%20Escola%20Montessoriana."
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 text-base font-semibold tracking-wide transition-all duration-300 rounded-sm touch-manipulation bg-[#25D366] text-white hover:bg-[#20bd5a] focus:outline focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 shadow-lg hover:shadow-xl"
        >
          <Calendar size={22} strokeWidth={2} />
          Agendar minha visita
        </a>
      </div>
    </Section>
  );
};