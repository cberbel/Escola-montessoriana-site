/**
 * Passo 3 do build (ver "build" no package.json): pega o dist/index.html gerado
 * pelo vite build, renderiza cada rota via entry-server e grava
 * dist/<rota>/index.html com o HTML real dentro do #root.
 *
 * A Vercel serve /rota a partir de dist/rota/index.html direto do filesystem;
 * o rewrite do vercel.json (tudo -> /index.html) só pega rota que não existe.
 * Título, meta description, og:title/description e canonical/og:url são
 * reescritos POR ROTA (valores vêm de routesToPrerender no entry-server.tsx);
 * o resto do <head> (GTM, filas de tracking, fontes) vem intacto do template.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, 'dist');
const SITE = 'https://www.escolamontessoriana.com.br';

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> não encontrado no dist/index.html — o marcador mudou?');
}

const { render, routesToPrerender } = await import('./dist/server/entry-server.js');

// Texto vindo do entry-server vai para dentro de atributo/tag HTML: escapar.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

let ok = 0;
for (const { url, title, description } of routesToPrerender) {
  const appHtml = render(url);
  if (!appHtml || appHtml.length < 500) {
    throw new Error(`prerender: rota ${url} rendeu HTML suspeito de vazio (${appHtml.length} chars)`);
  }
  if (!title || !description) {
    throw new Error(`prerender: rota ${url} sem title/description no entry-server.tsx`);
  }
  const canonical = SITE + (url === '/' ? '/' : url);
  // hreflang só faz sentido nas 4 homes (as únicas com versão traduzida real);
  // nas demais rotas o bloco herdado do template apontaria para a home errada.
  const temTraducao = ['/', '/en', '/fr', '/es'].includes(url);
  // replace com função para o texto não ser interpretado como padrão ($&, $1...)
  let html = template
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)
    .replace(/<title>[^<]*<\/title>/, () => `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, () => `<meta name="description" content="${esc(description)}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, () => `<meta property="og:title" content="${esc(title)}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, () => `<meta property="og:description" content="${esc(description)}"`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);
  if (!temTraducao) {
    html = html.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/>\r?\n/g, '');
  }

  const outDir = url === '/' ? dist : path.join(dist, url.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  ok++;
}

// O bundle SSR serviu só ao prerender; não vai para o deploy.
fs.rmSync(path.join(dist, 'server'), { recursive: true, force: true });

console.log(`prerender: ${ok} rotas gravadas em dist/`);
