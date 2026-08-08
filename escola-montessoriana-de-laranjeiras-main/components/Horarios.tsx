import React from 'react';
import { Sun, CalendarClock, Sunset } from 'lucide-react';
import { Section } from './ui/Section';

const periods = [
  {
    icon: <Sun size={28} />,
    name: 'Meio período',
    times: ['Matutino · 8h às 12h', 'Vespertino · 13h às 17h'],
    note: 'A criança frequenta um turno — manhã ou tarde.',
  },
  {
    icon: <CalendarClock size={28} />,
    name: 'Integral',
    times: ['Das 8h às 17h'],
    note: 'O dia inteiro na escola, com almoço e momento de descanso.',
  },
  {
    icon: <Sunset size={28} />,
    name: 'Estendido',
    times: ['Das 7h30 às 19h'],
    note: 'Entrada mais cedo e saída mais tarde, para famílias que precisam de mais tempo.',
  },
];

export const Horarios: React.FC = () => (
  <Section id="horarios" className="bg-montessori-cream">
    <div className="text-center mb-10 sm:mb-14 min-w-0">
      <div className="w-16 h-1.5 bg-montessori-gold rounded-full mx-auto mb-5 sm:mb-6" />
      <span className="text-montessori-gold uppercase tracking-[0.2em] font-bold text-xs sm:text-sm mb-3 block">
        Horário de funcionamento
      </span>
      <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-montessori-green px-1 break-words leading-tight">
        Um horário que cabe na rotina da sua família
      </h2>
      <p className="font-sans text-lg text-montessori-dark mt-4 max-w-2xl mx-auto px-1 leading-relaxed">
        Funcionamos das <strong>7h30 às 19h</strong>. Escolha o período que melhor se encaixa no seu dia a dia.
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
      <span className="text-montessori-green font-bold">Flexibilidade de horários:</span> adaptamos os horários às
      necessidades da sua família.
    </p>
  </Section>
);
