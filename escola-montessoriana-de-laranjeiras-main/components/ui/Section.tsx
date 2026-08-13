import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
  // scroll-mt compensa o menu fixo: sem ele, chegar por âncora (#method e afins)
  // deixava o rótulo da seção escondido atrás da navbar.
  return (
    <section id={id} className={`scroll-mt-20 md:scroll-mt-24 py-12 sm:py-16 md:py-24 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-24 overflow-x-hidden ${className}`}>
      <div className="max-w-7xl mx-auto min-w-0">
        {children}
      </div>
    </section>
  );
};