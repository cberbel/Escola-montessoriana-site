import React from 'react';
import { Section } from './ui/Section';
import { Heart, Users, Clock, Globe, TreePine, Calendar, Home, Music } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/tracking';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Heart size={32} />,
      title: "A escola mais acolhedora que você já viu",
      description: "Ambiente preparado com cuidado e atenção para cada criança"
    },
    {
      icon: <Users size={32} />,
      title: "Uma professora para cada 3 bebês menores de 18 meses de idade",
      description: "Cuidado personalizado, respeitando o ritmo e os interesses da criança"
    },
    {
      icon: <Clock size={32} />,
      title: "Movimento livre e escolha das atividades",
      description: "Liberdade para exploração e desenvolvimento natural"
    },
    {
      icon: <Globe size={32} />,
      title: "Imersão no aprendizado de inglês",
      description: "Aprendizado natural através da vivência diária"
    },
    {
      icon: <TreePine size={32} />,
      title: "Contato com a Natureza",
      description: "Área ao ar livre com tanque de areia e atividades na natureza"
    },
    {
      icon: <Calendar size={32} />,
      title: "Flexibilidade de horários",
      description: "Adaptamos nossos horários às necessidades da sua família. Funcionamos das 7h30 às 19h."
    }
  ];

  const activities = [
    "Capoeira",
    "Musicalização",
    "Permacultura",
    "Psicomotricidade",
    "Artes",
    "Contação de histórias"
  ];

  return (
    <Section id="benefits" className="bg-white">
      <div className="text-center mb-10 sm:mb-16">
        <span className="text-montessori-green uppercase tracking-widest font-bold text-xs mb-2 block">
          Benefícios
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-montessori-green mb-4 sm:mb-6 px-1 break-words">
          Conheça todos os benefícios que a Escola Montessoriana oferece para sua família
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16 min-w-0">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-montessori-cream p-5 sm:p-6 rounded-sm border border-montessori-green/10 hover:shadow-lg transition-shadow min-w-0 break-words">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-montessori-green/10 border-2 border-yellow-400 flex items-center justify-center text-montessori-green mb-3 sm:mb-4 mx-auto [&>svg]:w-7 [&>svg]:h-7 sm:[&>svg]:w-8 sm:[&>svg]:h-8">
              {benefit.icon}
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-montessori-green mb-2 sm:mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* Espaços e Atividades */}
      <div className="bg-montessori-green/5 rounded-sm p-6 sm:p-8 md:p-12 border border-montessori-green/10 min-w-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <Home size={24} className="sm:w-7 sm:h-7 text-montessori-green shrink-0" />
              <h3 className="font-serif text-xl sm:text-2xl text-montessori-green">Espaços Amplos</h3>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              Concentração, liberdade para exploração e acolhimento
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              Área ao ar livre com tanque de areia
            </p>
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <Music size={24} className="sm:w-7 sm:h-7 text-montessori-green shrink-0" />
              <h3 className="font-serif text-xl sm:text-2xl text-montessori-green">Atividades Extras</h3>
            </div>
            <div className="flex flex-wrap gap-2 min-w-0">
              {activities.map((activity, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white border border-yellow-400 rounded-sm text-base text-montessori-green font-medium"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-10 sm:mt-12">
          <p className="text-montessori-green font-semibold mb-4">Vagas limitadas para 2026</p>
          <a
            href="https://wa.me/5521993311000?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20vagas%20e%20agendar%20uma%20visita."
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-md hover:shadow-lg"
          >
            Garantir minha vaga – Falar no WhatsApp
          </a>
        </div>
      </div>
    </Section>
  );
};







