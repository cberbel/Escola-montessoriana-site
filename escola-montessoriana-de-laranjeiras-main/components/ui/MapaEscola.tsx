import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const EMBED =
  'https://maps.google.com/maps?q=Rua%20das%20Laranjeiras%2C%20540%2C%20fundos%2C%20Laranjeiras%2C%20Rio%20de%20Janeiro%20-%20RJ&t=&z=15&ie=UTF8&iwloc=B&output=embed';
const LINK = 'https://www.google.com/maps/search/?api=1&query=Escola+Montessoriana+de+Laranjeiras+Rio+de+Janeiro';

/**
 * Mapa do rodapé com "fachada": o iframe do Google Maps (perto de 1 MB de JS de
 * terceiros, carregado em TODAS as páginas) só entra quando alguém toca no mapa.
 * Até lá, um cartão leve com o endereço e o link para abrir no app do Maps.
 */
export const MapaEscola: React.FC<{ titulo: string; rotulo: string; abrir: string }> = ({ titulo, rotulo, abrir }) => {
  const [carregar, setCarregar] = useState(false);
  if (carregar) {
    return (
      <iframe
        title={titulo}
        src={EMBED}
        width="100%"
        height="200"
        className="rounded-lg shadow-md border-0 w-full"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }
  return (
    <div className="rounded-lg shadow-md w-full h-[200px] bg-white/10 border border-white/15 flex flex-col items-center justify-center gap-3 text-center px-4">
      <MapPin size={28} className="text-yellow-400" aria-hidden="true" />
      <p className="text-sm text-gray-200 leading-snug">Rua das Laranjeiras, 540, fundos<br />Laranjeiras, Rio de Janeiro</p>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={() => setCarregar(true)}
          className="text-sm font-semibold bg-white/15 hover:bg-white/25 text-white rounded-sm px-3 py-1.5 transition-colors"
        >
          {rotulo}
        </button>
        <a
          href={LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold bg-montessori-gold text-montessori-dark rounded-sm px-3 py-1.5 hover:bg-[#c5a805] transition-colors"
        >
          {abrir}
        </a>
      </div>
    </div>
  );
};
