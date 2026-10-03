import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BlogLayout, H2 } from '../../../components/blog/BlogLayout';
import { P } from '../../../components/landing/Landing';
import type { ArtigoMontessori, BlocoTexto } from './tipos';

const html = (h: string) => ({ __html: h });

const Bloco: React.FC<{ b: BlocoTexto }> = ({ b }) => {
  switch (b.t) {
    case 'h3':
      return <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mt-8 mb-3 break-words" dangerouslySetInnerHTML={html(b.h)} />;
    case 'h4':
      return <h4 className="font-serif text-lg sm:text-xl text-montessori-green mt-6 mb-2 break-words" dangerouslySetInnerHTML={html(b.h)} />;
    case 'quote':
      return (
        <blockquote
          className="border-l-4 border-montessori-gold pl-4 sm:pl-5 my-5 text-gray-700 text-base sm:text-lg leading-relaxed italic"
          dangerouslySetInnerHTML={html(b.h)}
        />
      );
    case 'sep':
      return (
        <p aria-hidden="true" className="text-center text-montessori-gold tracking-[0.6em] my-6">
          * * *
        </p>
      );
    case 'nota':
      return <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-3" dangerouslySetInnerHTML={html(b.h)} />;
    default:
      return <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-4" dangerouslySetInnerHTML={html(b.h)} />;
  }
};

/** Post do blog com um texto de Maria Montessori: primeiro a apresentação da escola, depois a íntegra dela. */
export const ArtigoMontessoriPage: React.FC<{ artigo: ArtigoMontessori }> = ({ artigo }) => (
  <BlogLayout
    title={artigo.title}
    metaDescription={artigo.excerpt}
    dateDisplay={artigo.dateDisplay}
    date={artigo.date}
    readingTime={artigo.readingTime}
    image={artigo.image}
    imageAlt={artigo.imageAlt}
  >
    {artigo.intro.map((p, i) => (
      <P key={i}>{p}</P>
    ))}

    <section aria-labelledby="integra" className="mt-10 border-t-2 border-montessori-gold pt-2">
      <H2>
        <span id="integra">O texto de Maria Montessori, na íntegra</span>
      </H2>
      {artigo.textos.map((t, i) => (
        <div key={i} className={i > 0 ? 'mt-12 border-t border-gray-200 pt-4' : ''}>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-2">
            <strong className="text-gray-700">Fonte:</strong> {t.fonte}
            {t.tituloOriginal && (
              <>
                <br />
                <strong className="text-gray-700">Título original:</strong> {t.tituloOriginal}
                {t.idioma && ` (${t.idioma})`}
              </>
            )}
          </p>
          {t.blocos.map((b, j) => (
            <Bloco key={j} b={b} />
          ))}
          <p className="text-gray-500 text-sm leading-relaxed mt-6 italic">{t.credito}</p>
        </div>
      ))}
    </section>

    {(artigo.relacionados.length > 0 || artigo.ponte.length > 0) && (
      <aside className="mt-10 border-l-4 border-montessori-gold bg-montessori-green/5 rounded-sm p-5 sm:p-6">
        <p className="font-serif text-lg sm:text-xl text-montessori-green leading-snug mb-3">Para continuar</p>
        <ul className="list-none space-y-2">
          {artigo.relacionados.map((r) => (
            <li key={r.slug}>
              <Link
                to={`/blog/${r.slug}`}
                className="inline-flex items-center gap-2 min-h-[44px] text-montessori-green font-semibold underline hover:no-underline"
              >
                {r.titulo}, de Maria Montessori ({r.ano})
                <ArrowRight size={16} className="shrink-0" />
              </Link>
            </li>
          ))}
          {artigo.ponte.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="inline-flex items-center gap-2 min-h-[44px] text-montessori-green font-semibold underline hover:no-underline"
              >
                {l.label}
                <ArrowRight size={16} className="shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    )}
  </BlogLayout>
);
