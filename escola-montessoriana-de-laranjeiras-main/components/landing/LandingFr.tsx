import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { trackWhatsAppClick } from '../../utils/tracking';

const WHATSAPP_VISIT_FR =
  'https://wa.me/5521992973454?text=Je%20souhaiterais%20plus%20d%27informations%20sur%20l%27Escola%20Montessoriana%20de%20Laranjeiras.';

/** Hero des landing pages FR : même visuel que LandingHero, retour vers /fr. */
export const LandingHeroFr: React.FC<{ eyebrow: string; title: string; subtitle: string }> = ({ eyebrow, title, subtitle }) => (
  <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-x-hidden">
    <div className="max-w-3xl mx-auto min-w-0">
      <Link
        to="/fr"
        className="inline-flex items-center gap-2 text-white/80 hover:text-montessori-gold transition-colors mb-6 sm:mb-8 min-h-[44px] items-center touch-manipulation"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Retour à l'accueil</span>
      </Link>
      <span className="block text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-3">
        {eyebrow}
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-5 break-words">
        {title}
      </h1>
      <p className="font-sans text-lg sm:text-xl text-montessori-cream/90 leading-relaxed">
        {subtitle}
      </p>
    </div>
  </div>
);

/** CTA des landing pages FR : même visuel que LandingCTA. */
export const LandingCTAFr: React.FC<{ heading: string; text: string }> = ({ heading, text }) => (
  <section className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 overflow-x-hidden">
    <div className="max-w-3xl mx-auto min-w-0 text-center bg-montessori-green text-white rounded-sm p-8 sm:p-12">
      <h2 className="font-serif text-2xl sm:text-3xl mb-3 break-words">{heading}</h2>
      <p className="text-montessori-cream/90 text-base sm:text-lg mb-7 leading-relaxed">{text}</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        <a
          href={WHATSAPP_VISIT_FR}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('cta-landing')}
          className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <Calendar size={20} strokeWidth={2} />
          Réserver ma visite
        </a>
        <Link
          to="/fr/planifier-visite"
          className="inline-flex items-center justify-center min-h-[52px] px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors w-full sm:w-auto"
        >
          Voir les créneaux disponibles
        </Link>
      </div>
    </div>
  </section>
);
