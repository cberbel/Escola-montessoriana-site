
export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  dateDisplay: string;
  readingTime: string;
  /** Data ISO (YYYY-MM-DD) — vai para datePublished do BlogPosting e lastmod do sitemap. */
  date: string;
  /** Data da última revisão relevante do texto (YYYY-MM-DD). */
  dateModified?: string;
  /**
   * <title> curto para a busca (≤ 60 caracteres). O H1 continua sendo `title`.
   * Antes o <title> repetia o H1 inteiro + nome da escola: 92–112 caracteres,
   * cortado no Google.
   */
  seoTitle: string;
}

/**
 * Registro central dos artigos (mais recentes primeiro): alimenta a lista, as rotas,
 * o sitemap e o schema BlogPosting. Os componentes ficam em posts.lazy.ts (navegador)
 * e posts.eager.ts (prerender) para o código de cada artigo virar um chunk próprio.
 */
export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'escola-montessori-rio-de-janeiro-como-avaliar',
    date: '2026-08-18',
    dateModified: '2026-09-03',
    seoTitle: 'Escola Montessori no Rio: como saber se é de verdade',
    title: 'Escola Montessori no Rio de Janeiro: como saber se é de verdade',
    excerpt:
      'O nome "Montessori" não é marca registrada. Como avaliar uma escola Montessori no Rio: critérios objetivos, perguntas para a visita e sinais de alerta.',
    image: '/images/montessori/vida-pratica-estante.jpg',
    imageAlt: 'Criança pega seu trabalho sozinha na estante baixa de uma sala Montessori preparada',
    dateDisplay: '18 de agosto de 2026',
    readingTime: '8 min',
  },
  {
    slug: 'erro-escolher-escola-perto-de-casa',
    date: '2026-07-26',
    dateModified: '2026-09-03',
    seoTitle: 'O erro de escolher a escola infantil mais perto de casa',
    title: 'O erro mais comum na escolha da escola infantil: a escolinha perto de casa',
    excerpt:
      'Arquitetura cerebral, skills beget skills, o diferencial Montessori — e a conta real entre minutos de trajeto e as 1.800 horas por ano dentro da escola.',
    image: '/images/espaco.jpg',
    imageAlt: 'Espaço amplo e preparado da Escola Montessoriana de Laranjeiras',
    dateDisplay: '26 de julho de 2026',
    readingTime: '7 min',
  },
  {
    slug: 'zero-telas-primeira-infancia',
    date: '2026-07-25',
    dateModified: '2026-09-03',
    seoTitle: 'Zero telas na primeira infância: por que fomos além',
    title: 'Zero telas na primeira infância: por que fomos além da recomendação oficial',
    excerpt:
      'Cortes rápidos demais, excesso de dopamina e de estímulo, e o custo de não trabalhar no concreto — e por que "zero até os 2" pode ser pouco.',
    image: '/images/montessori/concentracao.jpg',
    imageAlt: 'Criança pequena profundamente concentrada em um trabalho manual com material concreto',
    dateDisplay: '25 de julho de 2026',
    readingTime: '7 min',
  },
  {
    slug: 'bilinguismo-infantil-mitos-e-verdades',
    date: '2026-07-24',
    dateModified: '2026-09-03',
    seoTitle: 'Bilinguismo na infância: 5 mitos que confundem os pais',
    title: 'Bilinguismo na infância: 5 mitos que ainda confundem os pais',
    excerpt:
      'Confunde as línguas? Atrasa a fala? Precisa de pai nativo? O que a ciência diz sobre criar um filho com dois idiomas — sem achismo.',
    image: '/images/cerebro/patio-musica.jpg',
    imageAlt: 'Crianças pequenas em roda de música no pátio da escola',
    dateDisplay: '24 de julho de 2026',
    readingTime: '6 min',
  },
  {
    slug: 'adaptacao-escolar-respeitosa',
    date: '2026-07-22',
    dateModified: '2026-09-03',
    seoTitle: 'Adaptação escolar sem trauma: como fazer',
    title: 'Adaptação escolar sem trauma: como é uma adaptação respeitosa',
    excerpt:
      'O passo a passo do primeiro dia, o papel dos pais, o que fazemos com o choro — seguindo o tempo da criança, sem imposições.',
    image: '/images/acolhimento/sorriso-professora.jpg',
    imageAlt: 'Professora sorrindo acolhe criança pequena na sala durante a adaptação',
    dateDisplay: '22 de julho de 2026',
    readingTime: '6 min',
  },
  {
    slug: 'como-escolher-escola-infantil-laranjeiras',
    date: '2026-07-20',
    dateModified: '2026-09-03',
    seoTitle: 'Como escolher uma escola infantil em Laranjeiras',
    title: 'Como escolher uma escola infantil em Laranjeiras: o guia para pais',
    excerpt:
      'O que observar na visita, as perguntas que poucos pais fazem e os sinais de alerta — um roteiro prático para decidir com segurança.',
    image: '/images/acolhimento/colo-patio.jpg',
    imageAlt: 'Professora com bebê no colo no pátio arborizado da escola',
    dateDisplay: '20 de julho de 2026',
    readingTime: '7 min',
  },
  {
    slug: 'metodo-montessori-para-bebes',
    date: '2026-07-18',
    dateModified: '2026-09-03',
    seoTitle: 'Método Montessori para bebês: como funciona',
    title: 'Método Montessori para bebês: como funciona na prática',
    excerpt:
      'Mente absorvente, ambiente preparado, vida prática e o que muda no desenvolvimento — sem teoria abstrata, com exemplos do dia a dia.',
    image: '/images/cerebro/bebe-material.jpg',
    imageAlt: 'Bebê concentrado encaixando discos coloridos em pinos de madeira',
    dateDisplay: '18 de julho de 2026',
    readingTime: '6 min',
  },
  {
    slug: 'quando-matricular-bebe-na-escola',
    date: '2026-07-16',
    dateModified: '2026-09-03',
    seoTitle: 'Com quantos meses colocar o bebê na escola?',
    title: 'Com quantos meses colocar o bebê na escola? O que diz a ciência',
    excerpt:
      'A pergunta que toda família faz — respondida com neurociência, sem culpa: qualidade importa mais que idade, e a adaptação faz toda a diferença.',
    image: '/images/cerebro/leitura-bebes.jpg',
    imageAlt: 'Professora lendo um livro ilustrado para bebês atentos',
    dateDisplay: '16 de julho de 2026',
    readingTime: '6 min',
  },
];
