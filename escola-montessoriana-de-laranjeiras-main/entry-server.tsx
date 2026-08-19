/**
 * Entrada do PRERENDER (SEO). O site é SPA e, sem isto, o HTML servido não tem
 * nenhum texto — o crawler do Google recebe 8,7 KB vazios em todas as rotas.
 * No build da Vercel, o prerender.mjs chama render() para cada rota da lista
 * abaixo e grava dist/<rota>/index.html com o conteúdo real dentro do #root,
 * além de <title> e meta description PRÓPRIOS de cada página.
 * No navegador, o index.tsx hidrata esse HTML (hydrateRoot) e o site segue SPA.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppShell } from './App';
import { blogPosts } from './pages/blog/posts';
import { faqCrecheLaranjeiras, faqCrecheFlamengo, type ItemFAQ } from './pages/landing/faqs';

export function render(url: string): string {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </React.StrictMode>
  );
}

export interface RotaPrerender {
  url: string;
  /** <title> da página no HTML estático (o que o Google mostra na busca). */
  title: string;
  /** meta description da página (o texto cinza embaixo do título na busca). */
  description: string;
  /**
   * Perguntas e respostas DA PRÓPRIA PÁGINA. Quando presente, o prerender
   * injeta um JSON-LD FAQPage com elas. Só pode ser preenchido com um array
   * que também está visível na página (exigência do Google) — por isso vem de
   * pages/landing/faqs.ts, o mesmo que o componente <FAQ /> renderiza.
   */
  faq?: ItemFAQ[];
}

const MARCA = 'Escola Montessoriana de Laranjeiras';

/**
 * Toda rota nova do App.tsx precisa entrar aqui também — com título e
 * descrição próprios —, senão volta a ser servida como HTML vazio (o site
 * continua funcionando, mas aquela página fica invisível para crawlers).
 * As rotas de blog vêm sozinhas de blogPosts (título + excerpt do post).
 */
export const routesToPrerender: RotaPrerender[] = [
  {
    url: '/',
    title: `${MARCA} | Creche e Escola Montessori no Rio`,
    description:
      'Creche, berçário e pré-escola Montessori em Laranjeiras, Rio de Janeiro — a minutos do Cosme Velho, Flamengo e Catete. De 9 meses a 11 anos, com imersão em inglês, alimentação saudável e ambiente arborizado. Agende sua visita.',
  },
  {
    url: '/agendamento',
    title: `Agende sua visita | ${MARCA}`,
    description:
      'Marque uma visita para conhecer a escola por dentro: os ambientes preparados, o pátio arborizado e o dia a dia das crianças. Escolha o melhor horário.',
  },
  {
    url: '/blog',
    title: `Blog | ${MARCA}`,
    description:
      'Artigos sobre educação infantil, método Montessori, adaptação escolar, bilinguismo e primeira infância — escritos pela equipe da escola.',
  },
  ...blogPosts.map((p) => ({
    url: `/blog/${p.slug}`,
    title: `${p.title} | ${MARCA}`,
    description: p.excerpt,
  })),
  {
    url: '/metodo-montessori',
    title: `Método Montessori no Rio de Janeiro | ${MARCA}`,
    description:
      'Como funciona uma escola Montessori no Rio de Janeiro: ambiente preparado, vida prática, sensorial, linguagem e matemática — da teoria ao dia a dia da sala.',
  },
  {
    url: '/acolhimento',
    title: `Acolhimento e adaptação | ${MARCA}`,
    description:
      'Adaptação respeitosa, muito colo e segurança emocional: como acolhemos os bebês, as crianças e as famílias na chegada à educação infantil.',
  },
  {
    url: '/ingles-primeira-infancia',
    title: `Imersão em inglês na educação infantil | ${MARCA}`,
    description:
      'Imersão em inglês desde o berçário, com professoras fluentes e nativas: a criança adquire o idioma naturalmente, no período em que o cérebro é mais receptivo.',
  },
  {
    url: '/desenvolvimento-cerebral',
    title: `Os primeiros anos e o cérebro | ${MARCA}`,
    description:
      'Por que os primeiros anos definem a arquitetura do cérebro: períodos sensíveis, interações de servir e devolver e o papel do ambiente preparado.',
  },
  {
    url: '/natureza-educacao-cosmica',
    title: `Natureza e educação cósmica | ${MARCA}`,
    description:
      'Horta, permacultura, minhocário e pátio arborizado: contato diário com a natureza e educação cósmica na educação infantil.',
  },
  {
    url: '/turmas',
    title: `Turmas: do berçário ao fundamental | ${MARCA}`,
    description:
      'Turmas de idades misturadas: berçário e creche (9 meses a 3 anos), pré-escola (2,5 a 6) e Ensino Fundamental (7 a 12). Horários e frequência flexíveis.',
  },
  {
    url: '/creche-laranjeiras',
    title: 'Creche em Laranjeiras a partir de 9 meses | Escola Montessoriana',
    description:
      'Creche e berçário Montessori na Rua das Laranjeiras, 540, a partir de 9 meses: 1 professora para cada 3 bebês, adaptação respeitosa e horários das 7h30 às 19h.',
    faq: faqCrecheLaranjeiras,
  },
  {
    url: '/creche-flamengo',
    title: 'Creche perto do Flamengo, a 5 minutos | Escola Montessoriana',
    description:
      'Creche e berçário Montessori a 5 minutos do Flamengo, na Rua das Laranjeiras. A partir de 9 meses, 1 professora para cada 3 bebês e horários das 7h30 às 19h.',
    faq: faqCrecheFlamengo,
  },
  {
    url: '/agrupada-3',
    title: `Ensino Fundamental Montessori — 7 a 12 anos | ${MARCA}`,
    description:
      'O segundo plano de desenvolvimento na prática: a mente que raciocina, autonomia, trabalho em grupo e educação cósmica no Ensino Fundamental Montessori.',
  },
  {
    url: '/en',
    title: `Montessori School & Daycare in Laranjeiras, Rio | ${MARCA}`,
    description:
      'Trilingual Montessori school in Laranjeiras, Rio de Janeiro, for children from 9 months to 11 years. English immersion, healthy homemade food and a screen-free, green environment.',
  },
  {
    url: '/en/montessori-method',
    title: `The Montessori Method | ${MARCA}`,
    description:
      'How a Montessori school works in practice: the prepared environment, practical life, sensorial work, language and math — from theory to the everyday classroom.',
  },
  {
    url: '/en/welcoming',
    title: `A gentle settling-in | ${MARCA}`,
    description:
      'A respectful settling-in period, plenty of cuddles and emotional safety: how we welcome babies, children and their families.',
  },
  {
    url: '/en/your-childs-brain',
    title: `The early years and the brain | ${MARCA}`,
    description:
      'Why the early years shape the architecture of the brain: sensitive periods, serve-and-return interactions and the role of the prepared environment.',
  },
  {
    url: '/en/english-immersion',
    title: `English immersion | ${MARCA}`,
    description:
      'English immersion from infancy with fluent and native-speaking teachers: children acquire the language naturally, when the brain is most receptive.',
  },
  {
    url: '/en/nature-cosmic-education',
    title: `Nature and cosmic education | ${MARCA}`,
    description:
      'A vegetable garden, permaculture, a worm farm and a tree-shaded playground: daily contact with nature and cosmic education in early childhood.',
  },
  {
    url: '/en/classes',
    title: `Our classes — 9 months to 12 years | ${MARCA}`,
    description:
      'Mixed-age classes: infants and toddlers (9 months to 3 years), early childhood (2.5 to 6) and elementary (7 to 12). Half-day, full-day and extended care.',
  },
  {
    url: '/en/schedule-visit',
    title: `Schedule a visit | ${MARCA}`,
    description:
      'Book a visit to see the school from the inside: the prepared environments, the green playground and the children’s daily life.',
  },
  {
    url: '/fr',
    title: `École Montessori et crèche à Laranjeiras, Rio | ${MARCA}`,
    description:
      'École Montessori trilingue à Laranjeiras, Rio de Janeiro, de 9 mois à 11 ans. Immersion en anglais, cuisine maison et un cadre verdoyant, sans écrans.',
  },
  {
    url: '/fr/methode-montessori',
    title: `La méthode Montessori | ${MARCA}`,
    description:
      'Comment fonctionne une école Montessori au quotidien : ambiance préparée, vie pratique, sensoriel, langage et mathématiques.',
  },
  {
    url: '/fr/bienveillance',
    title: `Bienveillance et adaptation | ${MARCA}`,
    description:
      'Une période d’adaptation respectueuse, beaucoup de câlins et de sécurité affective : comment nous accueillons les bébés, les enfants et leurs familles.',
  },
  {
    url: '/fr/cerveau-de-votre-enfant',
    title: `Les premières années et le cerveau | ${MARCA}`,
    description:
      'Pourquoi les premières années façonnent l’architecture du cerveau : périodes sensibles, interactions et rôle de l’ambiance préparée.',
  },
  {
    url: '/fr/immersion-anglais',
    title: `Immersion en anglais | ${MARCA}`,
    description:
      'Immersion en anglais dès la crèche, avec des enseignantes anglophones : l’enfant acquiert la langue naturellement, au moment où le cerveau y est le plus réceptif.',
  },
  {
    url: '/fr/nature-education-cosmique',
    title: `Nature et éducation cosmique | ${MARCA}`,
    description:
      'Potager, permaculture, lombricomposteur et cour arborée : un contact quotidien avec la nature et l’éducation cosmique dès le plus jeune âge.',
  },
  {
    url: '/fr/ambiances',
    title: `Nos ambiances — de 9 mois à 12 ans | ${MARCA}`,
    description:
      'Des ambiances d’âges mélangés : bébés (9 mois à 3 ans), maternelle (2,5 à 6 ans) et élémentaire (7 à 12 ans). Mi-temps, journée complète et horaires étendus.',
  },
  {
    url: '/fr/planifier-visite',
    title: `Réserver une visite | ${MARCA}`,
    description:
      'Réservez une visite pour découvrir l’école de l’intérieur : les ambiances préparées, la cour verdoyante et le quotidien des enfants.',
  },
  {
    url: '/es',
    title: `Escuela infantil Montessori en Laranjeiras, Río | ${MARCA}`,
    description:
      'Escuela Montessori trilingüe en Laranjeiras, Río de Janeiro, de 9 meses a 11 años. Inmersión en inglés, comida casera y un entorno verde, sin pantallas.',
  },
  {
    url: '/es/metodo-montessori',
    title: `El método Montessori | ${MARCA}`,
    description:
      'Cómo funciona una escuela Montessori en el día a día: ambiente preparado, vida práctica, sensorial, lenguaje y matemáticas.',
  },
  {
    url: '/es/acogida',
    title: `Acogida y adaptación | ${MARCA}`,
    description:
      'Un período de adaptación respetuoso, muchos brazos y seguridad emocional: así acogemos a los bebés, a los niños y a sus familias.',
  },
  {
    url: '/es/el-cerebro-de-tu-hijo',
    title: `Los primeros años y el cerebro | ${MARCA}`,
    description:
      'Por qué los primeros años definen la arquitectura del cerebro: períodos sensibles, interacciones y el papel del ambiente preparado.',
  },
  {
    url: '/es/inmersion-en-ingles',
    title: `Inmersión en inglés | ${MARCA}`,
    description:
      'Inmersión en inglés desde bebés, con docentes fluidas y nativas: el niño adquiere el idioma de forma natural, cuando el cerebro es más receptivo.',
  },
  {
    url: '/es/naturaleza-educacion-cosmica',
    title: `Naturaleza y educación cósmica | ${MARCA}`,
    description:
      'Huerta, permacultura, lombricario y patio arbolado: contacto diario con la naturaleza y educación cósmica desde la primera infancia.',
  },
  {
    url: '/es/grupos',
    title: `Nuestros grupos — de 9 meses a 12 años | ${MARCA}`,
    description:
      'Grupos de edades mezcladas: bebés (9 meses a 3 años), educación inicial (2,5 a 6 años) y primaria (7 a 12). Media jornada, jornada completa y horario extendido.',
  },
  {
    url: '/es/agendar-visita',
    title: `Agendar una visita | ${MARCA}`,
    description:
      'Agenda una visita para conocer la escuela por dentro: los ambientes preparados, el patio verde y el día a día de los niños.',
  },
];
