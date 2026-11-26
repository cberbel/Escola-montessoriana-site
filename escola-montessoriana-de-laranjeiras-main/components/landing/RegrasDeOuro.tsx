import React from 'react';
import { LandingSection } from './Landing';

/**
 * 10 Regras de Ouro da Sala Montessori (texto do Claudio, 26/11/2026).
 * Mesmo texto da página da equipe (trabalhecomagente.escolamontessoriana.com.br/#regras-de-ouro).
 * O PT é verbatim; EN/ES/FR são traduções. Usado nas páginas do método nos 4 idiomas.
 */
export type RegraDeOuro = { titulo: string; texto: React.ReactNode };

export const RegrasDeOuro: React.FC<{
  id?: string;
  eyebrow: string;
  heading: string;
  intro: React.ReactNode;
  regras: RegraDeOuro[];
  resumoLabel: string;
  resumo: string;
}> = ({ id = 'regras-de-ouro', eyebrow, heading, intro, regras, resumoLabel, resumo }) => (
  <LandingSection id={id}>
    <div className="border-2 border-montessori-gold rounded-sm bg-gradient-to-b from-montessori-gold/10 to-white px-4 py-6 sm:px-8 sm:py-8">
      <p className="text-montessori-gold font-bold uppercase tracking-wider text-xs sm:text-sm mb-2">{eyebrow}</p>
      <h2 className="font-serif text-2xl sm:text-3xl text-montessori-green mb-3 break-words">{heading}</h2>
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5">{intro}</p>
      <ol className="list-none space-y-4 mb-6">
        {regras.map((r, i) => (
          <li key={i} className="flex gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-montessori-gold text-montessori-green font-bold flex items-center justify-center text-sm sm:text-base"
            >
              {i + 1}
            </span>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed min-w-0">
              <strong className="text-montessori-green">{r.titulo}</strong> {r.texto}
            </p>
          </li>
        ))}
      </ol>
      <div className="border-t border-montessori-gold/40 pt-5">
        <p className="text-montessori-gold font-bold uppercase tracking-wider text-xs sm:text-sm mb-2">{resumoLabel}</p>
        <p className="font-serif text-lg sm:text-2xl text-montessori-green leading-snug">{resumo}</p>
      </div>
    </div>
  </LandingSection>
);

/** Pergunta da regra 10, em destaque */
export const PerguntaOuro: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="block mt-2 font-serif italic text-montessori-green">{children}</span>
);
