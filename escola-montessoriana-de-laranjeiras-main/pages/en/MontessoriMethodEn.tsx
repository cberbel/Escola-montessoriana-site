import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEn, LandingCTAEn } from '../../components/landing/LandingEn';

const Area: React.FC<{ title: string; children: React.ReactNode; materials?: string }> = ({ title, children, materials }) => (
  <div className="mb-8">
    <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2">{title}</h3>
    <div className="text-gray-700 text-base sm:text-lg leading-relaxed [&>p]:mb-3">{children}</div>
    {materials && (
      <p className="text-sm sm:text-base text-montessori-green/90 bg-montessori-green/5 border border-montessori-green/10 rounded-sm px-4 py-2.5 mt-3">
        <strong>In our classroom:</strong> {materials}
      </p>
    )}
  </div>
);

const alumni = [
  { name: 'Larry Page & Sergey Brin', role: 'founders of Google' },
  { name: 'Jeff Bezos', role: 'founder of Amazon' },
  { name: 'Gabriel García Márquez', role: 'Nobel laureate in Literature' },
  { name: 'Beyoncé', role: 'singer and entrepreneur' },
  { name: 'Taylor Swift', role: 'singer-songwriter' },
  { name: 'George Clooney', role: 'actor and producer' },
  { name: 'Stephen Curry', role: '4x NBA champion' },
  { name: 'Anne Frank', role: 'writer' },
  { name: 'Princes William & Harry', role: 'British royals' },
];

export const MontessoriMethodEn: React.FC = () => {
  usePageMeta(
    'The Montessori Method | Escola Montessoriana de Laranjeiras',
    'Understand the Montessori method: Maria Montessori, the principles, the curriculum (practical life, sensorial, language, math and cosmic education), the work cycle and what changes in the child.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEn
        eyebrow="The Method"
        title="Montessori: education that respects the child's intelligence"
        subtitle="Over a century ago, an Italian physician discovered that children learn best when the environment is prepared for them — not when they are shaped to fit the environment. That discovery changed education around the world."
      />

      <LandingSection heading="Who was Maria Montessori" className="pt-10 sm:pt-14">
        <P>
          Maria Montessori (1870–1952) was one of the first women to earn a medical degree in Italy. A scientist
          before an educator, she did what no one else was doing: she observed children with scientific rigor, without
          hurry and without prejudice. What she saw changed everything — the child is not a miniature adult who needs
          to be "taught" all the time, but a being who builds themselves, as long as they find the right environment
          for it.
        </P>
        <P>
          Nominated three times for the Nobel Peace Prize, Maria Montessori saw her method spread to more than 140
          countries. Over a century later, neuroscience keeps confirming what she discovered through observation:
          movement and learning go hand in hand, the first years are decisive, and deep concentration is the engine of
          development.
        </P>
        <LandingImage src="/images/montessori/maria-montessori.jpg" alt="Maria Montessori in her later years, smiling, seated at a school surrounded by children" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Maria Montessori among children in London, 1946 — a whole life devoted to childhood.
        </p>
        <Highlight>
          "The child is not a vase to be filled, but a spring to be allowed to flow." — Maria Montessori
        </Highlight>
      </LandingSection>

      <LandingSection heading="The principles of the method">
        <Bullets
          items={[
            <><strong>Prepared environment:</strong> everything in the classroom — furniture, materials, heights — is designed for the child to use on their own, without depending on an adult at every step.</>,
            <><strong>Autonomy and independence:</strong> the child chooses their activities and learns to care for themselves, for others and for the space. Self-esteem is not given; it is built.</>,
            <><strong>Freedom within limits:</strong> freedom is not the absence of rules — it is being able to choose within a clear, safe framework the child understands and respects.</>,
            <><strong>Sensitive periods:</strong> each phase of childhood has windows when certain learning happens almost effortlessly — language, order, movement, refinement of the senses. The method uses each window at the right moment.</>,
            <><strong>Scientific materials:</strong> Montessori materials isolate one difficulty at a time and have built-in control of error — the child notices and corrects themselves, without depending on adult approval.</>,
            <><strong>The adult as a guide:</strong> the teacher observes each child individually and presents the right material at the right time. That is what makes the education truly personalized.</>,
          ]}
        />
      </LandingSection>

      <LandingSection heading="The curriculum: the areas of the Montessori classroom">
        <P>
          The Montessori classroom is organized into areas, and the child moves between them choosing their work. Each
          area has specific materials, presented individually by the teacher when the child is ready. The photos below
          are from our own classroom, on real ordinary days.
        </P>
        <P>
          Despite the free choice of activities, guided by a non-directive teacher, the curriculum is highly
          structured. It is not improvisation: every material has a defined developmental purpose, a sequence of
          presentation and a proper place on the shelf. The child's freedom happens inside a carefully planned
          pedagogical progression — the teacher knows exactly where each child is and what comes next.
        </P>

        <Area
          title="Practical Life"
          materials="Dressing frames (buttons, zippers, fasteners), pouring solids and liquids, transferring with tongs and spoons, washing their own dishes, rolling the mat, caring for the baby doll."
        >
          <p>
            The doorway into the method. Caring for oneself, for others and for the environment: getting dressed,
            serving water, cleaning the table, hanging clothes on the line. They look like simple gestures — they are
            exercises in concentration, coordination, logical sequence and independence. It is also here that the hand
            prepares itself, movement by movement, for writing.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/vida-pratica-varal.jpg', alt: 'Child hanging clothes on the line with clothespins, a Montessori Practical Life activity' },
            { src: '/images/montessori/vida-pratica-tapete.jpg', alt: 'Child rolling up the work mat by themselves after finishing, in the Montessori classroom' },
          ]}
        />
        <LandingImagePair
          images={[
            { src: '/images/montessori/vida-pratica-xicara.jpg', alt: 'Boy concentrating while pouring liquid from a jug into a cup, a Practical Life exercise' },
            { src: '/images/montessori/vida-pratica-estante.jpg', alt: 'Girl calmly looking at the Practical Life shelf, choosing her next work' },
          ]}
          caption="Pouring without spilling, choosing with calm: every gesture is an exercise in precision and decision."
        />

        <Area
          title="Sensorial"
          materials="Knobbed Cylinders, Brown Stair, Color Boxes, Colored Cylinders, Thermic Tablets."
        >
          <p>
            From 0 to 6, the child gets to know the world through the senses — and nothing reaches the brain without
            first passing through them. That is why the sensorial materials are made for the <strong>refinement of the
            senses</strong>: they turn abstract concepts — big and small, thick and thin, gradations of color, textures
            and weights — into experiences the hand touches and the brain organizes. The sharper the senses, the richer
            the world that comes in. It is the silent foundation of logical and mathematical intelligence.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/sensorial-encaixes-solidos.jpg', alt: 'Two boys working together with the four blocks of Knobbed Cylinders arranged in a square on the mat' },
            { src: '/images/montessori/sensorial-torre-rosa.jpg', alt: 'Two girls building the Pink Tower combined with the Brown Stair, vertically' },
          ]}
        />

        <Area
          title="Language"
          materials="Sandpaper Letters, Sand Tray, object and picture matching, pre-writing exercises, metal insets, reading circles."
        >
          <p>
            The hand prepares for writing long before the pencil: exercises of <strong>indirect preparation</strong>,
            such as the pincer grip and tracing the metal insets, build — gesture by gesture — the firmness and
            precision that writing will demand.
          </p>
          <p>
            From sound to writing, through the body: the child traces the Sandpaper Letter with their fingers while
            hearing the sound, writes in sand before paper, and discovers that words carry the world. Here also lives
            our signature difference: daily English immersion with native and bilingual teachers —{' '}
            <Link to="/en/english-immersion" className="text-montessori-green font-semibold underline hover:no-underline">
              see why starting early matters
            </Link>.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/linguagem-escrita.jpg', alt: 'Child concentrating while writing their name, a Montessori language activity' },
            { src: '/images/montessori/linguagem-caixa-areia.jpg', alt: 'Boy tracing a letter in the Sand Tray, with the Sandpaper Letter beside it' },
          ]}
        />

        <Area
          title="Mathematics"
          materials="Spindle Boxes, Sandpaper Numerals, Red and Blue Rods, Golden Beads."
        >
          <p>
            In Montessori, mathematics enters through the hands: the child holds the quantity before knowing the
            symbol — stacking, comparing, counting with concrete materials. These are materialized abstractions — every
            mathematical concept is given a physical body the child handles before meeting it on paper. When the
            abstract number arrives, it already has body, weight and meaning — which is why Montessori math is solid
            and fearless.
          </p>
        </Area>
        <LandingImage src="/images/montessori/matematica-dourado.jpg" alt="Children on the mat with the Golden Beads tower and the number cards" />

        <Area title="Cosmic Education">
          <p>
            The widest view of the method: helping the child realize that everything is connected — the sun, the
            plants, the water, the people — and that they have a role in the whole. In practice: nature, permaculture,
            care for the environment and for one another.{' '}
            <Link to="/en/nature-cosmic-education" className="text-montessori-green font-semibold underline hover:no-underline">
              We dedicate an entire page to it
            </Link>.
          </p>
        </Area>

        <Area title="And all around it">
          <p>
            Arts, music, social-emotional learning (the Dolls' House, where children process the world through play)
            and the enrichment activities — capoeira, circus, dance and movement, psychomotor education and
            storytelling.
          </p>
        </Area>
      </LandingSection>

      <LandingSection heading="The work cycle: concentration that is never interrupted" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          One of Maria Montessori's most important discoveries: when the child chooses their work and no one
          interrupts them, they enter periods of deep concentration — and it is precisely in those periods that
          development happens.
        </P>
        <P>
          That is why the Montessori routine protects the <strong>uninterrupted work cycle</strong>: a long stretch in
          which each child chooses, works, repeats as many times as they wish and puts the material away when done. No
          bell ringing every 50 minutes, no adult cutting the activity short for "the next task".
        </P>
        <Highlight>
          In a world that fragments attention from an early age, a child capable of concentrating for long periods
          carries an advantage for life.
        </Highlight>
        <LandingImage src="/images/montessori/concentracao.jpg" alt="Child crouched down, absorbed, tracing a round metal inset on the classroom floor" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Deep concentration is not taught — it is protected.
        </p>
      </LandingSection>

      <LandingSection heading="What changes in the child">
        <Bullets
          items={[
            <><strong>They choose.</strong> Every day the child makes real decisions — and whoever practices choosing from an early age decides better for life.</>,
            <><strong>They trust themselves.</strong> The child who does things by themselves — and self-corrects — builds a confidence that does not depend on praise.</>,
            <><strong>They concentrate.</strong> Long periods of genuine attention, ever rarer and ever more valuable.</>,
            <><strong>They care.</strong> For the environment, the materials, their classmates — responsibility lived, not lectured.</>,
            <><strong>They love learning.</strong> Learning was never an obligation; it was always a discovery.</>,
          ]}
        />
        <LandingImage src="/images/montessori/cuidado-banho.jpg" alt="Child carefully bathing a baby doll, a Montessori activity of caring for others" portrait />
      </LandingSection>

      <LandingSection heading="They started in a Montessori classroom">
        <P>
          It is no coincidence that so many creative, entrepreneurial and self-assured people went through Montessori
          schools as children:
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
          Larry Page and Sergey Brin, the founders of Google, have publicly credited their Montessori education for
          their ability to think for themselves, question the status quo and stay self-motivated — the very qualities
          the future will demand of our children.
        </P>
      </LandingSection>

      <LandingCTAEn
        heading="See the method in action"
        text="No text can replace seeing a Montessori classroom at work. Book a visit and watch how the children work."
      />
    </div>
  );
};
