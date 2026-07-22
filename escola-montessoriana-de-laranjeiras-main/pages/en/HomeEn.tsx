import React from 'react';
import { HeroEn } from '../../components/en/HeroEn';
import { PhilosophyEn } from '../../components/en/PhilosophyEn';
import { SaibaMaisEn } from '../../components/en/SaibaMaisEn';
import { PracticeEn } from '../../components/en/PracticeEn';
import { HorariosEn } from '../../components/en/HorariosEn';
import { AtividadesExtrasEn } from '../../components/en/AtividadesExtrasEn';
import { TestimonialsEn } from '../../components/en/TestimonialsEn';
import { ContactFormEn } from '../../components/en/ContactFormEn';
import { usePageMeta } from '../../components/landing/Landing';

export const HomeEn: React.FC = () => {
  usePageMeta(
    'Escola Montessoriana de Laranjeiras | Trilingual Montessori School in Rio de Janeiro',
    'Montessori school in Laranjeiras, Rio de Janeiro. Daily English immersion with native and bilingual teachers, healthy real food, zero screens and a warm, green environment. Book your visit.'
  );

  return (
    <>
      <HeroEn />
      <PhilosophyEn />
      <SaibaMaisEn />
      <PracticeEn />
      <HorariosEn />
      <AtividadesExtrasEn />
      <TestimonialsEn />
      <ContactFormEn />
    </>
  );
};
