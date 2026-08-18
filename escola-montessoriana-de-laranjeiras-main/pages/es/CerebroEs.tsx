import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEs, LandingCTAEs } from '../../components/landing/LandingEs';
import { SynapseDiagram } from '../../components/landing/SynapseDiagram';
import { SensitivePeriodsChart } from '../../components/landing/SensitivePeriodsChart';

export const CerebroEs: React.FC = () => {
  usePageMeta(
    'Los primeros años y el cerebro | Escola Montessoriana de Laranjeiras',
    'La ciencia de la primera infancia: la arquitectura cerebral, las investigaciones de Fernald, Kuhl y Charles Nelson sobre lenguaje, movimiento y apego — y por qué la elección de la escuela importa más que la distancia de casa.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEs
        eyebrow="Los primeros años"
        title="La ventana que no vuelve"
        subtitle="Lo que ocurre en el cerebro de tu hijo ahora mismo construye la base de todo lo que viene después. En los primeros años de vida se forman hasta 1 millón de conexiones neuronales nuevas por segundo — ninguna otra etapa de la vida se le acerca."
      />

      <LandingSection heading="La arquitectura se construye una sola vez" className="pt-10 sm:pt-14">
        <P>
          El cerebro de un recién nacido pesa unos 350–400 g — cerca del 25% de su peso adulto (alrededor de 1,3 a
          1,4 kg) — y sin embargo ya contiene prácticamente todas las neuronas que esa persona tendrá en la vida, unas
          86 mil millones. El crecimiento que sigue no consiste en crear más neuronas: consiste en conectarlas.
        </P>
        <P>
          Ese crecimiento es impresionante. Al año, el cerebro ya alcanzó cerca del 70% de su peso adulto; a los 3,
          alrededor del 80%; a los 5, cerca del 90%. Buena parte de la arquitectura cerebral que una persona usará
          toda su vida queda, literalmente, armada antes de que aprenda a leer.
        </P>
        <SynapseDiagram />
        <P>
          Como una casa, después se puede remodelar. Pero los cimientos se ponen una sola vez. Por eso el Center on
          the Developing Child de Harvard — la referencia mundial en ciencia del desarrollo infantil — describe este
          proceso como "arquitectura cerebral": un edificio que se construye de abajo hacia arriba, y cuya calidad
          estructural depende directamente de la calidad de las experiencias vividas en estos primeros años.
        </P>
        <LandingImage src="/images/cerebro/bebe-material.jpg" alt="Niño de un año concentrado encajando discos de colores en pernos de madera, en el salón" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Cada encaje, una conexión: así, a través de la mano, se construye la arquitectura.
        </p>
      </LandingSection>

      <LandingSection heading='"Las habilidades generan habilidades": por qué el atraso se acumula' className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Uno de los hallazgos más importantes de la economía de la educación — del economista James Heckman — es
          que la habilidad genera más habilidad, y la motivación genera más motivación. Capacidades fundamentales como la
          atención, la autorregulación y la comunicación, construidas en los primeros años, son la base sobre la que
          después se apoyan habilidades más complejas: el razonamiento, la lectura, las relaciones sociales.
        </P>
        <P>
          Lo inverso también es cierto, y ahí está la urgencia: un cerebro que no recibió suficientes estímulos
          temprano no arranca de cero más tarde — arranca desde atrás, tratando de construir el segundo piso sin tener
          listo el primero. Cada año de atraso se vuelve más caro y más difícil de recuperar que el anterior.
        </P>
        <LandingImage src="/images/cerebro/bebe-encaixes.jpg" alt="Bebé concentrado encajando bloques geométricos de colores en una base de madera" portrait />
        <Highlight>
          No se trata de apurar la infancia. Se trata de no perder la ventana en la que estos cimientos se construyen
          con el menor esfuerzo — porque eso es exactamente lo que el cerebro está diseñado para hacer a esta edad.
        </Highlight>
      </LandingSection>

      <LandingSection heading="El papel del lenguaje">
        <P>
          La investigadora Anne Fernald, de Stanford, demostró algo notable: los bebés que escuchan más lenguaje
          dirigido a ellos — no solo a su alrededor, sino directamente, en conversación real — procesan las palabras
          más rápido y con más eficiencia a los 18 meses. Esa velocidad de procesamiento, medida en laboratorio,
          predice el tamaño del vocabulario años después. La diferencia no es inteligencia innata: es la cantidad y la
          calidad de la conversación vivida.
        </P>
        <P>
          Patricia Kuhl, de la Universidad de Washington, descubrió algo igual de importante sobre el "cuándo". Los
          bebés nacen como lo que ella llama "ciudadanos del mundo", capaces de distinguir los sonidos de cualquier
          lengua humana. Alrededor de los 10–12 meses, esa capacidad se especializa en los sonidos del idioma que
          escuchan — una ventana que se va cerrando progresivamente. Y en un experimento célebre, Kuhl demostró que
          los bebés expuestos a un idioma nuevo por una persona presente aprendían sus sonidos — mientras que los
          bebés expuestos al mismo contenido en video, solos, no aprendían nada. La pantalla no reemplaza la
          interacción social real.
        </P>
        <P>
          Es por esa misma ventana — la que midió Kuhl — que la inmersión en inglés marca tanta diferencia cuando
          empieza temprano, con una persona real y no con una app.{' '}
          <Link to="/es/inmersion-en-ingles" className="text-montessori-green font-semibold underline hover:no-underline">
            Mira por qué el inglés en la primera infancia es tan poderoso
          </Link>.
        </P>
        <P>
          Y el lenguaje no es el único con fecha límite. Cada gran función cerebral — los sentidos, el lenguaje, las
          funciones cognitivas superiores — tiene su propia ventana de mayor facilidad, y todas se concentran en los
          primeros años de vida:
        </P>
        <SensitivePeriodsChart />
        <LandingImage src="/images/cerebro/leitura-bebes.jpg" alt="Maestra leyendo un libro ilustrado a tres bebés sentados a su alrededor en el salón" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          Lenguaje de verdad: una persona real, un libro y bebés respondiendo — el "servir y devolver" en acción.
        </p>
        <Highlight>
          Escuchar no alcanza: el cerebro del bebé aprende el lenguaje en relación con otra persona, en vivo,
          respondiendo y recibiendo respuesta — por eso se le llama "servir y devolver".
        </Highlight>
      </LandingSection>

      <LandingSection heading="El papel del movimiento">
        <P>
          Maria Montessori afirmó, hace un siglo, que el movimiento y la inteligencia están profundamente ligados — y
          la neurociencia lo confirmó. Gatear, trepar, equilibrarse y manipular objetos con las propias manos no es
          solo desarrollo físico: es construcción cognitiva. El cerebelo, tradicionalmente asociado solo a la
          coordinación motora, también participa activamente en funciones como el lenguaje, la atención y la
          planificación.
        </P>
        <P>
          Por eso un ambiente que restringe el movimiento — más sillas, más pantallas, menos exploración libre — no le
          ahorra energía al niño para "cosas más importantes". Le quita al cerebro justamente uno de los combustibles
          que más necesita a esta edad.
        </P>
        <LandingImagePair
          images={[
            { src: '/images/cerebro/bebes-escada.jpg', alt: 'Tres bebés sonriendo en lo alto de la escalera Montessori de madera, dentro del salón' },
            { src: '/images/cerebro/patio-musica.jpg', alt: 'Clase de movimiento y música en el patio techado, con bebés, maestras y árboles al fondo' },
          ]}
          caption="Trepar, bailar, equilibrarse: el movimiento es combustible para el cerebro — en el salón y en el patio."
        />
      </LandingSection>

      <LandingSection heading="El papel del apego" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          La evidencia más contundente sobre la importancia de los vínculos afectivos viene del trabajo del
          investigador de Harvard Charles Nelson en el Bucharest Early Intervention Project. El estudio siguió a niños
          rumanos criados en orfanatos — instituciones que daban comida, higiene y techo, pero muy poca atención
          individualizada y afecto receptivo. El resultado: esos niños mostraban un volumen cerebral reducido y
          alteraciones medibles en la actividad eléctrica del cerebro, comparados con niños criados en familias.
        </P>
        <P>
          El hallazgo más importante para una familia que decide hoy: los niños trasladados a un hogar afectuoso y
          receptivo antes de los 2 años recuperaron buena parte del desarrollo perdido. Los trasladados más tarde, no.
          No fue la falta de comida o de techo lo que dañó el desarrollo cerebral — fue la ausencia de un adulto
          respondiéndole, de forma consistente e individual, a cada uno de ellos.
        </P>
        <Highlight>
          "Estar bien cuidado" no es lo mismo que tener el desarrollo nutrido. La pregunta que importa no es si tu
          hijo está seguro y alimentado — es si alguien está genuinamente presente, respondiéndole, todos los días.
        </Highlight>
      </LandingSection>

      <LandingSection heading={'"Pero hay una guardería a la vuelta de casa..."'}>
        <P>
          Es la duda más honesta que escuchamos — y merece una respuesta honesta. La comodidad importa, sobre todo en
          la rutina cargada de los padres con hijos pequeños. Pero a la luz de lo que la ciencia muestra sobre la
          arquitectura cerebral, las ventanas únicas y el papel del apego, vale la pena poner las dos cosas en la
          balanza:
        </P>
        <Bullets
          items={[
            <><strong>Haz la cuenta de las horas.</strong> Diez o quince minutos más de trayecto — contra 8, 9, 10 horas al día que tu hijo vive dentro de la escuela. ¿Qué pesa más en su vida: los pocos minutos en el auto, o las miles de horas de experiencias construyendo su cerebro?</>,
            <><strong>Esta ventana no vuelve.</strong> Como mostró el trabajo de Charles Nelson, cuanto antes llega el ambiente adecuado, mayor es la recuperación posible — y lo inverso también vale. Las habilidades generan habilidades: lo que no se construye ahora se vuelve más difícil de construir después.</>,
            <><strong>"Bien cuidado" no es lo mismo que desarrollándose.</strong> Un lugar limpio y amable es lo mínimo. La pregunta correcta es: ¿qué pasa con el lenguaje, el movimiento y el apego de mi hijo durante las 8 horas al día que pasa ahí?</>,
          ]}
        />
        <P>
          Y la logística tiene solución: abrimos de 7:30 a 19:00, con horarios flexibles que se adaptan a la rutina de
          la familia — en Laranjeiras, a minutos de Cosme Velho, Flamengo, Botafogo y Catete.
        </P>
      </LandingSection>

      <LandingSection heading="Qué hacemos con esta ventana">
        <Bullets
          items={[
            'Una maestra por cada 3 bebés menores de 18 meses: cada balbuceo, cada intento, encuentra a un adulto que observa y responde.',
            'Inmersión diaria en inglés con docentes nativos y bilingües, en el pico de la ventana del lenguaje — por "servir y devolver", no por pantallas.',
            'Un ambiente Montessori preparado: movimiento libre, materiales concretos para manipular — cero pantallas.',
            'Observación individual: a cada niño se lo acompaña a su propio ritmo, con registros reales de su desarrollo.',
          ]}
        />
      </LandingSection>

      <LandingCTAEs
        heading="Decide con tus propios ojos"
        text="Visita la escuela, observa los salones funcionando y compara. Tu hijo tiene una sola primera infancia — elige qué va a construir."
      />
    </div>
  );
};
