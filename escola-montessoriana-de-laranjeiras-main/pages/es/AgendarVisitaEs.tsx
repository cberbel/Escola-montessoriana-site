import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { trackWhatsAppClick } from '../../utils/tracking';
import { usePageMeta } from '../../components/landing/Landing';

const CALENDLY_URL = 'https://calendly.com/contato-escolamontessoriana';
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_CONTAINER_ID = 'calendly-inline-container-es';

export const AgendarVisitaEs: React.FC = () => {
  usePageMeta(
    'Agenda una visita | Escola Montessoriana de Laranjeiras',
    'Elige un horario conveniente para visitar nuestra escuela Montessori en Laranjeiras, Río de Janeiro. Hablamos español.'
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
            to="/es"
            className="inline-flex items-center space-x-2 text-montessori-green hover:text-montessori-gold transition-colors mb-4 sm:mb-6 min-h-[44px] items-center touch-manipulation"
          >
            <ArrowLeft size={20} />
            <span className="font-medium text-base">Volver al inicio</span>
          </Link>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-montessori-green mb-3 sm:mb-4">
            Agenda tu visita
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Elige un horario conveniente para visitar nuestra escuela, ver los salones funcionando y descubrir cómo
            podemos ser parte de la educación de tu hijo. Hablamos español.
          </p>
        </div>

        <div className="bg-white rounded-sm shadow-lg p-4 sm:p-6 md:p-12 mb-8 sm:mb-12 overflow-x-hidden">
          <div id={CALENDLY_CONTAINER_ID} className="calendly-embed" />
        </div>

        <div className="text-center">
          <p className="text-montessori-dark/80 text-base mb-4">
            ¿Prefieres WhatsApp? Escríbenos y te respondemos en minutos.
          </p>
          <a
            href="https://wa.me/5521993311000?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20agendar%20una%20visita%20a%20la%20Escola%20Montessoriana."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('agendamento')}
            className="inline-flex items-center justify-center min-h-[52px] px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
