import React from 'react';
import { HeroEs } from '../../components/es/HeroEs';
import { PhilosophyEs } from '../../components/es/PhilosophyEs';
import { SaibaMaisEs } from '../../components/es/SaibaMaisEs';
import { PracticeEs } from '../../components/es/PracticeEs';
import { HorariosEs } from '../../components/es/HorariosEs';
import { AtividadesExtrasEs } from '../../components/es/AtividadesExtrasEs';
import { TestimonialsEs } from '../../components/es/TestimonialsEs';
import { ContactFormEs } from '../../components/es/ContactFormEs';
import { usePageMeta } from '../../components/landing/Landing';

export const HomeEs: React.FC = () => {
  usePageMeta(
    'Escola Montessoriana de Laranjeiras | Escuela Montessori trilingüe en Río de Janeiro',
    'Escuela Montessori en Laranjeiras, Río de Janeiro. Inmersión diaria en inglés con docentes nativos y bilingües, comida de verdad, cero pantallas y un ambiente cálido y arbolado. Agenda tu visita.'
  );

  return (
    <>
      <HeroEs />
      <PhilosophyEs />
      <PracticeEs />
      <SaibaMaisEs />
      <HorariosEs />
      <AtividadesExtrasEs />
      <TestimonialsEs />
      <ContactFormEs />
    </>
  );
};
