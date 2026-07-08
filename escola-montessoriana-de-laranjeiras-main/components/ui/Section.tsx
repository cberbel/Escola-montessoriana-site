import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`py-12 sm:py-16 md:py-24 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-24 overflow-x-hidden ${className}`}>
      <div className="max-w-7xl mx-auto min-w-0">
        {children}
      </div>
    </section>
  );
};