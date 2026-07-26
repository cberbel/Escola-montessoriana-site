import React from 'react';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEs, LandingCTAEs } from '../../components/landing/LandingEs';

const Tema: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2">{title}</h3>
    <div className="text-gray-700 text-base sm:text-lg leading-relaxed [&>p]:mb-3">{children}</div>
  </div>
);

export const NaturalezaEs: React.FC = () => {
  usePageMeta(
    'Naturaleza, permacultura y educación cósmica | Escola Montessoriana de Laranjeiras',
    'Un terreno arbolado, espacios amplios, clases de permacultura con huerta y lombricario, y la educación cósmica Montessori: cómo los niños descubren el orden de la naturaleza y su lugar en el mundo.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEs
        eyebrow="Naturaleza y pertenencia"
        title="Un refugio verde para crecer: naturaleza, permacultura y educación cósmica"
        subtitle="En plena ciudad, un terreno arbolado donde los niños corren, plantan, cuidan lombrices y descubren que son parte de algo más grande."
      />

      <LandingSection heading="Permacultura en la práctica: huerta, lombricario y abejas" className="pt-10 sm:pt-14">
        <P>
          Empecemos por lo que más les encanta a los niños: las manos en la tierra. Aquí, los niños tienen{' '}
          <strong>clases de permacultura</strong> como parte de la rutina, con un educador especializado. La
          permacultura es el diseño de sistemas que imitan la inteligencia de la naturaleza — donde nada se
          desperdicia y todo se transforma.
        </P>
        <P>
          <strong>En la huerta</strong>, el niño prepara la tierra, planta, riega, espera y cosecha. Cada paso es una
          lección de ciclos, de paciencia y de causa y efecto — con las manos en la tierra, que es como los niños
          aprenden de verdad. Y la huerta está pegada al bosque: parado en ella, el niño está rodeado de verde por
          todos lados.
        </P>
        <LandingImage src="/images/natureza/horta-vista.jpg" alt="Vista amplia de la huerta de la escuela contra un muro de piedra cubierto de vegetación densa, con niños plantando en el cantero" />
        <LandingImage src="/images/natureza/horta-plantar.jpg" alt="Niños plantando plantines en macetas recicladas en la huerta, con el educador ayudando" />
        <P>
          <strong>En el lombricario</strong>, las sobras de la merienda se convierten en tierra fértil gracias al
          trabajo de las lombrices — la tarea cósmica ocurriendo en la palma de la mano. Los niños observan, tocan y
          siguen la transformación semana a semana. Mira una clase real (en portugués):
        </P>
        <div className="max-w-xs mx-auto my-6">
          <div className="aspect-[9/16] overflow-hidden rounded-sm shadow-lg bg-black">
            <video
              src="/videos/video2.mp4"
              poster="/images/natureza/minhocario-real.jpg"
              controls
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            >
              Tu navegador no soporta video.
            </video>
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">
            Clase de permacultura: conociendo a las lombrices del lombricario
          </p>
        </div>
        <LandingImagePair
          images={[
            { src: '/images/natureza/minhocas-mao.jpg', alt: 'Una mano llena de lombrices del lombricario, con niños reunidos alrededor mirando' },
            { src: '/images/natureza/compostagem.jpg', alt: 'Educador y niños alrededor de la compostera con restos de frutas y verduras convirtiéndose en tierra' },
          ]}
          caption="La tarea cósmica en la palma de la mano: las sobras de la merienda se vuelven tierra fértil, y la lombriz se vuelve amiga."
        />
        <P>
          <strong>Y pronto, abejas nativas sin aguijón:</strong> estamos preparando la llegada de un meliponario con
          abejas brasileñas como la jataí — sin aguijón, seguras para los niños, y entre los principales polinizadores
          de nuestra flora. Los niños van a seguir, de cerca, el trabajo de una de las criaturas más importantes del
          planeta.
        </P>
      </LandingSection>

      <LandingSection heading="Por qué la naturaleza es esencial (no decoración)">
        <P>
          Los niños pequeños aprenden con todo el cuerpo. La tierra, la arena, el agua, las plantas y los bichos
          ofrecen lo que ningún juguete de plástico puede ofrecer: texturas, pesos, olores y sorpresas reales que
          refinan los sentidos y alimentan la curiosidad científica con la que todo niño nace.
        </P>
        <P>
          El contacto diario con áreas verdes está asociado a mejor concentración, más equilibrio emocional, mejor
          coordinación motora y hasta un sistema inmunológico más fuerte. En una infancia cada vez más encerrada entre
          pantallas y departamentos, un patio de verdad se volvió un privilegio raro — y creemos que debería ser un
          derecho.
        </P>
        <LandingImagePair
          images={[
            { src: '/images/natureza/tanque-areia-real.jpg', alt: 'Cuatro niños de uniforme jugando juntos en el arenero de la escuela' },
            { src: '/images/natureza/colagem-folhas.jpg', alt: 'Niña sonriendo en el patio mostrando su collage hecho con hojas de verdad' },
          ]}
          caption="Arena, hojas, texturas: el mundo real en sus manos."
        />
      </LandingSection>

      <LandingSection heading="Espacio para moverse — a propósito">
        <P>
          Maria Montessori fue pionera en afirmar lo que la neurociencia confirmó después: el movimiento y la
          inteligencia se desarrollan juntos. El niño que gatea, trepa, corre, carga y se equilibra está construyendo
          el cerebro a través del cuerpo.
        </P>
        <P>
          Por eso nuestros espacios son generosos a propósito, no por casualidad: salones amplios con vista al verde,
          donde el movimiento es libre; un patio techado rodeado de árboles; y actividades — capoeira, circo, danza y
          movimiento, psicomotricidad — que convierten el cuerpo en un instrumento de aprendizaje.
        </P>
        <LandingImage src="/images/natureza/patio-bolhas.jpg" portrait alt="Niños reventando burbujas de jabón en el amplio patio techado, con árboles y flores visibles sobre la red de seguridad" />
        <LandingImage src="/images/natureza/maos-tinta.jpg" portrait alt="Niño mostrando sus manos pintadas en el patio techado, con árboles al fondo" />
        <LandingImage src="/images/natureza/patio-verde.jpg" alt="Dos niños apoyados en la baranda del patio, contemplando una pared de árboles a través de la red" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          Desde el patio, el niño levanta la vista y encuentra árboles — algo raro en pleno corazón de Laranjeiras.
        </p>
        <LandingImagePair
          images={[
            { src: '/images/natureza/capoeira-roda.jpg', alt: 'Ronda de capoeira en el patio techado, con el maestro tocando el berimbau y árboles al fondo' },
            { src: '/images/natureza/capoeira-bananeira.jpg', alt: 'Niños haciendo la vertical contra la pared durante la clase de capoeira en el patio' },
          ]}
          caption="Capoeira en el patio: berimbau, ronda y verticales bajo los árboles."
        />
        <LandingImage src="/images/espaco.png" alt="Salón amplio de la Escola Montessoriana visto desde arriba, con mesas bajas, materiales al alcance de los niños y ventanas hacia el muro de piedra verde" />
      </LandingSection>

      <LandingSection heading="Educación cósmica: el lugar del niño en el mundo" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          La "educación cósmica" es uno de los conceptos más hermosos de Maria Montessori. La palabra viene del griego{' '}
          <em>kosmos</em> — que significa <strong>orden</strong>, lo contrario del caos. La idea: presentarle el mundo
          al niño no como un montón de datos sueltos, sino como un todo organizado en el que cada parte tiene un papel.
        </P>

        <Tema title="El orden escondido en el aparente caos">
          <p>
            A primera vista, la naturaleza parece un desorden: hojas que caen, lluvia que llega sin avisar, bichos por
            todas partes. Observada de cerca — y el niño Montessori se entrena en observar — revela un orden profundo:
            las estaciones se repiten, el agua circula, la semilla sabe cuándo brotar, cada ser vivo tiene su ritmo.
          </p>
          <p>
            Para el niño pequeño, que vive un período sensible del orden, descubrir que el mundo tiene leyes y ciclos
            confiables es profundamente tranquilizador. El mundo deja de ser impredecible y se convierte en un lugar
            que se puede comprender — y de esa seguridad nace el coraje de explorar.
          </p>
        </Tema>
        <LandingImage src="/images/natureza/ciclo-vida.jpg" alt="Niño señalando el material Montessori del ciclo de vida de la rana: un disco con las etapas del huevo a la rana adulta" position="center 60%" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          El ciclo de la vida en material concreto: el niño sostiene, en su mano, el orden detrás de la naturaleza.
        </p>

        <Tema title="Todo depende de todo">
          <p>
            El sol alimenta a la planta, la planta alimenta al animal, el animal devuelve nutrientes a la tierra, la
            tierra vuelve a alimentar a la planta. Nada en la naturaleza vive solo — y las personas tampoco. Cuando
            los niños perciben estas conexiones en la práctica, entienden que sus acciones afectan al mundo, y que
            ellos tienen un papel en él.
          </p>
        </Tema>

        <Tema title="El trabajo de los seres vivos">
          <p>
            Cada ser vivo, sin saberlo, trabaja para el conjunto: la lombriz afloja y fertiliza la tierra, la abeja
            poliniza las flores mientras busca su alimento, los hongos descomponen lo que murió para que se vuelva
            vida nueva. Montessori llamó a esto la <strong>tarea cósmica</strong> — y mostrársela a los niños cambia
            su relación con su propio trabajo: trabajar no es una obligación, es la forma que tiene cada uno de
            participar en el mundo.
          </p>
        </Tema>
        <LandingImagePair
          images={[
            { src: '/images/natureza/material-folhas.jpg', alt: 'Niño emparejando formas de hojas con el gabinete de botánica Montessori' },
            { src: '/images/natureza/animais-marinhos.jpg', alt: 'Niño clasificando tarjetas y miniaturas de animales marinos en una mesa Montessori' },
          ]}
          caption="Botánica y zoología en el salón: conocer a cada ser vivo es el primer paso para respetarlo."
        />

        <Tema title="La supranaturaleza: lo que construyen los seres humanos">
          <p>
            ¿Y cuál es la tarea de los seres humanos? Montessori les mostraba a los niños que casi todo lo que nos
            rodea — el pan, las casas, la ropa, los caminos — es naturaleza transformada por el trabajo acumulado de
            generaciones. Es la <strong>supranaturaleza</strong>: la capa que la humanidad construyó sobre el mundo
            natural. Percibirlo despierta gratitud por los que vinieron antes, y las ganas de aportar también.
          </p>
        </Tema>

        <Highlight>
          De esta percepción nacen el cuidado por los demás, la responsabilidad ambiental y el sentido de propósito —
          no por sermones, sino por experiencia vivida.
        </Highlight>
        <LandingImage src="/images/natureza/grupo-natureza.jpg" alt="Grupo de niños sonriendo con coronas de hojas en la cabeza junto al educador de permacultura, frente al muro de piedra" />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Guardianes de la naturaleza: quien se siente parte del mundo aprende a cuidarlo.
        </p>
      </LandingSection>

      <LandingSection heading="En nuestra escuela, esto significa">
        <Bullets
          items={[
            'Un terreno arbolado en pleno corazón de Laranjeiras — un refugio verde en el ritmo de la ciudad.',
            'Clases de permacultura en la rutina: huerta, lombricario y, pronto, abejas nativas sin aguijón.',
            'Tiempo al aire libre todos los días, con arenero y exploración libre.',
            'Espacios amplios y movimiento libre, dentro y fuera del salón.',
            'Cero pantallas: experiencia concreta en lugar de estimulación pasiva.',
          ]}
        />
      </LandingSection>

      <LandingCTAEs
        heading="Ven a sentir el espacio en persona"
        text="Las fotos ayudan, pero el verde, los sonidos y la amplitud solo se entienden en vivo. Agenda una visita."
      />
    </div>
  );
};
