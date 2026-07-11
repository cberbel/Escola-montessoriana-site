import { carregarModelos, treinar } from '../src/reconhecimento.js';

console.log('Carregando modelos de reconhecimento facial...');
await carregarModelos();
await treinar();
console.log('\nTreino concluído. Agora rode: npm start');
