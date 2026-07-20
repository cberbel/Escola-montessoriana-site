import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { trackWhatsAppClick } from '../utils/tracking';
import { MapPin, Instagram, Mail } from 'lucide-react';

const WhatsAppIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const Main: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-montessori-dark overflow-x-hidden min-w-0 w-full">
      <Navbar />

      <main className="flex-grow min-w-0 w-full">
        <Outlet />
      </main>

      <FloatingWhatsApp />

      <footer className="bg-montessori-green text-white py-12 sm:py-16 border-t border-white/10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 min-w-0">
          <div className="space-y-4 min-w-0">
            <h3 className="font-serif text-xl sm:text-2xl tracking-wide text-white/95 font-medium">
              Escola Montessoriana <br />
              de Laranjeiras
            </h3>
            <p className="text-amber-200/95 text-base sm:text-lg font-normal max-w-xs leading-relaxed">
              Ajudando as crianças a construirem os homens e mulheres nos quais se transformarão.
            </p>
            <div className="pt-4">
              <iframe
                title="Localização da Escola Montessoriana de Laranjeiras"
                src="https://maps.google.com/maps?q=Rua%20das%20Laranjeiras%2C%20540%2C%20fundos%2C%20Laranjeiras%2C%20Rio%20de%20Janeiro%20-%20RJ&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="200"
                className="rounded-lg shadow-md border-0 w-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Escola+Montessoriana+de+Laranjeiras+Rio+de+Janeiro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-gray-300 hover:text-yellow-400 transition-colors text-sm"
            >
              <span className="text-montessori-gold" aria-hidden="true">★★★★★</span>
              Nota 5,0 no Google
            </a>
          </div>

          <div className="space-y-4 min-w-0">
            <h4 className="font-bold uppercase tracking-widest text-montessori-gold text-base">Contato</h4>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+das+Laranjeiras,+540,+fundos,+Laranjeiras,+Rio+de+Janeiro+-+RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start space-x-3 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <MapPin size={20} className="mt-1 shrink-0 text-yellow-400" />
              <span>Rua das Laranjeiras, 540, fundos<br />Laranjeiras, Rio de Janeiro - RJ</span>
            </a>
            <a
              href="https://wa.me/5521964551080"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <WhatsAppIcon size={20} className="text-yellow-400 shrink-0" />
              <span>+55 (21) 96455-1080</span>
            </a>
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail size={20} className="text-yellow-400" />
              <span className="text-base break-all">contato@escolamontessoriana.com.br</span>
            </div>
          </div>

          <div className="space-y-4 min-w-0">
            <h4 className="font-bold uppercase tracking-widest text-montessori-gold text-base">Acompanhe</h4>
            <a
              href="https://www.instagram.com/escola_montessoriana/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <Instagram size={20} className="text-yellow-400" />
              <span>@escola_montessoriana</span>
            </a>
            <p className="text-sm text-gray-500 mt-8">
              © {new Date().getFullYear()} Escola Montessoriana de Laranjeiras. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
