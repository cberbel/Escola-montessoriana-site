import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroFr, LandingCTAFr } from '../../components/landing/LandingFr';
import { SynapseDiagram } from '../../components/landing/SynapseDiagram';
import { SensitivePeriodsChart } from '../../components/landing/SensitivePeriodsChart';

export const BrainFr: React.FC = () => {
  usePageMeta(
    'Les premières années et le cerveau | Escola Montessoriana de Laranjeiras',
    "La science de la petite enfance : l'architecture cérébrale, les recherches de Fernald, Kuhl et Charles Nelson sur le langage, le mouvement et l'attachement — et pourquoi le choix de l'école compte plus que la distance de la maison."
  );

  return (
    <div className="bg-white">
      <LandingHeroFr
        eyebrow="Les premières années"
        title="La fenêtre qui ne se rouvre jamais"
        subtitle="Ce qui se passe dans le cerveau de votre enfant en ce moment même pose les fondations de tout ce qui suivra. Dans les premières années de vie, jusqu'à 1 million de nouvelles connexions neuronales se forment chaque seconde — aucune autre période de la vie n'en approche."
      />

      <LandingSection heading="L'architecture ne se construit qu'une fois" className="pt-10 sm:pt-14">
        <P>
          Le cerveau d'un nouveau-né pèse environ 350 à 400 g — à peu près 25 % de son poids adulte (1,3 à 1,4 kg) —
          et pourtant il contient déjà la quasi-totalité des neurones que cette personne aura jamais, près de
          86 milliards. La croissance qui suit ne consiste pas à créer de nouveaux neurones : elle consiste à les
          connecter.
        </P>
        <P>
          Et cette croissance est vertigineuse. À 1 an, le cerveau atteint environ 70 % de son poids adulte ; à 3 ans,
          près de 80 % ; à 5 ans, environ 90 %. Une grande partie de l'architecture cérébrale qu'une personne
          utilisera toute sa vie est, littéralement, assemblée avant même d'apprendre à lire.
        </P>
        <SynapseDiagram />
        <P>
          Comme une maison, on peut la rénover plus tard. Mais les fondations, elles, ne se coulent qu'une fois. C'est
          pourquoi le Center on the Developing Child de Harvard — la référence mondiale en science du développement de
          l'enfant — parle d'« architecture cérébrale » : un édifice construit de bas en haut, dont la solidité dépend
          directement de la qualité des expériences vécues dans ces premières années.
        </P>
        <LandingImage src="/images/cerebro/bebe-material.jpg" alt="Enfant d'un an concentré, emboîtant des disques colorés sur des tiges en bois, dans l'ambiance" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Chaque encastrement, une connexion : c'est ainsi, par la main, que l'architecture se construit.
        </p>
      </LandingSection>

      <LandingSection heading="« Les compétences appellent les compétences » : pourquoi le retard fait boule de neige" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          L'une des découvertes majeures de l'économie de l'éducation — due au prix Nobel James Heckman — est que la
          compétence appelle la compétence, et la motivation appelle la motivation. Les capacités fondatrices comme
          l'attention, l'autorégulation et la communication, construites dans les premières années, forment le socle
          sur lequel reposent ensuite les habiletés plus complexes : le raisonnement, la lecture, les relations
          sociales.
        </P>
        <P>
          L'inverse est vrai aussi, et c'est là que réside l'urgence : un cerveau qui n'a pas reçu assez de
          stimulations tôt ne repart pas de zéro plus tard — il part avec un handicap, en essayant de monter le
          premier étage sans que le rez-de-chaussée soit prêt. Chaque année de retard coûte plus cher, et se rattrape
          plus difficilement, que la précédente.
        </P>
        <LandingImage src="/images/cerebro/bebe-encaixes.jpg" alt="Bébé concentré, emboîtant des blocs géométriques colorés sur un support en bois" portrait />
        <Highlight>
          Il ne s'agit pas de presser l'enfance. Il s'agit de ne pas manquer la fenêtre où ces fondations se
          construisent avec le moins d'effort — parce que c'est précisément ce que le cerveau de cet âge est fait pour
          faire.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Le rôle du langage">
        <P>
          La chercheuse Anne Fernald, de Stanford, a montré quelque chose de remarquable : les bébés qui entendent
          davantage de langage qui leur est adressé — pas seulement autour d'eux, mais directement, en vraie
          conversation — traitent les mots plus vite et plus efficacement dès 18 mois. Cette vitesse de traitement,
          mesurée en laboratoire, prédit l'étendue du vocabulaire des années plus tard. La différence n'est pas une
          question d'intelligence innée : c'est la quantité et la qualité de conversation vécue.
        </P>
        <P>
          Patricia Kuhl, de l'université de Washington, a découvert quelque chose de tout aussi important sur le
          « quand ». Les bébés naissent « citoyens du monde », capables de distinguer les sons de n'importe quelle
          langue humaine. Vers 10-12 mois, cette capacité se spécialise dans les sons de la langue qu'ils entendent —
          une fenêtre qui se referme progressivement. Et dans une expérience devenue célèbre, Kuhl a montré que des
          bébés exposés à une nouvelle langue par une personne en chair et en os en apprenaient les sons — tandis que
          des bébés exposés au même contenu en vidéo, seuls, n'apprenaient rien. L'écran ne remplace pas la vraie
          interaction sociale.
        </P>
        <P>
          C'est par cette fenêtre-là — celle que Kuhl a mesurée — que l'immersion en anglais fait une telle différence
          quand elle commence tôt, avec une vraie personne plutôt qu'une application.{' '}
          <Link to="/fr/immersion-anglais" className="text-montessori-green font-semibold underline hover:no-underline">
            Découvrez pourquoi l'anglais dès la petite enfance est si puissant
          </Link>.
        </P>
        <P>
          Et le langage n'est pas le seul à avoir une échéance. Chaque grande fonction cérébrale — les sens, le
          langage, les fonctions cognitives supérieures — a sa propre fenêtre de plus grande facilité, et toutes se
          concentrent dans les premières années de vie :
        </P>
        <SensitivePeriodsChart />
        <LandingImage src="/images/cerebro/leitura-bebes.jpg" alt="Éducatrice lisant un album illustré à trois bébés assis autour d'elle dans l'ambiance" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          Du langage vivant : une personne en chair et en os, un livre, et des bébés qui répondent — le « serve and return » en action.
        </p>
        <Highlight>
          Entendre ne suffit pas : le cerveau d'un bébé apprend le langage dans la relation avec une autre personne,
          en direct, en répondant et en recevant des réponses — c'est ce qu'on appelle le « serve and return ».
        </Highlight>
      </LandingSection>

      <LandingSection heading="Le rôle du mouvement">
        <P>
          Maria Montessori affirmait, il y a un siècle, que le mouvement et l'intelligence sont profondément liés — et
          les neurosciences l'ont confirmé. Ramper, grimper, tenir en équilibre, manipuler de ses propres mains, ce
          n'est pas seulement du développement physique : c'est de la construction cognitive. Le cervelet,
          traditionnellement associé à la seule coordination motrice, participe aussi activement au langage, à
          l'attention et à la planification.
        </P>
        <P>
          C'est pourquoi un environnement qui restreint le mouvement — davantage de temps assis, davantage d'écrans,
          moins d'exploration libre — ne « garde » pas l'énergie de l'enfant pour des choses plus importantes. Il prive le
          cerveau de l'un des carburants dont il a le plus besoin à cet âge. La motricité libre n'est pas un luxe :
          c'est une nécessité.
        </P>
        <LandingImagePair
          images={[
            { src: '/images/cerebro/bebes-escada.jpg', alt: "Trois bébés souriants en haut de l'escalier Montessori en bois, dans l'ambiance" },
            { src: '/images/cerebro/patio-musica.jpg', alt: "Séance de mouvement et de musique dans la cour couverte, avec bébés, éducatrices et arbres en arrière-plan" },
          ]}
          caption="Grimper, danser, tenir en équilibre : le mouvement est le carburant du cerveau — dans l'ambiance comme dans la cour."
        />
      </LandingSection>

      <LandingSection heading="Le rôle de l'attachement" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          La preuve la plus frappante de l'importance des liens affectifs vient des travaux du chercheur de Harvard
          Charles Nelson dans le Bucharest Early Intervention Project. L'étude a suivi des enfants roumains élevés en
          orphelinat — des institutions qui assuraient nourriture, hygiène et toit, mais très peu d'attention
          individuelle et d'affection en retour. Résultat : ces enfants présentaient un volume cérébral réduit et des
          altérations mesurables de l'activité électrique du cerveau, comparés aux enfants élevés en famille.
        </P>
        <P>
          Le résultat le plus important pour une famille qui décide aujourd'hui : les enfants placés dans un foyer
          affectueux et réactif avant l'âge de 2 ans ont récupéré une grande partie du développement perdu. Ceux
          placés plus tard, non. Ce n'était ni le manque de nourriture ni le manque de toit qui abîmait le
          développement cérébral — c'était l'absence d'un adulte répondant, de manière constante et individuelle, à
          chacun d'eux.
        </P>
        <Highlight>
          « Être bien gardé » n'est pas la même chose que voir son développement nourri. La question qui compte n'est
          pas de savoir si votre enfant est en sécurité et nourri — mais si quelqu'un est réellement présent, en train
          de lui répondre, chaque jour.
        </Highlight>
      </LandingSection>

      <LandingSection heading={'« Mais il y a une crèche juste à côté de chez nous... »'}>
        <P>
          C'est la question la plus honnête que nous entendons — et elle mérite une réponse honnête. La commodité
          compte, surtout dans le quotidien bien rempli de parents de jeunes enfants. Mais à la lumière de ce que la
          science montre sur l'architecture cérébrale, les fenêtres uniques et le rôle de l'attachement, cela vaut la
          peine de tout poser sur la balance :
        </P>
        <Bullets
          items={[
            <><strong>Faites le compte des heures.</strong> Dix ou quinze minutes de trajet en plus — contre 8, 9, 10 heures par jour que votre enfant passe à l'intérieur de l'école. Qu'est-ce qui pèse le plus dans sa vie : quelques minutes de voiture, ou des milliers d'heures d'expériences qui construisent son cerveau ?</>,
            <><strong>Cette fenêtre ne se rouvre pas.</strong> Comme l'ont montré les travaux de Charles Nelson, plus le bon environnement arrive tôt, plus la récupération possible est grande — et l'inverse est vrai aussi. Les compétences appellent les compétences : ce qui ne se construit pas maintenant devient plus difficile à construire ensuite.</>,
            <><strong>« Bien gardé » n'est pas « en plein développement ».</strong> Un lieu propre et gentil, c'est le minimum. La vraie question : que se passe-t-il pour le langage, le mouvement et l'attachement de mon enfant pendant les 8 heures par jour qu'il y passe ?</>,
          ]}
        />
        <P>
          Et la logistique a une solution : nous sommes ouverts de 7h30 à 19h, avec des horaires souples qui
          s'adaptent au rythme de la famille — à Laranjeiras, à quelques minutes de Cosme Velho, Flamengo, Botafogo et
          Catete.
        </P>
      </LandingSection>

      <LandingSection heading="Ce que nous faisons de cette fenêtre">
        <Bullets
          items={[
            'Une éducatrice pour 3 bébés de moins de 18 mois : chaque babillage, chaque tentative, rencontre un adulte qui observe et répond.',
            "L'immersion en anglais au quotidien avec des enseignantes anglophones et bilingues, en plein cœur de la fenêtre du langage — par la relation, pas par les écrans.",
            "Une ambiance Montessori préparée : motricité libre, matériel concret à manipuler — zéro écran.",
            "Une observation individuelle : chaque enfant est suivi à son rythme, avec un suivi attentif de son développement.",
          ]}
        />
      </LandingSection>

      <LandingCTAFr
        heading="Décidez de vos propres yeux"
        text="Visitez l'école, observez les ambiances en plein travail et comparez. Votre enfant n'a qu'une petite enfance — choisissez ce qu'elle va construire."
      />
    </div>
  );
};
