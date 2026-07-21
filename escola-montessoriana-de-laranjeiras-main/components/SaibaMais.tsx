import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from './ui/Section';

const topics = [
  {
    image: '/images/turmas/agrupada-2.jpg',
    alt: 'Menina concentrada montando a torre rosa na sala Montessori',
    position: 'center 30%',
    title: 'O Método Montessori',
    text: 'Por que a descoberta de Maria Montessori atravessou um século — e o que ela muda, na prática, na vida do seu filho.',
    to: '/metodo-montessori',
  },
  {
    image: '/images/turmas/agrupada-1.jpg',
    alt: 'Bebê sorrindo na estrutura de psicomotricidade da escola',
    position: 'center 40%',
    title: 'Acolhimento',
    text: 'Segurança é a base do desenvolvimento: adaptação respeitosa, muito colo e flexibilidade para a família. Por que acolher vem antes de ensinar.',
    to: '/acolhimento',
  },
  {
    image: '/images/natureza/horta-plantar.jpg',
    alt: 'Criança plantando na horta da escola',
    position: 'center',
    title: 'Alimentação saudável',
    text: 'Comida de verdade, sem óleo vegetal, sal refinado ou açúcar. As crianças almoçam juntas e comem sozinhas — a hora da refeição também educa.',
    to: '/acolhimento#alimentacao',
  },
  {
    image: '/images/montessori/linguagem-escrita.jpg',
    alt: 'Menina praticando a escrita com material Montessori',
    position: 'center 25%',
    title: 'Inglês na primeira infância',
    text: 'A janela única dos primeiros anos para adquirir outro idioma sem esforço — e os benefícios cognitivos que ficam para a vida.',
    to: '/ingles-primeira-infancia',
  },
  {
    image: '/images/montessori/sensorial-encaixes.jpg',
    alt: 'Criança trabalhando com material sensorial de encaixes',
    position: 'center 30%',
    title: 'Os primeiros anos e o cérebro',
    text: 'Mais de 1 milhão de conexões por segundo: o que constrói a arquitetura cerebral do seu filho — e por que a escolha da escola pesa mais que a distância de casa.',
    to: '/desenvolvimento-cerebral',
  },
  {
    image: '/images/natureza/grupo-natureza.jpg',
    alt: 'Grupo de crianças com coroas de folhas na área verde da escola',
    position: 'center 30%',
    title: 'Natureza e educação cósmica',
    text: 'Espaço amplo e arborizado, aulas de permacultura com horta e minhocário: como a natureza forma a inteligência e o senso de pertencimento ao mundo.',
    to: '/natureza-educacao-cosmica',
  },
];

export const SaibaMais: React.FC = () => (
  <Section id="saiba-mais" className="bg-white">
    <div className="text-center mb-10 sm:mb-14 min-w-0">
      <span className="text-montessori-green uppercase tracking-widest font-bold text-xs mb-2 block">
        Para decidir com profundidade
      </span>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-montessori-green px-1 break-words">
        O que toda família deveria saber antes de escolher uma escola
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto min-w-0">
      {topics.map((topic) => (
        <Link
          key={topic.to}
          to={topic.to}
          className="group bg-montessori-cream border border-montessori-green/10 rounded-sm overflow-hidden hover:shadow-lg hover:border-montessori-green/30 transition-all min-w-0 break-words flex flex-col"
        >
          <div className="overflow-hidden">
            <img
              src={topic.image}
              alt={topic.alt}
              loading="lazy"
              style={{ objectPosition: topic.position }}
              className="w-full h-52 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 sm:p-8 flex flex-col flex-grow">
            <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2 sm:mb-3">
              {topic.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-4 flex-grow">
              {topic.text}
            </p>
            <span className="inline-flex items-center gap-1.5 text-montessori-green font-semibold group-hover:gap-3 transition-all">
              Saiba mais
              <ArrowRight size={18} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  </Section>
);
