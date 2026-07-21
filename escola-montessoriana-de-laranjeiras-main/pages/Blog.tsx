import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Calendar } from 'lucide-react';
import { usePageMeta } from '../components/landing/Landing';
import { trackWhatsAppClick } from '../utils/tracking';

const temas = [
  'O método Montessori no dia a dia',
  'Desenvolvimento do cérebro na primeira infância',
  'Bilinguismo e o inglês desde cedo',
  'Adaptação, sono, alimentação e rotina',
  'Natureza, movimento e educação cósmica',
  'Como escolher uma escola para o seu filho',
];

export const Blog: React.FC = () => {
  usePageMeta(
    'Blog | Escola Montessoriana de Laranjeiras',
    'Em breve: conteúdo sobre método Montessori, desenvolvimento infantil, bilinguismo e maternidade/paternidade consciente, escrito pela equipe da Escola Montessoriana de Laranjeiras.'
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0 text-center">
          <span className="block text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-3">
            Blog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-5 break-words">
            Em breve, um espaço para pensar a infância
          </h1>
          <p className="font-sans text-lg sm:text-xl text-montessori-cream/90 leading-relaxed">
            Estamos preparando um blog com conteúdo de verdade sobre educação, desenvolvimento infantil e a arte de
            criar filhos com presença. Escrito por quem vive isso todos os dias.
          </p>
        </div>
      </div>

      {/* Temas */}
      <section className="px-4 sm:px-6 md:px-12 py-10 sm:py-14 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0">
          <h2 className="font-serif text-2xl sm:text-3xl text-montessori-green mb-6 text-center">
            O que você vai encontrar aqui
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {temas.map((tema) => (
              <div
                key={tema}
                className="bg-montessori-cream border border-montessori-green/10 rounded-sm px-5 py-4 text-montessori-dark text-base sm:text-lg"
              >
                {tema}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquanto isso */}
      <section className="px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0 text-center bg-montessori-green text-white rounded-sm p-8 sm:p-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-3 break-words">Enquanto o blog não chega</h2>
          <p className="text-montessori-cream/90 text-base sm:text-lg mb-7 leading-relaxed">
            Acompanhe nosso dia a dia no Instagram e, se quiser conhecer a escola de perto, agende uma visita — é a
            melhor forma de entender o que fazemos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="https://www.instagram.com/escola_montessoriana/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 bg-montessori-gold text-montessori-dark font-semibold rounded-sm hover:bg-[#c5a805] transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <Instagram size={20} />
              Seguir no Instagram
            </a>
            <a
              href="https://wa.me/5521993311000?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20%C3%A0%20Escola%20Montessoriana."
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              <Calendar size={20} strokeWidth={2} />
              Agendar uma visita
            </a>
          </div>
          <p className="mt-6 text-montessori-cream/80 text-sm">
            <Link to="/" className="underline hover:no-underline">Voltar para a página inicial</Link>
          </p>
        </div>
      </section>
    </div>
  );
};
