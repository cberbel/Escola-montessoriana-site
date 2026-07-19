import React from 'react';
import { Hero } from '../components/Hero';
import { Philosophy } from '../components/Philosophy';
import { Benefits } from '../components/Benefits';
import { Practice } from '../components/Practice';
import { Gallery } from '../components/Gallery';
import { SaibaMais } from '../components/SaibaMais';
import { Testimonials } from '../components/Testimonials';
import { ContactForm } from '../components/ContactForm';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Philosophy />
      <Practice />
      <Benefits />
      <Gallery />
      <SaibaMais />
      <Testimonials />
      <ContactForm />
    </>
  );
};
