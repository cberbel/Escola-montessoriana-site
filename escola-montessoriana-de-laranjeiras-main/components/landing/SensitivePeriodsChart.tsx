import React from 'react';

const SENSORY = "M 60.0 267.1 L 69.0 249.8 L 78.0 224.7 L 87.0 191.7 L 96.0 153.0 L 105.0 113.2 L 114.0 78.9 L 123.0 56.6 L 132.0 50.9 L 141.0 52.7 L 150.0 57.0 L 159.0 63.7 L 168.0 72.6 L 177.0 83.4 L 186.0 95.8 L 195.0 109.4 L 204.0 123.9 L 213.0 138.9 L 222.0 154.0 L 231.0 168.9 L 240.0 183.3 L 249.0 197.1 L 258.0 209.9 L 267.0 221.7 L 276.0 232.4 L 285.0 241.9 L 294.0 250.3 L 303.0 257.6 L 312.0 263.9 L 321.0 269.1 L 330.0 273.5 L 339.0 277.1 L 348.0 280.0 L 357.0 282.4 L 366.0 284.2 L 375.0 285.7 L 384.0 286.8 L 393.0 287.7 L 402.0 288.3 L 411.0 288.8 L 420.0 289.1 L 429.0 289.4 L 438.0 289.6 L 447.0 289.7 L 456.0 289.8 L 465.0 289.9 L 474.0 289.9 L 483.0 289.9 L 492.0 290.0 L 510.0 290.0 L 540.0 290.0 L 570.0 290.0 L 600.0 290.0";
const LANGUAGE = "M 60.0 287.7 L 69.0 285.9 L 78.0 282.8 L 87.0 277.9 L 96.0 270.6 L 105.0 260.2 L 114.0 246.1 L 123.0 228.2 L 132.0 206.6 L 141.0 182.3 L 150.0 156.8 L 159.0 132.2 L 168.0 111.0 L 177.0 95.6 L 186.0 87.9 L 195.0 87.5 L 204.0 89.0 L 213.0 91.9 L 222.0 96.1 L 231.0 101.6 L 240.0 108.1 L 249.0 115.7 L 258.0 124.1 L 267.0 133.1 L 276.0 142.7 L 285.0 152.7 L 294.0 162.9 L 303.0 173.1 L 312.0 183.3 L 321.0 193.3 L 330.0 202.9 L 339.0 212.1 L 348.0 220.8 L 357.0 229.0 L 366.0 236.6 L 375.0 243.5 L 384.0 249.9 L 393.0 255.6 L 402.0 260.7 L 411.0 265.2 L 420.0 269.2 L 429.0 272.6 L 438.0 275.6 L 447.0 278.2 L 456.0 280.3 L 465.0 282.1 L 474.0 283.7 L 483.0 284.9 L 492.0 286.0 L 510.0 287.5 L 540.0 288.7 L 570.0 289.4 L 600.0 289.9";
const COGNITIVE = "M 60.0 288.8 L 69.0 288.2 L 78.0 287.3 L 87.0 286.0 L 96.0 284.2 L 105.0 281.7 L 114.0 278.4 L 123.0 274.1 L 132.0 268.6 L 141.0 261.8 L 150.0 253.6 L 159.0 243.8 L 168.0 232.6 L 177.0 220.0 L 186.0 206.2 L 195.0 191.7 L 204.0 176.8 L 213.0 162.2 L 222.0 148.4 L 231.0 136.2 L 240.0 126.1 L 249.0 118.6 L 258.0 114.3 L 267.0 113.2 L 276.0 113.6 L 285.0 114.5 L 294.0 116.0 L 303.0 117.9 L 312.0 120.4 L 321.0 123.4 L 330.0 126.8 L 339.0 130.6 L 348.0 134.8 L 357.0 139.4 L 366.0 144.3 L 375.0 149.5 L 384.0 154.9 L 393.0 160.5 L 402.0 166.2 L 411.0 172.1 L 420.0 178.0 L 429.0 184.0 L 438.0 189.9 L 447.0 195.8 L 456.0 201.6 L 465.0 207.4 L 474.0 213.0 L 483.0 218.4 L 492.0 223.6 L 510.0 233.6 L 540.0 244.7 L 570.0 254.3 L 600.0 269.1";

const ticks = [
  { x: 60, label: 'Nascimento' },
  { x: 157, label: '1 ano' },
  { x: 222, label: '2 anos' },
  { x: 287, label: '3 anos' },
  { x: 384, label: '4–6 anos' },
  { x: 600, label: 'Adulto' },
];

const SENSORY_COLOR = '#c9a227';
const LANGUAGE_COLOR = '#1e3a5f';
const COGNITIVE_COLOR = '#c17a54';

export const SensitivePeriodsChart: React.FC = () => (
  <figure className="my-6">
    <div className="bg-montessori-cream/50 border border-montessori-green/15 rounded-sm p-4 sm:p-6">
      <p className="font-serif text-montessori-green text-base sm:text-lg font-semibold mb-1">
        As janelas de cada aprendizado
      </p>
      <p className="text-gray-500 text-sm mb-4">
        Formação de conexões neurais ao longo da primeira infância
      </p>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 620 360" className="w-full min-w-[440px]" role="img"
          aria-label="Gráfico dos períodos sensíveis: sentidos, linguagem e funções cognitivas superiores formam conexões neurais em janelas diferentes, todas concentradas nos primeiros anos de vida.">
          {/* eixo X */}
          <line x1="60" y1="290" x2="600" y2="290" stroke="#1e3a5f" strokeOpacity="0.25" strokeWidth="1" />
          {ticks.map((t) => (
            <g key={t.label}>
              <line x1={t.x} y1="290" x2={t.x} y2="295" stroke="#1e3a5f" strokeOpacity="0.4" strokeWidth="1" />
              <text x={t.x} y="309" textAnchor="middle" fontSize="12" fill="#6b7280">{t.label}</text>
            </g>
          ))}
          {/* curvas */}
          <path d={COGNITIVE} fill="none" stroke={COGNITIVE_COLOR} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={LANGUAGE} fill="none" stroke={LANGUAGE_COLOR} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={SENSORY} fill="none" stroke={SENSORY_COLOR} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* marcadores de pico */}
          <circle cx="130" cy="51" r="4" fill={SENSORY_COLOR} />
          <circle cx="190" cy="87" r="4" fill={LANGUAGE_COLOR} />
          <circle cx="265" cy="113" r="4" fill={COGNITIVE_COLOR} />
        </svg>
      </div>
      {/* legenda */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm sm:text-base">
        <span className="inline-flex items-center gap-2 text-montessori-dark">
          <span className="inline-block w-6 h-[3px] rounded-full" style={{ backgroundColor: SENSORY_COLOR }} />
          Sentidos (visão, audição)
        </span>
        <span className="inline-flex items-center gap-2 text-montessori-dark">
          <span className="inline-block w-6 h-[3px] rounded-full" style={{ backgroundColor: LANGUAGE_COLOR }} />
          Linguagem
        </span>
        <span className="inline-flex items-center gap-2 text-montessori-dark">
          <span className="inline-block w-6 h-[3px] rounded-full" style={{ backgroundColor: COGNITIVE_COLOR }} />
          Funções cognitivas superiores
        </span>
      </div>
    </div>
    <figcaption className="text-xs sm:text-sm text-gray-500 mt-3 max-w-2xl">
      Gráfico esquemático inspirado na ciência do desenvolvimento (Center on the Developing Child, Universidade de
      Harvard, a partir de dados de C. Nelson). Cada função cerebral tem sua janela de maior facilidade — e todas se
      concentram nos primeiros anos. Ilustração própria, não é uma imagem médica.
    </figcaption>
  </figure>
);
