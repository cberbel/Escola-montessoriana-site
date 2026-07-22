import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';

const topics = [
  {
    image: '/images/turmas/agrupada-2.jpg',
    alt: 'Girl concentrating while building the pink tower in the Montessori classroom',
    position: 'center 32%',
    title: 'The Montessori Method',
    text: "Why Maria Montessori's discovery has lasted over a century — and what it changes, in practice, in your child's life.",
    to: '/en/montessori-method',
  },
  {
    image: '/images/turmas/agrupada-1.jpg',
    alt: 'Smiling baby on the psychomotor structure at the school',
    position: 'center 40%',
    title: 'Welcoming Care',
    text: 'Emotional safety is the foundation of development: respectful adaptation, plenty of cuddles and flexibility for the family. Why welcoming comes before teaching.',
    to: '/en/welcoming',
  },
  {
    image: '/images/montessori/sensorial-encaixes.jpg',
    alt: 'Child working with the sensorial knobbed cylinders',
    position: 'center 45%',
    title: "The early years and the brain",
    text: "Over 1 million new connections per second: what builds your child's brain architecture — and why the choice of school matters more than the distance from home.",
    to: '/en/your-childs-brain',
  },
  {
    image: '/images/cerebro/leitura-bebes.jpg',
    alt: 'Teacher reading a book to three babies sitting around her',
    position: 'center 40%',
    title: 'English in early childhood',
    text: 'The unique window of the first years to acquire another language effortlessly — and the cognitive benefits that last a lifetime.',
    to: '/en/english-immersion',
  },
  {
    image: '/images/natureza/horta-plantar.jpg',
    alt: 'Child planting in the school vegetable garden',
    position: 'center',
    title: 'Healthy eating',
    text: 'Real food — no seed oils, refined salt or sugar. Children eat lunch together and feed themselves: mealtime is part of the education too.',
    to: '/en/welcoming#food',
  },
  {
    image: '/images/natureza/grupo-natureza.jpg',
    alt: 'Group of children wearing leaf crowns in the green area of the school',
    position: 'center 30%',
    title: 'Nature and cosmic education',
    text: 'Wide, tree-filled grounds and permaculture lessons with a vegetable garden and worm farm: how nature shapes intelligence and a sense of belonging to the world.',
    to: '/en/nature-cosmic-education',
  },
];

export const SaibaMaisEn: React.FC = () => (
  <Section id="learn-more" className="bg-montessori-green/5 border-t border-montessori-green/10">
    <div className="text-center mb-8 sm:mb-14 min-w-0">
      <div className="w-16 h-1.5 bg-montessori-gold rounded-full mx-auto mb-5 sm:mb-6" />
      <span className="text-montessori-gold uppercase tracking-[0.2em] font-bold text-xs sm:text-sm mb-3 block">
        To decide with depth
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-montessori-green px-1 break-words leading-tight">
        What every family should know before choosing a school
      </h2>
      <p className="sm:hidden text-montessori-green/60 text-sm mt-4">Swipe sideways to see all →</p>
    </div>

    <div className="max-w-5xl mx-auto min-w-0">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
        {topics.map((topic) => (
          <Link
            key={topic.to}
            to={topic.to}
            className="group snap-center shrink-0 basis-[85%] sm:basis-auto bg-montessori-cream border border-montessori-green/10 rounded-sm overflow-hidden hover:shadow-lg hover:border-montessori-green/30 transition-all min-w-0 break-words flex flex-col"
          >
            <div className="overflow-hidden">
              <img
                src={topic.image}
                alt={topic.alt}
                loading="lazy"
                style={{ objectPosition: topic.position }}
                className="w-full h-[44vh] sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-montessori-green mb-2 sm:mb-3">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4 flex-grow">
                {topic.text}
              </p>
              <span className="inline-flex items-center gap-1.5 text-montessori-green font-semibold group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </Section>
);
