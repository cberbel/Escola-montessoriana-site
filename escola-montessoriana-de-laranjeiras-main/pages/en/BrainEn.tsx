import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEn, LandingCTAEn } from '../../components/landing/LandingEn';
import { SynapseDiagram } from '../../components/landing/SynapseDiagram';
import { SensitivePeriodsChart } from '../../components/landing/SensitivePeriodsChart';

export const BrainEn: React.FC = () => {
  usePageMeta(
    "The Early Years and the Brain | Escola Montessoriana de Laranjeiras",
    'The science of early childhood: brain architecture, the research of Fernald, Kuhl and Charles Nelson on language, movement and attachment — and why the choice of school matters more than the distance from home.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEn
        eyebrow="The early years"
        title="The window that never comes back"
        subtitle="What happens in your child's brain right now builds the foundation for everything that comes after. In the first years of life, up to 1 million new neural connections form every second — no other phase of life comes close."
      />

      <LandingSection heading="The architecture is built once" className="pt-10 sm:pt-14">
        <P>
          A newborn's brain weighs about 350–400g — roughly 25% of its adult weight (about 1.3 to 1.4 kg) — yet it
          already holds virtually all the neurons that person will ever have, around 86 billion. The growth that
          follows is not about creating more neurons: it is about connecting them.
        </P>
        <P>
          That growth is staggering. By age 1, the brain has reached about 70% of its adult weight; by 3, around 80%;
          by 5, about 90%. Much of the brain architecture a person will use for their entire life is, quite literally,
          assembled before they learn to read.
        </P>
        <SynapseDiagram />
        <P>
          Like a house, it can be renovated later. But the foundation is laid once. That is why Harvard's Center on
          the Developing Child — the world reference in child development science — describes this process as "brain
          architecture": a building constructed from the bottom up, whose structural quality depends directly on the
          quality of the experiences lived in these first years.
        </P>
        <LandingImage src="/images/cerebro/bebe-material.jpg" alt="One-year-old concentrating while fitting colored discs onto wooden pegs, in the classroom" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Every fitting, a connection: this is how, through the hand, the architecture is built.
        </p>
      </LandingSection>

      <LandingSection heading='"Skills beget skills": why delay compounds' className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          One of the most important findings in the economics of education — from Nobel laureate James Heckman — is
          that skill begets skill, and motivation begets motivation. Foundational capacities such as attention,
          self-regulation and communication, built in the first years, are the base on which more complex abilities
          rest later: reasoning, reading, social relationships.
        </P>
        <P>
          The reverse is also true, and that is where the urgency lies: a brain that did not receive enough stimulus
          early does not start from zero later — it starts from behind, trying to build the second floor without the
          first one ready. Each year of delay becomes more expensive and harder to recover than the one before.
        </P>
        <LandingImage src="/images/cerebro/bebe-encaixes.jpg" alt="Baby concentrating while fitting colored geometric blocks onto a wooden base" portrait />
        <Highlight>
          This is not about rushing childhood. It is about not missing the window when building these foundations
          costs naturally little — because that is exactly what the brain at this age is prepared to do.
        </Highlight>
      </LandingSection>

      <LandingSection heading="The role of language">
        <P>
          Stanford researcher Anne Fernald showed something remarkable: babies who hear more language directed at them
          — not just around them, but directly, in real conversation — process words faster and more efficiently by 18
          months. That processing speed, measured in the lab, predicts vocabulary size years later. The difference is
          not innate intelligence: it is the quantity and quality of conversation lived.
        </P>
        <P>
          Patricia Kuhl, of the University of Washington, discovered something equally important about the "when".
          Babies are born as what she calls "citizens of the world", able to distinguish the sounds of any human
          language. Around 10–12 months, that ability specializes in the sounds of the language they hear — a window
          that progressively closes. And in a celebrated experiment, Kuhl showed that babies exposed to a new language
          by a live person learned its sounds — while babies exposed to the same content on video, alone, learned
          nothing. The screen does not replace real social interaction.
        </P>
        <P>
          It is through this very window — the one Kuhl measured — that English immersion makes such a difference when
          it starts early, with a real person rather than an app.{' '}
          <Link to="/en/english-immersion" className="text-montessori-green font-semibold underline hover:no-underline">
            See why English in early childhood is so powerful
          </Link>.
        </P>
        <P>
          And language is not the only one with a deadline. Every major brain function — the senses, language, higher
          cognitive functions — has its own window of greatest ease, and they all concentrate in the first years of
          life:
        </P>
        <SensitivePeriodsChart />
        <LandingImage src="/images/cerebro/leitura-bebes.jpg" alt="Teacher reading an illustrated book to three babies sitting around her in the classroom" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          Real language: a real person, a book, and babies responding — "serve and return" in action.
        </p>
        <Highlight>
          Hearing is not enough: a baby's brain learns language in relationship with another person, live, responding
          and being responded to — that is why it is called "serve and return".
        </Highlight>
      </LandingSection>

      <LandingSection heading="The role of movement">
        <P>
          Maria Montessori stated, a century ago, that movement and intelligence are deeply linked — and neuroscience
          confirmed it. Crawling, climbing, balancing and handling objects with one's own hands is not just physical
          development: it is cognitive construction. The cerebellum, traditionally associated only with motor
          coordination, also participates actively in functions such as language, attention and planning.
        </P>
        <P>
          That is why an environment that restricts movement — more sitting, more screens, less free exploration —
          does not save the child's energy for "more important things". It deprives the brain of exactly one of the
          fuels it needs most at this age.
        </P>
        <LandingImagePair
          images={[
            { src: '/images/cerebro/bebes-escada.jpg', alt: 'Three babies smiling at the top of the wooden Montessori stairs, inside the classroom' },
            { src: '/images/cerebro/patio-musica.jpg', alt: 'Movement and music class in the covered patio, with babies, teachers and trees in the background' },
          ]}
          caption="Climbing, dancing, balancing: movement is brain fuel — in the classroom and in the patio."
        />
      </LandingSection>

      <LandingSection heading="The role of attachment" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          The most striking evidence on the importance of affectionate bonds comes from the work of Harvard researcher
          Charles Nelson in the Bucharest Early Intervention Project. The study followed Romanian children raised in
          orphanages — institutions that provided food, hygiene and shelter, but very little individualized attention
          and responsive affection. The result: these children showed reduced brain volume and measurable changes in
          the brain's electrical activity, compared with children raised in families.
        </P>
        <P>
          The most important finding for a family deciding today: children moved to an affectionate, responsive home
          before age 2 recovered much of the lost development. Those moved later did not. It was not the lack of food
          or shelter that harmed brain development — it was the absence of an adult responding, consistently and
          individually, to each of them.
        </P>
        <Highlight>
          "Being well looked after" is not the same as having development nurtured. The question that matters is not
          whether your child is safe and fed — it is whether someone is genuinely present, responding to them, every
          single day.
        </Highlight>
      </LandingSection>

      <LandingSection heading={'"But there is a daycare right next door..."'}>
        <P>
          It is the most honest doubt we hear — and it deserves an honest answer. Convenience matters, especially in
          the packed routine of parents with young children. But in light of what science shows about brain
          architecture, unique windows and the role of attachment, it is worth putting both things on the scale:
        </P>
        <Bullets
          items={[
            <><strong>Do the math on hours.</strong> Ten or fifteen extra minutes of commute — against 8, 9, 10 hours a day your child lives inside the school. Which weighs more in their life: the few minutes in the car, or the thousands of hours of experiences building their brain?</>,
            <><strong>This window does not come back.</strong> As Charles Nelson's work showed, the earlier the right environment arrives, the greater the possible recovery — and the reverse is also true. Skills beget skills: what is not built now becomes harder to build later.</>,
            <><strong>"Well cared for" is not the same as developing.</strong> A clean, kind place is the minimum. The right question is: what happens to my child's language, movement and attachment during the 8 hours a day they spend there?</>,
          ]}
        />
        <P>
          And logistics have a solution: we are open from 7:30am to 7pm, with flexible schedules that adapt to the
          family's routine — in Laranjeiras, minutes away from Cosme Velho, Flamengo, Botafogo and Catete.
        </P>
      </LandingSection>

      <LandingSection heading="What we do with this window">
        <Bullets
          items={[
            'One teacher for every 3 babies under 18 months: every babble, every attempt, meets an adult who observes and responds.',
            'Daily English immersion with native and bilingual teachers, at the peak of the language window — through "serve and return", not through screens.',
            'A prepared Montessori environment: free movement, concrete hands-on materials — zero screens.',
            "Individual observation: each child is followed at their own pace, with real records of their development.",
          ]}
        />
      </LandingSection>

      <LandingCTAEn
        heading="Decide with your own eyes"
        text="Visit the school, watch the classrooms at work and compare. Your child has one early childhood — choose what it will build."
      />
    </div>
  );
};
