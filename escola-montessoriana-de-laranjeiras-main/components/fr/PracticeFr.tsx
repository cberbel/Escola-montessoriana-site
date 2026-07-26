import React from 'react';
import { Section } from '../ui/Section';

export const PracticeFr: React.FC = () => {
  return (
    <Section id="practice" className="bg-montessori-green text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-10 md:gap-12 min-w-0">
        <div className="min-w-0 space-y-4 sm:space-y-5">
          <span className="text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-1 block">
            Ce qui nous distingue
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-1 sm:mb-2">
            Immersion en anglais chaque jour, avec des enseignantes natives et bilingues
          </h2>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-amber-100 font-semibold max-w-xl">
            Et une troisième langue au choix de la famille — dont le français
          </p>
          <ul className="font-sans text-base sm:text-lg text-white/90 space-y-2 sm:space-y-3 max-w-xl list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['•'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-montessori-gold [&>li]:before:font-bold">
            <li>Français, mandarin, espagnol, italien ou allemand.</li>
            <li>Votre enfant acquiert une vraie aisance, avec en prime les bénéfices cognitifs des langues apprises tôt.</li>
          </ul>
        </div>
        <div className="min-w-0 w-full md:w-auto">
          <div className="rounded-lg border border-amber-300/40 bg-white/5 px-5 sm:px-6 py-5 sm:py-6 shadow-[0_18px_45px_rgba(15,23,42,0.65)] max-w-md">
            <p className="font-sans text-sm sm:text-base text-amber-50 leading-relaxed">
              Dans un environnement réellement bilingue, les enfants vivent en anglais tout au long de la journée :
              dans les conversations, les chansons, les histoires et les jeux. La deuxième langue devient une partie
              naturelle de la vie — pas une case de plus dans l'emploi du temps.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
