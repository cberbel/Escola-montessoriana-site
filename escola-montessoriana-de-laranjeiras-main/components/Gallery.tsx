import React from 'react';
import { Section } from './ui/Section';

export const Gallery: React.FC = () => {
  return (
    <Section id="structure" className="bg-stone-50">
      <div className="mb-10 sm:mb-16 text-center min-w-0">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-montessori-green mb-4 sm:mb-6 px-1 break-words">
          Não parece uma escola. <br/>
          <span className="italic text-montessori-stone font-light">Parece uma extensão da sua casa.</span>
        </h2>
        <p className="font-sans text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-1">
          Projetamos cada detalhe para que a criança seja protagonista. Com um ambiente preparado para a liberdade de movimento e materiais que estimulam os sentidos, oferecemos um refúgio verde que contrasta com o ritmo da cidade.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 min-h-0 min-w-0 lg:min-h-[600px] lg:auto-rows-fr">
        {/* Large item */}
        <div className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-sm group bg-gray-200 min-h-[200px] sm:min-h-[300px] lg:min-h-0">
          <img 
            src="/images/ambiente-preparado.png" 
            alt="Brincadeira ao ar livre" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-0"
            loading="lazy"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              if (el.dataset.fallbackUsed) return;
              el.dataset.fallbackUsed = '1';
              el.src = "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800";
              el.alt = "Sala de aula montessoriana ampla";
            }}
          />
          <div className="absolute bottom-0 left-0 p-3 sm:p-4 bg-white/90 m-3 sm:m-4 rounded-sm border-l-4 border-yellow-400 min-w-0">
            <p className="font-serif text-montessori-green font-semibold text-base break-words">Brincadeira ao ar livre</p>
          </div>
        </div>

        {/* Atividades - mesmo tamanho que Momentos de Alegria */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-sm group h-56 sm:h-64 lg:min-h-[250px] bg-gray-200">
          <img 
            src="/images/Crianca-brincando.jpg" 
            alt="Criança brincando" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[200px] sm:min-h-[250px]"
            loading="lazy"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              if (el.dataset.fallbackUsed) return;
              el.dataset.fallbackUsed = '1';
              el.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600";
            }}
          />
          <div className="absolute bottom-0 left-0 p-3 sm:p-4 bg-white/90 m-3 sm:m-4 rounded-sm border-l-4 border-yellow-400 min-w-0">
            <p className="font-serif text-montessori-green font-semibold text-base break-words">Atividades lúdicas</p>
          </div>
        </div>
        <div className="lg:col-span-2 relative overflow-hidden rounded-sm group h-56 sm:h-64 lg:min-h-[250px] bg-gray-200">
           <img 
            src="/images/espaco.png" 
            alt="Espaço da escola" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[200px] sm:min-h-[250px]"
            loading="lazy"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              if (el.dataset.fallbackUsed) return;
              el.dataset.fallbackUsed = '1';
              el.src = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600";
              el.alt = "Criança concentrada";
            }}
          />
          <div className="absolute bottom-0 left-0 p-3 sm:p-4 bg-white/90 m-3 sm:m-4 rounded-sm border-l-4 border-yellow-400 min-w-0">
            <p className="font-serif text-montessori-green font-semibold text-base break-words">Ambiente de Aprendizagem</p>
          </div>
        </div>
        <div className="lg:col-span-2 relative overflow-hidden rounded-sm group h-56 sm:h-64 lg:min-h-[250px] bg-gray-200">
           <img 
            src="/images/crianca-rindo.png" 
            alt="Criança rindo" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[200px] sm:min-h-[250px]"
            loading="lazy"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              if (el.dataset.fallbackUsed) return;
              el.dataset.fallbackUsed = '1';
              el.src = "https://images.unsplash.com/photo-1564429237666-857e49eb7e77?w=800";
              el.alt = "Criança lendo na janela";
            }}
          />
          <div className="absolute bottom-0 left-0 p-3 sm:p-4 bg-white/90 m-3 sm:m-4 rounded-sm border-l-4 border-yellow-400 min-w-0">
            <p className="font-serif text-montessori-green font-semibold text-base break-words">Momentos de Alegria</p>
          </div>
        </div>
        <div className="lg:col-span-2 relative overflow-hidden rounded-sm group h-56 sm:h-64 lg:min-h-[250px] bg-gray-200">
           <img 
            src="/images/espaco-2.png" 
            alt="Musicalização com as crianças"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[200px] sm:min-h-[250px]"
            loading="lazy"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              if (el.dataset.fallbackUsed) return;
              el.dataset.fallbackUsed = '1';
              el.src = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600";
              el.alt = "Espaço da escola";
            }}
          />
          <div className="absolute bottom-0 left-0 p-3 sm:p-4 bg-white/90 m-3 sm:m-4 rounded-sm border-l-4 border-yellow-400 min-w-0">
            <p className="font-serif text-montessori-green font-semibold text-base break-words">Musicalização</p>
          </div>
        </div>
      </div>
    </Section>
  );
};