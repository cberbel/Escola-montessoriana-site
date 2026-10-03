import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from './ui/Section';

/** Três das doze diferenças, para dar o gosto da página completa. Tudo na vertical, pensado para o celular. */
const AMOSTRA: { tradicional: string; montessori: string }[] = [
  { tradicional: 'Sentada a manhã inteira, de frente para o quadro.', montessori: 'Em movimento, com propósito, e por isso concentrada.' },
  { tradicional: 'Aprende vendo e ouvindo a explicação.', montessori: 'Aprende fazendo, com o material nas mãos.' },
  { tradicional: 'Espera a nota para saber se acertou.', montessori: 'O material mostra o erro. Ela refaz e diz: "eu consegui".' },
];

/**
 * Tela da home que leva à página "Por que Montessori é melhor do que a escola tradicional".
 * Fica logo depois da seção do inglês (Practice). O cartão inteiro é um link: no celular,
 * muita gente toca no título e na imagem em vez do botão.
 */
export const PorQueMontessori: React.FC = () => (
  <Section id="por-que-montessori" className="bg-white">
    <div className="max-w-3xl mx-auto min-w-0">
      <div className="w-16 h-1.5 bg-montessori-gold rounded-full mb-4" />
      <span className="text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-2 block">
        Montessori e escola tradicional
      </span>
      <Link to="/montessori-x-tradicional" className="group block">
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-montessori-green leading-tight mb-4 break-words group-hover:underline">
          Por que Montessori é melhor do que a escola tradicional
        </h2>
        <p className="font-sans text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
          Quase todos nós estudamos na mesma sala, e ela parece a única forma possível de escola. Não é. São doze
          diferenças no dia a dia, e elas formam crianças diferentes.
        </p>

        <ul className="list-none space-y-4 mb-8">
          {AMOSTRA.map((a) => (
            <li key={a.tradicional} className="border border-montessori-green/10 rounded-sm shadow-sm overflow-hidden">
              <div className="px-4 sm:px-5 py-3">
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-0.5">Na sala tradicional</p>
                <p className="text-gray-700 text-base sm:text-lg leading-snug">{a.tradicional}</p>
              </div>
              <div className="px-4 sm:px-5 py-3 bg-montessori-green/5 border-t border-montessori-green/10">
                <p className="text-xs uppercase tracking-widest text-montessori-gold font-bold mb-0.5">Na sala Montessori</p>
                <p className="text-montessori-green text-base sm:text-lg font-semibold leading-snug">{a.montessori}</p>
              </div>
            </li>
          ))}
        </ul>

        <span className="inline-flex items-center justify-center gap-2 min-h-[52px] w-full sm:w-auto px-8 py-4 bg-montessori-green text-white font-semibold rounded-sm shadow-lg group-hover:shadow-xl transition-shadow">
          Ver as 12 diferenças
          <ArrowRight size={20} />
        </span>
      </Link>
    </div>
  </Section>
);
