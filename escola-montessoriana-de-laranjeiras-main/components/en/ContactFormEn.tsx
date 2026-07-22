import React, { useState, useRef } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Send, CheckCircle } from 'lucide-react';
import { trackWhatsAppClick } from '../../utils/tracking';

const WHATSAPP_ESCOLA = '5521993311000';
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
};

function buildWhatsAppMessage(data: FormState) {
  const lines = [
    '*Website contact (EN) – Escola Montessoriana*',
    '',
    `Parent/guardian: ${data.responsibleName}`,
    `Child's name: ${data.childName}`,
    `Child's age: ${data.childAge}`,
    `Phone: ${data.phone}`,
    `E-mail: ${data.email}`,
    data.neighborhood.trim() ? `Neighborhood: ${data.neighborhood.trim()}` : '',
    data.comments.trim() ? `Comments: ${data.comments.trim()}` : ''
  ].filter(Boolean);
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
    _subject: 'Website contact (EN) – Escola Montessoriana',
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

const inputClass =
  'w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-montessori-green focus:ring-1 focus:ring-montessori-green outline-none transition-all';
const labelClass = 'block text-base font-bold text-gray-700 uppercase tracking-wide mb-2';

export const ContactFormEn: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
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
  const IFRAME_NAME = 'formsubmit-hidden-iframe-en';

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
      setError('Could not send. Please try WhatsApp.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const openWhatsApp = () => {
    trackWhatsAppClick();
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
        title="Form submission"
        className="absolute w-0 h-0 border-0 -left-[9999px]"
        tabIndex={-1}
        aria-hidden
      />
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row min-w-0 w-full">

        <div className="md:w-1/2 bg-montessori-green text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden min-w-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 leading-tight break-words">
              Talk to us
            </h3>
            <p className="text-montessori-cream/80 text-base sm:text-lg mb-4 leading-relaxed">
              Fill in the form and we will get back to you shortly. No commitment.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-1 text-base text-yellow-400 uppercase tracking-wider font-bold mb-6">
              <span>• Quick reply</span>
              <span>• We speak English</span>
            </div>
            <p className="text-white/90 text-sm">
              Fill in the details below and click &quot;Send&quot;. Your message goes straight to the school&apos;s e-mail.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-6 sm:p-8 md:p-12 bg-white min-w-0 overflow-x-hidden">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
              <CheckCircle size={64} className="text-yellow-400 mb-4" />
              <h3 className="font-serif text-2xl text-montessori-green mb-2">Message sent</h3>
              <p className="text-gray-600 mb-6">Your message has been sent. We will reply shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="responsibleName-en" className={labelClass}>
                  Parent/guardian full name <span className="text-red-500">*</span>
                </label>
                <input type="text" id="responsibleName-en" name="responsibleName" required autoComplete="name"
                  value={formState.responsibleName} onChange={handleChange} className={inputClass} placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="childName-en" className={labelClass}>
                  Child's name <span className="text-red-500">*</span>
                </label>
                <input type="text" id="childName-en" name="childName" required
                  value={formState.childName} onChange={handleChange} className={inputClass} placeholder="Your child's name" />
              </div>

              <div>
                <label htmlFor="childAge-en" className={labelClass}>
                  Child's age <span className="text-red-500">*</span>
                </label>
                <input type="text" id="childAge-en" name="childAge" required
                  value={formState.childAge} onChange={handleChange} className={inputClass} placeholder="Your child's age" />
              </div>

              <div>
                <label htmlFor="phone-en" className={labelClass}>
                  Phone <span className="text-red-500">*</span>
                </label>
                <input type="tel" id="phone-en" name="phone" required autoComplete="tel"
                  value={formState.phone} onChange={handleChange} className={inputClass} placeholder="Your phone (with country code)" />
              </div>

              <div>
                <label htmlFor="email-en" className={labelClass}>
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input type="email" id="email-en" name="email" required autoComplete="email"
                  value={formState.email} onChange={handleChange} className={inputClass} placeholder="Your e-mail" />
              </div>

              <div>
                <label htmlFor="neighborhood-en" className={labelClass}>
                  Neighborhood
                </label>
                <input type="text" id="neighborhood-en" name="neighborhood"
                  value={formState.neighborhood} onChange={handleChange} className={inputClass} placeholder="Where do you live?" />
              </div>

              <div>
                <label htmlFor="comments-en" className={labelClass}>
                  Comments
                </label>
                <textarea id="comments-en" name="comments" rows={4}
                  value={formState.comments} onChange={handleChange}
                  className={`${inputClass} resize-none`} placeholder="Ask us anything" />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm">
                  {error}
                  <button type="button" onClick={() => { setError(null); openWhatsApp(); }} className="ml-2 font-semibold underline">
                    Open WhatsApp
                  </button>
                </div>
              )}

              <Button type="submit" variant="primary" disabled={loading} className="w-full flex justify-center items-center gap-2 group">
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send message</span>
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <p className="text-sm text-center text-gray-500">
                Or{' '}
                <button type="button" onClick={openWhatsApp} className="text-montessori-green font-semibold underline hover:no-underline">
                  send via WhatsApp
                </button>
              </p>

              <p className="text-sm text-center text-gray-400 mt-4">
                Your data is safe. We never send spam.
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-16 sm:mt-20 text-center px-4 p-6 sm:p-8 bg-montessori-green/5 rounded-sm border border-montessori-green/10">
        <p className="text-montessori-dark font-semibold text-lg mb-2">
          Ready to see the school for yourself?
        </p>
        <p className="text-montessori-dark/80 text-base mb-5">
          Book a visit. No commitment. We reply in minutes.
        </p>
        <a
          href="https://wa.me/5521993311000?text=Hello!%20I%20would%20like%20to%20schedule%20a%20visit%20to%20Escola%20Montessoriana."
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 text-base font-semibold tracking-wide transition-all duration-300 rounded-sm touch-manipulation bg-[#25D366] text-white hover:bg-[#20bd5a] focus:outline focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 shadow-lg hover:shadow-xl"
        >
          Book my visit on WhatsApp
        </a>
      </div>
    </Section>
  );
};
