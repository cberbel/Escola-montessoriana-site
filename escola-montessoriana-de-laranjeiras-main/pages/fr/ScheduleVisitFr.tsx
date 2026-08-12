import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { trackWhatsAppClick } from '../../utils/tracking';
import { usePageMeta } from '../../components/landing/Landing';

const CALENDLY_URL = 'https://calendly.com/contato-escolamontessoriana';
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_CONTAINER_ID = 'calendly-inline-container-fr';

export const ScheduleVisitFr: React.FC = () => {
  usePageMeta(
    'Réserver une visite | Escola Montessoriana de Laranjeiras',
    "Choisissez un créneau pour visiter notre école Montessori à Laranjeiras, Rio de Janeiro. Nous parlons français et anglais."
  );

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let pendingId: ReturnType<typeof setTimeout> | null = null;

    const container = document.getElementById(CALENDLY_CONTAINER_ID);
    if (!container) return;

    if (container.querySelector('iframe')) return;
    if (container.hasAttribute('data-calendly-pending')) return;
    container.setAttribute('data-calendly-pending', '1');

    const win = window as unknown as { Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void } };

    const doInit = () => {
      if (cancelled || !container.isConnected) return false;
      if (!win.Calendly?.initInlineWidget) return false;
      container.innerHTML = '';
      container.removeAttribute('data-processed');
      win.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: container,
      } as { url: string; parentElement: HTMLElement });
      pendingId = setTimeout(() => {
        pendingId = null;
        if (container.isConnected) container.removeAttribute('data-calendly-pending');
      }, 2000);
      return true;
    };

    const run = () => {
      if (cancelled) return;
      if (doInit()) return;
      timeoutId = setTimeout(run, 150);
    };

    const existing = document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`);
    if (existing) {
      run();
    } else {
      const script = document.createElement('script');
      script.src = CALENDLY_SCRIPT;
      script.async = true;
      script.onload = run;
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (timeoutId !== null) clearTimeout(timeoutId);
      if (pendingId !== null) clearTimeout(pendingId);
    };
  }, []);

  return (
    <div className="bg-montessori-cream py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 overflow-x-hidden">
      <div className="max-w-4xl mx-auto min-w-0 w-full">
        <div className="mb-6 sm:mb-8">
          <Link
            to="/fr"
            className="inline-flex items-center space-x-2 text-montessori-green hover:text-montessori-gold transition-colors mb-4 sm:mb-6 min-h-[44px] items-center touch-manipulation"
          >
            <ArrowLeft size={20} />
            <span className="font-medium text-base">Retour à l'accueil</span>
          </Link>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-montessori-green mb-3 sm:mb-4">
            Réservez votre visite
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Choisissez un créneau qui vous convient pour visiter l'école, voir les ambiances en plein travail et
            découvrir comment nous pouvons accompagner l'éducation de votre enfant. Nous parlons français et anglais.
          </p>
        </div>

        <div className="bg-white rounded-sm shadow-lg p-4 sm:p-6 md:p-12 mb-8 sm:mb-12 overflow-x-hidden">
          <div id={CALENDLY_CONTAINER_ID} className="calendly-embed" />
        </div>

        <div className="text-center">
          <p className="text-montessori-dark/80 text-base mb-4">
            Vous préférez WhatsApp ? Écrivez-nous et nous répondrons en quelques minutes.
          </p>
          <a
            href="https://wa.me/5521992973454?text=Je%20souhaiterais%20plus%20d%27informations%20sur%20l%27Escola%20Montessoriana%20de%20Laranjeiras."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('agendamento')}
            className="inline-flex items-center justify-center min-h-[52px] px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl"
          >
            Discuter sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
