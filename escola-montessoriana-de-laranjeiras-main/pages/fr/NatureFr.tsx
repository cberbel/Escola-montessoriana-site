import React from 'react';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroFr, LandingCTAFr } from '../../components/landing/LandingFr';

const Tema: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2">{title}</h3>
    <div className="text-gray-700 text-base sm:text-lg leading-relaxed [&>p]:mb-3">{children}</div>
  </div>
);

export const NatureFr: React.FC = () => {
  usePageMeta(
    'Nature, permaculture et éducation cosmique | Escola Montessoriana de Laranjeiras',
    "Un terrain arboré, de grands espaces, des ateliers de permaculture avec potager et lombricomposteur, et l'éducation cosmique Montessori : comment les enfants découvrent l'ordre de la nature et leur place dans le monde."
  );

  return (
    <div className="bg-white">
      <LandingHeroFr
        eyebrow="Nature et appartenance"
        title="Un cocon de verdure pour grandir : nature, permaculture et éducation cosmique"
        subtitle="En pleine ville, un terrain arboré où les enfants courent, plantent, s'occupent des vers de terre et découvrent qu'ils font partie de quelque chose de plus grand."
      />

      <LandingSection heading="La permaculture en pratique : potager, lombricomposteur et abeilles" className="pt-10 sm:pt-14">
        <P>
          Commençons par ce que les enfants préfèrent : les mains dans la terre. Ici, les enfants ont des{' '}
          <strong>ateliers de permaculture</strong> intégrés au quotidien, avec un éducateur spécialisé. La
          permaculture, c'est l'art de concevoir des systèmes qui imitent l'intelligence de la nature — où rien ne se
          perd et tout se transforme.
        </P>
        <P>
          <strong>Au potager</strong>, l'enfant prépare la terre, plante, arrose, attend et récolte. Chaque étape est
          une leçon de cycles, de patience et de cause à effet — les mains dans la terre, comme les enfants
          apprennent vraiment. Et le potager est adossé à la forêt : quand il s'y tient, l'enfant est entouré de vert
          de tous les côtés.
        </P>
        <LandingImage src="/images/natureza/horta-vista.jpg" alt="Vue large du potager de l'école adossé à un mur de pierre couvert de végétation dense, avec des enfants en train de planter" />
        <LandingImage src="/images/natureza/horta-plantar.jpg" alt="Enfants plantant des semis dans des pots recyclés au potager, aidés par l'éducateur" />
        <P>
          <strong>Au lombricomposteur</strong>, les restes du goûter deviennent de la terre fertile grâce au travail
          des vers — la tâche cosmique au creux de la main. Les enfants observent, touchent et suivent la
          transformation semaine après semaine. Regardez un atelier en images (en portugais) :
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
              Votre navigateur ne prend pas en charge la vidéo.
            </video>
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">
            Atelier de permaculture : à la rencontre des vers du lombricomposteur
          </p>
        </div>
        <LandingImagePair
          images={[
            { src: '/images/natureza/minhocas-mao.jpg', alt: "Une main pleine de vers du lombricomposteur, avec des enfants rassemblés autour pour regarder" },
            { src: '/images/natureza/compostagem.jpg', alt: "Éducateur et enfants autour du bac de compost, avec des épluchures en train de devenir de la terre" },
          ]}
          caption="La tâche cosmique au creux de la main : les restes du goûter deviennent de la terre fertile, et le ver de terre devient un ami."
        />
        <P>
          <strong>Et bientôt, des abeilles indigènes sans aiguillon :</strong> nous préparons l'arrivée d'un méliponaire avec
          des abeilles brésiliennes comme la jataí — sans aiguillon, sans danger pour les enfants, et parmi les
          principales pollinisatrices de notre flore. Les enfants suivront de tout près le travail de l'une des
          créatures les plus importantes de la planète.
        </P>
      </LandingSection>

      <LandingSection heading="Pourquoi la nature est essentielle (et pas décorative)">
        <P>
          Le jeune enfant apprend avec tout son corps. La terre, le sable, l'eau, les plantes et les petites bêtes
          offrent ce qu'aucun jouet en plastique ne peut offrir : des textures, des poids, des odeurs et des
          surprises réelles, qui affinent les sens et nourrissent la curiosité scientifique avec laquelle chaque
          enfant vient au monde.
        </P>
        <P>
          Le contact quotidien avec le vert est associé à une meilleure concentration, à plus d'équilibre émotionnel,
          à une meilleure motricité et même à un système immunitaire plus solide. Dans une enfance de plus en plus
          enfermée entre les écrans et les appartements, un vrai jardin est devenu un privilège rare — et nous
          pensons que ce devrait être un droit.
        </P>
        <LandingImagePair
          images={[
            { src: '/images/natureza/tanque-areia-real.jpg', alt: "Quatre enfants en uniforme jouant ensemble dans le bac à sable de l'école" },
            { src: '/images/natureza/colagem-folhas.jpg', alt: "Petite fille souriante dans la cour, montrant son collage fait de vraies feuilles" },
          ]}
          caption="Du sable, des feuilles, des textures : le monde réel entre leurs mains."
        />
      </LandingSection>

      <LandingSection heading="De l'espace pour bouger — à dessein">
        <P>
          Maria Montessori a été pionnière en affirmant ce que les neurosciences ont confirmé depuis : le mouvement
          et l'intelligence se développent ensemble. L'enfant qui rampe, grimpe, court, porte et tient en équilibre
          construit son cerveau à travers son corps. C'est le cœur de la motricité libre.
        </P>
        <P>
          C'est pourquoi nos espaces sont généreux à dessein, pas par hasard : des ambiances spacieuses avec vue sur
          la verdure, où le mouvement est libre ; une cour couverte entourée d'arbres ; et des ateliers — capoeira,
          cirque, danse et mouvement, motricité — qui font du corps un instrument d'apprentissage.
        </P>
        <LandingImage src="/images/natureza/patio-bolhas.jpg" portrait alt="Enfants chassant des bulles de savon dans la grande cour couverte, arbres et fleurs visibles au-dessus du filet de sécurité" />
        <LandingImage src="/images/natureza/maos-tinta.jpg" portrait alt="Garçon montrant ses mains pleines de peinture dans la cour couverte, des arbres en arrière-plan" />
        <LandingImage src="/images/natureza/patio-verde.jpg" alt="Deux enfants appuyés à la rambarde de la cour, contemplant un mur d'arbres à travers le filet" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          Depuis la cour, l'enfant lève les yeux et trouve des arbres — chose rare en plein cœur de Laranjeiras.
        </p>
        <LandingImagePair
          images={[
            { src: '/images/natureza/capoeira-roda.jpg', alt: "Ronde de capoeira dans la cour couverte, avec le maître au berimbau et des arbres en arrière-plan" },
            { src: '/images/natureza/capoeira-bananeira.jpg', alt: "Enfants faisant le poirier contre le mur pendant le cours de capoeira dans la cour" },
          ]}
          caption="La capoeira dans la cour : berimbau, ronde et équilibres sous les arbres."
        />
        <LandingImage src="/images/espaco.png" alt="Ambiance spacieuse de l'Escola Montessoriana vue d'en haut, avec tables basses, matériel à hauteur d'enfant et fenêtres donnant sur le mur de verdure" />
      </LandingSection>

      <LandingSection heading="L'éducation cosmique : la place de l'enfant dans le monde" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          L'« éducation cosmique » est l'un des plus beaux concepts de Maria Montessori. Le mot vient du grec{' '}
          <em>kosmos</em> — qui signifie <strong>ordre</strong>, le contraire du chaos. L'idée : présenter le monde à
          l'enfant non comme un tas de faits épars, mais comme un tout organisé où chaque partie a un rôle.
        </P>

        <Tema title="L'ordre caché dans le chaos apparent">
          <p>
            Au premier regard, la nature a l'air d'un désordre : des feuilles qui tombent, la pluie qui arrive sans
            prévenir, des petites bêtes partout. Observée de près — et l'enfant Montessori s'exerce à observer —
            elle révèle un ordre profond : les saisons se répètent, l'eau circule, la graine sait quand germer,
            chaque être vivant a son rythme.
          </p>
          <p>
            Pour le jeune enfant, qui traverse une période sensible de l'ordre, découvrir que le monde a des lois et
            des cycles fiables est profondément rassurant. Le monde cesse d'être imprévisible et devient un lieu que
            l'on peut comprendre — et de cette sécurité naît le courage d'explorer.
          </p>
        </Tema>
        <LandingImage src="/images/natureza/ciclo-vida.jpg" alt="Enfant montrant du doigt le matériel Montessori du cycle de vie de la grenouille : un disque avec les étapes de l'œuf à la grenouille adulte" position="center 60%" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          Le cycle de la vie en matériel concret : l'enfant tient dans sa main l'ordre qui se cache derrière la nature.
        </p>

        <Tema title="Tout dépend de tout">
          <p>
            Le soleil nourrit la plante, la plante nourrit l'animal, l'animal rend les nutriments à la terre, la
            terre nourrit à nouveau la plante. Rien dans la nature ne vit seul — et les hommes non plus. Quand les
            enfants perçoivent ces liens en pratique, ils comprennent que leurs actes touchent le monde, et qu'ils y
            ont un rôle.
          </p>
        </Tema>

        <Tema title="Le travail des êtres vivants">
          <p>
            Chaque être vivant, sans le savoir, travaille pour l'ensemble : le ver aère et fertilise la terre,
            l'abeille pollinise les fleurs en cherchant sa nourriture, les champignons décomposent ce qui est mort
            pour que naisse une vie nouvelle. Montessori appelait cela la <strong>tâche cosmique</strong> — et la
            montrer aux enfants change leur rapport à leur propre travail : travailler n'est pas une corvée, c'est la
            manière qu'a chacun de prendre part au monde.
          </p>
        </Tema>
        <LandingImagePair
          images={[
            { src: '/images/natureza/material-folhas.jpg', alt: "Enfant associant des formes de feuilles avec le cabinet de botanique Montessori" },
            { src: '/images/natureza/animais-marinhos.jpg', alt: "Enfant classant des cartes et des miniatures d'animaux marins à une table Montessori" },
          ]}
          caption="Botanique et zoologie dans l'ambiance : connaître chaque être vivant est le premier pas pour le respecter."
        />

        <Tema title="La supra-nature : ce que l'homme construit">
          <p>
            Et quelle est la tâche des êtres humains ? Montessori montrait aux enfants que presque tout ce qui nous
            entoure — le pain, les maisons, les vêtements, les routes — est de la nature transformée par le travail
            accumulé des générations. C'est la <strong>supra-nature</strong> : la couche que l'humanité a bâtie sur
            le monde naturel. Le percevoir éveille la gratitude envers ceux qui nous ont précédés, et l'envie de
            contribuer à son tour.
          </p>
        </Tema>

        <Highlight>
          De cette perception naissent le soin des autres, la responsabilité environnementale et le sentiment d'avoir
          un rôle à jouer — non par des sermons, mais par l'expérience vécue.
        </Highlight>
        <LandingImage src="/images/natureza/grupo-natureza.jpg" alt="Groupe d'enfants souriants avec des couronnes de feuilles sur la tête, aux côtés de l'éducateur de permaculture, devant le mur de pierre" />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Gardiens de la nature : celui qui se sent partie du monde apprend à en prendre soin.
        </p>
      </LandingSection>

      <LandingSection heading="Chez nous, concrètement">
        <Bullets
          items={[
            'Un terrain arboré en plein cœur de Laranjeiras — un refuge de verdure dans le rythme de la ville.',
            'Des ateliers de permaculture au quotidien : potager, lombricomposteur et, bientôt, des abeilles indigènes sans aiguillon.',
            'Du temps dehors chaque jour, avec bac à sable et exploration libre.',
            "De grands espaces et la motricité libre, dans l'ambiance comme au dehors.",
            "Zéro écran : de l'expérience concrète plutôt que de la stimulation passive.",
          ]}
        />
      </LandingSection>

      <LandingCTAFr
        heading="Venez respirer cet espace en personne"
        text="Les photos aident, mais la verdure, les sons et l'ampleur des lieux ne se comprennent qu'en vrai. Réservez une visite."
      />
    </div>
  );
};
