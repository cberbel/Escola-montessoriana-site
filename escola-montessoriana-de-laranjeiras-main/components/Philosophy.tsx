import React from 'react';
import { Brain, TreePine } from 'lucide-react';
import { Section } from './ui/Section';
import { trackWhatsAppClick } from '../utils/tracking';

/** Ícone minimalista: globo (mundo / linguagem global) */
const GlobeMinimalIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="16" cy="16" r="10" />
    <ellipse cx="16" cy="16" rx="10" ry="4" />
    <line x1="6" y1="16" x2="26" y2="16" />
  </svg>
);

export const Philosophy: React.FC = () => {
  const points = [
    {
      icon: <Brain size={32} />,
      title: "O momento certo da infância",
      text: "Os primeiros anos de vida são decisivos para a formação do pensamento, da linguagem e da personalidade. Um ambiente adequado nesse período permite que o desenvolvimento aconteça de forma natural e consistente."
    },
    {
      icon: <GlobeMinimalIcon size={32} />,
      title: "Linguagem e autonomia para o mundo",
      text: "A linguagem é vivida no dia a dia, nas relações e em experiências reais. Conviver com diferentes idiomas e praticar a autonomia desde cedo fortalecem a comunicação, a confiança e a capacidade de agir no mundo."
    },
    {
      icon: <TreePine size={32} />,
      title: "Um ambiente que protege e sustenta",
      text: "Tranquilidade, previsibilidade e cuidado são essenciais para o desenvolvimento infantil. Oferecemos um espaço preparado, protegido e acolhedor onde a criança pode se concentrar, explorar e crescer com segurança."
    }
  ];

  return (
    <Section id="method" className="bg-montessori-cream">
      <div className="text-center mb-10 sm:mb-16 min-w-0">
        <span className="text-montessori-green tracking-widest font-bold text-sm sm:text-base mb-2 block">
          Diferenciais
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-montessori-green mb-4 sm:mb-6">
          Montessori oferece educação para a vida real, de forma personalizada
        </h2>
        <p className="font-sans text-lg md:text-xl text-montessori-dark font-semibold max-w-2xl mx-auto mb-5 sm:mb-6 px-1 leading-relaxed">
          A criança aprende no seu ritmo, seguindo seus interesses, dentro de um ambiente preparado para o desenvolvimento infantil.
        </p>
        <ul className="font-sans text-lg md:text-xl text-montessori-dark max-w-2xl mx-auto list-none space-y-2 sm:space-y-3 mb-6 sm:mb-8 px-1 text-left break-words [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['•'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-montessori-gold [&>li]:before:font-bold">
          <li>Liberdade com limites.</li>
          <li>Autonomia e independência desde cedo.</li>
          <li>Foco no desenvolvimento da concentração.</li>
          <li>Ambiente cientificamente preparado.</li>
          <li>Bem diferente do modelo fabril da escola convencional.</li>
        </ul>
        <blockquote className="max-w-2xl mx-auto text-left bg-white border-l-4 border-montessori-gold rounded-sm shadow-sm p-5 sm:p-6 mb-2">
          <p className="font-serif italic text-lg sm:text-xl text-montessori-green mb-3">
            "Fiz esta escola para os meus próprios filhos."
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            Cláudio, fundador — formador Montessori reconhecido pela ABEM (Associação Brasileira de Educação Montessoriana, de Talita de Almeida)
          </p>
        </blockquote>
        <div className="mt-8 sm:mt-10">
          <a
            href="https://wa.me/5521993311000?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20a%20escola%20e%20agendar%20uma%20visita."
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-md hover:shadow-lg"
          >
            Quero agendar uma visita
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 min-w-0">
        {points.map((point, index) => (
          <div key={index} className="flex flex-col items-center text-center group min-w-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center text-montessori-green mb-4 sm:mb-6 shadow-sm group-hover:bg-montessori-green group-hover:text-yellow-400 transition-colors duration-300 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-[32px] sm:[&>svg]:h-[32px]">
              {point.icon}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-3 sm:mb-4">
              {point.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-base break-words">
              {point.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};