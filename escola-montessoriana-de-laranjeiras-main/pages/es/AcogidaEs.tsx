import React from 'react';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEs, LandingCTAEs } from '../../components/landing/LandingEs';

export const AcogidaEs: React.FC = () => {
  usePageMeta(
    'Acogida | Escola Montessoriana de Laranjeiras',
    'Cuidado cálido y atento: la seguridad emocional como base del desarrollo, un período de adaptación al ritmo del niño, mucho afecto, flexibilidad para la familia y comida de verdad — sin aceites de semillas, sal refinada ni azúcar.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEs
        eyebrow="Acogida"
        title="Recibido de verdad: un niño solo florece cuando se siente seguro"
        subtitle="Antes que cualquier currículo está el afecto. Aquí, cada niño — y cada familia — es recibido con tiempo, respeto y cariño genuino."
      />

      <LandingSection heading="La seguridad es la base de todo desarrollo" className="pt-10 sm:pt-14">
        <P>
          Hay un orden en la naturaleza del niño que ninguna escuela debería ignorar: <strong>primero la seguridad,
          después el aprendizaje</strong>. Un niño que no se siente seguro vive en alerta: el cuerpo entra en modo de
          supervivencia, el famoso "luchar o huir". En ese estado, casi toda la energía del cerebro se va en
          defenderse de una amenaza, y no queda casi nada para explorar, concentrarse o aprender.
        </P>
        <P>
          Cuando el niño se siente acogido y seguro, pasa lo contrario: el cuerpo se relaja, sale del estado de
          alerta, y el cerebro queda libre para lo que de verdad importa a esta edad — descubrir el mundo, crear
          vínculos, concentrarse y desarrollar la inteligencia. Por eso la acogida no es un detalle lindo de nuestra
          rutina. Es la base de todo.
        </P>
        <Highlight>
          Ningún niño aprende con miedo. La seguridad emocional no es lo contrario del aprendizaje — es su condición.
        </Highlight>
        <LandingImagePair
          images={[
            { src: '/images/acolhimento/sorriso-professora.jpg', alt: 'Maestra y niño abrazados y sonrientes en el patio de la escuela' },
            { src: '/images/acolhimento/bebe-tranquilo.jpg', alt: 'Bebé tranquilo explorando un material en el salón, con las estanterías al fondo' },
          ]}
          caption="La sonrisa de un niño que se siente seguro — de ahí crece todo lo demás."
        />
      </LandingSection>

      <LandingSection heading="Una adaptación respetuosa: el niño marca el ritmo">
        <P>
          Llegar a un lugar nuevo, lleno de caras desconocidas, es mucho hasta para un adulto — imagínate para alguien
          que tiene uno, dos, tres años. Por eso nuestro período de adaptación nunca es forzado. No "arrancamos" al
          niño de los brazos de sus padres, ni ponemos la misma cuenta regresiva de días para todos.
        </P>
        <P>
          Hacemos lo contrario: <strong>seguimos al niño</strong>. El comienzo es gradual, con un adulto de confianza
          presente al principio, avanzando al ritmo de cada niño. Observamos las señales, respetamos el llanto como una
          forma legítima de comunicación y construimos confianza día a día. La adaptación no es el niño rindiéndose a
          la escuela — es la escuela ganándose, con paciencia, la confianza del niño.
        </P>
        <LandingImage src="/images/acolhimento/adaptacao-artes.jpg" alt="Bebé con delantal pintando junto a la maestra, que acompaña la actividad de cerca" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Un adulto de confianza bien cerca: así se construye la seguridad, un día a la vez.
        </p>
      </LandingSection>

      <LandingSection heading="Brazos, todos los que hagan falta" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Alzar a un niño en brazos no lo malcría, y no le estorba la independencia. Es exactamente al revés: el niño
          cuyas necesidades son atendidas — al que alzan cuando lo necesita, consuelan cuando llora, miran cuando
          llama — construye una seguridad interior que lo acompaña toda la vida.
        </P>
        <P>
          Y es desde esa base segura que nace el coraje de separarse, explorar y volverse independiente. Un niño solo
          se suelta con confianza cuando sabe que tiene adónde volver. Por eso, aquí, los brazos se toman en serio:
          son una inversión directa en la independencia que tanto valora el método Montessori.
        </P>
        <Highlight>
          La independencia no nace de negarle el consuelo al niño. Nace de saber que el consuelo siempre está ahí.
        </Highlight>
        <LandingImage src="/images/acolhimento/colo-patio.jpg" alt="Maestra de pie en el patio con un bebé en brazos, mirándose el uno al otro, con árboles al fondo" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Brazos de verdad, rodeados de verde: la base segura desde la que el niño sale al mundo.
        </p>
      </LandingSection>

      <LandingSection heading="Acogemos también a la familia">
        <P>
          Confiar tu hijo a otras manos es uno de los pasos más delicados que da una familia. Lo sabemos — y recibimos
          a los padres con el mismo cuidado con que recibimos a los niños. Para las familias hispanohablantes e
          internacionales: <strong>hablamos español e inglés</strong>, y varias de nuestras docentes son de lengua
          materna inglesa o bilingües.
        </P>
        <Bullets
          items={[
            <><strong>Opciones de frecuencia reducida:</strong> media jornada y días alternados, para las familias que quieren una transición más suave o una rutina más liviana.</>,
            <><strong>Horarios flexibles:</strong> adaptamos lo que podemos a la realidad de cada familia, en lugar de meter a todos en el mismo horario rígido.</>,
            <><strong>Comunicación abierta:</strong> sabes cómo fue el día de tu hijo, con transparencia y sin vueltas.</>,
            <><strong>Alianza, no reemplazo:</strong> la escuela camina junto a la familia, respetando las decisiones y el momento de cada casa.</>,
          ]}
        />
        <P>
          Acoger a la familia es parte de acoger al niño: un niño se relaja cuando siente que sus padres confían en el
          lugar donde está.
        </P>
      </LandingSection>

      <LandingSection id="food" heading="La comida también es cuidado">
        <P>
          Cuidar lo que entra al cuerpo de un niño es cuidar su ánimo, su sueño, su concentración y su salud. Por eso
          nos tomamos la comida tan en serio como los mimos. Servimos <strong>comida de verdad</strong>, cocinada con
          cariño: <strong>sin aceites de semillas, sin sal refinada y sin azúcar</strong>. En su lugar: ingredientes
          frescos e integrales, grasas de verdad y condimentos naturales.
        </P>
        <LandingImage src="/images/acolhimento/almoco-juntos.jpg" alt="Niños pequeños almorzando juntos en la mesa baja del salón, cada uno con su plato, con dos maestras cerca" />
        <P>
          Y la comida en sí es un momento de acogida y de aprendizaje. Los pequeños almuerzan juntos, en la mesa, a su
          propio ritmo. Aprenden a comer solos, a servirse, a probar sabores nuevos — con independencia y con gusto,
          sin presiones y sin negociar cada bocado. Comer bien, aquí, también es una forma de estar juntos y de cuidarse.
        </P>
        <LandingImage src="/images/acolhimento/almoco-bebes.jpg" alt="Bebés comiendo solos con sus cucharas en la mesa baja, acompañados de cerca por las maestras" />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Desde el grupo de bebés, cada uno con su plato y su cuchara: comer solo también es un logro.
        </p>
      </LandingSection>

      <LandingCTAEs
        heading="Ven a sentir la acogida en persona"
        text="El calor de una escuela no cabe en palabras — se siente en el aire, en el modo de alzar a un niño, en cómo te reciben. Agenda una visita y mira cómo acogen a tu hijo."
      />
    </div>
  );
};
