import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';

const topics = [
  {
    image: '/images/turmas/agrupada-2.jpg',
    alt: 'Niña concentrada construyendo la torre rosa en el salón Montessori',
    position: 'center 32%',
    title: 'El método Montessori',
    text: 'Por qué el descubrimiento de Maria Montessori sigue vigente después de más de un siglo, y qué cambia, en la práctica, en la vida de tu hijo.',
    to: '/es/metodo-montessori',
  },
  {
    image: '/images/turmas/agrupada-1.jpg',
    alt: 'Bebé sonriente en la estructura de psicomotricidad de la escuela',
    position: 'center 40%',
    title: 'Acogida',
    text: 'La seguridad emocional es la base del desarrollo: un período de adaptación respetuoso, muchos mimos y flexibilidad para la familia. Por qué la acogida viene antes que cualquier enseñanza.',
    to: '/es/acogida',
  },
  {
    image: '/images/montessori/sensorial-encaixes.jpg',
    alt: 'Niño trabajando con los cilindros sensoriales Montessori',
    position: 'center 45%',
    title: 'Los primeros años y el cerebro',
    text: 'Más de 1 millón de conexiones nuevas por segundo: qué construye la arquitectura del cerebro de tu hijo, y por qué la elección de la escuela importa más que la distancia de casa.',
    to: '/es/el-cerebro-de-tu-hijo',
  },
  {
    image: '/images/cerebro/leitura-bebes.jpg',
    alt: 'Maestra leyendo un cuento a tres bebés sentados a su alrededor',
    position: 'center 40%',
    title: 'Inglés en la primera infancia',
    text: 'Los primeros años son una ventana única para incorporar otro idioma sin esfuerzo, con beneficios cognitivos que duran toda la vida.',
    to: '/es/inmersion-en-ingles',
  },
  {
    image: '/images/natureza/horta-plantar.jpg',
    alt: 'Niño plantando en la huerta de la escuela',
    position: 'center',
    title: 'Alimentación saludable',
    text: 'Comida de verdad: sin aceites de semillas, sal refinada ni azúcar. Los niños almuerzan juntos y comen solos: la hora de la comida también es parte de la educación.',
    to: '/es/acogida#food',
  },
  {
    image: '/images/natureza/grupo-natureza.jpg',
    alt: 'Grupo de niños con coronas de hojas en el área verde de la escuela',
    position: 'center 30%',
    title: 'Naturaleza y educación cósmica',
    text: 'Un espacio amplio y arbolado, y clases de permacultura con huerta y lombricario: cómo la naturaleza forma la inteligencia y el sentido de pertenencia al mundo.',
    to: '/es/naturaleza-educacion-cosmica',
  },
];

export const SaibaMaisEs: React.FC = () => (
  <Section id="learn-more" className="bg-montessori-green/5 border-t border-montessori-green/10">
    <div className="text-center mb-8 sm:mb-14 min-w-0">
      <div className="w-16 h-1.5 bg-montessori-gold rounded-full mx-auto mb-5 sm:mb-6" />
      <span className="text-montessori-gold uppercase tracking-[0.2em] font-bold text-xs sm:text-sm mb-3 block">
        Elige con tranquilidad
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-montessori-green px-1 break-words leading-tight">
        Lo que toda familia debería saber antes de elegir una escuela
      </h2>
      <p className="sm:hidden text-montessori-green/60 text-sm mt-4">Desliza para ver todos →</p>
    </div>

    <div className="max-w-5xl mx-auto min-w-0">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
        {topics.map((topic) => (
          <Link
            key={topic.to}
            to={topic.to}
            className="group snap-center shrink-0 basis-[85%] sm:basis-auto bg-montessori-cream border border-montessori-green/10 rounded-sm overflow-hidden hover:shadow-lg hover:border-montessori-green/30 transition-all min-w-0 break-words flex flex-col"
          >
            <div className="overflow-hidden">
              <img
                src={topic.image}
                alt={topic.alt}
                loading="lazy"
                style={{ objectPosition: topic.position }}
                className="w-full h-[44vh] sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-montessori-green mb-2 sm:mb-3">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4 flex-grow">
                {topic.text}
              </p>
              <span className="inline-flex items-center gap-1.5 text-montessori-green font-semibold group-hover:gap-3 transition-all">
                Conoce más
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </Section>
);
