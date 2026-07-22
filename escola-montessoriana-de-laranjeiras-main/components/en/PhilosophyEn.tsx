import React from 'react';
import { Focus, Sun, Heart, Hand, BookOpen, Compass } from 'lucide-react';
import { Section } from '../ui/Section';
import { trackWhatsAppClick } from '../../utils/tracking';

export const PhilosophyEn: React.FC = () => {
  const traits = [
    {
      icon: <Focus size={32} />,
      title: 'Focused',
      text: 'Dives into what they are doing and stays with the activity until it is finished. Deep concentration is the foundation of all learning — and it is built every day, in an environment prepared for it.'
    },
    {
      icon: <Sun size={32} />,
      title: 'Confident',
      text: 'Believes in their own ability because they achieve things by themselves. Every challenge overcome at their own pace — without rush or comparison — strengthens the confidence to face the next one.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Kind',
      text: 'Treats classmates, adults and the environment with care and respect. Courtesy is not imposed: it grows out of life in a community where the child receives the same respect they learn to offer.'
    },
    {
      icon: <Hand size={32} />,
      title: 'Independent in daily life',
      text: 'Gets dressed, feeds themselves, organizes their belongings and cares for the space around them. Practical independence gives the child the genuine pride of someone who can care for themselves and contribute to others.'
    },
    {
      icon: <BookOpen size={32} />,
      title: 'In love with learning',
      text: 'Learns because they want to, following the curiosity that is natural to every child. When learning grows from interest, it needs no prizes and no pressure — and it lasts a lifetime.'
    },
    {
      icon: <Compass size={32} />,
      title: 'Self-disciplined',
      text: 'Chooses, starts and finishes what they set out to do. True discipline does not come from outside, from obedience: it comes from within, from the habit of acting with purpose and freedom within limits.'
    }
  ];

  return (
    <Section id="method" className="bg-montessori-cream">
      <div className="text-center mb-10 sm:mb-14 min-w-0">
        <span className="text-montessori-green tracking-widest font-bold text-sm sm:text-base mb-2 block">
          The Montessori Philosophy
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-montessori-green mb-4 sm:mb-6">
          Education for real life, at each child's own pace
        </h2>
        <p className="font-sans text-lg md:text-xl text-montessori-dark font-semibold max-w-2xl mx-auto px-1 leading-relaxed">
          In Montessori, children learn by following their interests, in an environment prepared for child development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center max-w-5xl mx-auto mb-12 sm:mb-16 min-w-0">
        <div className="relative overflow-hidden rounded-sm shadow-lg border-l-4 border-montessori-gold min-w-0">
          <img
            src="/images/acolhimento/almoco-bebes.jpg"
            alt="Babies having lunch together at a low table, each eating with their own spoon, with teachers close by"
            loading="lazy"
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>
        <div className="min-w-0 px-1 text-left">
          <h3 className="font-serif text-2xl sm:text-3xl text-montessori-green mb-3 sm:mb-4">
            Who does your child become at our school?
          </h3>
          <p className="font-sans text-lg md:text-xl text-montessori-dark leading-relaxed">
            Maria Montessori discovered that, in the right environment, every child reveals their best.
            At our school this transformation happens day by day — and parents recognize at home a child who is:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto min-w-0">
        {traits.map((trait, index) => (
          <div key={index} className="flex flex-col items-center text-center group min-w-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center text-montessori-green mb-4 sm:mb-6 shadow-sm group-hover:bg-montessori-green group-hover:text-yellow-400 transition-colors duration-300 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-[32px] sm:[&>svg]:h-[32px]">
              {trait.icon}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-3 sm:mb-4">
              {trait.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-base break-words">
              {trait.text}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 sm:mt-16">
        <a
          href="https://wa.me/5521993311000?text=Hello!%20I%20would%20like%20to%20visit%20the%20school."
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-md hover:shadow-lg"
        >
          I want to book a visit
        </a>
      </div>
    </Section>
  );
};
