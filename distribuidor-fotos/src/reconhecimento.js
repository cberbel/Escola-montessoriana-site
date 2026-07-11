import fs from 'fs';
import path from 'path';
import * as tf from '@tensorflow/tfjs-node';
import * as faceapi from '@vladmandic/face-api';
import { CAMINHOS } from './config.js';

const EXTENSOES_IMAGEM = new Set(['.jpg', '.jpeg', '.png']);

let matcher = null;

export async function carregarModelos() {
  const manifesto = path.join(CAMINHOS.modelos, 'ssd_mobilenetv1_model-weights_manifest.json');
  if (!fs.existsSync(manifesto)) {
    console.error('Modelos de reconhecimento facial não encontrados em ./modelos');
    console.error('Rode primeiro: npm run modelos');
    process.exit(1);
  }
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(CAMINHOS.modelos);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(CAMINHOS.modelos);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(CAMINHOS.modelos);
}

function listarFotosReferencia() {
  if (!fs.existsSync(CAMINHOS.fotosReferencia)) return new Map();
  const porAluno = new Map();
  for (const pasta of fs.readdirSync(CAMINHOS.fotosReferencia, { withFileTypes: true })) {
    if (!pasta.isDirectory()) continue;
    const fotos = fs
      .readdirSync(path.join(CAMINHOS.fotosReferencia, pasta.name))
      .filter((f) => EXTENSOES_IMAGEM.has(path.extname(f).toLowerCase()))
      .map((f) => path.join(CAMINHOS.fotosReferencia, pasta.name, f));
    if (fotos.length > 0) porAluno.set(pasta.name, fotos);
  }
  return porAluno;
}

function carregarCache() {
  try {
    return JSON.parse(fs.readFileSync(CAMINHOS.descritores, 'utf8'));
  } catch {
    return { fotos: {} };
  }
}

async function descritorDaFoto(caminho) {
  const buffer = fs.readFileSync(caminho);
  const tensor = tf.node.decodeImage(buffer, 3);
  try {
    const deteccao = await faceapi
      .detectSingleFace(tensor)
      .withFaceLandmarks()
      .withFaceDescriptor();
    return deteccao ? Array.from(deteccao.descriptor) : null;
  } finally {
    tensor.dispose();
  }
}

/**
 * Gera (ou atualiza) os descritores faciais a partir de fotos-referencia/<aluno>/*.jpg.
 * O cache em descritores.json evita reprocessar fotos que não mudaram.
 */
export async function treinar() {
  const porAluno = listarFotosReferencia();
  if (porAluno.size === 0) {
    console.error('Nenhuma foto de referência encontrada.');
    console.error('Crie pastas fotos-referencia/<nome-do-aluno>/ com 3 a 5 fotos do rosto de cada aluno.');
    process.exit(1);
  }

  const cache = carregarCache();
  const cacheNovo = { fotos: {} };

  for (const [aluno, fotos] of porAluno) {
    for (const foto of fotos) {
      const mtime = fs.statSync(foto).mtimeMs;
      const emCache = cache.fotos[foto];
      if (emCache && emCache.mtime === mtime) {
        cacheNovo.fotos[foto] = emCache;
        continue;
      }
      process.stdout.write(`Processando ${foto} ... `);
      const descritor = await descritorDaFoto(foto);
      console.log(descritor ? 'ok' : 'NENHUM ROSTO DETECTADO (foto ignorada)');
      cacheNovo.fotos[foto] = { mtime, aluno, descritor };
    }
  }

  fs.writeFileSync(CAMINHOS.descritores, JSON.stringify(cacheNovo));

  const resumo = new Map();
  for (const { aluno, descritor } of Object.values(cacheNovo.fotos)) {
    if (descritor) resumo.set(aluno, (resumo.get(aluno) ?? 0) + 1);
  }
  console.log('\nDescritores gerados:');
  for (const [aluno, qtd] of resumo) console.log(`  ${aluno}: ${qtd} foto(s) válida(s)`);
  return resumo;
}

/**
 * Carrega os descritores do cache e monta o comparador.
 * Retorna a lista de alunos "treinados".
 */
export function prepararComparador(distanciaMaxima) {
  const cache = carregarCache();
  const porAluno = new Map();
  for (const { aluno, descritor } of Object.values(cache.fotos)) {
    if (!descritor) continue;
    if (!porAluno.has(aluno)) porAluno.set(aluno, []);
    porAluno.get(aluno).push(new Float32Array(descritor));
  }
  if (porAluno.size === 0) {
    console.error('Nenhum descritor facial disponível. Rode primeiro: npm run treinar');
    process.exit(1);
  }
  const rotulados = [...porAluno.entries()].map(
    ([aluno, descritores]) => new faceapi.LabeledFaceDescriptors(aluno, descritores)
  );
  matcher = new faceapi.FaceMatcher(rotulados, distanciaMaxima);
  return [...porAluno.keys()];
}

/**
 * Detecta rostos em uma foto e devolve os alunos reconhecidos:
 * [{ aluno, distancia }] — sem duplicatas, ficando com a melhor distância.
 */
export async function reconhecerAlunos(bufferImagem) {
  if (!matcher) throw new Error('Comparador não inicializado — chame prepararComparador() antes.');
  const tensor = tf.node.decodeImage(bufferImagem, 3);
  try {
    const deteccoes = await faceapi
      .detectAllFaces(tensor)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const melhores = new Map();
    for (const deteccao of deteccoes) {
      const resultado = matcher.findBestMatch(deteccao.descriptor);
      if (resultado.label === 'unknown') continue;
      const atual = melhores.get(resultado.label);
      if (!atual || resultado.distance < atual.distancia) {
        melhores.set(resultado.label, { aluno: resultado.label, distancia: resultado.distance });
      }
    }
    return {
      totalRostos: deteccoes.length,
      alunos: [...melhores.values()].sort((a, b) => a.distancia - b.distancia),
    };
  } finally {
    tensor.dispose();
  }
}
