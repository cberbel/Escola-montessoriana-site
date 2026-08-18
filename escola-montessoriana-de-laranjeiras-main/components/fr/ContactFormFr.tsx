import React, { useState, useRef } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Send, CheckCircle } from 'lucide-react';
import { trackWhatsAppClick, trackFormSubmit } from '../../utils/tracking';
import { protocoloAtual } from '../../utils/gclid';

const WHATSAPP_ESCOLA = '5521992973454';
const FORMSUBMIT_EMAIL = 'contato@escolamontessoriana.com.br';
const FORMSUBMIT_URL = `https://formsubmit.co/${FORMSUBMIT_EMAIL}`;

type FormState = {
  responsibleName: string;
  childName: string;
  childAge: string;
  phone: string;
  email: string;
  neighborhood: string;
  comments: string;
  /** Honeypot: invisivel para pessoas, preenchido por bots. Se vier com valor, o envio e descartado. */
  honey: string;
};

function buildWhatsAppMessage(data: FormState) {
  const lines = [
    '*Contact site (FR) – Escola Montessoriana*',
    '',
    `Parent : ${data.responsibleName}`,
    `Prénom de l'enfant : ${data.childName}`,
    `Âge de l'enfant : ${data.childAge}`,
    `Téléphone : ${data.phone}`,
    `Email : ${data.email}`,
    data.neighborhood.trim() ? `Quartier : ${data.neighborhood.trim()}` : '',
    data.comments.trim() ? `Message : ${data.comments.trim()}` : ''
  ].filter(Boolean);
  // O formulario abre o WhatsApp via window.open e NAO passa pelo interceptador
  // de cliques que carimba os links <a> - sem isto, o protocolo (e com ele o
  // gclid e a origem) se perdia exatamente no contato mais completo do site.
  const protocolo = protocoloAtual();
  if (protocolo) lines.push('', 'Protocolo: ' + protocolo.slice(2, -1));
  return lines.join('\n');
}

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
    _subject: 'Contact site (FR) – Escola Montessoriana',
    _replyto: data.email,
    _captcha: 'false',
    _template: 'table',
    // Honeypot do FormSubmit: se um bot preencher o campo oculto, o envio e descartado no servidor
    _honey: data.honey
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

const inputClass =
  'w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-montessori-green focus:ring-1 focus:ring-montessori-green outline-none transition-all';
const labelClass = 'block text-base font-bold text-gray-700 uppercase tracking-wide mb-2';

export const ContactFormFr: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    responsibleName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    neighborhood: '',
    comments: '',
    honey: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const IFRAME_NAME = 'formsubmit-hidden-iframe-fr';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot: campo oculto preenchido. Encerra sem enviar e SEM disparar a conversao,
    // para que trafego automatizado nao entre na contagem do Google Ads.
    if (formState.honey) {
      setSubmitted(true);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      submitViaFormPost(formState, IFRAME_NAME);
      trackFormSubmit();
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 1800);
    } catch {
      setError("Une erreur s'est produite. Essayez plutôt WhatsApp.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const openWhatsApp = () => {
    trackWhatsAppClick('formulario-whatsapp');
    const message = buildWhatsAppMessage(formState);
    window.open(`https://wa.me/${WHATSAPP_ESCOLA}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Section id="contact" className="bg-montessori-cream py-24 border-t border-montessori-green/10">
      <div className="text-center mb-10 sm:mb-14 min-w-0">
        <div className="w-16 h-1.5 bg-montessori-gold rounded-full mx-auto mb-5 sm:mb-6" />
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-montessori-green px-1 break-words leading-tight">
          Contact
        </h2>
      </div>
      <iframe
        ref={iframeRef}
        name={IFRAME_NAME}
        title="Envoi du formulaire"
        className="absolute w-0 h-0 border-0 -left-[9999px]"
        tabIndex={-1}
        aria-hidden
      />
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row min-w-0 w-full">

        <div className="md:w-1/2 bg-montessori-green text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden min-w-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 leading-tight break-words">
              Écrivez-nous
            </h3>
            <p className="text-montessori-cream/80 text-base sm:text-lg mb-4 leading-relaxed">
              Remplissez le formulaire et nous vous répondrons rapidement. Sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-1 text-base text-yellow-400 uppercase tracking-wider font-bold mb-6">
              <span>• Réponse rapide</span>
              <span>• Nous parlons français et anglais</span>
            </div>
            <p className="text-white/90 text-sm">
              Renseignez vos coordonnées ci-dessous et cliquez sur « Envoyer » — votre message arrive directement dans
              la boîte mail de l'école.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-6 sm:p-8 md:p-12 bg-white min-w-0 overflow-x-hidden">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
              <CheckCircle size={64} className="text-yellow-400 mb-4" />
              <h3 className="font-serif text-2xl text-montessori-green mb-2">Message envoyé</h3>
              <p className="text-gray-600 mb-6">Merci ! Nous vous répondrons très vite.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot: fora da tela e do foco. Pessoas nao veem nem tabulam ate aqui; bots preenchem. */}
              <input type="text" name="honey" value={formState.honey} onChange={handleChange}
                className="absolute w-0 h-0 opacity-0 -left-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden />
              <div>
                <label htmlFor="responsibleName-fr" className={labelClass}>
                  Nom du parent <span className="text-red-500">*</span>
                </label>
                <input type="text" id="responsibleName-fr" name="responsibleName" required autoComplete="name"
                  value={formState.responsibleName} onChange={handleChange} className={inputClass} placeholder="Votre nom" />
              </div>

              <div>
                <label htmlFor="childName-fr" className={labelClass}>
                  Prénom de l'enfant <span className="text-red-500">*</span>
                </label>
                <input type="text" id="childName-fr" name="childName" required
                  value={formState.childName} onChange={handleChange} className={inputClass} placeholder="Le prénom de votre enfant" />
              </div>

              <div>
                <label htmlFor="childAge-fr" className={labelClass}>
                  Âge de l'enfant <span className="text-red-500">*</span>
                </label>
                <input type="text" id="childAge-fr" name="childAge" required
                  value={formState.childAge} onChange={handleChange} className={inputClass} placeholder="L'âge de votre enfant" />
              </div>

              <div>
                <label htmlFor="phone-fr" className={labelClass}>
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input type="tel" id="phone-fr" name="phone" required autoComplete="tel"
                  value={formState.phone} onChange={handleChange} className={inputClass} placeholder="Votre téléphone (avec l'indicatif)" />
              </div>

              <div>
                <label htmlFor="email-fr" className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" id="email-fr" name="email" required autoComplete="email"
                  value={formState.email} onChange={handleChange} className={inputClass} placeholder="Votre email" />
              </div>

              <div>
                <label htmlFor="neighborhood-fr" className={labelClass}>
                  Quartier
                </label>
                <input type="text" id="neighborhood-fr" name="neighborhood"
                  value={formState.neighborhood} onChange={handleChange} className={inputClass} placeholder="Où habitez-vous ?" />
              </div>

              <div>
                <label htmlFor="comments-fr" className={labelClass}>
                  Message
                </label>
                <textarea id="comments-fr" name="comments" rows={4}
                  value={formState.comments} onChange={handleChange}
                  className={`${inputClass} resize-none`} placeholder="Posez-nous toutes vos questions" />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm">
                  {error}
                  <button type="button" onClick={() => { setError(null); openWhatsApp(); }} className="ml-2 font-semibold underline">
                    Ouvrir WhatsApp
                  </button>
                </div>
              )}

              <Button type="submit" variant="primary" disabled={loading} className="w-full flex justify-center items-center gap-2 group">
                {loading ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <span>Envoyer le message</span>
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <p className="text-sm text-center text-gray-500">
                Ou{' '}
                <button type="button" onClick={openWhatsApp} className="text-montessori-green font-semibold underline hover:no-underline">
                  envoyer par WhatsApp
                </button>
              </p>

              <p className="text-sm text-center text-gray-400 mt-4">
                Vos données sont en sécurité. Jamais de spam.
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-16 sm:mt-20 text-center px-4 p-6 sm:p-8 bg-montessori-green/5 rounded-sm border border-montessori-green/10">
        <p className="text-montessori-dark font-semibold text-lg mb-2">
          Envie de voir l'école de vos propres yeux ?
        </p>
        <p className="text-montessori-dark/80 text-base mb-5">
          Réservez une visite. Sans engagement. Nous répondons en quelques minutes.
        </p>
        <a
          href="https://wa.me/5521992973454?text=Bonjour%2C%20je%20souhaiterais%20planifier%20une%20visite%20de%20l%27Escola%20Montessoriana%20de%20Laranjeiras."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('contato-cta')}
          className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 text-base font-semibold tracking-wide transition-all duration-300 rounded-sm touch-manipulation bg-[#25D366] text-white hover:bg-[#20bd5a] focus:outline focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 shadow-lg hover:shadow-xl"
        >
          Réserver ma visite sur WhatsApp
        </a>
      </div>
    </Section>
  );
};
