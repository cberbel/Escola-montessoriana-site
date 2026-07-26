import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Calendar, Clock } from 'lucide-react';
import { usePageMeta } from '../components/landing/Landing';
import { trackWhatsAppClick } from '../utils/tracking';
import { blogPosts } from './blog/posts';

export const Blog: React.FC = () => {
  usePageMeta(
    'Blog | Escola Montessoriana de Laranjeiras',
    'Artigos sobre método Montessori, desenvolvimento infantil, bilinguismo e escolha de escola, escritos pela equipe da Escola Montessoriana de Laranjeiras.'
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0 text-center">
          <span className="block text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-3">
            Blog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-5 break-words">
            Um espaço para pensar a infância
          </h1>
          <p className="font-sans text-lg sm:text-xl text-montessori-cream/90 leading-relaxed">
            Educação, desenvolvimento infantil e a arte de criar filhos com presença — escrito pela Equipe Escola
            Montessoriana, que vive isso todos os dias.
          </p>
        </div>
      </div>

      {/* Lista de artigos */}
      <section className="px-4 sm:px-6 md:px-12 py-10 sm:py-14 overflow-x-hidden">
        <div className="max-w-5xl mx-auto min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-montessori-green/10 rounded-sm shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <h2 className="font-serif text-xl text-montessori-green leading-snug mb-2 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readingTime} de leitura · {post.dateDisplay}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram + visita */}
      <section className="px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0 text-center bg-montessori-green text-white rounded-sm p-8 sm:p-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-3 break-words">Acompanhe de perto</h2>
          <p className="text-montessori-cream/90 text-base sm:text-lg mb-7 leading-relaxed">
            Siga nosso dia a dia no Instagram e, se quiser conhecer a escola pessoalmente, agende uma visita — é a
            melhor forma de entender o que fazemos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="https://www.instagram.com/escola_montessoriana/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 bg-montessori-gold text-montessori-dark font-semibold rounded-sm hover:bg-[#c5a805] transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <Instagram size={20} />
              Seguir no Instagram
            </a>
            <a
              href="https://wa.me/5521993311000?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20%C3%A0%20Escola%20Montessoriana."
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              <Calendar size={20} strokeWidth={2} />
              Agendar uma visita
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
