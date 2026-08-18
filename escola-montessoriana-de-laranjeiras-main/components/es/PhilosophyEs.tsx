import React from 'react';
import { Focus, Sun, Heart, Hand, BookOpen, Compass, Globe } from 'lucide-react';
import { Section } from '../ui/Section';
import { trackWhatsAppClick } from '../../utils/tracking';

export const PhilosophyEs: React.FC = () => {
  const traits = [
    {
      icon: <Globe size={32} />,
      title: 'Con inglés fluido para toda la vida',
      text: 'Vive en inglés todos los días, por inmersión, a la edad en que el cerebro absorbe los idiomas sin esfuerzo. Lo que hoy empieza como juego se convierte en una fluidez natural para toda la vida: sin acento y sin tener que ponerse al día con cursos de inglés más adelante.'
    },
    {
      icon: <Focus size={32} />,
      title: 'Que se concentra',
      text: 'Se mete de lleno en lo que está haciendo y no lo suelta hasta terminarlo. La concentración profunda es la base de todo aprendizaje, y se construye día a día en un ambiente preparado para eso.'
    },
    {
      icon: <Sun size={32} />,
      title: 'Seguro de sí mismo',
      text: 'Confía en su propia capacidad porque hace las cosas por sí mismo. Cada desafío superado a su propio ritmo, sin apuros ni comparaciones, fortalece la confianza para enfrentar el siguiente.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Amable',
      text: 'Trata a sus compañeros, a los adultos y al ambiente con cuidado y respeto. La cortesía no se impone: nace de la vida en una comunidad donde el niño recibe el mismo respeto que aprende a dar.'
    },
    {
      icon: <Hand size={32} />,
      title: 'Autónomo en el día a día',
      text: 'Se viste, come solo, ordena sus cosas y cuida el espacio que lo rodea. La autonomía práctica le da al niño el orgullo genuino de quien puede valerse por sí mismo y además ayudar a los demás.'
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Que disfruta aprender',
      text: 'Aprende porque quiere, siguiendo la curiosidad natural de todo niño. Cuando el aprendizaje nace del interés, no necesita premios ni presiones — y dura toda la vida.'
    },
    {
      icon: <Compass size={32} />,
      title: 'Con disciplina interior',
      text: 'Elige, empieza y termina lo que se propone. La verdadera disciplina no viene de afuera, de la obediencia: viene de adentro, del hábito de actuar con propósito y libertad dentro de límites.'
    }
  ];

  return (
    <Section id="method" className="bg-montessori-cream">
      <div className="text-center mb-10 sm:mb-14 min-w-0">
        <span className="text-montessori-green tracking-widest font-bold text-sm sm:text-base mb-2 block">
          La filosofía Montessori
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-montessori-green mb-4 sm:mb-6">
          Educación para la vida real, al ritmo de cada niño
        </h2>
        <p className="font-sans text-lg md:text-xl text-montessori-dark font-semibold max-w-2xl mx-auto px-1 leading-relaxed">
          En Montessori, el niño aprende siguiendo sus intereses, en un ambiente preparado para el desarrollo infantil.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center max-w-5xl mx-auto mb-12 sm:mb-16 min-w-0">
        <div className="relative overflow-hidden rounded-sm shadow-lg border-l-4 border-montessori-gold min-w-0">
          <img
            src="/images/Crianca-brincando.jpg"
            alt="Niños con los brazos en alto, encantados, persiguiendo burbujas de jabón en el patio de la escuela"
            loading="lazy"
            style={{ objectPosition: 'center 30%' }}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>
        <div className="min-w-0 px-1 text-left">
          <h3 className="font-serif text-2xl sm:text-3xl text-montessori-green mb-3 sm:mb-4">
            ¿En quién se convierte tu hijo en la escuela Montessori trilingüe?
          </h3>
          <p className="font-sans text-lg md:text-xl text-montessori-dark leading-relaxed">
            Maria Montessori descubrió que, en el ambiente adecuado, cada niño revela lo mejor de sí.
            En nuestra escuela — desde el maternal, a partir de los 9 meses, hasta la primaria —, esa
            transformación ocurre día a día, y los padres reconocen en casa a un niño:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto min-w-0">
        {traits.map((trait, index) => (
          <div key={index} className="flex flex-col items-center text-center group min-w-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center text-montessori-green mb-4 sm:mb-6 shadow-sm group-hover:bg-montessori-green group-hover:text-yellow-400 transition-colors duration-300 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-[32px] sm:[&>svg]:h-[32px]">
              {trait.icon}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-3 sm:mb-4">
              {trait.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-base break-words">
              {trait.text}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 sm:mt-16">
        <a
          href="https://wa.me/5521992973454?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20Escola%20Montessoriana%20de%20Laranjeiras."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('filosofia')}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-md hover:shadow-lg"
        >
          Quiero saber más
        </a>
      </div>
    </Section>
  );
};
