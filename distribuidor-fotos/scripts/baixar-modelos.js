import fs from 'fs';
import path from 'path';
import { CAMINHOS } from '../src/config.js';

const BASE = 'https://raw.githubusercontent.com/vladmandic/face-api/master/model';
const MODELOS = ['ssd_mobilenetv1_model', 'face_landmark_68_model', 'face_recognition_model'];

fs.mkdirSync(CAMINHOS.modelos, { recursive: true });

for (const modelo of MODELOS) {
  const manifesto = `${modelo}-weights_manifest.json`;
  const arquivos = [manifesto];

  const resposta = await fetch(`${BASE}/${manifesto}`);
  if (!resposta.ok) {
    console.error(`Falha ao baixar ${manifesto}: HTTP ${resposta.status}`);
    process.exit(1);
  }
  const conteudo = await resposta.json();
  for (const entrada of conteudo) arquivos.push(...entrada.paths);

  fs.writeFileSync(path.join(CAMINHOS.modelos, manifesto), JSON.stringify(conteudo));

  for (const arquivo of arquivos.slice(1)) {
    const destino = path.join(CAMINHOS.modelos, arquivo);
    if (fs.existsSync(destino)) {
      console.log(`${arquivo} já existe, pulando.`);
      continue;
    }
    process.stdout.write(`Baixando ${arquivo} ... `);
    const r = await fetch(`${BASE}/${arquivo}`);
    if (!r.ok) {
      console.error(`falha (HTTP ${r.status})`);
      process.exit(1);
    }
    fs.writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
    console.log('ok');
  }
}

console.log('\nModelos baixados em ./modelos. Próximo passo: npm run treinar');
