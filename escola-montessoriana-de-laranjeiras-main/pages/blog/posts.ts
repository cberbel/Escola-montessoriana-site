import React from 'react';
import { ComoEscolherEscolaInfantil } from './ComoEscolherEscolaInfantil';
import { MontessoriParaBebes } from './MontessoriParaBebes';
import { QuandoMatricular } from './QuandoMatricular';

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  dateDisplay: string;
  readingTime: string;
  Component: React.FC;
}

/** Registro central dos artigos: alimenta a lista do blog, as rotas e o sitemap. */
export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'como-escolher-escola-infantil-laranjeiras',
    title: 'Como escolher uma escola infantil em Laranjeiras: o guia para pais',
    excerpt:
      'O que observar na visita, as perguntas que poucos pais fazem e os sinais de alerta — um roteiro prático para decidir com segurança.',
    image: '/images/acolhimento/colo-patio.jpg',
    imageAlt: 'Professora com bebê no colo no pátio arborizado da escola',
    dateDisplay: 'julho de 2026',
    readingTime: '7 min',
    Component: ComoEscolherEscolaInfantil,
  },
  {
    slug: 'metodo-montessori-para-bebes',
    title: 'Método Montessori para bebês: como funciona na prática',
    excerpt:
      'Mente absorvente, ambiente preparado, vida prática e o que muda no desenvolvimento — sem teoria abstrata, com exemplos do dia a dia.',
    image: '/images/cerebro/bebe-material.jpg',
    imageAlt: 'Bebê concentrado encaixando discos coloridos em pinos de madeira',
    dateDisplay: 'julho de 2026',
    readingTime: '6 min',
    Component: MontessoriParaBebes,
  },
  {
    slug: 'quando-matricular-bebe-na-escola',
    title: 'Com quantos meses colocar o bebê na escola? O que diz a ciência',
    excerpt:
      'A pergunta que toda família faz — respondida com neurociência, sem culpa: qualidade importa mais que idade, e a adaptação faz toda a diferença.',
    image: '/images/cerebro/leitura-bebes.jpg',
    imageAlt: 'Professora lendo um livro ilustrado para bebês atentos',
    dateDisplay: 'julho de 2026',
    readingTime: '6 min',
    Component: QuandoMatricular,
  },
];
