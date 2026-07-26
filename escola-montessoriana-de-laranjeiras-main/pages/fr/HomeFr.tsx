import React from 'react';
import { HeroFr } from '../../components/fr/HeroFr';
import { PhilosophyFr } from '../../components/fr/PhilosophyFr';
import { SaibaMaisFr } from '../../components/fr/SaibaMaisFr';
import { PracticeFr } from '../../components/fr/PracticeFr';
import { HorariosFr } from '../../components/fr/HorariosFr';
import { AtividadesExtrasFr } from '../../components/fr/AtividadesExtrasFr';
import { TestimonialsFr } from '../../components/fr/TestimonialsFr';
import { ContactFormFr } from '../../components/fr/ContactFormFr';
import { usePageMeta } from '../../components/landing/Landing';

export const HomeFr: React.FC = () => {
  usePageMeta(
    'Escola Montessoriana de Laranjeiras | École Montessori trilingue à Rio de Janeiro',
    "École Montessori à Laranjeiras, Rio de Janeiro. Immersion en anglais au quotidien avec des enseignantes natives et bilingues, alimentation saine, zéro écran et un cadre chaleureux et verdoyant. Planifiez votre visite."
  );

  return (
    <>
      <HeroFr />
      <PhilosophyFr />
      <PracticeFr />
      <SaibaMaisFr />
      <HorariosFr />
      <AtividadesExtrasFr />
      <TestimonialsFr />
      <ContactFormFr />
    </>
  );
};
