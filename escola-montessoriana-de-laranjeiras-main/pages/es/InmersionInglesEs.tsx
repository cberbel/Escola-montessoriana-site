import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEs, LandingCTAEs } from '../../components/landing/LandingEs';

export const InmersionInglesEs: React.FC = () => {
  usePageMeta(
    'Inglés en la primera infancia | Escola Montessoriana de Laranjeiras',
    'Por qué los primeros años son la mejor ventana para el inglés: adquisición natural por inmersión diaria con docentes nativos y bilingües, los beneficios del cerebro bilingüe para las funciones ejecutivas y el acceso al conocimiento del mundo.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEs
        eyebrow="Bilingüismo"
        title="Inglés en la primera infancia: el momento ideal"
        subtitle="Ningún adulto aprende un idioma con la facilidad de un niño pequeño. No es talento — es biología. Y este es exactamente el período indicado para empezar."
      />

      <LandingSection heading="¿Por qué tan temprano?" className="pt-10 sm:pt-14">
        <P>
          En los primeros años de vida, el cerebro del niño está construyendo los circuitos del lenguaje. En esta
          etapa, no "estudia" un idioma — lo absorbe, igual que absorbe su lengua materna: escuchando, jugando,
          viviendo. Es lo que Maria Montessori llamó la mente absorbente.
        </P>
        <P>
          La capacidad de distinguir y reproducir los sonidos de cualquier idioma llega a su máximo en la primera
          infancia y declina con los años. Por eso quien empieza temprano habla sin acento y sin esfuerzo — mientras
          quien empieza tarde estudia durante años para lograr menos.{' '}
          <Link to="/es/el-cerebro-de-tu-hijo" className="text-montessori-green font-semibold underline hover:no-underline">
            Mira la ciencia de los períodos sensibles
          </Link>.
        </P>
        <LandingImage
          src="/images/ingles/safira-patio.jpg"
          alt="Bebé de la Escola Montessoriana jugando en el patio, en el pico de la fase de absorción del lenguaje"
          portrait
        />
        <Highlight>
          Para un niño pequeño, el inglés no es una asignatura. Es simplemente otra forma natural de hablar con las
          personas que quiere.
        </Highlight>
      </LandingSection>

      <LandingSection heading="El costo de oportunidad: gratis ahora, caro después" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Este es el argumento que casi nadie plantea — y puede ser el más importante. En la primera infancia, el
          inglés viene <strong>incorporado a la vida</strong>: en la canción de la ronda, en la merienda, en los
          juegos del patio. No le quita ni una hora extra a la rutina del niño. El costo, en tiempo y esfuerzo, es
          prácticamente <strong>cero</strong>.
        </P>
        <P>
          Unos años después, todo cambia. La agenda del niño más grande se llena — deportes, música, tareas, amigos,
          vida social. El inglés deja de ser algo que se vive y se convierte en <strong>una actividad más</strong> que
          hay que encajar en la semana: una clase extra, un curso aparte, un horario que compite con todo lo demás que
          el niño también quiere hacer. Cuesta plata, cuesta horas, cuesta fuerza de voluntad — y aun así da un
          resultado inferior, con más esfuerzo y casi siempre con acento.
        </P>
        <LandingImage
          src="/images/ingles/bebe-atividade.jpg"
          alt="Bebé sonriente durante una actividad en la Escola Montessoriana — a esta edad el inglés viene incorporado al juego, sin costo extra de tiempo"
          portrait
        />
        <Highlight>
          El idioma que hoy entra jugando, mañana se convierte en una obligación más en la agenda. Aprender inglés
          temprano no es apurar una asignatura — es aprovechar la única etapa en la que no cuesta casi nada.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Un cerebro bilingüe es un cerebro más fuerte">
        <P>
          Las ganancias del bilingüismo temprano van mucho más allá de hablar dos idiomas. La investigadora Ellen
          Bialystok, una de las mayores autoridades mundiales en el tema, demostró que el cerebro bilingüe resuelve
          constantemente una pregunta invisible — "¿qué idioma uso ahora?" — y que ese ejercicio permanente fortalece
          las <strong>funciones ejecutivas</strong>: el conjunto de habilidades que gobierna el foco, el autocontrol y
          la organización del pensamiento.
        </P>
        <Bullets
          items={[
            <><strong>Control inhibitorio:</strong> para hablar un idioma, el cerebro tiene que "frenar" el otro. Es el mismo músculo mental que ayuda al niño a concentrarse y resistir las distracciones.</>,
            <><strong>Memoria de trabajo:</strong> mantener dos sistemas activos a la vez entrena la capacidad de retener y manipular información — la base del razonamiento y de la matemática.</>,
            <><strong>Flexibilidad cognitiva:</strong> alternar entre idiomas es alternar entre formas de ver el mundo. Quien lo hace desde temprano piensa con más agilidad.</>,
            <><strong>Conciencia del lenguaje:</strong> entender que una misma cosa tiene dos nombres despierta temprano la noción de cómo funcionan los idiomas — y hace más fáciles el tercero y el cuarto.</>,
          ]}
        />
        <P>
          Las funciones ejecutivas predicen el éxito escolar y profesional mejor que el propio coeficiente
          intelectual — y, como toda habilidad fundamental, se construyen con más facilidad en los primeros años.{' '}
          <Link to="/es/el-cerebro-de-tu-hijo" className="text-montessori-green font-semibold underline hover:no-underline">
            Es el principio de "las habilidades generan habilidades"
          </Link>: cuanto antes se construye esta base, más se apoya en ella todo lo que viene después.
        </P>
      </LandingSection>

      <LandingSection heading="El conocimiento del mundo está en inglés" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Hay una razón práctica, y enorme, que suele olvidarse: el inglés es el idioma en el que el mundo piensa y
          comparte lo que sabe. La ciencia más avanzada, la medicina, la tecnología, la aviación, los negocios
          internacionales, lo mejor de internet — todo eso ocurre, primero, en inglés.
        </P>
        <P>
          Un niño que crece con fluidez no va a depender de traducciones de segunda mano ni de subtítulos. Va a tener{' '}
          <strong>acceso directo a la fuente</strong>: podrá estudiar en las mejores universidades del mundo, leer el
          artículo original, ver la conferencia del experto, trabajar con personas de cualquier país. El inglés deja
          de ser una asignatura por conquistar y se convierte en una <strong>llave</strong> — la que abre la sala
          donde circula el conocimiento de verdad.
        </P>
        <Highlight>
          Darle a un niño un inglés fluido no es darle una habilidad más. Es agrandar el tamaño del mundo al que va a
          tener acceso durante toda su vida.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Inmersión de verdad, con docentes nativos y bilingües">
        <P>
          Una clase de inglés una o dos veces por semana no crea bilingüismo — crea vocabulario memorizado que se
          esfuma en las vacaciones. Lo que funciona es la inmersión: el idioma presente en la rutina, todos los días,
          en situaciones reales.
        </P>
        <P>
          En la Escola Montessoriana, los niños están rodeados de inglés todos los días en las voces de docentes con
          fluidez — hablantes nativos y brasileños bilingües. El idioma aparece en los juegos, en las canciones, en
          las comidas, en el patio — exactamente como entró la lengua materna en sus vidas. Sin presión, sin pruebas,
          sin "ahora toca inglés". El idioma simplemente pasa a ser parte de la vida.
        </P>
        <P>
          Y tienen que ser personas reales: las investigaciones de Patricia Kuhl demostraron que los bebés aprenden
          los sonidos de un idioma nuevo de una persona presente que interactúa — y no aprenden nada viendo el mismo
          contenido en una pantalla, solos. Por eso la inmersión en vivo, con personas reales interactuando todos los
          días, marca toda la diferencia — y ninguna app puede reemplazarla.
        </P>
      </LandingSection>

      <LandingSection heading="Y no nos quedamos en el inglés">
        <P>
          Las familias que lo deseen pueden elegir un idioma más para su hijo: francés, mandarín, español, italiano o
          alemán. La misma lógica de inmersión vale para el tercer idioma — y la misma ventana de la primera infancia
          también. Cuanto antes empieza, más natural, fácil y duradero es. Eso es lo que nos hace una escuela
          verdaderamente <strong>trilingüe</strong>: portugués, inglés y un tercer idioma que elige la familia.
        </P>
      </LandingSection>

      <LandingCTAEs
        heading="Ven a escuchar a niños viviendo en dos idiomas"
        text="Agenda una visita y observa la inmersión ocurriendo con naturalidad, con docentes nativos y brasileños, en plena rutina."
      />
    </div>
  );
};
