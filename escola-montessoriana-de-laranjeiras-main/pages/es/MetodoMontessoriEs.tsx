import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEs, LandingCTAEs } from '../../components/landing/LandingEs';

const Area: React.FC<{ title: string; children: React.ReactNode; materials?: string }> = ({ title, children, materials }) => (
  <div className="mb-8">
    <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2">{title}</h3>
    <div className="text-gray-700 text-base sm:text-lg leading-relaxed [&>p]:mb-3">{children}</div>
    {materials && (
      <p className="text-sm sm:text-base text-montessori-green/90 bg-montessori-green/5 border border-montessori-green/10 rounded-sm px-4 py-2.5 mt-3">
        <strong>En nuestro salón:</strong> {materials}
      </p>
    )}
  </div>
);

const alumni = [
  { name: 'Larry Page y Sergey Brin', role: 'fundadores de Google' },
  { name: 'Jeff Bezos', role: 'fundador de Amazon' },
  { name: 'Gabriel García Márquez', role: 'Premio Nobel de Literatura' },
  { name: 'Beyoncé', role: 'cantante y empresaria' },
  { name: 'Taylor Swift', role: 'cantautora' },
  { name: 'George Clooney', role: 'actor y productor' },
  { name: 'Stephen Curry', role: '4 veces campeón de la NBA' },
  { name: 'Anne Frank', role: 'escritora' },
  { name: 'Príncipes William y Harry', role: 'realeza británica' },
];

export const MetodoMontessoriEs: React.FC = () => {
  usePageMeta(
    'El método Montessori | Escola Montessoriana de Laranjeiras',
    'Conoce el método Montessori: Maria Montessori, los principios, el currículo (vida práctica, sensorial, lenguaje, matemática y educación cósmica), el ciclo de trabajo y qué cambia en el niño.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEs
        eyebrow="El Método"
        title="Montessori: una educación que respeta la inteligencia del niño"
        subtitle="Hace más de un siglo, una médica italiana descubrió que los niños aprenden mejor cuando el ambiente está preparado para ellos — y no cuando se los moldea para encajar en el ambiente. Ese descubrimiento cambió la educación en el mundo entero."
      />

      <LandingSection heading="Quién fue Maria Montessori" className="pt-10 sm:pt-14">
        <P>
          Maria Montessori (1870–1952) fue una de las primeras mujeres en graduarse como médica en Italia. Científica
          antes que educadora, hizo lo que nadie más estaba haciendo: observar a los niños con rigor científico, sin
          apuro y sin prejuicios. Lo que vio lo cambió todo: el niño no es un adulto en miniatura al que hay que
          "enseñarle" todo el tiempo, sino un ser que se construye a sí mismo, siempre que encuentre el ambiente
          adecuado para hacerlo.
        </P>
        <P>
          Nominada tres veces al Premio Nobel de la Paz, Maria Montessori vio su método extenderse a más de 140
          países. Más de un siglo después, la neurociencia sigue confirmando lo que ella descubrió observando:
          movimiento y aprendizaje van de la mano, los primeros años son decisivos y la concentración profunda es el
          motor del desarrollo.
        </P>
        <LandingImage src="/images/montessori/maria-montessori.jpg" alt="Maria Montessori en sus últimos años, sonriente, sentada en una escuela rodeada de niños" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Maria Montessori entre niños en Londres, 1946: una vida entera dedicada a la infancia.
        </p>
        <Highlight>
          "El niño no es un vaso que hay que llenar, sino una fuente que hay que dejar brotar." — Maria Montessori
        </Highlight>
      </LandingSection>

      <LandingSection heading="Los principios del método">
        <Bullets
          items={[
            <><strong>Ambiente preparado:</strong> todo en el salón — muebles, materiales, alturas — está pensado para que el niño lo use por sí solo, sin depender de un adulto a cada paso.</>,
            <><strong>Autonomía e independencia:</strong> el niño elige sus actividades y aprende a cuidar de sí mismo, de los demás y del espacio. La autoestima no se regala; se construye.</>,
            <><strong>Libertad con límites:</strong> la libertad no es ausencia de reglas — es poder elegir dentro de un marco claro y seguro que el niño entiende y respeta.</>,
            <><strong>Períodos sensibles:</strong> cada etapa de la infancia tiene ventanas en las que ciertos aprendizajes ocurren casi sin esfuerzo — el lenguaje, el orden, el movimiento, el refinamiento de los sentidos. El método aprovecha cada ventana en el momento justo.</>,
            <><strong>Materiales científicos:</strong> los materiales Montessori aíslan una dificultad a la vez y traen el control de error incorporado — el niño se da cuenta y se corrige solo, sin depender de la aprobación del adulto.</>,
            <><strong>El adulto como guía:</strong> la maestra observa a cada niño individualmente y le presenta el material adecuado en el momento adecuado. Eso es lo que hace que la educación sea verdaderamente personalizada.</>,
          ]}
        />
      </LandingSection>

      <LandingSection heading="El currículo: las áreas del salón Montessori">
        <P>
          El salón Montessori está organizado por áreas, y el niño circula entre ellas eligiendo su trabajo. Cada
          área tiene materiales específicos, que la maestra presenta individualmente cuando el niño está listo. Las
          fotos de abajo son de nuestro propio salón, en días comunes de verdad.
        </P>
        <P>
          A pesar de la libre elección de actividades, guiada por una maestra no directiva, el currículo es altamente
          estructurado. No es improvisación: cada material tiene un propósito de desarrollo definido, una secuencia de
          presentación y un lugar propio en la estantería. La libertad del niño ocurre dentro de una progresión
          pedagógica cuidadosamente planificada — la maestra sabe exactamente dónde está cada niño y qué viene después.
        </P>

        <Area
          title="Vida Práctica"
          materials="Bastidores de vestir (botones, cierres, broches), trasvase de sólidos y líquidos, transferencias con pinzas y cucharas, lavar su propia vajilla, enrollar el tapete, cuidar al muñeco bebé."
        >
          <p>
            La puerta de entrada al método. Cuidar de uno mismo, de los demás y del ambiente: vestirse, servir agua,
            limpiar la mesa, colgar la ropa en el tendedero. Parecen gestos simples — son ejercicios de concentración,
            coordinación, secuencia lógica e independencia. Es aquí también donde la mano se prepara, movimiento a
            movimiento, para la escritura.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/vida-pratica-varal.jpg', alt: 'Niño colgando ropa en el tendedero con broches, una actividad de Vida Práctica Montessori' },
            { src: '/images/montessori/vida-pratica-tapete.jpg', alt: 'Niño enrollando solo el tapete de trabajo al terminar, en el salón Montessori' },
          ]}
        />
        <LandingImagePair
          images={[
            { src: '/images/montessori/vida-pratica-xicara.jpg', alt: 'Niño concentrado vertiendo líquido de una jarra a una taza, un ejercicio de Vida Práctica' },
            { src: '/images/montessori/vida-pratica-estante.jpg', alt: 'Niña mirando con calma la estantería de Vida Práctica, eligiendo su próximo trabajo' },
          ]}
          caption="Verter sin derramar, elegir con calma: cada gesto es un ejercicio de precisión y de decisión."
        />

        <Area
          title="Sensorial"
          materials="Cilindros con botón, Escalera Marrón, Cajas de Colores, Cilindros de Colores, Tablillas Térmicas."
        >
          <p>
            De los 0 a los 6 años, el niño conoce el mundo a través de los sentidos — y nada llega al cerebro sin
            pasar antes por ellos. Por eso los materiales sensoriales están hechos para el <strong>refinamiento de los
            sentidos</strong>: convierten conceptos abstractos — grande y pequeño, grueso y fino, gradaciones de color,
            texturas y pesos — en experiencias que la mano toca y el cerebro organiza. Cuanto más finos los sentidos,
            más rico el mundo que entra. Es la base silenciosa de la inteligencia lógica y matemática.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/sensorial-encaixes-solidos.jpg', alt: 'Dos niños trabajando juntos con los cuatro bloques de Cilindros con botón dispuestos en cuadrado sobre el tapete' },
            { src: '/images/montessori/sensorial-torre-rosa.jpg', alt: 'Dos niñas construyendo la Torre Rosa combinada con la Escalera Marrón, en vertical' },
          ]}
        />

        <Area
          title="Lenguaje"
          materials="Letras de Lija, Bandeja de Arena, correspondencia de objetos y figuras, ejercicios de preescritura, resaques metálicos, rondas de lectura."
        >
          <p>
            La mano se prepara para escribir mucho antes que el lápiz: ejercicios de <strong>preparación
            indirecta</strong>, como el movimiento de pinza y el trazado de los resaques metálicos, construyen — gesto
            a gesto — la firmeza y la precisión que la escritura va a exigir.
          </p>
          <p>
            Del sonido a la escritura, pasando por el cuerpo: el niño recorre la Letra de Lija con los dedos mientras
            escucha el sonido, escribe en la arena antes que en el papel, y descubre que las palabras traen el mundo.
            Aquí vive también nuestro gran diferencial: la inmersión diaria en inglés con docentes nativos y
            bilingües —{' '}
            <Link to="/es/inmersion-en-ingles" className="text-montessori-green font-semibold underline hover:no-underline">
              mira por qué empezar temprano importa
            </Link>.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/linguagem-escrita.jpg', alt: 'Niño concentrado escribiendo su nombre, una actividad de lenguaje Montessori' },
            { src: '/images/montessori/linguagem-caixa-areia.jpg', alt: 'Niño trazando una letra en la Bandeja de Arena, con la Letra de Lija al lado' },
          ]}
        />

        <Area
          title="Matemática"
          materials="Cajas de Husos, Números de Lija, Barras Rojas y Azules, Perlas Doradas."
        >
          <p>
            En Montessori, la matemática entra por las manos: el niño sostiene la cantidad antes de conocer el
            símbolo — apilando, comparando, contando con materiales concretos. Son abstracciones materializadas: a cada
            concepto matemático se le da un cuerpo físico que el niño manipula antes de encontrarlo en el papel. Cuando
            llega el número abstracto, ya tiene cuerpo, peso y sentido — por eso la matemática Montessori es sólida y
            sin miedo.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/matematica-dourado.jpg', alt: 'Niños sobre el tapete con la torre de Perlas Doradas y las tarjetas de números' },
            { src: '/images/montessori/matematica-1000.jpg', alt: 'Niño sentado en el tapete con el material de conteo del 1 al 1000: tarjetas de números, barras doradas y el cubo del millar' },
          ]}
        />

        <Area title="Educación Cósmica">
          <p>
            La mirada más amplia del método: ayudar al niño a darse cuenta de que todo está conectado — el sol, las
            plantas, el agua, las personas — y de que él tiene un papel en el conjunto. En la práctica: naturaleza,
            permacultura, cuidado del ambiente y de los demás.{' '}
            <Link to="/es/naturaleza-educacion-cosmica" className="text-montessori-green font-semibold underline hover:no-underline">
              Le dedicamos una página entera
            </Link>.
          </p>
        </Area>

        <Area title="Y alrededor de todo eso">
          <p>
            Artes, música, aprendizaje socioemocional (la Casa de Muñecas, donde los niños procesan el mundo a través
            del juego) y las actividades complementarias: capoeira, circo, danza y movimiento, psicomotricidad y
            cuentacuentos.
          </p>
        </Area>
      </LandingSection>

      <LandingSection heading="El ciclo de trabajo: una concentración que no se interrumpe" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Uno de los descubrimientos más importantes de Maria Montessori: cuando el niño elige su trabajo y nadie lo
          interrumpe, entra en períodos de concentración profunda — y es justamente en esos períodos donde ocurre el
          desarrollo.
        </P>
        <P>
          Por eso la rutina Montessori protege el <strong>ciclo de trabajo ininterrumpido</strong>: un tramo largo en
          el que cada niño elige, trabaja, repite cuantas veces quiera y guarda el material al terminar. Sin timbre
          cada 50 minutos, sin un adulto cortando la actividad por "la próxima tarea".
        </P>
        <Highlight>
          En un mundo que fragmenta la atención desde temprano, un niño capaz de concentrarse por períodos largos
          lleva una ventaja para toda la vida.
        </Highlight>
        <LandingImage src="/images/montessori/concentracao.jpg" alt="Niño agachado, absorto, trazando un resaque metálico redondo en el piso del salón" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          La concentración profunda no se enseña — se protege.
        </p>
      </LandingSection>

      <LandingSection heading="Qué cambia en el niño">
        <Bullets
          items={[
            <><strong>Elige.</strong> Cada día el niño toma decisiones reales — y quien practica elegir desde pequeño decide mejor para toda la vida.</>,
            <><strong>Confía en sí mismo.</strong> El niño que hace las cosas por sí solo — y se corrige solo — construye una confianza que no depende de los elogios.</>,
            <><strong>Se concentra.</strong> Períodos largos de atención genuina, cada vez más raros y cada vez más valiosos.</>,
            <><strong>Cuida.</strong> Del ambiente, de los materiales, de sus compañeros — una responsabilidad vivida, no sermoneada.</>,
            <><strong>Ama aprender.</strong> Aprender nunca fue una obligación; siempre fue un descubrimiento.</>,
          ]}
        />
        <LandingImage src="/images/montessori/cuidado-banho.jpg" alt="Niño bañando con cuidado a un muñeco bebé, una actividad Montessori de cuidado de los demás" portrait />
      </LandingSection>

      <LandingSection heading="Empezaron en un salón Montessori">
        <P>
          No es casualidad que tantas personas creativas, emprendedoras y seguras de sí mismas hayan pasado por
          escuelas Montessori en su infancia:
        </P>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {alumni.map((a) => (
            <div key={a.name} className="bg-montessori-cream border border-montessori-green/10 rounded-sm px-4 py-3">
              <p className="font-serif text-montessori-green font-semibold leading-tight">{a.name}</p>
              <p className="text-gray-600 text-sm">{a.role}</p>
            </div>
          ))}
        </div>
        <P>
          Larry Page y Sergey Brin, los fundadores de Google, atribuyeron públicamente a su educación Montessori la
          capacidad de pensar por sí mismos, cuestionar el statu quo y mantenerse automotivados — justamente las
          cualidades que el futuro les va a exigir a nuestros hijos.
        </P>
      </LandingSection>

      <LandingCTAEs
        heading="Mira el método en acción"
        text="Ningún texto reemplaza ver un salón Montessori funcionando. Agenda una visita y observa cómo trabajan los niños."
      />
    </div>
  );
};
