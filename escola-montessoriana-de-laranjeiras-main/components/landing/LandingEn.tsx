import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { trackWhatsAppClick } from '../../utils/tracking';

const WHATSAPP_VISIT_EN =
  'https://wa.me/5521993311000?text=Hello!%20I%20would%20like%20to%20schedule%20a%20visit%20to%20Escola%20Montessoriana.';

/** English landing hero: same visual as LandingHero, back link points to /en. */
export const LandingHeroEn: React.FC<{ eyebrow: string; title: string; subtitle: string }> = ({ eyebrow, title, subtitle }) => (
  <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-x-hidden">
    <div className="max-w-3xl mx-auto min-w-0">
      <Link
        to="/en"
        className="inline-flex items-center gap-2 text-white/80 hover:text-montessori-gold transition-colors mb-6 sm:mb-8 min-h-[44px] items-center touch-manipulation"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to home</span>
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

/** English landing CTA: same visual as LandingCTA. */
export const LandingCTAEn: React.FC<{ heading: string; text: string }> = ({ heading, text }) => (
  <section className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 overflow-x-hidden">
    <div className="max-w-3xl mx-auto min-w-0 text-center bg-montessori-green text-white rounded-sm p-8 sm:p-12">
      <h2 className="font-serif text-2xl sm:text-3xl mb-3 break-words">{heading}</h2>
      <p className="text-montessori-cream/90 text-base sm:text-lg mb-7 leading-relaxed">{text}</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        <a
          href={WHATSAPP_VISIT_EN}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <Calendar size={20} strokeWidth={2} />
          Book my visit
        </a>
        <Link
          to="/en/schedule-visit"
          className="inline-flex items-center justify-center min-h-[52px] px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors w-full sm:w-auto"
        >
          See available times
        </Link>
      </div>
    </div>
  </section>
);
