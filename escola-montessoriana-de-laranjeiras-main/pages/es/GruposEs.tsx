import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEs, LandingCTAEs } from '../../components/landing/LandingEs';

const TurmaHeading: React.FC<{ nome: string; faixa: string }> = ({ nome, faixa }) => (
  <div className="mb-4">
    <span className="inline-block bg-montessori-green text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-sm px-3 py-1 mb-2">
      {faixa}
    </span>
    <h2 className="font-serif text-2xl sm:text-3xl text-montessori-green break-words">{nome}</h2>
  </div>
);

export const GruposEs: React.FC = () => {
  usePageMeta(
    'Nuestros grupos | Escola Montessoriana de Laranjeiras',
    'Nuestros grupos de edades mixtas: Agrupada 1 (9 meses a 3 años), Agrupada 2 (2,5 a 6 años) y Agrupada 3 — Primaria (7 a 12 años). Ambientes preparados, horarios y frecuencia flexibles.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEs
        eyebrow="Grupos"
        title="Grupos de edades mixtas, al estilo Montessori"
        subtitle="Tres agrupamientos, cada uno con su propio ambiente preparado — donde los grandes enseñan, los chicos se inspiran y cada niño avanza a su propio ritmo."
      />

      <LandingSection heading="Por qué mezclamos las edades" className="pt-10 sm:pt-14">
        <P>
          En Montessori, los grupos no se dividen año por año — son <strong>agrupamientos de franjas de edad más
          amplias</strong> que comparten el mismo ambiente durante un ciclo de varios años. No es casualidad: así
          funciona la naturaleza de la infancia.
        </P>
        <P>
          Piénsalo: el grupo separado por año de nacimiento es un <strong>invento de la escuela</strong> — esa
          segregación por edad no existe en ningún otro lugar de la vida. En casa, en el edificio, en la plaza, los
          niños crecen entre hermanos, primos, vecinos y amigos de distintas edades: así es la convivencia real.
        </P>
        <P>
          El grupo de edades mixtas también respeta <strong>el ritmo de cada niño en cada área</strong>. Cuando un
          niño va adelantado en alguna dimensión, encuentra naturalmente compañeros de nivel más avanzado que le hacen
          compañía. Y donde más le cuesta, tiene compañeros menores con quienes compartir e intercambiar —
          consolidando lo que sabe.
        </P>
        <P>
          Y los intercambios transforman a los dos lados: los mayores consolidan lo que saben ayudando a los más
          chicos — no hay aprendizaje más profundo que enseñar. Los menores, a su vez, se miran en los mayores y son
          impulsados hacia arriba, sin presión. En lugar de la competencia de "todos haciendo lo mismo al mismo
          tiempo", crecen la cooperación, el cuidado y el respeto por el ritmo de cada uno.
        </P>
        <Highlight>
          Las edades mixtas forman una pequeña comunidad — mucho más parecida a la vida real que una línea de montaje
          ordenada por edad.
        </Highlight>
      </LandingSection>

      <LandingSection heading="">
        <TurmaHeading nome="Agrupada 1" faixa="9 meses a 3 años" />
        <P>
          El primer ambiente fuera de casa. Aquí todo está pensado para que los bebés y los niños muy pequeños
          exploren con seguridad: estructuras de movimiento y de trepar, materiales al alcance de las manos pequeñas y
          muchos brazos. Es la etapa de caminar, de hablar, de la independencia que asoma — vestirse, comer solo,
          cuidarse — y del lenguaje, que florece cuando al niño se lo escucha y se lo respeta.
        </P>
        <LandingImage src="/images/turmas/agrupada-1.jpg" alt="Bebé sonriente de pie en la estructura de psicomotricidad de madera del salón de la Agrupada 1" portrait />
      </LandingSection>

      <LandingSection heading="">
        <TurmaHeading nome="Agrupada 2" faixa="2,5 a 6 años" />
        <P>
          La clásica "Casa de los Niños" de Maria Montessori. En este ambiente el niño circula libremente entre las
          áreas — vida práctica, sensorial, lenguaje, matemática y educación cósmica — eligiendo su trabajo y
          repitiéndolo cuantas veces quiera. Es la etapa dorada de la concentración, de la lectura y la escritura, de
          los números tomando forma en la mano, y de la inmersión diaria en inglés.
        </P>
        <LandingImage src="/images/turmas/agrupada-2.jpg" alt="Niña de la Agrupada 2 con la Escalera Marrón y la Torre Rosa en el salón Montessori preparado" />
        <P>
          ¿Quieres entender a fondo qué pasa en este salón?{' '}
          <Link to="/es/metodo-montessori" className="text-montessori-green font-semibold underline hover:no-underline">
            Conoce el método y el currículo
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <TurmaHeading nome="Agrupada 3 — Primaria" faixa="7 a 12 años" />
        <P>
          La continuación natural del camino Montessori: la Primaria, para el niño que ya no pregunta solo "qué",
          sino "por qué". Es la etapa del razonamiento, de la imaginación y del trabajo en grupo — con autonomía,
          responsabilidad y el mundo entero como objeto de estudio.
        </P>
        <a
          href="/informativo-open-class.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-montessori-green font-semibold hover:gap-3 transition-all"
        >
          Conoce más sobre la Agrupada 3 (folleto Open Class, en portugués) →
        </a>
      </LandingSection>

      <LandingSection heading="Horarios y frecuencia">
        <P>
          Abrimos de <strong>7:30 a 19:00</strong>, con tres opciones de jornada — válidas para todos los grupos:
        </P>
        <Bullets
          items={[
            <><strong>Media jornada:</strong> mañana, de 8:00 a 12:00, o tarde, de 13:00 a 17:00.</>,
            <><strong>Jornada completa:</strong> de 8:00 a 17:00, con almuerzo y siesta.</>,
            <><strong>Horario extendido:</strong> de 7:30 a 19:00, para las familias que necesitan más tiempo.</>,
          ]}
        />
        <P>
          Además de la jornada diaria, hay opciones de <strong>frecuencia reducida</strong> (días alternados) y
          flexibilidad para adaptar la entrada y la salida a la realidad de cada casa — el mismo espíritu de acogida
          que atraviesa toda la escuela. Juntos vamos a encontrar el mejor formato para tu hijo.
        </P>
      </LandingSection>

      <LandingCTAEs
        heading="Ven a ver los salones de cerca"
        text="Cada ambiente tiene su propia luz, su olor y su ritmo. Agenda una visita y conoce el grupo de tu hijo."
      />
    </div>
  );
};
