/**
 * Passo 3 do build (ver "build" no package.json): pega o dist/index.html gerado
 * pelo vite build, renderiza cada rota via entry-server e grava
 * dist/<rota>/index.html com o HTML real dentro do #root.
 *
 * A Vercel serve /rota a partir de dist/rota/index.html direto do filesystem;
 * o rewrite do vercel.json (tudo -> /index.html) só pega rota que não existe.
 * Canonical e og:url são reescritos por rota; o resto do <head> (GTM, filas de
 * tracking, fontes) vem intacto do template.
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

let ok = 0;
for (const url of routesToPrerender) {
  const appHtml = render(url);
  if (!appHtml || appHtml.length < 500) {
    throw new Error(`prerender: rota ${url} rendeu HTML suspeito de vazio (${appHtml.length} chars)`);
  }
  const canonical = SITE + (url === '/' ? '/' : url);
  const html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);

  const outDir = url === '/' ? dist : path.join(dist, url.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  ok++;
}

// O bundle SSR serviu só ao prerender; não vai para o deploy.
fs.rmSync(path.join(dist, 'server'), { recursive: true, force: true });

console.log(`prerender: ${ok} rotas gravadas em dist/`);
