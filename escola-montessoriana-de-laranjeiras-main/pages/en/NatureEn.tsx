import React from 'react';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroEn, LandingCTAEn } from '../../components/landing/LandingEn';

const Tema: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2">{title}</h3>
    <div className="text-gray-700 text-base sm:text-lg leading-relaxed [&>p]:mb-3">{children}</div>
  </div>
);

export const NatureEn: React.FC = () => {
  usePageMeta(
    'Nature, Permaculture and Cosmic Education | Escola Montessoriana de Laranjeiras',
    'Tree-filled grounds, wide open spaces, permaculture lessons with a vegetable garden and worm farm, and Montessori cosmic education: how children discover the order of nature and their place in the world.'
  );

  return (
    <div className="bg-white">
      <LandingHeroEn
        eyebrow="Nature and belonging"
        title="A green refuge to grow in: nature, permaculture and cosmic education"
        subtitle="In the middle of the city, tree-filled grounds where children run, plant, care for worms and discover they are part of something bigger."
      />

      <LandingSection heading="Permaculture in practice: garden, worm farm and bees" className="pt-10 sm:pt-14">
        <P>
          Let's start with what children love most: hands in the soil. Here, children have{' '}
          <strong>permaculture lessons</strong> as part of the routine, with a specialized educator. Permaculture is
          the design of systems that imitate nature's intelligence — where nothing is wasted and everything is
          transformed.
        </P>
        <P>
          <strong>In the vegetable garden</strong>, the child prepares the soil, plants, waters, waits and harvests.
          Each step is a lesson in cycles, patience and cause and effect — hands in the earth, the way children truly
          learn. And the garden leans against the forest: standing in it, the child is surrounded by green on every
          side.
        </P>
        <LandingImage src="/images/natureza/horta-vista.jpg" alt="Wide view of the school vegetable garden set against a stone wall covered in dense vegetation, with children planting in the bed" />
        <LandingImage src="/images/natureza/horta-plantar.jpg" alt="Children planting seedlings in upcycled pots in the garden, with the educator helping" />
        <P>
          <strong>In the worm farm</strong>, snack leftovers become fertile soil through the work of the worms — the
          cosmic task happening in the palm of the hand. Children observe, touch and follow the transformation week
          after week. Watch a real lesson (in Portuguese):
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
              Your browser does not support video.
            </video>
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">
            Permaculture lesson: meeting the worms of the worm farm
          </p>
        </div>
        <LandingImagePair
          images={[
            { src: '/images/natureza/minhocas-mao.jpg', alt: 'A hand full of worms from the worm farm, with children gathered around watching' },
            { src: '/images/natureza/compostagem.jpg', alt: 'Educator and children around the compost box with fruit and vegetable scraps turning into soil' },
          ]}
          caption="The cosmic task in the palm of a hand: snack leftovers become fertile soil, and the worm becomes a friend."
        />
        <P>
          <strong>And soon, native stingless bees:</strong> we are preparing the arrival of a meliponary with
          Brazilian bees such as the jataí — stingless, safe for children, and among the main pollinators of our
          flora. The children will follow, up close, the work of one of the most important creatures on the planet.
        </P>
      </LandingSection>

      <LandingSection heading="Why nature is essential (not decoration)">
        <P>
          Young children learn with their whole body. Soil, sand, water, plants and creatures offer what no plastic
          toy can: real textures, weights, smells and surprises that refine the senses and feed the scientific
          curiosity every child is born with.
        </P>
        <P>
          Daily contact with green areas is associated with better concentration, more emotional balance, better motor
          coordination and even a stronger immune system. In a childhood increasingly locked between screens and
          apartments, a real backyard has become a rare privilege — and we believe it should be a right.
        </P>
        <LandingImagePair
          images={[
            { src: '/images/natureza/tanque-areia-real.jpg', alt: 'Four children in uniform playing together in the school sand pit' },
            { src: '/images/natureza/colagem-folhas.jpg', alt: 'Girl smiling in the patio showing her collage made with real leaves' },
          ]}
          caption="Sand, leaves, textures: the real world in their hands."
        />
      </LandingSection>

      <LandingSection heading="Wide space means freedom of movement">
        <P>
          Maria Montessori was a pioneer in stating what neuroscience later confirmed: movement and intelligence
          develop together. The child who crawls, climbs, runs, carries and balances is building the brain through the
          body.
        </P>
        <P>
          That is why our spaces are wide by design, not by accident: spacious classrooms with a view of the green,
          where movement is free; a covered, tree-surrounded patio; and activities — capoeira, circus, dance and
          movement, psychomotor education — that turn the body into an instrument of learning.
        </P>
        <LandingImage src="/images/natureza/patio-bolhas.jpg" portrait alt="Children popping soap bubbles in the wide covered patio, with trees and flowers visible above the safety net" />
        <LandingImage src="/images/natureza/maos-tinta.jpg" portrait alt="Boy showing his painted hands in the covered patio, with trees in the background" />
        <LandingImage src="/images/natureza/patio-verde.jpg" alt="Two children leaning on the patio railing, gazing at a wall of green trees through the net" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          From the patio, the child looks up and finds trees — a rare thing in the heart of Laranjeiras.
        </p>
        <LandingImagePair
          images={[
            { src: '/images/natureza/capoeira-roda.jpg', alt: 'Capoeira circle in the covered patio, with the master playing the berimbau and trees in the background' },
            { src: '/images/natureza/capoeira-bananeira.jpg', alt: 'Children doing handstands against the wall during capoeira class in the patio' },
          ]}
          caption="Capoeira in the patio: berimbau, circle and handstands under the trees."
        />
        <LandingImage src="/images/espaco.png" alt="Spacious classroom at Escola Montessoriana seen from above, with low tables, materials within children's reach and windows facing the green stone wall" />
      </LandingSection>

      <LandingSection heading="Cosmic education: the child's place in the world" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          "Cosmic education" is one of Maria Montessori's most beautiful concepts. The word comes from the Greek{' '}
          <em>kosmos</em> — meaning <strong>order</strong>, the opposite of chaos. The idea: to present the world to
          the child not as a pile of loose facts, but as an organized whole in which every part has a role.
        </P>

        <Tema title="Order hidden in apparent chaos">
          <p>
            At first glance, nature looks like a mess: leaves falling, rain arriving unannounced, creatures
            everywhere. Observed closely — and the Montessori child is trained in observing — it reveals a deep order:
            the seasons repeat, water circulates, the seed knows when to sprout, every living being has its rhythm.
          </p>
          <p>
            For the young child, who lives a sensitive period for order, discovering that the world has reliable laws
            and cycles is deeply reassuring. The world stops being unpredictable and becomes a place that can be
            understood — and from that safety comes the courage to explore.
          </p>
        </Tema>
        <LandingImage src="/images/natureza/ciclo-vida.jpg" alt="Child pointing at the Montessori frog life-cycle material: a disc with the stages from egg to adult frog" position="center 60%" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          The life cycle in concrete material: the child holds, in their hand, the order behind nature.
        </p>

        <Tema title="Everything depends on everything">
          <p>
            The sun feeds the plant, the plant feeds the animal, the animal returns nutrients to the soil, the soil
            feeds the plant again. Nothing in nature lives alone — and people don't either. When children perceive
            these connections in practice, they understand that their actions affect the world, and that they have a
            role in it.
          </p>
        </Tema>

        <Tema title="The work of living beings">
          <p>
            Every living being, without knowing it, works for the whole: the worm loosens and fertilizes the soil, the
            bee pollinates the flowers while seeking its food, the fungi decompose what has died so it becomes new
            life. Montessori called this the <strong>cosmic task</strong> — and showing it to children changes their
            relationship with their own work: working is not an obligation, it is each one's way of taking part in the
            world.
          </p>
        </Tema>
        <LandingImagePair
          images={[
            { src: '/images/natureza/material-folhas.jpg', alt: 'Child matching leaf shapes with the Montessori botany cabinet' },
            { src: '/images/natureza/animais-marinhos.jpg', alt: 'Child sorting cards and miniatures of sea animals at a Montessori table' },
          ]}
          caption="Botany and zoology in the classroom: knowing each living being is the first step to respecting it."
        />

        <Tema title="Supra-nature: what humans build">
          <p>
            And what is the task of human beings? Montessori showed children that almost everything around us — bread,
            houses, clothes, roads — is nature transformed by the accumulated work of generations. It is{' '}
            <strong>supra-nature</strong>: the layer humanity has built upon the natural world. Perceiving this
            awakens gratitude for those who came before, and the desire to contribute too.
          </p>
        </Tema>

        <Highlight>
          From this perception grow care for others, environmental responsibility and a sense of purpose — not through
          lectures, but through lived experience.
        </Highlight>
        <LandingImage src="/images/natureza/grupo-natureza.jpg" alt="Group of children smiling with leaf crowns on their heads next to the permaculture educator, in front of the stone wall" />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Guardians of nature: those who feel part of the world learn to care for it.
        </p>
      </LandingSection>

      <LandingSection heading="At our school, this means">
        <Bullets
          items={[
            'Tree-filled grounds in the heart of Laranjeiras — a green refuge in the rhythm of the city.',
            'Permaculture lessons in the routine: vegetable garden, worm farm and, soon, native stingless bees.',
            'Outdoor time every day, with a sand pit and free exploration.',
            'Wide spaces and free movement, inside and outside the classroom.',
            'Zero screens: concrete experience instead of passive stimulation.',
          ]}
        />
      </LandingSection>

      <LandingCTAEn
        heading="Come feel the space in person"
        text="Photos help, but the green, the sounds and the openness can only be understood live. Book a visit."
      />
    </div>
  );
};
