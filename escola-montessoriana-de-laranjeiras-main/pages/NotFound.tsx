import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../components/landing/Landing';

/**
 * Página 404. O prerender grava esta tela em dist/404.html; a Vercel a serve com
 * status 404 para qualquer caminho inexistente. Também é o que aparece em
 * navegação interna para uma rota inválida.
 */
export const NotFound: React.FC = () => {
  usePageMeta(
    'Página não encontrada | Escola Montessoriana de Laranjeiras',
    'Esta página não existe ou mudou de endereço. Veja as páginas principais da Escola Montessoriana de Laranjeiras.'
  );
  return (
    <div className="bg-white">
      <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <span className="block text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-3">
            Erro 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">Esta página não existe</h1>
          <p className="font-sans text-lg sm:text-xl text-montessori-cream/90 leading-relaxed">
            O endereço pode ter sido digitado errado ou a página mudou de lugar. O que você procura provavelmente está aqui:
          </p>
        </div>
      </div>
      <section className="px-4 sm:px-6 md:px-12 py-10 sm:py-14">
        <ul className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-montessori-green text-lg">
          <li><Link className="font-semibold underline hover:no-underline" to="/">Página inicial</Link></li>
          <li><Link className="font-semibold underline hover:no-underline" to="/creche-laranjeiras">Creche em Laranjeiras (a partir de 9 meses)</Link></li>
          <li><Link className="font-semibold underline hover:no-underline" to="/turmas">Turmas: do berçário ao Fundamental</Link></li>
          <li><Link className="font-semibold underline hover:no-underline" to="/metodo-montessori">O Método Montessori</Link></li>
          <li><Link className="font-semibold underline hover:no-underline" to="/sobre">Sobre a escola e o fundador</Link></li>
          <li><Link className="font-semibold underline hover:no-underline" to="/blog">Blog</Link></li>
          <li><Link className="font-semibold underline hover:no-underline" to="/agendamento">Agendar uma visita</Link></li>
        </ul>
      </section>
    </div>
  );
};
