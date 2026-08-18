import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroFr, LandingCTAFr } from '../../components/landing/LandingFr';

const Area: React.FC<{ title: string; children: React.ReactNode; materials?: string }> = ({ title, children, materials }) => (
  <div className="mb-8">
    <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2">{title}</h3>
    <div className="text-gray-700 text-base sm:text-lg leading-relaxed [&>p]:mb-3">{children}</div>
    {materials && (
      <p className="text-sm sm:text-base text-montessori-green/90 bg-montessori-green/5 border border-montessori-green/10 rounded-sm px-4 py-2.5 mt-3">
        <strong>Dans notre ambiance :</strong> {materials}
      </p>
    )}
  </div>
);

const alumni = [
  { name: 'Larry Page & Sergey Brin', role: 'fondateurs de Google' },
  { name: 'Jeff Bezos', role: "fondateur d'Amazon" },
  { name: 'Gabriel García Márquez', role: 'auteur de Cent ans de solitude' },
  { name: 'Beyoncé', role: 'chanteuse et entrepreneuse' },
  { name: 'Taylor Swift', role: 'auteure-compositrice-interprète' },
  { name: 'George Clooney', role: 'acteur et producteur' },
  { name: 'Stephen Curry', role: '4 fois champion NBA' },
  { name: 'Anne Frank', role: 'écrivaine' },
  { name: 'Les princes William & Harry', role: 'famille royale britannique' },
];

export const MontessoriMethodFr: React.FC = () => {
  usePageMeta(
    'La méthode Montessori | Escola Montessoriana de Laranjeiras',
    "Comprendre la pédagogie Montessori : Maria Montessori, les grands principes, les aires de l'ambiance (vie pratique, sensoriel, langage, mathématiques et éducation cosmique), le cycle de travail et ce qui change chez l'enfant."
  );

  return (
    <div className="bg-white">
      <LandingHeroFr
        eyebrow="La Méthode"
        title="Montessori : une éducation qui respecte l'intelligence de l'enfant"
        subtitle="Il y a plus d'un siècle, une médecin italienne a découvert que les enfants apprennent mieux quand l'environnement est préparé pour eux — et non quand on les façonne pour qu'ils s'y adaptent. Cette découverte a changé l'éducation dans le monde entier."
      />

      <LandingSection heading="Qui était Maria Montessori" className="pt-10 sm:pt-14">
        <P>
          Maria Montessori (1870-1952) fut l'une des premières femmes diplômées de médecine en Italie. Scientifique
          avant d'être pédagogue, elle a fait ce que personne ne faisait : observer les enfants avec rigueur
          scientifique, sans hâte et sans préjugés. Ce qu'elle a vu a tout changé — l'enfant n'est pas un adulte en
          miniature qu'il faudrait « instruire » en permanence, mais un être qui se construit lui-même, pourvu qu'il
          trouve l'environnement qu'il lui faut.
        </P>
        <P>
          Maria Montessori a vu sa pédagogie essaimer dans plus de 140
          pays. Plus d'un siècle après, les neurosciences ne cessent de confirmer ce qu'elle avait découvert par
          l'observation : le mouvement et l'apprentissage vont de pair, les premières années sont décisives, et la
          concentration profonde est le moteur du développement.
        </P>
        <LandingImage src="/images/montessori/maria-montessori.jpg" alt="Maria Montessori âgée, souriante, assise dans une école entourée d'enfants" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Maria Montessori parmi les enfants à Londres, en 1946 — toute une vie consacrée à l'enfance.
        </p>
        <Highlight>
          « L'enfant n'est pas un vase que l'on remplit, mais une source que l'on laisse jaillir. » — Maria Montessori
        </Highlight>
      </LandingSection>

      <LandingSection heading="Les grands principes de la pédagogie">
        <Bullets
          items={[
            <><strong>L'ambiance préparée :</strong> tout dans la classe — mobilier, matériel, hauteurs — est pensé pour que l'enfant s'en serve seul, sans dépendre d'un adulte à chaque pas.</>,
            <><strong>Autonomie et indépendance :</strong> l'enfant choisit ses activités et apprend à prendre soin de lui, des autres et de l'espace. L'estime de soi ne se donne pas ; elle se construit.</>,
            <><strong>La liberté dans un cadre :</strong> la liberté n'est pas l'absence de règles — c'est pouvoir choisir à l'intérieur d'un cadre clair et sûr, que l'enfant comprend et respecte.</>,
            <><strong>Les périodes sensibles :</strong> chaque étape de l'enfance ouvre des fenêtres où certains apprentissages se font presque sans effort — le langage, l'ordre, le mouvement, l'affinement des sens. La pédagogie saisit chaque fenêtre au bon moment.</>,
            <><strong>Un matériel scientifique :</strong> le matériel Montessori isole une difficulté à la fois et intègre le contrôle de l'erreur — l'enfant s'en aperçoit et se corrige seul, sans dépendre de l'approbation de l'adulte.</>,
            <><strong>L'adulte comme guide :</strong> l'éducatrice observe chaque enfant individuellement et présente le bon matériel au bon moment. C'est cela qui rend l'éducation réellement personnalisée.</>,
          ]}
        />
      </LandingSection>

      <LandingSection heading="Le programme : les aires de l'ambiance Montessori">
        <P>
          L'ambiance Montessori est organisée en aires, et l'enfant circule entre elles en choisissant son travail.
          Chaque aire a son matériel propre, présenté individuellement par l'éducatrice quand l'enfant est prêt. Les
          photos ci-dessous viennent de notre propre ambiance, des jours ordinaires bien réels.
        </P>
        <P>
          Malgré le libre choix des activités, guidé par une éducatrice non directive, le programme est extrêmement
          structuré. Rien d'improvisé : chaque matériel a un objectif de développement précis, une séquence de
          présentation et une place sur l'étagère. La liberté de l'enfant s'exerce à l'intérieur d'une progression
          pédagogique soigneusement pensée — l'éducatrice sait exactement où en est chaque enfant et ce qui vient
          ensuite.
        </P>

        <Area
          title="Vie pratique"
          materials="Cadres d'habillage (boutons, fermetures éclair, attaches), versés de solides et de liquides, transvasements à la pince et à la cuillère, vaisselle lavée soi-même, tapis roulé, soin du poupon."
        >
          <p>
            La porte d'entrée de la pédagogie. Prendre soin de soi, des autres et de l'environnement : s'habiller,
            se servir de l'eau, nettoyer la table, étendre le linge. Des gestes en apparence simples — en réalité des
            exercices de concentration, de coordination, de logique et d'autonomie. C'est ici aussi que la main se
            prépare, geste après geste, à l'écriture.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/vida-pratica-varal.jpg', alt: "Enfant étendant du linge avec des pinces, une activité de vie pratique Montessori" },
            { src: '/images/montessori/vida-pratica-tapete.jpg', alt: "Enfant roulant seul son tapis de travail après avoir terminé, dans l'ambiance Montessori" },
          ]}
        />
        <LandingImagePair
          images={[
            { src: '/images/montessori/vida-pratica-xicara.jpg', alt: "Garçon concentré versant un liquide d'un pichet dans une tasse, un exercice de vie pratique" },
            { src: '/images/montessori/vida-pratica-estante.jpg', alt: "Petite fille regardant calmement l'étagère de vie pratique, en train de choisir son prochain travail" },
          ]}
          caption="Verser sans renverser, choisir avec calme : chaque geste est un exercice de précision et de décision."
        />

        <Area
          title="Sensoriel"
          materials="Emboîtements cylindriques, escalier marron, boîtes de couleurs, cylindres colorés, tablettes thermiques."
        >
          <p>
            De 0 à 6 ans, l'enfant découvre le monde par les sens — et rien n'atteint le cerveau sans passer d'abord
            par eux. C'est pourquoi le matériel sensoriel est conçu pour l'<strong>affinement des sens</strong> :
            il transforme des concepts abstraits — grand et petit, épais et fin, dégradés de couleurs, textures et
            poids — en expériences que la main touche et que le cerveau organise. Plus les sens sont affûtés, plus le
            monde qui entre est riche. C'est le socle silencieux de l'intelligence logique et mathématique.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/sensorial-encaixes-solidos.jpg', alt: "Deux garçons travaillant ensemble avec les quatre blocs d'emboîtements cylindriques disposés en carré sur le tapis" },
            { src: '/images/montessori/sensorial-torre-rosa.jpg', alt: "Deux petites filles construisant la tour rose combinée à l'escalier marron, à la verticale" },
          ]}
        />

        <Area
          title="Langage"
          materials="Lettres rugueuses, plateau de sable, mises en paires d'objets et d'images, exercices de pré-écriture, formes à dessin en métal, cercles de lecture."
        >
          <p>
            La main se prépare à l'écriture bien avant le crayon : les exercices de <strong>préparation
            indirecte</strong>, comme la prise en pince et le contour des formes à dessin, construisent — geste après
            geste — la fermeté et la précision que l'écriture exigera.
          </p>
          <p>
            Du son à l'écriture, en passant par le corps : l'enfant suit la lettre rugueuse du bout des doigts en
            entendant le son, écrit dans le sable avant le papier, et découvre que les mots portent le monde. C'est
            ici aussi que vit notre grande particularité : l'immersion en anglais au quotidien avec des enseignantes
            anglophones et bilingues —{' '}
            <Link to="/fr/immersion-anglais" className="text-montessori-green font-semibold underline hover:no-underline">
              découvrez pourquoi commencer tôt change tout
            </Link>.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/linguagem-escrita.jpg', alt: "Enfant concentré en train d'écrire son prénom, une activité de langage Montessori" },
            { src: '/images/montessori/linguagem-caixa-areia.jpg', alt: "Garçon traçant une lettre dans le plateau de sable, la lettre rugueuse posée à côté" },
          ]}
        />

        <Area
          title="Mathématiques"
          materials="Fuseaux, chiffres rugueux, barres rouges et bleues, perles dorées."
        >
          <p>
            Dans la pédagogie Montessori, les mathématiques entrent par les mains : l'enfant tient la quantité avant de connaître le
            symbole — il empile, compare, compte avec du matériel concret. Ce sont des abstractions matérialisées :
            chaque concept mathématique reçoit un corps physique que l'enfant manipule avant de le retrouver sur le
            papier. Quand le nombre abstrait arrive, il a déjà un corps, un poids et un sens — c'est pour cela que les
            mathématiques Montessori sont solides — et n'ont jamais rien d'effrayant.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/matematica-dourado.jpg', alt: "Enfants sur le tapis avec la tour de perles dorées et les cartes des nombres" },
            { src: '/images/montessori/matematica-1000.jpg', alt: "Garçon assis sur le tapis avec le matériel de numération de 1 à 1000 : cartes des nombres, barres dorées et cube de mille" },
          ]}
        />

        <Area title="Éducation cosmique">
          <p>
            La vision la plus large de la pédagogie : aider l'enfant à percevoir que tout est lié — le soleil, les
            plantes, l'eau, les gens — et qu'il a un rôle dans l'ensemble. Concrètement : la nature, la permaculture,
            le soin de l'environnement et des uns des autres.{' '}
            <Link to="/fr/nature-education-cosmique" className="text-montessori-green font-semibold underline hover:no-underline">
              Nous y consacrons une page entière
            </Link>.
          </p>
        </Area>

        <Area
          title="Arts plastiques"
          materials="Gouache et aquarelle, pinceaux, craies, collage, pâte à modeler, papier mâché et matériaux de la nature."
        >
          <p>
            Bien avant de maîtriser les mots, l'enfant s'exprime avec ses mains. Par l'art, il donne forme à ce
            qu'il ressent et imagine — la joie, le manque, la peur, la découverte — et apprend qu'il existe bien des
            langages pour dire qui il est. C'est un travail d'<strong>expression et de sentiment</strong>, pas un
            « joli bricolage pour le mur ».
          </p>
          <p>
            En même temps, l'enfant <strong>se familiarise avec les médiums</strong> : la peinture qui coule, le
            pinceau qui obéit (ou pas), la craie, la colle, le papier qui se déchire, la texture de la pâte. Chaque
            matériau a son comportement propre, et les connaître, c'est élargir son <strong>répertoire</strong> — de
            couleurs, de formes, de possibles. Sans oublier le gain silencieux qui traverse tout le programme
            Montessori : peindre, découper et modeler <strong>exercent les mains</strong>, en affinant la
            coordination qui soutiendra plus tard l'écriture.
          </p>
          <p>
            Comme pour tout dans la méthode, c'est le processus qui compte, pas le produit : personne ne corrige le
            dessin de l'enfant ni ne peint à sa place. Le résultat : des enfants qui créent avec confiance — et
            adorent montrer ce qu'ils ont fait.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/acolhimento/adaptacao-artes.jpg', alt: 'Bébé en tablier rose explorant la peinture avec les mains pendant l\'activité d\'arts' },
            { src: '/images/montessori/artes-thadeu.jpg', alt: 'Garçon concentré peignant au pinceau et à l\'aquarelle à la table de la classe' },
          ]}
        />
        <LandingImagePair
          images={[
            { src: '/images/montessori/artes-safira.jpg', alt: 'Bébé peignant avec les doigts aux couleurs primaires sur le papier' },
            { src: '/images/natureza/colagem-folhas.jpg', alt: 'Fillette souriante montrant son collage de feuilles ramassées dans la cour' },
          ]}
          caption="Des premiers contacts avec la peinture à l'œuvre montrée avec fierté : l'expression dès le plus jeune âge."
        />
        <LandingImagePair
          images={[
            { src: '/images/montessori/artes-theo-lapis.jpg', alt: 'Élève du primaire dessinant au crayon sur une grille' },
            { src: '/images/montessori/artes-theo-pedras.jpg', alt: 'Élève du primaire dessinant des pierres précieuses en observant les images d\'un livre' },
          ]}
          caption="Chez les plus grands, l'art gagne en technique et en recherche : observation, dessin et projets personnels."
        />
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-3">
          Et ce n'est pas tout : dans notre programme <strong>Open Class</strong>, les enfants ont des cours d'arts
          avec l'artiste <strong>Marco Cavalcanti</strong> — ainsi que théâtre, mosaïque et papier mâché.{' '}
          <a
            href="/informativo-open-class.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-montessori-green font-semibold underline hover:no-underline"
          >
            Voir le programme Open Class (en portugais)
          </a>. En{' '}
          <Link to="/fr/ambiances" className="text-montessori-green font-semibold underline hover:no-underline">
            élémentaire
          </Link>
          , ce chemin continue — avec plus de technique, plus de projets et la même liberté de créer.
        </p>

        <Area title="Et tout autour">
          <p>
            La musique, les compétences socio-émotionnelles (la maison de poupées, où les enfants rejouent
            le monde pour l'apprivoiser) et les ateliers — capoeira, cirque, danse et mouvement, motricité et contes.
          </p>
        </Area>
      </LandingSection>

      <LandingSection heading="Le cycle de travail : une concentration jamais interrompue" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          L'une des découvertes les plus importantes de Maria Montessori : quand l'enfant choisit son travail et que
          personne ne l'interrompt, il entre dans des périodes de concentration profonde — et c'est précisément dans
          ces périodes que le développement a lieu.
        </P>
        <P>
          C'est pourquoi la journée Montessori protège le <strong>cycle de travail ininterrompu</strong> : une longue
          plage où chaque enfant choisit, travaille, répète autant de fois qu'il le souhaite et range son matériel une
          fois terminé. Pas de sonnerie toutes les 50 minutes, pas d'adulte qui coupe l'activité pour « passer à la
          suite ».
        </P>
        <Highlight>
          Dans un monde qui fragmente l'attention dès le plus jeune âge, un enfant capable de se concentrer longtemps
          part avec un avantage pour la vie.
        </Highlight>
        <LandingImage src="/images/montessori/concentracao.jpg" alt="Enfant accroupi, absorbé, traçant une forme à dessin ronde sur le sol de l'ambiance" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          La concentration profonde ne s'enseigne pas — elle se protège.
        </p>
      </LandingSection>

      <LandingSection heading="Ce qui change chez l'enfant">
        <Bullets
          items={[
            <><strong>Il choisit.</strong> Chaque jour, l'enfant prend de vraies décisions — et celui qui s'exerce à choisir dès le plus jeune âge décidera mieux toute sa vie.</>,
            <><strong>Il a confiance en lui.</strong> L'enfant qui fait par lui-même — et se corrige seul — construit une confiance qui ne dépend pas des compliments.</>,
            <><strong>Il se concentre.</strong> De longues plages d'attention véritable, toujours plus rares et toujours plus précieuses.</>,
            <><strong>Il prend soin.</strong> De l'environnement, du matériel, de ses camarades — une responsabilité vécue, pas sermonnée.</>,
            <><strong>Il aime apprendre.</strong> Apprendre n'a jamais été une obligation ; ça a toujours été une découverte.</>,
          ]}
        />
        <LandingImage src="/images/montessori/cuidado-banho.jpg" alt="Enfant donnant soigneusement le bain à un poupon, une activité Montessori de soin de l'autre" portrait />
      </LandingSection>

      <LandingSection heading="Ils ont commencé dans une ambiance Montessori">
        <P>
          Ce n'est pas un hasard si tant de personnalités créatives, entreprenantes et sûres d'elles sont passées par
          des écoles Montessori dans leur enfance :
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
          Larry Page et Sergey Brin, les fondateurs de Google, ont publiquement attribué à leur éducation Montessori
          leur capacité à penser par eux-mêmes, à remettre en question l'ordre établi et à rester motivés par eux-mêmes — les
          qualités mêmes que l'avenir exigera de nos enfants.
        </P>
      </LandingSection>

      <LandingCTAFr
        heading="Voyez la méthode en action"
        text="Aucun texte ne remplace la vue d'une ambiance Montessori au travail. Réservez une visite et observez les enfants travailler."
      />
    </div>
  );
};
