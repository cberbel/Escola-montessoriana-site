import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageMeta, LandingCTA } from '../landing/Landing';

interface BlogLayoutProps {
  title: string;
  metaDescription: string;
  dateDisplay: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  children: React.ReactNode;
}

/** Layout padrão dos artigos do blog: capa, título, assinatura da equipe e CTA final. */
export const BlogLayout: React.FC<BlogLayoutProps> = ({
  title,
  metaDescription,
  dateDisplay,
  readingTime,
  image,
  imageAlt,
  children,
}) => {
  usePageMeta(`${title} | Blog Escola Montessoriana`, metaDescription);

  return (
    <div className="bg-white">
      {/* Cabeçalho */}
      <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-14 px-4 sm:px-6 md:px-12 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-montessori-gold transition-colors mb-6 sm:mb-8 min-h-[44px] touch-manipulation"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Todos os artigos</span>
          </Link>
          <span className="block text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-3">
            Blog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-5 break-words">
            {title}
          </h1>
          <p className="text-montessori-cream/80 text-sm sm:text-base">
            Por <strong className="text-montessori-cream">Equipe Escola Montessoriana</strong> · {dateDisplay} ·{' '}
            {readingTime} de leitura
          </p>
        </div>
      </div>

      {/* Imagem de capa */}
      <div className="px-4 sm:px-6 md:px-12 -mt-0 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0">
          <div className="overflow-hidden rounded-sm shadow-lg -translate-y-6 sm:-translate-y-8">
            <img src={image} alt={imageAlt} className="w-full h-56 sm:h-80 object-cover" />
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <article className="px-4 sm:px-6 md:px-12 pb-4 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0">{children}</div>
      </article>

      <LandingCTA
        heading="Venha ver isso de perto"
        text="A melhor forma de escolher uma escola é visitá-la em funcionamento. Agende uma visita e conheça nosso espaço, nossa equipe e nossa proposta."
      />
    </div>
  );
};

/** Subtítulo de seção dentro do artigo */
export const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-serif text-2xl sm:text-3xl text-montessori-green mt-8 mb-4 break-words">{children}</h2>
);
