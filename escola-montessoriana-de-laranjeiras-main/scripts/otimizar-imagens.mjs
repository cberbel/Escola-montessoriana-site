/**
 * Gera as variantes WebP (800 px e 1400 px de largura) de cada foto de public/images,
 * lado a lado com o original: foto.jpg -> foto-800.webp e foto-1400.webp.
 * Roda no build (package.json: "prebuild"), então as variantes NÃO ficam no git —
 * a Vercel gera na hora. O componente <Foto> (components/ui/Foto.tsx) usa essas
 * variantes num <picture>; o JPEG/PNG original segue como fallback.
 * Ganho medido: 60–75% dos bytes por foto.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
const LARGURAS = [800, 1400];
const PULAR = new Set(['logo-escola.png']);

let gerados = 0;
async function varrer(pasta) {
  for (const nome of fs.readdirSync(pasta)) {
    const p = path.join(pasta, nome);
    if (fs.statSync(p).isDirectory()) { await varrer(p); continue; }
    const ext = path.extname(nome).toLowerCase();
    const base = nome.slice(0, -ext.length);
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext) || PULAR.has(nome)) continue;
    if (LARGURAS.some((w) => base.endsWith(`-${w}`))) continue; // já é variante
    let larguraOrigem;
    try {
      larguraOrigem = (await sharp(p).metadata()).width;
    } catch (e) {
      console.warn('otimizar-imagens: ignorado', p, e.message);
      continue;
    }
    for (const w of LARGURAS) {
      const destino = path.join(pasta, `${base}-${w}.webp`);
      // A largura esperada é a mesma regra do withoutEnlargement abaixo. Comparar
      // dimensão (e não mtime) porque o cache de build da Vercel devolve variantes
      // de deploys antigos com mtime imprevisível: uma foto recomprimida de 1903
      // para 960 px continuava sendo servida em 1903 px, justamente na imagem de LCP.
      const esperada = Math.min(w, larguraOrigem);
      if (fs.existsSync(destino)) {
        try {
          if ((await sharp(destino).metadata()).width === esperada) continue;
        } catch {
          /* variante ilegível: regera abaixo */
        }
      }
      try {
        await sharp(p).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 75, effort: 5 }).toFile(destino);
        gerados++;
      } catch (e) {
        console.warn('otimizar-imagens: ignorado', p, e.message);
      }
    }
  }
}
await varrer(raiz);
console.log(`otimizar-imagens: ${gerados} variantes WebP geradas`);
