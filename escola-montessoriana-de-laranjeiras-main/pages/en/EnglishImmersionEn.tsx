import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEn, LandingCTAEn } from '../../components/landing/LandingEn';

export const EnglishImmersionEn: React.FC = () => {
  usePageMeta(
    'English in Early Childhood | Escola Montessoriana de Laranjeiras',
    'Why the first years are the best window for English: natural acquisition through daily immersion with native and bilingual teachers, the executive-function benefits of the bilingual brain, and access to the world’s knowledge.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEn
        eyebrow="Bilingualism"
        title="English in early childhood: the ideal moment"
        subtitle="No adult learns a language with the ease of a young child. It is not talent — it is biology. And this is exactly the right period to begin."
      />

      <LandingSection heading="Why so early?" className="pt-10 sm:pt-14">
        <P>
          In the first years of life, the child's brain is building the circuits of language. At this stage, they do
          not "study" a language — they absorb it, just as they absorb their mother tongue: listening, playing,
          living. It is what Maria Montessori called the absorbent mind.
        </P>
        <P>
          The capacity to distinguish and reproduce the sounds of any language peaks in early childhood and declines
          with the years. That is why those who start early speak without accent and without effort — while those who
          start late study for years to achieve less.{' '}
          <Link to="/en/your-childs-brain" className="text-montessori-green font-semibold underline hover:no-underline">
            See the science of sensitive periods
          </Link>.
        </P>
        <LandingImage
          src="/images/ingles/safira-patio.jpg"
          alt="Baby at Escola Montessoriana playing in the patio, at the peak of the language absorption phase"
          portrait
        />
        <Highlight>
          For a young child, English is not a subject. It is simply another natural way of talking with people they
          love.
        </Highlight>
      </LandingSection>

      <LandingSection heading="The opportunity cost: free now, expensive later" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Here is the argument almost nobody makes — and it may be the most important one. In early childhood, English
          comes <strong>built into life</strong>: in the circle-time song, at snack time, in playground games. It does
          not take a single extra hour of the child's routine. The cost, in time and effort, is practically{' '}
          <strong>zero</strong>.
        </P>
        <P>
          A few years later, everything changes. The older child's schedule fills up — sports, music, homework,
          friends, social life. English stops being something you live and becomes <strong>one more activity</strong>
          to fit into the week: an extra class, a separate course, a time slot competing with everything else the
          child also wants to do. It costs money, costs hours, costs willpower — and still delivers an inferior
          result, with more effort and almost always with an accent.
        </P>
        <LandingImage
          src="/images/ingles/bebe-atividade.jpg"
          alt="Smiling baby during an activity at Escola Montessoriana — at this age English comes built into play, at no extra cost in time"
          portrait
        />
        <Highlight>
          The language that enters through play today becomes another chore on the schedule tomorrow. Learning English
          early is not rushing a subject — it is seizing the only phase when it costs almost nothing.
        </Highlight>
      </LandingSection>

      <LandingSection heading="A bilingual brain is a stronger brain">
        <P>
          The gains of early bilingualism go far beyond speaking two languages. Researcher Ellen Bialystok, one of the
          world's leading authorities on the subject, showed that the bilingual brain is constantly solving an
          invisible question — "which language do I use now?" — and that this ongoing exercise strengthens{' '}
          <strong>executive function</strong>: the set of skills that governs focus, self-control and the organization
          of thought.
        </P>
        <Bullets
          items={[
            <><strong>Inhibitory control:</strong> to speak one language, the brain must "hold back" the other. It is the same mental muscle that helps a child concentrate and resist distraction.</>,
            <><strong>Working memory:</strong> keeping two systems active at once trains the capacity to hold and manipulate information — the basis of reasoning and mathematics.</>,
            <><strong>Cognitive flexibility:</strong> switching between languages is switching between ways of seeing the world. Those who do it from early on think more nimbly.</>,
            <><strong>Language awareness:</strong> understanding that the same thing has two names awakens an early sense of how languages work — and makes the third and fourth languages easier.</>,
          ]}
        />
        <P>
          Executive function predicts school and career success better than IQ itself — and, like every foundational
          skill, it is built most easily in the first years.{' '}
          <Link to="/en/your-childs-brain" className="text-montessori-green font-semibold underline hover:no-underline">
            It is the "skills beget skills" principle
          </Link>: the earlier this base is built, the more everything that comes later rests on it.
        </P>
      </LandingSection>

      <LandingSection heading="The world's knowledge is in English" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          There is a practical, and enormous, reason that is often forgotten: English is the language in which the
          world thinks and shares what it knows. The most advanced science, medicine, technology, aviation,
          international business, the best of the internet — all of it happens, first, in English.
        </P>
        <P>
          A child who grows up fluent will not depend on second-hand translations or subtitles. They will have{' '}
          <strong>direct access to the source</strong>: they can study at the world's best universities, read the
          original paper, watch the expert's lecture, work with people from any country. English stops being a subject
          to conquer and becomes a <strong>key</strong> — the one that opens the room where real knowledge circulates.
        </P>
        <Highlight>
          Giving a child fluent English is not giving them one more skill. It is enlarging the size of the world they
          will have access to for their entire life.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Real immersion, with native and bilingual teachers">
        <P>
          An English class once or twice a week does not create bilingualism — it creates memorized vocabulary that
          vanishes over the holidays. What works is immersion: the language present in the routine, every day, in real
          situations.
        </P>
        <P>
          At Escola Montessoriana, children live with English every day in the voices of fluent teachers — native
          speakers and bilingual Brazilians. The language shows up in games, in songs, at meals, on the playground —
          exactly the way their mother tongue entered their lives. No pressure, no tests, no "English o'clock". The
          language simply becomes part of life.
        </P>
        <P>
          And it must be real people: Patricia Kuhl's research showed that babies learn the sounds of a new language
          from a present, interacting person — and learn nothing from watching the same content on a screen, alone.
          That is why live immersion, with real people interacting every day, makes all the difference — and no app
          can replace it.
        </P>
      </LandingSection>

      <LandingSection heading="And we don't stop at English">
        <P>
          Families who wish can choose one more language for their child: French, Mandarin, Spanish, Italian or
          German. The same immersion logic applies to the third language — and the same early-childhood window too.
          The earlier, the more natural, the cheaper and the more lasting. That is what makes us a truly{' '}
          <strong>trilingual school</strong>: Portuguese, English, and a third language chosen by the family.
        </P>
      </LandingSection>

      <LandingCTAEn
        heading="Come hear children living in two languages"
        text="Book a visit and watch the immersion happening naturally, with native and Brazilian teachers, in the middle of the routine."
      />
    </div>
  );
};
