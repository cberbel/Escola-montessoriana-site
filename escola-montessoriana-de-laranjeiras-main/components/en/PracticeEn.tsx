import React from 'react';
import { Section } from '../ui/Section';

export const PracticeEn: React.FC = () => {
  return (
    <Section id="practice" className="bg-montessori-green text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-10 md:gap-12 min-w-0">
        <div className="min-w-0 space-y-4 sm:space-y-5">
          <span className="text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-1 block">
            What sets us apart
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-1 sm:mb-2">
            English by immersion every day, with native and bilingual teachers
          </h2>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-amber-100 font-semibold max-w-xl">
            Plus a third language chosen by the family
          </p>
          <ul className="font-sans text-base sm:text-lg text-white/90 space-y-2 sm:space-y-3 max-w-xl list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['•'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-montessori-gold [&>li]:before:font-bold">
            <li>French, Mandarin, Spanish, Italian or German.</li>
            <li>Your child gaining real fluency while enjoying the cognitive benefits of learning languages early.</li>
          </ul>
        </div>
        <div className="min-w-0 w-full md:w-auto">
          <div className="rounded-lg border border-amber-300/40 bg-white/5 px-5 sm:px-6 py-5 sm:py-6 shadow-[0_18px_45px_rgba(15,23,42,0.65)] max-w-md">
            <p className="font-sans text-sm sm:text-base text-amber-50 leading-relaxed">
              In a truly bilingual environment, children live English throughout the day: in conversations, songs,
              stories and play. The second language becomes a natural part of life —
              not an isolated lesson on the timetable.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
