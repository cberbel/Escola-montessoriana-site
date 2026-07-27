import React from 'react';
import { Link } from 'react-router-dom';
import { LandingSection, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { LandingHeroFr, LandingCTAFr } from '../../components/landing/LandingFr';

const TurmaHeading: React.FC<{ nome: string; faixa: string }> = ({ nome, faixa }) => (
  <div className="mb-4">
    <span className="inline-block bg-montessori-green text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-sm px-3 py-1 mb-2">
      {faixa}
    </span>
    <h2 className="font-serif text-2xl sm:text-3xl text-montessori-green break-words">{nome}</h2>
  </div>
);

export const ClassesFr: React.FC = () => {
  usePageMeta(
    'Nos ambiances | Escola Montessoriana de Laranjeiras',
    "Nos groupes d'âges mélangés : Agrupada 1 (9 mois à 3 ans), Agrupada 2 (2 ans et demi à 6 ans) et Agrupada 3 — élémentaire (7 à 12 ans). Ambiances préparées, horaires souples, temps partiel possible."
  );

  return (
    <div className="bg-white">
      <LandingHeroFr
        eyebrow="Les ambiances"
        title="Des groupes d'âges mélangés, à la manière Montessori"
        subtitle="Trois groupes, chacun avec son ambiance préparée — où les grands enseignent, les petits s'inspirent, et chaque enfant avance à son rythme."
      />

      <LandingSection heading="Pourquoi mélanger les âges" className="pt-10 sm:pt-14">
        <P>
          Dans une école Montessori, il n'y a pas de classes par année de naissance : les enfants sont réunis en{' '}
          <strong>groupes d'âges mélangés</strong>, qui partagent la même ambiance pendant un cycle de plusieurs
          années. Rien d'un hasard — c'est ainsi que l'enfance fonctionne.
        </P>
        <P>
          Pensez-y : la classe découpée par année de naissance est une <strong>invention de l'école</strong> — cette
          ségrégation par âge n'existe nulle part ailleurs dans la vie. À la maison, dans l'immeuble, au square, les
          enfants grandissent parmi des frères et sœurs, des cousins, des voisins et des amis d'âges différents :
          c'est comme cela que le vivre-ensemble se passe vraiment.
        </P>
        <P>
          Le groupe d'âges mélangés respecte aussi <strong>le rythme de chaque enfant dans chaque domaine</strong>.
          Quand un enfant est en avance quelque part, il trouve naturellement des camarades d'un niveau plus avancé
          pour l'accompagner. Et là où il peine davantage, il a des plus jeunes avec qui partager et échanger — en
          consolidant ce qu'il sait.
        </P>
        <P>
          Et ces échanges transforment les deux côtés : les grands consolident ce qu'ils savent en aidant les petits
          — il n'y a pas d'apprentissage plus profond que d'enseigner. Les petits, eux, se projettent dans les grands
          et sont tirés vers le haut, sans pression. À la place de la compétition du « tous la même chose au même
          moment » grandissent la coopération, le soin et le respect du rythme de chacun.
        </P>
        <Highlight>
          Les âges mélangés forment une petite communauté — bien plus proche de la vraie vie qu'une chaîne de montage
          triée par année de naissance.
        </Highlight>
      </LandingSection>

      <LandingSection heading="">
        <TurmaHeading nome="Agrupada 1" faixa="9 mois à 3 ans" />
        <P>
          Le premier environnement hors de la maison. Tout y est pensé pour que les bébés et les tout-petits explorent
          en sécurité : structures de motricité, matériel à portée des petites mains, et beaucoup de câlins. C'est
          l'âge des premiers pas, des premiers mots, de l'autonomie naissante — s'habiller, manger seul, prendre soin
          de soi — et du langage, qui s'épanouit quand l'enfant est écouté et respecté.
        </P>
        <LandingImage src="/images/turmas/agrupada-1.jpg" alt="Bébé souriant debout sur la structure de motricité en bois de l'ambiance Agrupada 1" portrait />
      </LandingSection>

      <LandingSection heading="">
        <TurmaHeading nome="Agrupada 2" faixa="2 ans et demi à 6 ans" />
        <P>
          La classique « Maison des enfants » de Maria Montessori. Dans cette ambiance, l'enfant circule librement
          entre les aires — vie pratique, sensoriel, langage, mathématiques et éducation cosmique — en choisissant son
          travail et en le répétant autant qu'il le souhaite. C'est l'âge d'or de la concentration, de la lecture et
          de l'écriture, des nombres qui prennent forme dans la main, et de l'immersion quotidienne en anglais.
        </P>
        <LandingImage src="/images/turmas/agrupada-2.jpg" alt="Enfant de l'Agrupada 2 avec l'escalier marron et la tour rose dans l'ambiance Montessori préparée" />
        <P>
          Envie de comprendre en profondeur ce qui se passe dans cette ambiance ?{' '}
          <Link to="/fr/methode-montessori" className="text-montessori-green font-semibold underline hover:no-underline">
            Découvrez la méthode et le programme
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <TurmaHeading nome="Agrupada 3 — Élémentaire" faixa="7 à 12 ans" />
        <P>
          La suite naturelle du chemin Montessori : l'élémentaire, pour l'enfant qui ne demande plus seulement
          « quoi », mais « pourquoi ». C'est l'âge du raisonnement, de l'imagination et du travail en groupe — avec de
          l'autonomie, de la responsabilité et le monde entier comme objet d'étude.
        </P>
        <a
          href="/informativo-open-class-fr.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-montessori-green font-semibold hover:gap-3 transition-all"
        >
          En savoir plus sur l'Agrupada 3 (brochure Open Class) →
        </a>
      </LandingSection>

      <LandingSection heading="Horaires et formules">
        <P>
          Nous sommes ouverts de <strong>7h30 à 19h</strong>, avec trois formules — valables pour tous les groupes :
        </P>
        <Bullets
          items={[
            <><strong>Mi-temps :</strong> le matin, de 8h à 12h, ou l'après-midi, de 13h à 17h.</>,
            <><strong>Journée complète :</strong> de 8h à 17h, avec déjeuner et sieste.</>,
            <><strong>Horaires étendus :</strong> de 7h30 à 19h, pour les familles qui en ont besoin.</>,
          ]}
        />
        <P>
          Au-delà de la formule quotidienne, il existe des options à <strong>temps partiel</strong> (jours alternés)
          et de la souplesse pour adapter les heures d'arrivée et de départ à la réalité de chaque foyer — le même
          esprit d'accueil qui traverse toute l'école. Nous trouverons ensemble la formule idéale pour votre enfant.
        </P>
      </LandingSection>

      <LandingCTAFr
        heading="Venez voir les ambiances de près"
        text="Chaque ambiance a sa lumière, son odeur et son rythme. Réservez une visite et découvrez le groupe de votre enfant."
      />
    </div>
  );
};
