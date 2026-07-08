import React from 'react';
import { Quote } from 'lucide-react';
import { Section } from './ui/Section';
import { Testimonial } from '../types';
import { trackWhatsAppClick } from '../utils/tracking';

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Flávio Azevedo",
      role: "Cardiologista e Mãe do Pedro (3 anos)",
      content: "Local maravilhoso, crianças felizes, o responsável é super simpático, gentil com as crianças. Os professores maravilhosos, me sinto seguro de deixar meu filho com pessoas que sempre estão estimulando o desenvolvimento dele.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea86b48e?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Luana Chedid",
      role: "Juiz Federal e Mãe da Sofia (5 anos)",
      content: "Nossa experiência com a escola foi simplesmente única. Maravilhosa, o Cláudio e todos os professores sempre muito atenciosos. Aurora Yris evoluiu muito nessa escola, só tenho agradecimento a todos.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Renata Faria",
      role: "Mãe",
      content: "Estamos muito satisfeitos e agradecidos com a Escola Montessoriana. Ela se tornou uma grande rede de apoio, onde encontramos um local respeitoso e acolhedor. O maior acerto é ver a alegria do nosso filho ao chegar na escola e o quanto ele se desenvolve bem a cada dia, mostrando-se sempre confortável, carinhoso e querido por todos! Nosso muito obrigada!",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Ana Petiz",
      role: "Mãe",
      content: "Escola acolhedora e proposta educacional sensacional. Matriculei minha filha com 1 ano e meio e já vi rápidos avanços no desenvolvimento dela. Espaço amplo, limpo e profissionais excelentes. Recomendo!",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2574&auto=format&fit=crop"
    }
  ];

  return (
    <Section id="testimonials" className="bg-montessori-green text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 p-8 sm:p-16 md:p-24 opacity-5 pointer-events-none">
        <Quote className="w-48 h-48 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto min-w-0">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center mb-10 sm:mb-16 text-montessori-cream px-1">
          A escolha de famílias que valorizam a excelência.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-sm hover:bg-white/10 transition-colors min-w-0 break-words">
              <div className="flex items-start mb-4 sm:mb-6">
                <Quote className="text-montessori-gold shrink-0 mr-3 sm:mr-4 mt-0.5" size={22} />
                <p className="font-sans text-base sm:text-lg text-gray-200 italic leading-relaxed">
                  "{t.content}"
                </p>
              </div>
              <div className="flex items-center">
                <div>
                  <h4 className="font-serif text-xl text-white">{t.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-white/90 text-lg mb-4 font-medium">Junte-se às famílias que já confiam na nossa escola.</p>
          <a
            href="https://wa.me/5521993311000?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20%C3%A0%20Escola%20Montessoriana."
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="inline-flex items-center justify-center min-h-[52px] px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl"
          >
            Agendar minha visita gratuita
          </a>
        </div>
      </div>
    </Section>
  );
};