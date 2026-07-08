import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AgendamentoContato } from '../components/AgendamentoContato';

const CALENDLY_URL = 'https://calendly.com/contato-escolamontessoriana';
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_CONTAINER_ID = 'calendly-inline-container';

export const Agendamento: React.FC = () => {
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
        prefill: {},
        utm: {},
      });
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
      <div className="max-w-4xl mx-auto min-w-0 w-full" id="agendamento-container">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            to={'/'}
            className="inline-flex items-center space-x-2 text-montessori-green hover:text-montessori-gold transition-colors mb-4 sm:mb-6 min-h-[44px] items-center touch-manipulation"
          >
            <ArrowLeft size={20} />
            <span className="font-medium text-base">Voltar para a página inicial</span>
          </Link>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-montessori-green mb-3 sm:mb-4">
            Agende sua Visita Exclusiva
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Escolha um horário conveniente para conhecer nossa escola e entender como podemos fazer parte da educação do seu filho.
          </p>
        </div>

        {/* Widget Calendly inline */}
        <div className="bg-white rounded-sm shadow-lg p-4 sm:p-6 md:p-12 mb-8 sm:mb-12 overflow-x-hidden">
          <div id={CALENDLY_CONTAINER_ID} className="calendly-embed" />
        </div>

        <AgendamentoContato />
      </div>
    </div>
  );
};
