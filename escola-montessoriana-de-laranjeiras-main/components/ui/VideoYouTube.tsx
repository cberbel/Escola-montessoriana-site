import React, { useState } from 'react';
import { Foto } from './Foto';

/**
 * Vídeo do YouTube com "fachada": até o toque, só o poster (WebP leve) e um botão
 * de play — zero JavaScript do YouTube na página. Ao tocar, entra o iframe com
 * autoplay. Substitui os MP4 hospedados na Vercel (55 MB de depoimentos que cada
 * clique baixava inteiro no 4G; agora o YouTube entrega em streaming adaptativo).
 * Domínio youtube-nocookie.com: sem cookies de rastreio antes de dar play.
 */
export const VideoYouTube: React.FC<{
  id: string;
  poster: string;
  titulo: string;
  /** Rótulo acessível do botão de play (idioma da página). */
  rotuloPlay?: string;
  className?: string;
}> = ({ id, poster, titulo, rotuloPlay = 'Assistir ao depoimento', className = '' }) => {
  const [tocado, setTocado] = useState(false);
  if (tocado) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={titulo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={`w-full h-full border-0 ${className}`}
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setTocado(true)}
      aria-label={`${rotuloPlay}: ${titulo}`}
      className={`group relative block w-full h-full overflow-hidden focus:outline focus:ring-2 focus:ring-montessori-gold ${className}`}
    >
      <Foto src={poster} alt="" larguraMax={560} className="w-full h-full object-cover" />
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
      >
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#ff0000] shadow-lg group-hover:scale-105 transition-transform">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
};
