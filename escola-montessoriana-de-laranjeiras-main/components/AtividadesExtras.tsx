import React from 'react';
import { Section } from './ui/Section';

const activities = [
  {
    image: '/images/natureza/capoeira-roda.jpg',
    position: 'center 45%',
    name: 'Capoeira',
  },
  {
    image: '/images/atividades/circo.jpg',
    position: 'center 30%',
    name: 'Circo e teatro',
  },
  {
    image: '/images/cerebro/patio-musica.jpg',
    position: 'center 55%',
    name: 'Dança e movimento',
  },
  {
    image: '/images/atividades/musicalizacao.jpg',
    position: 'center 40%',
    name: 'Musicalização',
  },
  {
    image: '/images/natureza/minhocario-real.jpg',
    position: 'center 55%',
    name: 'Permacultura',
  },
];

// Roteiro completo — inclui as que não têm foto própria.
const fullList = [
  'Capoeira',
  'Circo e teatro',
  'Dança e movimento',
  'Corpo e movimento',
  'Musicalização',
  'Permacultura',
  'Contação de histórias',
];

export const AtividadesExtras: React.FC = () => (
  <Section id="atividades" className="bg-white">
    <div className="text-center mb-10 sm:mb-14 min-w-0">
      <div className="w-16 h-1.5 bg-montessori-gold rounded-full mx-auto mb-5 sm:mb-6" />
      <span className="text-montessori-gold uppercase tracking-[0.2em] font-bold text-base sm:text-xl mb-3 block">
        Atividades complementares
      </span>
      <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-montessori-green px-1 break-words leading-tight">
        Além do trabalho na sala montessoriana
      </h2>
      <p className="font-sans text-lg text-montessori-dark mt-4 max-w-2xl mx-auto px-1 leading-relaxed">
        Duas vezes ao dia, de manhã e de tarde, ao longo da semana, as crianças vivem atividades que enriquecem o
        corpo, a arte e o contato com a natureza.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto min-w-0">
      {activities.map((a) => (
        <div
          key={a.name}
          className="group relative rounded-sm overflow-hidden shadow-md border border-montessori-green/10 min-w-0"
        >
          <img
            src={a.image}
            alt={`Atividade de ${a.name} na Escola Montessoriana`}
            loading="lazy"
            style={{ objectPosition: a.position }}
            className="w-full h-64 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-5">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
              {a.name}
            </h3>
          </div>
        </div>
      ))}
    </div>

    <div className="max-w-3xl mx-auto mt-10 sm:mt-12 text-center min-w-0">
      <p className="text-montessori-green font-semibold mb-4">Todas as atividades complementares:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {fullList.map((activity) => (
          <span
            key={activity}
            className="px-4 py-2 bg-montessori-cream border border-yellow-400 rounded-sm text-base text-montessori-green font-medium"
          >
            {activity}
          </span>
        ))}
      </div>
    </div>
  </Section>
);
