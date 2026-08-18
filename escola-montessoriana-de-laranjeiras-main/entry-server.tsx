/**
 * Entrada do PRERENDER (SEO). O site é SPA e, sem isto, o HTML servido não tem
 * nenhum texto — o crawler do Google recebe 8,7 KB vazios em todas as rotas.
 * No build da Vercel, o prerender.mjs chama render() para cada rota da lista
 * abaixo e grava dist/<rota>/index.html com o conteúdo real dentro do #root.
 * No navegador, o index.tsx hidrata esse HTML (hydrateRoot) e o site segue SPA.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppShell } from './App';
import { blogPosts } from './pages/blog/posts';

export function render(url: string): string {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </React.StrictMode>
  );
}

/**
 * Toda rota nova do App.tsx precisa entrar aqui também, senão volta a ser
 * servida como HTML vazio (o site continua funcionando, mas aquela página
 * fica invisível para crawlers). As rotas de blog vêm sozinhas de blogPosts.
 */
export const routesToPrerender: string[] = [
  '/',
  '/agendamento',
  '/blog',
  ...blogPosts.map((p) => `/blog/${p.slug}`),
  '/metodo-montessori',
  '/acolhimento',
  '/ingles-primeira-infancia',
  '/desenvolvimento-cerebral',
  '/natureza-educacao-cosmica',
  '/turmas',
  '/agrupada-3',
  '/en',
  '/en/montessori-method',
  '/en/welcoming',
  '/en/your-childs-brain',
  '/en/english-immersion',
  '/en/nature-cosmic-education',
  '/en/classes',
  '/en/schedule-visit',
  '/fr',
  '/fr/methode-montessori',
  '/fr/bienveillance',
  '/fr/cerveau-de-votre-enfant',
  '/fr/immersion-anglais',
  '/fr/nature-education-cosmique',
  '/fr/ambiances',
  '/fr/planifier-visite',
  '/es',
  '/es/metodo-montessori',
  '/es/acogida',
  '/es/el-cerebro-de-tu-hijo',
  '/es/inmersion-en-ingles',
  '/es/naturaleza-educacion-cosmica',
  '/es/grupos',
  '/es/agendar-visita',
];
