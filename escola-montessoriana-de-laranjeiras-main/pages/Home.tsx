import React from 'react';
import { Hero } from '../components/Hero';
import { Philosophy } from '../components/Philosophy';
import { Practice } from '../components/Practice';
import { Horarios } from '../components/Horarios';
import { AtividadesExtras } from '../components/AtividadesExtras';
import { SaibaMais } from '../components/SaibaMais';
import { Testimonials } from '../components/Testimonials';
import { ContactForm } from '../components/ContactForm';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Philosophy />
      <SaibaMais />
      <Practice />
      <Horarios />
      <AtividadesExtras />
      <Testimonials />
      <ContactForm />
    </>
  );
};
