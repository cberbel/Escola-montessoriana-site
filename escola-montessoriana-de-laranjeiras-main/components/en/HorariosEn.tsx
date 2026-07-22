import React from 'react';
import { Sun, CalendarClock, Sunset } from 'lucide-react';
import { Section } from '../ui/Section';

const periods = [
  {
    icon: <Sun size={28} />,
    name: 'Half day',
    times: ['Morning · 8am to 12pm', 'Afternoon · 1pm to 5pm'],
    note: 'The child attends one shift — morning or afternoon.',
  },
  {
    icon: <CalendarClock size={28} />,
    name: 'Full day',
    times: ['8am to 5pm'],
    note: 'The whole day at school, with lunch and rest time.',
  },
  {
    icon: <Sunset size={28} />,
    name: 'Extended day',
    times: ['7:30am to 7pm'],
    note: 'Earlier drop-off and later pick-up, for families who need more time.',
  },
];

export const HorariosEn: React.FC = () => (
  <Section id="schedule" className="bg-montessori-cream">
    <div className="text-center mb-10 sm:mb-14 min-w-0">
      <div className="w-16 h-1.5 bg-montessori-gold rounded-full mx-auto mb-5 sm:mb-6" />
      <span className="text-montessori-gold uppercase tracking-[0.2em] font-bold text-xs sm:text-sm mb-3 block">
        Opening hours
      </span>
      <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-montessori-green px-1 break-words leading-tight">
        A schedule that fits your family's routine
      </h2>
      <p className="font-sans text-lg text-montessori-dark mt-4 max-w-2xl mx-auto px-1 leading-relaxed">
        We are open from <strong>7:30am to 7pm</strong>. Choose the period that best fits your day.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto min-w-0">
      {periods.map((p) => (
        <div
          key={p.name}
          className="bg-white rounded-sm border border-montessori-green/10 shadow-sm p-6 sm:p-8 text-center flex flex-col items-center min-w-0 break-words"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-montessori-green/10 border-2 border-yellow-400 flex items-center justify-center text-montessori-green mb-4 [&>svg]:w-7 [&>svg]:h-7">
            {p.icon}
          </div>
          <h3 className="font-serif font-bold text-2xl text-montessori-green mb-3">{p.name}</h3>
          <div className="space-y-1 mb-3">
            {p.times.map((t) => (
              <p key={t} className="text-montessori-green font-semibold text-lg">{t}</p>
            ))}
          </div>
          <p className="text-gray-600 text-base leading-relaxed">{p.note}</p>
        </div>
      ))}
    </div>

    <p className="text-center text-montessori-dark mt-8 sm:mt-10 font-medium px-1">
      <span className="text-montessori-green font-bold">Flexible schedules:</span> we adapt drop-off and pick-up times
      to your family's needs.
    </p>
  </Section>
);
