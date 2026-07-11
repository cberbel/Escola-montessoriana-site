import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const CAMINHOS = {
  raiz,
  config: path.join(raiz, 'config.json'),
  modelos: path.join(raiz, 'modelos'),
  fotosReferencia: path.join(raiz, 'fotos-referencia'),
  descritores: path.join(raiz, 'descritores.json'),
  historico: path.join(raiz, 'historico.json'),
  auth: path.join(raiz, 'auth'),
};

export function carregarConfig() {
  if (!fs.existsSync(CAMINHOS.config)) {
    console.error('Arquivo config.json não encontrado.');
    console.error('Copie config.exemplo.json para config.json e preencha os grupos e alunos.');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CAMINHOS.config, 'utf8'));

  const erros = [];
  if (!['revisao', 'automatico'].includes(config.modoEnvio)) {
    erros.push('modoEnvio deve ser "revisao" ou "automatico"');
  }
  if (!Array.isArray(config.gruposTurma) || config.gruposTurma.length === 0) {
    erros.push('gruposTurma deve listar pelo menos um grupo interno de turma');
  }
  if (config.modoEnvio === 'revisao' && !config.grupoAdmin) {
    erros.push('grupoAdmin é obrigatório no modo revisão');
  }
  if (!Array.isArray(config.alunos) || config.alunos.length === 0) {
    erros.push('alunos deve listar pelo menos um aluno');
  }
  for (const aluno of config.alunos ?? []) {
    if (!aluno.nome || !aluno.grupoFamilia) {
      erros.push(`aluno inválido (precisa de "nome" e "grupoFamilia"): ${JSON.stringify(aluno)}`);
    }
  }
  const jidsPendentes = JSON.stringify(config).match(/COLE_AQUI[^"]*/g);
  if (jidsPendentes) {
    erros.push(`há placeholders não preenchidos no config.json: ${[...new Set(jidsPendentes)].join(', ')}`);
  }

  if (erros.length > 0) {
    console.error('Problemas no config.json:');
    for (const erro of erros) console.error(`  - ${erro}`);
    console.error('\nDica: use o comando "grupos" no chat de administração para descobrir os JIDs.');
    process.exit(1);
  }

  config.distanciaMaxima = config.distanciaMaxima ?? 0.45;
  config.legendaEnvio = config.legendaEnvio ?? '📸 Fotinha de hoje na escola 💚';
  // 0 desativa o limite diário; -1 desativa a detecção de fotos parecidas
  config.limiteDiarioPorFamilia = config.limiteDiarioPorFamilia ?? 5;
  config.limiarFotoParecida = config.limiarFotoParecida ?? 10;
  config.diasHistoricoFotos = config.diasHistoricoFotos ?? 7;
  return config;
}
