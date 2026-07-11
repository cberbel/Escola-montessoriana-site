import fs from 'fs';
import { CAMINHOS } from './config.js';
import { distanciaHamming } from './hash.js';

// historico.json: { envios: { [grupoFamilia]: [{ hash, timestamp }] } }
let dados = { envios: {} };
let diasRetencao = 7;

export function carregarHistorico(dias) {
  diasRetencao = dias;
  try {
    dados = JSON.parse(fs.readFileSync(CAMINHOS.historico, 'utf8'));
    if (!dados.envios) dados = { envios: {} };
  } catch {
    dados = { envios: {} };
  }
  limparAntigos();
}

function limparAntigos() {
  const limite = Date.now() - diasRetencao * 24 * 60 * 60 * 1000;
  for (const grupo of Object.keys(dados.envios)) {
    dados.envios[grupo] = dados.envios[grupo].filter((e) => e.timestamp >= limite);
    if (dados.envios[grupo].length === 0) delete dados.envios[grupo];
  }
}

function salvar() {
  limparAntigos();
  fs.writeFileSync(CAMINHOS.historico, JSON.stringify(dados));
}

function ehHoje(timestamp) {
  return new Date(timestamp).toDateString() === new Date().toDateString();
}

export function enviosHoje(grupoFamilia) {
  return (dados.envios[grupoFamilia] ?? []).filter((e) => ehHoje(e.timestamp)).length;
}

/**
 * Verifica se uma foto pode ser enviada para o grupo de uma família.
 * Retorna null quando pode, ou o motivo do bloqueio.
 */
export function motivoBloqueio(grupoFamilia, hash, config) {
  if (config.limiteDiarioPorFamilia > 0 && enviosHoje(grupoFamilia) >= config.limiteDiarioPorFamilia) {
    return `limite de ${config.limiteDiarioPorFamilia} fotos por dia atingido`;
  }
  if (config.limiarFotoParecida >= 0) {
    for (const envio of dados.envios[grupoFamilia] ?? []) {
      const distancia = distanciaHamming(envio.hash, hash);
      if (distancia <= config.limiarFotoParecida) {
        return distancia === 0
          ? 'esta foto já foi enviada'
          : 'uma foto muito parecida já foi enviada';
      }
    }
  }
  return null;
}

export function registrarEnvio(grupoFamilia, hash) {
  if (!dados.envios[grupoFamilia]) dados.envios[grupoFamilia] = [];
  dados.envios[grupoFamilia].push({ hash, timestamp: Date.now() });
  salvar();
}
