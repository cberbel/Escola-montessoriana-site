import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroFr, LandingCTAFr } from '../../components/landing/LandingFr';

export const EnglishImmersionFr: React.FC = () => {
  usePageMeta(
    "L'anglais dès la petite enfance | Escola Montessoriana de Laranjeiras",
    "Pourquoi les premières années sont la meilleure fenêtre pour l'anglais : acquisition naturelle par immersion quotidienne avec des enseignantes natives et bilingues, les bénéfices du cerveau bilingue sur les fonctions exécutives, et l'accès au savoir du monde."
  );

  return (
    <div className="bg-white">
      <LandingHeroFr
        eyebrow="Bilinguisme"
        title="L'anglais dès la petite enfance : le moment idéal"
        subtitle="Aucun adulte n'apprend une langue avec la facilité d'un jeune enfant. Ce n'est pas du talent — c'est de la biologie. Et c'est exactement maintenant qu'il faut commencer."
      />

      <LandingSection heading="Pourquoi si tôt ?" className="pt-10 sm:pt-14">
        <P>
          Dans les premières années de vie, le cerveau de l'enfant construit les circuits du langage. À ce stade, il
          n'« étudie » pas une langue — il l'absorbe, exactement comme il absorbe sa langue maternelle : en écoutant,
          en jouant, en vivant. C'est ce que Maria Montessori appelait l'esprit absorbant.
        </P>
        <P>
          La capacité à distinguer et à reproduire les sons de n'importe quelle langue culmine dans la petite enfance
          puis décline avec les années. Voilà pourquoi ceux qui commencent tôt parlent sans accent et sans effort —
          tandis que ceux qui commencent tard étudient pendant des années pour un résultat moindre.{' '}
          <Link to="/fr/cerveau-de-votre-enfant" className="text-montessori-green font-semibold underline hover:no-underline">
            Découvrez la science des périodes sensibles
          </Link>.
        </P>
        <LandingImage
          src="/images/ingles/safira-patio.jpg"
          alt="Bébé de l'Escola Montessoriana jouant dans la cour, au sommet de la période d'absorption du langage"
          portrait
        />
        <Highlight>
          Pour un jeune enfant, l'anglais n'est pas une matière. C'est simplement une autre façon naturelle de parler
          avec des personnes qu'il aime.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Le coût d'opportunité : gratuit aujourd'hui, coûteux demain" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Voici l'argument que presque personne n'avance — et c'est peut-être le plus important. Dans la petite
          enfance, l'anglais arrive <strong>intégré à la vie</strong> : dans la chanson du regroupement, au goûter,
          dans les jeux de la cour. Il ne prend pas une seule heure de plus dans la journée de l'enfant. Le coût, en
          temps et en effort, est pratiquement <strong>nul</strong>.
        </P>
        <P>
          Quelques années plus tard, tout change. L'emploi du temps du grand enfant se remplit — sport, musique,
          devoirs, copains, vie sociale. L'anglais cesse d'être quelque chose que l'on vit et devient <strong>une
          activité de plus</strong> à caser dans la semaine : un cours supplémentaire, un créneau qui entre en
          concurrence avec tout ce que l'enfant a aussi envie de faire. Cela coûte de l'argent, des heures, de la
          volonté — pour un résultat inférieur, avec plus d'efforts et presque toujours avec un accent.
        </P>
        <LandingImage
          src="/images/ingles/bebe-atividade.jpg"
          alt="Bébé souriant pendant une activité à l'Escola Montessoriana — à cet âge, l'anglais s'apprend en jouant, sans coût de temps"
          portrait
        />
        <Highlight>
          La langue qui entre aujourd'hui par le jeu devient demain une corvée de plus dans l'agenda. Apprendre
          l'anglais tôt, ce n'est pas anticiper une matière — c'est saisir la seule période où cela ne coûte presque
          rien.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Un cerveau bilingue est un cerveau plus fort">
        <P>
          Les bénéfices du bilinguisme précoce vont bien au-delà de parler deux langues. La chercheuse Ellen
          Bialystok, l'une des grandes références mondiales du domaine, a montré que le cerveau bilingue résout en
          permanence une question invisible — « quelle langue j'utilise maintenant ? » — et que cet exercice constant
          renforce les <strong>fonctions exécutives</strong> : l'ensemble des capacités qui gouvernent l'attention,
          le contrôle de soi et l'organisation de la pensée.
        </P>
        <Bullets
          items={[
            <><strong>Le contrôle inhibiteur :</strong> pour parler une langue, le cerveau doit « retenir » l'autre. C'est le même muscle mental qui aide un enfant à se concentrer et à résister aux distractions.</>,
            <><strong>La mémoire de travail :</strong> garder deux systèmes actifs en même temps entraîne la capacité à retenir et manipuler l'information — la base du raisonnement et des mathématiques.</>,
            <><strong>La flexibilité cognitive :</strong> passer d'une langue à l'autre, c'est passer d'une façon de voir le monde à une autre. Celui qui le fait très tôt pense avec plus d'agilité.</>,
            <><strong>La conscience du langage :</strong> comprendre qu'une même chose porte deux noms éveille très tôt le sens du fonctionnement des langues — et rend la troisième et la quatrième plus faciles.</>,
          ]}
        />
        <P>
          Les fonctions exécutives prédisent la réussite scolaire et professionnelle mieux que le QI lui-même — et,
          comme toute compétence fondatrice, elles se construisent le plus facilement dans les premières années.{' '}
          <Link to="/fr/cerveau-de-votre-enfant" className="text-montessori-green font-semibold underline hover:no-underline">
            C'est le principe « les compétences appellent les compétences »
          </Link> : plus ce socle se construit tôt, plus tout ce qui vient ensuite s'y appuie.
        </P>
      </LandingSection>

      <LandingSection heading="Le savoir du monde est en anglais" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Il y a une raison pratique, et immense, que l'on oublie souvent : l'anglais est la langue dans laquelle le
          monde pense et partage ce qu'il sait. La science de pointe, la médecine, la technologie, l'aviation, les
          affaires internationales, le meilleur d'internet — tout cela se passe, d'abord, en anglais.
        </P>
        <P>
          Un enfant qui grandit à l'aise en anglais ne dépendra ni des traductions ni des sous-titres. Il aura un{' '}
          <strong>accès direct à la source</strong> : étudier dans les meilleures universités du monde, lire l'article
          original, écouter la conférence de l'expert, travailler avec des gens de tous les pays. L'anglais cesse
          d'être une matière à conquérir et devient une <strong>clé</strong> — celle qui ouvre la pièce où circule le
          vrai savoir.
        </P>
        <Highlight>
          Offrir à un enfant un anglais courant, ce n'est pas lui offrir une compétence de plus. C'est agrandir le
          monde auquel il aura accès toute sa vie.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Une vraie immersion, avec des enseignantes natives et bilingues">
        <P>
          Un cours d'anglais une ou deux fois par semaine ne crée pas de bilinguisme — il crée du vocabulaire appris
          par cœur qui s'évapore pendant les vacances. Ce qui fonctionne, c'est l'immersion : la langue présente dans
          le quotidien, chaque jour, dans des situations réelles.
        </P>
        <P>
          À l'Escola Montessoriana, les enfants baignent dans l'anglais chaque jour, porté par la voix d'enseignantes
          qui le parlent couramment — natives et Brésiliennes bilingues. La langue surgit dans les jeux, les chansons,
          les repas, la cour — exactement comme leur langue maternelle est entrée dans leur vie. Sans pression, sans
          contrôles, sans « c'est l'heure de l'anglais ». La langue devient simplement une partie de la vie.
        </P>
        <P>
          Et il faut de vraies personnes : les recherches de Patricia Kuhl ont montré que les bébés apprennent les
          sons d'une nouvelle langue auprès d'une personne présente qui interagit — et n'apprennent rien en regardant
          le même contenu sur un écran, seuls. C'est pourquoi l'immersion en direct, avec de vraies personnes chaque
          jour, fait toute la différence — et aucune application ne peut la remplacer.
        </P>
      </LandingSection>

      <LandingSection heading="Et nous ne nous arrêtons pas à l'anglais">
        <P>
          Les familles qui le souhaitent peuvent choisir une langue de plus pour leur enfant :{' '}
          <strong>le français</strong>, le mandarin, l'espagnol, l'italien ou l'allemand. La même logique d'immersion
          s'applique à la troisième langue — et la même fenêtre de la petite enfance aussi. Plus on commence tôt, plus
          c'est naturel, facile et durable. C'est ce qui fait de nous une école véritablement{' '}
          <strong>trilingue</strong> : le portugais, l'anglais, et une troisième langue choisie par la famille. Pour
          les familles francophones, c'est aussi l'assurance que le français de la maison reste vivant et valorisé.
        </P>
      </LandingSection>

      <LandingCTAFr
        heading="Venez écouter des enfants vivre en deux langues"
        text="Planifiez une visite et observez l'immersion se faire naturellement, avec des enseignantes natives et brésiliennes, au beau milieu du quotidien."
      />
    </div>
  );
};
