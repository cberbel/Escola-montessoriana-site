import pino from 'pino';
import qrcode from 'qrcode-terminal';
import baileys, {
  useMultiFileAuthState,
  downloadMediaMessage,
  DisconnectReason,
} from '@whiskeysockets/baileys';
import { carregarConfig, CAMINHOS } from './config.js';
import { carregarModelos, prepararComparador, reconhecerAlunos } from './reconhecimento.js';

const makeWASocket = baileys.default ?? baileys;
const logger = pino({ level: 'silent' });

const config = carregarConfig();
const alunosPorNome = new Map(config.alunos.map((a) => [a.nome, a]));

// Fila do modo revisão: id -> { buffer, alunos, turma, criadoEm }
const pendentes = new Map();
let proximoId = 1;

console.log('Carregando modelos de reconhecimento facial...');
await carregarModelos();
const treinados = prepararComparador(config.distanciaMaxima);

const semGrupo = treinados.filter((nome) => !alunosPorNome.has(nome));
const semFotos = config.alunos.filter((a) => !treinados.includes(a.nome)).map((a) => a.nome);
if (semGrupo.length > 0) {
  console.warn(`Aviso: alunos com fotos de referência mas fora do config.json (serão ignorados): ${semGrupo.join(', ')}`);
}
if (semFotos.length > 0) {
  console.warn(`Aviso: alunos no config.json sem fotos de referência treinadas: ${semFotos.join(', ')}`);
}
console.log(`Reconhecimento pronto para ${treinados.length} aluno(s). Modo de envio: ${config.modoEnvio}.`);

async function iniciar() {
  console.log('Conectando ao WhatsApp...');
  const { state, saveCreds } = await useMultiFileAuthState(CAMINHOS.auth);
  const sock = makeWASocket({ auth: state, logger });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      console.log('\nEscaneie o QR code abaixo com o WhatsApp do celular dedicado');
      console.log('(WhatsApp > Configurações > Aparelhos conectados > Conectar aparelho):\n');
      qrcode.generate(qr, { small: true });
    }
    if (connection === 'open') {
      console.log('Conectado ao WhatsApp. Aguardando fotos nos grupos das turmas...');
    }
    if (connection === 'close') {
      const codigo = lastDisconnect?.error?.output?.statusCode;
      if (codigo === DisconnectReason.loggedOut) {
        console.error('Sessão encerrada no celular. Apague a pasta ./auth e conecte de novo.');
        process.exit(1);
      }
      console.log('Conexão caiu, reconectando...');
      iniciar();
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    for (const msg of messages) {
      try {
        await tratarMensagem(sock, msg);
      } catch (erro) {
        console.error('Erro ao tratar mensagem:', erro);
      }
    }
  });
}

// Desembrulha mensagens temporárias / visualização única
function conteudoDaMensagem(msg) {
  let conteudo = msg.message;
  while (conteudo?.ephemeralMessage || conteudo?.viewOnceMessage || conteudo?.viewOnceMessageV2) {
    conteudo = (conteudo.ephemeralMessage ?? conteudo.viewOnceMessage ?? conteudo.viewOnceMessageV2).message;
  }
  return conteudo;
}

async function tratarMensagem(sock, msg) {
  if (msg.key.fromMe) return; // ignora o que o próprio bot envia
  const origem = msg.key.remoteJid;
  if (!origem) return;
  const conteudo = conteudoDaMensagem(msg);

  if (origem === config.grupoAdmin) {
    const texto = conteudo?.conversation ?? conteudo?.extendedTextMessage?.text ?? '';
    if (texto) await tratarComandoAdmin(sock, texto.trim());
    return;
  }

  if (!config.gruposTurma.includes(origem)) return;
  if (!conteudo?.imageMessage) return;

  console.log(`Foto recebida no grupo de turma ${origem}. Analisando...`);
  const buffer = await downloadMediaMessage(msg, 'buffer', {}, {
    logger,
    reuploadRequest: sock.updateMediaMessage,
  });

  const { totalRostos, alunos } = await reconhecerAlunos(buffer);
  const reconhecidos = alunos.filter((a) => alunosPorNome.has(a.aluno));

  if (reconhecidos.length === 0) {
    console.log(`Nenhum aluno reconhecido (${totalRostos} rosto(s) na foto).`);
    if (config.grupoAdmin) {
      await sock.sendMessage(config.grupoAdmin, {
        image: buffer,
        caption: `⚠️ Foto recebida no grupo da turma, mas nenhum aluno foi reconhecido (${totalRostos} rosto(s) detectado(s)). Encaminhe manualmente se necessário.`,
      });
    }
    return;
  }

  if (config.modoEnvio === 'automatico') {
    await enviarParaFamilias(sock, buffer, reconhecidos);
    return;
  }

  // modo revisão
  const id = proximoId++;
  pendentes.set(id, { buffer, alunos: reconhecidos, turma: origem, criadoEm: Date.now() });
  const lista = reconhecidos
    .map((r) => `• ${nomeExibicao(r.aluno)} (confiança ${confiancaPercentual(r.distancia)}%)`)
    .join('\n');
  await sock.sendMessage(config.grupoAdmin, {
    image: buffer,
    caption:
      `🔎 Foto #${id} — reconheci:\n${lista}\n\n` +
      `Responda *ok ${id}* para enviar às famílias ou *nao ${id}* para descartar.`,
  });
  console.log(`Foto #${id} aguardando revisão (${reconhecidos.map((r) => r.aluno).join(', ')}).`);
}

async function tratarComandoAdmin(sock, texto) {
  const responder = (t) => sock.sendMessage(config.grupoAdmin, { text: t });
  const [comando, argumento] = texto.toLowerCase().split(/\s+/);

  if (comando === 'ok' || comando === 'nao' || comando === 'não') {
    const id = Number(argumento);
    const pendente = pendentes.get(id);
    if (!pendente) {
      await responder(`Não encontrei a foto #${argumento || '?'} pendente. Use *pendentes* para listar.`);
      return;
    }
    pendentes.delete(id);
    if (comando === 'ok') {
      const enviados = await enviarParaFamilias(sock, pendente.buffer, pendente.alunos);
      await responder(`✅ Foto #${id} enviada para: ${enviados.join(', ')}.`);
    } else {
      await responder(`🗑️ Foto #${id} descartada.`);
    }
    return;
  }

  if (comando === 'pendentes') {
    if (pendentes.size === 0) {
      await responder('Nenhuma foto pendente de revisão.');
      return;
    }
    const linhas = [...pendentes.entries()].map(
      ([id, p]) => `#${id}: ${p.alunos.map((a) => nomeExibicao(a.aluno)).join(', ')}`
    );
    await responder(`Fotos pendentes:\n${linhas.join('\n')}`);
    return;
  }

  if (comando === 'grupos') {
    const grupos = await sock.groupFetchAllParticipating();
    const linhas = Object.values(grupos)
      .map((g) => `${g.subject}\n  ${g.id}`)
      .sort();
    await responder(`Grupos em que este número participa:\n\n${linhas.join('\n\n')}`);
    return;
  }

  if (comando === 'status') {
    await responder(
      `Modo: ${config.modoEnvio}\n` +
        `Turmas monitoradas: ${config.gruposTurma.length}\n` +
        `Alunos configurados: ${config.alunos.length}\n` +
        `Fotos pendentes: ${pendentes.size}`
    );
    return;
  }

  if (comando === 'ajuda') {
    await responder(
      'Comandos:\n' +
        '*ok N* — aprova e envia a foto #N às famílias\n' +
        '*nao N* — descarta a foto #N\n' +
        '*pendentes* — lista fotos aguardando revisão\n' +
        '*grupos* — lista os grupos e seus JIDs (para o config.json)\n' +
        '*status* — resumo da configuração'
    );
  }
}

async function enviarParaFamilias(sock, buffer, reconhecidos) {
  const enviados = [];
  for (const { aluno } of reconhecidos) {
    const dados = alunosPorNome.get(aluno);
    await sock.sendMessage(dados.grupoFamilia, {
      image: buffer,
      caption: config.legendaEnvio,
    });
    enviados.push(nomeExibicao(aluno));
    console.log(`Foto enviada para o grupo da família de ${nomeExibicao(aluno)}.`);
  }
  return enviados;
}

function nomeExibicao(nome) {
  return alunosPorNome.get(nome)?.nomeExibicao ?? nome;
}

function confiancaPercentual(distancia) {
  // distância 0 = rosto idêntico; distanciaMaxima = limite aceito
  const proporcao = 1 - distancia / (config.distanciaMaxima * 2);
  return Math.round(Math.min(1, Math.max(0, proporcao)) * 100);
}

await iniciar();
