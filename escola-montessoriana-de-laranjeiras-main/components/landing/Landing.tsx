import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { trackWhatsAppClick } from '../../utils/tracking';

/** Ajusta título e descrição da página (SPA) e restaura os padrões ao sair. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta?.getAttribute('content') ?? '';
    document.title = title;
    meta?.setAttribute('content', description);
    return () => {
      document.title = prevTitle;
      meta?.setAttribute('content', prevDescription);
    };
  }, [title, description]);
}

export const LandingHero: React.FC<{ eyebrow: string; title: string; subtitle: string }> = ({ eyebrow, title, subtitle }) => (
  <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-x-hidden">
    <div className="max-w-3xl mx-auto min-w-0">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white/80 hover:text-montessori-gold transition-colors mb-6 sm:mb-8 min-h-[44px] items-center touch-manipulation"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Voltar para a página inicial</span>
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

export const LandingSection: React.FC<{ heading?: string; children: React.ReactNode; className?: string; id?: string }> = ({ heading, children, className = '', id }) => (
  <section id={id} className={`px-4 sm:px-6 md:px-12 py-8 sm:py-10 overflow-x-hidden scroll-mt-24 ${className}`}>
    <div className="max-w-3xl mx-auto min-w-0">
      {heading && (
        <h2 className="font-serif text-2xl sm:text-3xl text-montessori-green mb-4 sm:mb-5 break-words">
          {heading}
        </h2>
      )}
      {children}
    </div>
  </section>
);

export const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">{children}</p>
);

export const Bullets: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="text-gray-700 text-base sm:text-lg leading-relaxed list-none space-y-2 sm:space-y-3 mb-4 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['•'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-montessori-gold [&>li]:before:font-bold">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border-l-4 border-montessori-gold bg-montessori-green/5 rounded-sm p-5 sm:p-6 my-6">
    <div className="font-serif text-lg sm:text-xl text-montessori-green leading-relaxed">{children}</div>
  </div>
);

export const LandingImage: React.FC<{ src: string; alt: string; portrait?: boolean; position?: string }> = ({ src, alt, portrait = false, position }) =>
  portrait ? (
    <div className="overflow-hidden rounded-sm shadow-lg my-6 max-w-md mx-auto">
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto" />
    </div>
  ) : (
    <div className="overflow-hidden rounded-sm shadow-lg my-6">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-64 sm:h-80 object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );

export const LandingImagePair: React.FC<{ images: { src: string; alt: string }[]; caption?: string }> = ({ images, caption }) => (
  <div className="my-6">
    <div className="grid grid-cols-2 gap-2 sm:gap-4">
      {images.map((im) => (
        <div key={im.src} className="overflow-hidden rounded-sm shadow-lg">
          <img src={im.src} alt={im.alt} loading="lazy" className="w-full h-56 sm:h-80 object-cover" />
        </div>
      ))}
    </div>
    {caption && <p className="mt-2 text-center text-sm text-gray-500">{caption}</p>}
  </div>
);

export const LandingCTA: React.FC<{ heading: string; text: string }> = ({ heading, text }) => (
  <section className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 overflow-x-hidden">
    <div className="max-w-3xl mx-auto min-w-0 text-center bg-montessori-green text-white rounded-sm p-8 sm:p-12">
      <h2 className="font-serif text-2xl sm:text-3xl mb-3 break-words">{heading}</h2>
      <p className="text-montessori-cream/90 text-base sm:text-lg mb-7 leading-relaxed">{text}</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        <a
          href="https://wa.me/5521993311000?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20%C3%A0%20Escola%20Montessoriana."
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <Calendar size={20} strokeWidth={2} />
          Agendar minha visita
        </a>
        <Link
          to="/agendamento"
          className="inline-flex items-center justify-center min-h-[52px] px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors w-full sm:w-auto"
        >
          Ver horários disponíveis
        </Link>
      </div>
    </div>
  </section>
);
