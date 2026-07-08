import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/tracking';

export const AgendamentoContato: React.FC = () => (
  <div className="bg-montessori-green text-white rounded-sm shadow-lg p-6 sm:p-8 md:p-12 min-w-0 overflow-hidden">
    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center mb-6 sm:mb-8 text-montessori-gold break-words">
      Entre em Contato
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 min-w-0">
      <a
        href="https://wa.me/5521993311000"
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsAppClick}
        className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-sm p-6 hover:bg-white hover:bg-opacity-20 transition-all group min-w-0 break-words min-h-[44px] flex flex-col touch-manipulation"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0">
            <MessageCircle size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-white mb-1">WhatsApp</h3>
            <p className="text-base text-gray-300">Fale conosco agora</p>
          </div>
        </div>
        <p className="text-gray-200 text-base group-hover:text-white transition-colors">
          Clique para iniciar uma conversa no WhatsApp
        </p>
      </a>
      <a
        href="https://www.instagram.com/escola_montessoriana/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-sm p-6 hover:bg-white hover:bg-opacity-20 transition-all group min-w-0 break-words min-h-[44px] flex flex-col touch-manipulation"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center shrink-0">
            <Instagram size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-white mb-1">Instagram</h3>
            <p className="text-base text-gray-300">@escola_montessoriana</p>
          </div>
        </div>
        <p className="text-gray-200 text-base group-hover:text-white transition-colors">
          Siga-nos e acompanhe nosso dia a dia
        </p>
      </a>
    </div>
  </div>
);
