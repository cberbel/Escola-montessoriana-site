import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { blogPosts } from '../../pages/blog/posts';
import { ArrowLeft } from 'lucide-react';
import { usePageMeta, LandingCTA } from '../landing/Landing';
import { Foto } from '../ui/Foto';

interface BlogLayoutProps {
  title: string;
  metaDescription: string;
  dateDisplay: string;
  /** Data ISO (YYYY-MM-DD) para o atributo dateTime do <time>. */
  date?: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  children: React.ReactNode;
}

/** Layout padrão dos artigos do blog: capa, título, assinatura do autor, referências e CTA final. */
export const BlogLayout: React.FC<BlogLayoutProps> = ({
  title,
  metaDescription,
  dateDisplay,
  date,
  readingTime,
  image,
  imageAlt,
  children,
}) => {
  // O <title> curto (seoTitle, ≤ 60) vem do registro do post; sem isso, o título
  // longo do H1 + sufixo voltaria a ser aplicado no cliente e desfaria o prerender.
  const { pathname } = useLocation();
  const meta = blogPosts.find((p) => pathname.endsWith(`/blog/${p.slug}`));
  usePageMeta(meta?.seoTitle ?? title, metaDescription);
  const dateIso = date ?? meta?.date;

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
          {/* Autoria institucional (a equipe escreve; o schema BlogPosting aponta a escola como
              autora e editora). A credibilidade vem das Referências ao fim de cada artigo e da
              página /sobre, que diz quem responde pela escola. */}
          <p className="text-montessori-cream/80 text-sm sm:text-base">
            Por <strong className="text-montessori-cream">Equipe Escola Montessoriana</strong> ·{' '}
            <time dateTime={dateIso}>{dateDisplay}</time> · {readingTime} de leitura
          </p>
        </div>
      </div>

      {/* Imagem de capa */}
      <div className="px-4 sm:px-6 md:px-12 -mt-0 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0">
          <div className="overflow-hidden rounded-sm shadow-lg -translate-y-6 sm:-translate-y-8">
            <Foto src={image} alt={imageAlt} loading="eager" fetchPriority="high" className="w-full h-56 sm:h-80 object-cover" />
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

/**
 * Lista de fontes ao fim do artigo. Cada afirmação numérica ou "a ciência mostra"
 * do texto deve ter a fonte aqui, com link para o original: é o que permite a um
 * leitor (ou a um buscador de IA) conferir — e citar — o que a escola afirma.
 */
export const Referencias: React.FC<{ itens: { texto: string; url: string }[] }> = ({ itens }) => (
  <section aria-labelledby="referencias" className="mt-10 border-t border-gray-200 pt-6">
    <h2 id="referencias" className="font-serif text-xl sm:text-2xl text-montessori-green mb-3">
      Referências
    </h2>
    <ol className="list-decimal pl-5 space-y-2 text-gray-600 text-sm sm:text-base leading-relaxed">
      {itens.map((r) => (
        <li key={r.url}>
          {r.texto}{' '}
          <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-montessori-green underline break-all hover:no-underline">
            {r.url.replace(/^https?:\/\//, '')}
          </a>
        </li>
      ))}
    </ol>
  </section>
);
