import React from 'react';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEn, LandingCTAEn } from '../../components/landing/LandingEn';

export const WelcomingEn: React.FC = () => {
  usePageMeta(
    'Welcoming Care | Escola Montessoriana de Laranjeiras',
    'Total welcoming care: emotional safety as the foundation of development, respectful adaptation at the child’s pace, plenty of cuddles, flexibility for the family and real food — no seed oils, refined salt or sugar.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEn
        eyebrow="Welcoming care"
        title="Total welcoming: a child only blossoms when they feel safe"
        subtitle="Before any curriculum comes the cuddle. Here, every child — and every family — is received with time, respect and genuine affection."
      />

      <LandingSection heading="Safety is the foundation of all development" className="pt-10 sm:pt-14">
        <P>
          There is an order in the nature of the child that no school should ignore: <strong>first safety, then
          learning</strong>. A child who does not feel safe lives on alert — the body enters survival mode, the famous
          "fight or flight". In that state, nearly all the brain's energy goes into defending against a threat, and
          almost nothing is left for exploring, concentrating or learning.
        </P>
        <P>
          When the child feels welcomed and safe, the opposite happens: the body relaxes, leaves the state of alert,
          and the brain is free for what really matters at this age — discovering the world, building bonds,
          concentrating and growing intelligence. That is why welcoming care is not a nice detail of our routine. It is
          the foundation of everything.
        </P>
        <Highlight>
          No child learns in fear. Emotional safety is not the opposite of learning — it is its precondition.
        </Highlight>
        <LandingImagePair
          images={[
            { src: '/images/acolhimento/sorriso-professora.jpg', alt: 'Teacher and child hugging and smiling together in the school patio' },
            { src: '/images/acolhimento/bebe-tranquilo.jpg', alt: 'Calm baby exploring a material in the classroom, with the shelves in the background' },
          ]}
          caption="The smile of a child who feels safe — everything else grows from it."
        />
      </LandingSection>

      <LandingSection heading="Respectful adaptation: the child sets the pace">
        <P>
          Arriving somewhere new, full of unfamiliar faces, is big for an adult — imagine for someone who is one, two,
          three years old. That is why our adaptation is never an imposition. We do not "pull" the child from the
          parents' arms, and we do not set the same countdown of days for everyone.
        </P>
        <P>
          We do the opposite: <strong>we follow the child</strong>. The start is gradual, with a trusted adult present
          in the beginning, moving forward at each child's own pace. We watch the signals, we respect crying as a
          legitimate form of communication, and we build trust day by day. Respectful adaptation is not the child
          surrendering to the school — it is the school patiently earning the child's trust.
        </P>
        <LandingImage src="/images/acolhimento/adaptacao-artes.jpg" alt="Baby in an apron painting next to the teacher, who follows the activity up close" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          A trusted adult close by: that is how confidence is built, one day at a time.
        </p>
      </LandingSection>

      <LandingSection heading="We give plenty of cuddles" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Cuddling does not spoil a child. Cuddling does not get in the way of independence. It is exactly the
          opposite: the child whose needs are met — who is picked up when they need it, comforted when they cry, seen
          when they call — builds an inner security they will carry for life.
        </P>
        <P>
          And it is from that secure base that the courage to separate, explore and become independent is born. A child
          only lets go with confidence when they know they have somewhere to return to. That is why, here, cuddles are
          taken seriously: they are a direct investment in the autonomy the Montessori method values so much.
        </P>
        <Highlight>
          Independence is not born from the lack of a lap to sit on. It is born from the certainty that the lap is
          always available.
        </Highlight>
        <LandingImage src="/images/acolhimento/colo-patio.jpg" alt="Teacher standing in the patio holding a baby, the two looking at each other, with trees in the background" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          A real cuddle, surrounded by green: the secure base from which the child sets out into the world.
        </p>
      </LandingSection>

      <LandingSection heading="Welcoming the family too">
        <P>
          Trusting your child to other hands is one of the most delicate steps a family takes. We know — and we welcome
          parents with the same care we welcome children. For international families: <strong>we speak English</strong>,
          and several of our teachers are native or bilingual speakers.
        </P>
        <Bullets
          items={[
            <><strong>Reduced schedules:</strong> half-day and alternate-day options, for families who want a gentler transition or a lighter routine.</>,
            <><strong>Flexible hours:</strong> we adapt what we can to each family's reality, instead of squeezing everyone into the same rigid grid.</>,
            <><strong>Open communication:</strong> you know how your child's day went, with transparency and no runaround.</>,
            <><strong>Partnership, not replacement:</strong> the school walks alongside the family, respecting each home's choices and moment.</>,
          ]}
        />
        <P>
          Welcoming the family is part of welcoming the child: a child relaxes when they feel their parents trust the
          place where they are.
        </P>
      </LandingSection>

      <LandingSection id="food" heading="Food is welcoming too">
        <P>
          Caring for what goes into a child's body is caring for their mood, sleep, concentration and health. That is
          why we take food as seriously as we take cuddles. We serve <strong>real food</strong>, cooked with care:{' '}
          <strong>no seed oils, no refined salt and no sugar</strong>. In their place: fresh, whole ingredients, real
          fats and natural seasonings.
        </P>
        <LandingImage src="/images/acolhimento/almoco-juntos.jpg" alt="Young children having lunch together at the low classroom table, each with their own plate, with two teachers close by" />
        <P>
          And the meal itself is a moment of welcoming and learning. The little ones eat lunch together, at the table,
          at their own pace. They learn to eat by themselves, to serve themselves, to try new flavors — with autonomy
          and pleasure, without pressure and without bargaining. Eating well, here, is also a way of living together
          and caring for oneself.
        </P>
        <LandingImage src="/images/acolhimento/almoco-bebes.jpg" alt="Babies feeding themselves with their spoons at the low table, closely accompanied by the teachers" />
        <p className="-mt-2 text-center text-sm text-gray-500">
          From babyhood, each with their own plate and spoon: eating by yourself is an achievement too.
        </p>
      </LandingSection>

      <LandingCTAEn
        heading="Come feel the welcome for yourself"
        text="The warmth of a school doesn't fit in a text — you feel it in the air, in the cuddles, in the way you are received. Book a visit and watch your child be welcomed."
      />
    </div>
  );
};
