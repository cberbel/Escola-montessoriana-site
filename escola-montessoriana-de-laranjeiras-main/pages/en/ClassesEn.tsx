import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEn, LandingCTAEn } from '../../components/landing/LandingEn';

const TurmaHeading: React.FC<{ nome: string; faixa: string }> = ({ nome, faixa }) => (
  <div className="mb-4">
    <span className="inline-block bg-montessori-green text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-sm px-3 py-1 mb-2">
      {faixa}
    </span>
    <h2 className="font-serif text-2xl sm:text-3xl text-montessori-green break-words">{nome}</h2>
  </div>
);

export const ClassesEn: React.FC = () => {
  usePageMeta(
    'Our Classes | Escola Montessoriana de Laranjeiras',
    'Our mixed-age classes: Agrupada 1 (9 months to 3 years), Agrupada 2 (2.5 to 6 years) and Agrupada 3 — Elementary (7 to 12 years). Prepared environments, flexible schedules and attendance.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEn
        eyebrow="Classes"
        title="Mixed-age classes, the Montessori way"
        subtitle="Three groupings, each with its own prepared environment — where older children teach, younger ones are inspired, and every child advances at their own pace."
      />

      <LandingSection heading="Why we mix ages" className="pt-10 sm:pt-14">
        <P>
          In Montessori, classes are not divided year by year — they are <strong>groupings of wider age ranges</strong>
          that share the same environment for a cycle of several years. It is no accident: it is how the nature of
          childhood works.
        </P>
        <P>
          Think about it: the class separated by birth year is a <strong>school invention</strong> — that kind of age
          segregation exists nowhere else in life. At home, in the building, at the park, children grow up among
          siblings, cousins, neighbors and friends of different ages: that is how real life together happens.
        </P>
        <P>
          The mixed-age class also respects <strong>each child's pace in each area</strong>. When a child is ahead in
          some dimension, they naturally find classmates at a more advanced level to keep them company. And where they
          struggle most, they have younger classmates to share and exchange with — consolidating what they know.
        </P>
        <P>
          And the exchanges transform both sides: older children consolidate what they know by helping the younger
          ones — there is no deeper learning than teaching. The younger ones, in turn, mirror the older ones and are
          pulled upward, without pressure. In place of the competition of "everyone doing the same thing at the same
          time" grow cooperation, care and respect for each one's rhythm.
        </P>
        <Highlight>
          Mixed ages form a small community — much more like real life than an assembly line sorted by age.
        </Highlight>
      </LandingSection>

      <LandingSection heading="">
        <TurmaHeading nome="Agrupada 1" faixa="9 months to 3 years" />
        <P>
          The first environment outside the home. Everything here is designed for babies and very young children to
          explore safely: movement and psychomotor structures, materials within reach of little hands, and plenty of
          cuddles. It is the phase of walking, talking, budding independence — dressing, eating by themselves, caring
          for themselves — and of language, which blossoms when the child is heard and respected.
        </P>
        <LandingImage src="/images/turmas/agrupada-1.jpg" alt="Smiling baby standing on the wooden psychomotor structure in the Agrupada 1 classroom" portrait />
      </LandingSection>

      <LandingSection heading="">
        <TurmaHeading nome="Agrupada 2" faixa="2.5 to 6 years" />
        <P>
          Maria Montessori's classic "Children's House". In this environment the child moves freely between the areas
          — practical life, sensorial, language, mathematics and cosmic education — choosing their work and repeating
          it as often as they wish. It is the golden phase of concentration, of reading and writing, of numbers taking
          shape in the hand, and of daily English immersion.
        </P>
        <LandingImage src="/images/turmas/agrupada-2.jpg" alt="Child from Agrupada 2 with the Brown Stair and Pink Tower in the prepared Montessori classroom" />
        <P>
          Want to understand in depth what happens in this classroom?{' '}
          <Link to="/en/montessori-method" className="text-montessori-green font-semibold underline hover:no-underline">
            Discover the method and the curriculum
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <TurmaHeading nome="Agrupada 3 — Elementary" faixa="7 to 12 years" />
        <P>
          The natural continuation of the Montessori path: Elementary, for the child who no longer asks only "what",
          but "why". It is the phase of reasoning, imagination and group work — with autonomy, responsibility and the
          whole world as the object of study.
        </P>
        <a
          href="/informativo-open-class.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-montessori-green font-semibold hover:gap-3 transition-all"
        >
          Learn more about Agrupada 3 (brochure in Portuguese) →
        </a>
      </LandingSection>

      <LandingSection heading="Schedules and attendance">
        <P>
          We are open from <strong>7:30am to 7pm</strong>, with three period formats — valid for all classes:
        </P>
        <Bullets
          items={[
            <><strong>Half day:</strong> morning, 8am to 12pm, or afternoon, 1pm to 5pm.</>,
            <><strong>Full day:</strong> 8am to 5pm, with lunch and rest time.</>,
            <><strong>Extended day:</strong> 7:30am to 7pm, for families who need more time.</>,
          ]}
        />
        <P>
          Beyond the period, there are <strong>reduced attendance</strong> options (alternate days) and flexibility to
          adapt drop-off and pick-up to each home's reality — the same welcoming spirit that runs through the whole
          school. We will find the best fit for your child together with you.
        </P>
      </LandingSection>

      <LandingCTAEn
        heading="Come see the classrooms up close"
        text="Each environment has its own light, smell and rhythm. Book a visit and meet your child's class."
      />
    </div>
  );
};
