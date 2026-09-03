/**
 * Passo 3 do build (ver "build" no package.json): pega o dist/index.html gerado
 * pelo vite build, renderiza cada rota via entry-server e grava
 * dist/<rota>/index.html com o HTML real dentro do #root.
 *
 * A Vercel serve /rota a partir de dist/rota/index.html direto do filesystem.
 * Não há mais rewrite catch-all (vercel.json): caminho inexistente cai no
 * dist/404.html, gerado aqui, com status 404 de verdade.
 *
 * Por rota são reescritos: <title>, meta description, og:*, canonical,
 * <html lang>, hreflang (grupos de tradução do entry-server) e os JSON-LD de
 * FAQPage, BlogPosting/Person e BreadcrumbList. O sitemap.xml também sai daqui,
 * com <lastmod> por página (antes era um arquivo estático sem data).
 * O resto do <head> (tracking, fontes, schema da escola) vem intacto do template.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, 'dist');
const SITE = 'https://www.escolamontessoriana.com.br';
const ESCOLA_ID = `${SITE}/#escola`;
const AUTOR_ID = `${SITE}/sobre#claudio`;

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> não encontrado no dist/index.html — o marcador mudou?');
}

const { render, routesToPrerender } = await import('./dist/server/entry-server.js');

// Texto vindo do entry-server vai para dentro de atributo/tag HTML: escapar.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const abs = (u) => (u.startsWith('http') ? u : SITE + u);
const jsonLd = (obj) =>
  `\n    <script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

/**
 * JSON-LD FAQPage da rota (schema.org). É o formato que o Google e os
 * buscadores de IA leem para responder a pergunta direto, citando a escola.
 * Só entra em rota que tem as MESMAS perguntas visíveis na página.
 */
const faqJsonLd = (faq) =>
  jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ p, r }) => ({
      '@type': 'Question',
      name: p,
      acceptedAnswer: { '@type': 'Answer', text: r },
    })),
  });

/** Fundador da escola (schema Person da página /sobre; referenciado como `founder` no schema da escola). */
const autorJsonLd = () => ({
  '@type': 'Person',
  '@id': AUTOR_ID,
  name: 'Claudio Berbel',
  url: `${SITE}/sobre`,
  jobTitle: 'Fundador e diretor',
  worksFor: { '@id': ESCOLA_ID },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Formador Montessori',
      recognizedBy: { '@type': 'Organization', name: 'ABEM — Associação Brasileira de Educação Montessoriana' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Doutorado',
      name: 'Doutorado em Economia',
      recognizedBy: { '@type': 'CollegeOrUniversity', name: 'FGV — Fundação Getulio Vargas' },
    },
  ],
  knowsAbout: ['Educação Montessori', 'Primeira infância', 'Desenvolvimento infantil'],
});

const blogPostingJsonLd = (canonical, post, description) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': `${canonical}#artigo`,
      mainEntityOfPage: canonical,
      url: canonical,
      headline: post.headline,
      description,
      image: abs(post.image),
      datePublished: post.datePublished,
      dateModified: post.dateModified ?? post.datePublished,
      inLanguage: 'pt-BR',
      // Autoria institucional: os textos são da equipe da escola, não do fundador.
      author: { '@id': ESCOLA_ID },
      publisher: { '@id': ESCOLA_ID },
      isPartOf: { '@type': 'Blog', '@id': `${SITE}/blog#blog`, name: 'Blog da Escola Montessoriana de Laranjeiras' },
    },
  ],
});

const breadcrumbJsonLd = (trilha) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trilha.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.url),
  })),
});

const hreflangLinks = (alternates) => {
  const linhas = Object.entries(alternates).map(
    ([lang, url]) => `    <link rel="alternate" hreflang="${lang}" href="${abs(url)}" />`
  );
  if (alternates['pt-BR']) {
    linhas.push(`    <link rel="alternate" hreflang="x-default" href="${abs(alternates['pt-BR'])}" />`);
  }
  return linhas.join('\n') + '\n';
};

let ok = 0;
const sitemap = [];

for (const rota of routesToPrerender) {
  const { url, title, description, faq, image, lang, alternates, post, breadcrumb, lastmod } = rota;
  const appHtml = render(url);
  if (!appHtml || appHtml.length < 500) {
    throw new Error(`prerender: rota ${url} rendeu HTML suspeito de vazio (${appHtml.length} chars)`);
  }
  if (!title || !description) {
    throw new Error(`prerender: rota ${url} sem title/description no entry-server.tsx`);
  }
  if (title.length > 70) {
    console.warn(`prerender: title de ${url} tem ${title.length} caracteres (o Google corta em ~60): ${title}`);
  }
  if (description.length > 160) {
    console.warn(`prerender: description de ${url} tem ${description.length} caracteres (o Google corta em ~155)`);
  }
  const canonical = SITE + (url === '/' ? '/' : url);
  const ogImage = abs(image ?? '/images/hero-criancas.jpg');
  const ogLocale = { 'pt-BR': 'pt_BR', en: 'en_US', es: 'es_ES', fr: 'fr_FR' }[lang] ?? 'pt_BR';

  // replace com função para o texto não ser interpretado como padrão ($&, $1...)
  let html = template
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)
    .replace(/<html lang="[^"]*">/, () => `<html lang="${lang}">`)
    .replace(/<title>[^<]*<\/title>/, () => `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, () => `<meta name="description" content="${esc(description)}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, () => `<meta property="og:title" content="${esc(title)}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, () => `<meta property="og:description" content="${esc(description)}"`)
    .replace(/<meta property="og:image" content="[^"]*"/, () => `<meta property="og:image" content="${ogImage}"`)
    .replace(/<meta property="og:locale" content="[^"]*"/, () => `<meta property="og:locale" content="${ogLocale}"`)
    .replace(/<meta property="og:type" content="[^"]*"/, () => `<meta property="og:type" content="${post ? 'article' : 'website'}"`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);

  // hreflang: remove o bloco da home que veio no template e põe o do grupo da rota (se houver).
  html = html.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/>\r?\n/g, '');
  if (alternates) {
    html = html.replace(/([ \t]*<link rel="canonical"[^>]*>\r?\n)/, (m) => m + hreflangLinks(alternates));
  }

  const extras = [];
  if (faq?.length) extras.push(faqJsonLd(faq));
  if (post) extras.push(jsonLd(blogPostingJsonLd(canonical, post, description)));
  if (url === '/sobre') extras.push(jsonLd({ '@context': 'https://schema.org', ...autorJsonLd() }));
  if (breadcrumb?.length) extras.push(jsonLd(breadcrumbJsonLd(breadcrumb)));
  if (extras.length) html = html.replace('</head>', () => `${extras.join('')}\n  </head>`);

  if (url === '/404') {
    // A Vercel serve dist/404.html com status 404 para todo caminho que não existe.
    html = html.replace('</head>', () => `    <meta name="robots" content="noindex" />\n  </head>`);
    fs.writeFileSync(path.join(dist, '404.html'), html);
  } else {
    const outDir = url === '/' ? dist : path.join(dist, url.slice(1));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
  }
  if (rota.sitemap !== false) {
    sitemap.push({ loc: canonical, lastmod, alternates });
  }
  ok++;
}

// sitemap.xml gerado a partir das rotas (com lastmod e hreflang), no lugar do arquivo estático.
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitemap.map(({ loc, lastmod, alternates }) => {
    const alt = alternates
      ? Object.entries(alternates)
          .map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(u)}"/>`)
          .join('\n') + '\n'
      : '';
    return `  <url>\n    <loc>${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}${alt}  </url>`;
  }),
  '</urlset>',
  '',
].join('\n');
fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml);

// O bundle SSR serviu só ao prerender; não vai para o deploy.
fs.rmSync(path.join(dist, 'server'), { recursive: true, force: true });

console.log(`prerender: ${ok} rotas gravadas em dist/ (+ 404.html, sitemap.xml com ${sitemap.length} URLs)`);
