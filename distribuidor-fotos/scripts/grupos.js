// Conecta com o número dedicado e lista todos os grupos e seus JIDs.
// Útil na primeira configuração, antes de preencher o config.json.
import pino from 'pino';
import qrcode from 'qrcode-terminal';
import baileys, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { CAMINHOS } from '../src/config.js';

const makeWASocket = baileys.default ?? baileys;
const logger = pino({ level: 'silent' });

async function iniciar() {
  const { state, saveCreds } = await useMultiFileAuthState(CAMINHOS.auth);
  const sock = makeWASocket({ auth: state, logger });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log('\nEscaneie o QR code abaixo com o WhatsApp do celular dedicado');
      console.log('(WhatsApp > Configurações > Aparelhos conectados > Conectar aparelho):\n');
      qrcode.generate(qr, { small: true });
    }
    if (connection === 'open') {
      const grupos = await sock.groupFetchAllParticipating();
      const linhas = Object.values(grupos)
        .map((g) => `${g.subject}\n  ${g.id}`)
        .sort();
      console.log(`\nGrupos em que este número participa (${linhas.length}):\n`);
      console.log(linhas.join('\n\n'));
      console.log('\nCopie os JIDs (terminam em @g.us) para o config.json.');
      process.exit(0);
    }
    if (connection === 'close') {
      const codigo = lastDisconnect?.error?.output?.statusCode;
      if (codigo === DisconnectReason.loggedOut) {
        console.error('Sessão encerrada no celular. Apague a pasta ./auth e rode de novo.');
        process.exit(1);
      }
      console.log('Conexão caiu, reconectando...');
      iniciar();
    }
  });
}

await iniciar();
