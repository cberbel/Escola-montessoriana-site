import React from 'react';
import { LandingSection, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroFr, LandingCTAFr } from '../../components/landing/LandingFr';

export const WelcomingFr: React.FC = () => {
  usePageMeta(
    'Bienveillance et accueil | Escola Montessoriana de Laranjeiras',
    "Un accueil chaleureux et bienveillant : la sécurité affective comme socle du développement, une période d'adaptation en douceur au rythme de l'enfant, beaucoup de câlins, de la souplesse pour la famille et une cuisine maison saine — sans huiles végétales raffinées, sans sel raffiné, sans sucre."
  );

  return (
    <div className="bg-white">
      <LandingHeroFr
        eyebrow="Bienveillance"
        title="Un enfant ne s'épanouit que lorsqu'il se sent en sécurité"
        subtitle="Avant tout programme, il y a les bras qui accueillent. Ici, chaque enfant — et chaque famille — est reçu avec du temps, du respect et une affection sincère."
      />

      <LandingSection heading="La sécurité affective, socle de tout développement" className="pt-10 sm:pt-14">
        <P>
          Il existe, dans la nature de l'enfant, un ordre qu'aucune école ne devrait ignorer : <strong>d'abord la
          sécurité, ensuite les apprentissages</strong>. Un enfant qui ne se sent pas en sécurité vit en état d'alerte —
          son corps bascule en mode survie, le fameux réflexe de « lutte ou fuite ». Dans cet état, presque toute l'énergie du
          cerveau sert à se défendre d'une menace, et il n'en reste presque rien pour explorer, se concentrer,
          apprendre.
        </P>
        <P>
          Quand l'enfant se sent accueilli et en sécurité, c'est l'inverse : le corps se détend, sort de l'alerte, et
          le cerveau redevient disponible pour l'essentiel à cet âge — découvrir le monde, tisser des liens, se
          concentrer, grandir. Voilà pourquoi la bienveillance n'est pas un joli détail de notre quotidien. C'est le
          socle de tout.
        </P>
        <Highlight>
          Aucun enfant n'apprend dans la peur. La sécurité affective n'est pas le contraire de l'apprentissage — elle
          en est la condition.
        </Highlight>
        <LandingImagePair
          images={[
            { src: '/images/acolhimento/sorriso-professora.jpg', alt: "Éducatrice et enfant qui se serrent dans les bras en souriant, dans la cour de l'école" },
            { src: '/images/acolhimento/bebe-tranquilo.jpg', alt: "Bébé paisible explorant un matériel dans l'ambiance, les étagères en arrière-plan" },
          ]}
          caption="Le sourire d'un enfant qui se sent en sécurité — tout le reste pousse à partir de là."
        />
      </LandingSection>

      <LandingSection heading="Une adaptation tout en douceur : l'enfant donne le tempo">
        <P>
          Arriver dans un lieu inconnu, plein de visages nouveaux, c'est déjà beaucoup pour un adulte — imaginez pour
          un enfant d'un, deux ou trois ans. C'est pourquoi notre période d'adaptation n'est jamais forcée. Nous
          n'« arrachons » pas l'enfant des bras de ses parents, et nous n'imposons pas le même compte à rebours à tout
          le monde.
        </P>
        <P>
          Nous faisons l'inverse : <strong>nous suivons l'enfant</strong>. Le début est progressif, avec un adulte de
          confiance présent les premiers temps, puis on avance au rythme de chacun. Nous observons les signaux, nous
          respectons les pleurs comme un langage à part entière, et nous construisons la confiance jour après jour. L'adaptation,
          ce n'est pas l'enfant qui capitule devant l'école — c'est l'école qui gagne patiemment la confiance de
          l'enfant.
        </P>
        <LandingImage src="/images/acolhimento/adaptacao-artes.jpg" alt="Bébé en tablier qui peint à côté de l'éducatrice, qui suit l'activité de tout près" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Un adulte de confiance tout près : c'est ainsi que la confiance se construit, un jour à la fois.
        </p>
      </LandingSection>

      <LandingSection heading="Ici, on fait beaucoup de câlins" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Les câlins ne « gâtent » pas un enfant. Les câlins n'empêchent pas l'autonomie. C'est exactement l'inverse :
          l'enfant dont les besoins sont entendus — pris dans les bras quand il en a besoin, consolé quand il pleure,
          vu quand il appelle — construit une sécurité intérieure qu'il gardera toute sa vie.
        </P>
        <P>
          Et c'est de cette base sécurisante que naît le courage de se séparer, d'explorer, de devenir autonome. Un
          enfant ne s'élance avec confiance que lorsqu'il sait qu'il a un port d'attache. C'est pourquoi, chez nous,
          les câlins sont pris au sérieux : c'est un investissement direct dans l'autonomie si chère à la pédagogie
          Montessori.
        </P>
        <Highlight>
          L'autonomie ne naît pas du réconfort refusé. Elle naît de la certitude que le réconfort sera toujours là.
        </Highlight>
        <LandingImage src="/images/acolhimento/colo-patio.jpg" alt="Éducatrice debout dans la cour, un bébé dans les bras, les deux se regardant, des arbres en arrière-plan" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Un câlin, un vrai, entouré de verdure : la base sécurisante depuis laquelle l'enfant part à la conquête du monde.
        </p>
      </LandingSection>

      <LandingSection heading="Accueillir la famille aussi">
        <P>
          Confier son enfant à d'autres mains est l'un des pas les plus délicats qu'une famille puisse faire. Nous le
          savons — et nous accueillons les parents avec le même soin que les enfants. Pour les familles francophones et
          internationales : <strong>nous parlons français et anglais</strong>, et plusieurs de nos enseignantes sont de
          langue maternelle anglaise ou bilingues.
        </P>
        <Bullets
          items={[
            <><strong>Temps partiel :</strong> demi-journées et jours alternés, pour les familles qui souhaitent une transition plus douce ou un rythme plus léger.</>,
            <><strong>Horaires souples :</strong> nous nous adaptons autant que possible à la réalité de chaque famille, au lieu de faire entrer tout le monde dans le même moule.</>,
            <><strong>Communication transparente :</strong> vous savez comment s'est passée la journée de votre enfant, sans détours.</>,
            <><strong>Un partenariat, pas un remplacement :</strong> l'école chemine aux côtés de la famille, dans le respect des choix et du moment de chaque foyer.</>,
          ]}
        />
        <P>
          Accueillir la famille fait partie de l'accueil de l'enfant : un enfant se détend quand il sent que ses
          parents font confiance au lieu où il se trouve.
        </P>
      </LandingSection>

      <LandingSection id="food" heading="Bien nourrir, c'est aussi prendre soin">
        <P>
          Veiller à ce qui entre dans le corps d'un enfant, c'est veiller à son humeur, son sommeil, sa concentration
          et sa santé. C'est pourquoi nous prenons l'alimentation aussi au sérieux que les câlins. Nous servons une{' '}
          <strong>cuisine maison</strong>, préparée avec soin : <strong>sans huiles végétales raffinées, sans sel
          raffiné, sans sucre</strong>. À la place : des ingrédients frais et complets, de bonnes graisses et des assaisonnements
          naturels.
        </P>
        <LandingImage src="/images/acolhimento/almoco-juntos.jpg" alt="Jeunes enfants déjeunant ensemble à la table basse de l'ambiance, chacun avec son assiette, deux éducatrices tout près" />
        <P>
          Et le repas lui-même est un moment d'accueil et d'apprentissage. Les petits prennent leur déjeuner ensemble,
          à table, à leur rythme. Ils apprennent à manger seuls, à se servir, à goûter de nouvelles saveurs — avec autonomie et
          plaisir, sans pression et sans marchandage. Bien manger, ici, c'est aussi une manière de vivre ensemble et
          de prendre soin de soi.
        </P>
        <LandingImage src="/images/acolhimento/almoco-bebes.jpg" alt="Bébés mangeant seuls avec leur cuillère à la table basse, accompagnés de près par les éducatrices" />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Dès le groupe des bébés, chacun avec son assiette et sa cuillère : manger seul aussi, c'est une conquête.
        </p>
      </LandingSection>

      <LandingCTAFr
        heading="Venez ressentir cet accueil par vous-même"
        text="La chaleur d'une école ne tient pas dans un texte — elle se respire, dans les câlins, dans la façon dont on vous reçoit. Réservez une visite et regardez votre enfant se faire accueillir."
      />
    </div>
  );
};
