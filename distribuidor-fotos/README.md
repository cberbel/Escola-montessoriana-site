# Distribuidor de Fotos — WhatsApp

> 👉 Para instalar e operar sem conhecimento técnico, siga o
> **[GUIA-INSTALACAO.md](GUIA-INSTALACAO.md)**. Este README é a referência
> técnica completa.

Aplicação que monitora os **grupos internos de cada turma** no WhatsApp, reconhece
os alunos nas fotos postadas pelas professoras e encaminha cada foto para o
**grupo da família** correspondente.

Roda em um computador da escola, conectado a um **número de WhatsApp dedicado**
(celular exclusivo para essa tarefa). Todo o reconhecimento facial acontece
**localmente nesse computador** — nenhuma foto é enviada para serviços externos.

## Como funciona

1. A professora posta a foto no grupo interno da turma, como já faz hoje.
2. A aplicação detecta os rostos na foto e compara com as fotos de referência
   de cada aluno.
3. **Modo revisão (padrão):** a foto vai para um grupo de administração com a
   lista de alunos reconhecidos. Alguém da escola responde `ok 12` e só então a
   foto é enviada ao(s) grupo(s) da(s) família(s). Isso evita o pior cenário —
   foto indo para a família errada.
4. **Modo automático:** a foto é encaminhada direto, sem confirmação
   (recomendado só depois de semanas de uso com boa taxa de acerto).

## ⚠️ Avisos importantes — leia antes de usar

- **Risco de banimento:** esta aplicação usa uma biblioteca não oficial
  (Baileys) para automatizar o WhatsApp, o que viola os termos de uso da Meta.
  O número usado **pode ser banido sem aviso**. Por isso, use um chip/celular
  **exclusivo** para essa tarefa — nunca o número principal da escola.
- **LGPD:** reconhecimento facial é tratamento de **dado biométrico** (dado
  pessoal sensível, art. 11 da LGPD) de **crianças** (art. 14). A escola deve
  ter **autorização expressa e específica dos responsáveis** para: (a) uso de
  imagem, e (b) reconhecimento facial para distribuição das fotos. Guarde essas
  autorizações. As fotos de referência e os descritores ficam apenas na máquina
  local — mantenha esse computador protegido por senha e com disco cifrado se
  possível.
- **Precisão:** rostos de crianças mudam rápido e são mais difíceis de
  reconhecer que os de adultos. Comece no modo revisão, atualize as fotos de
  referência a cada semestre e ajuste `distanciaMaxima` se houver erros.

## Instalação

Requisitos: [Node.js](https://nodejs.org) 18 ou superior, em um computador que
fique ligado no horário em que as professoras postam as fotos.

```bash
cd distribuidor-fotos
npm install
npm run modelos          # baixa os modelos de reconhecimento facial (~10 MB)
```

## Configuração

### 1. Conectar o número dedicado

1. Crie no WhatsApp um grupo de administração (ex.: "Revisão de Fotos") com o
   número dedicado + quem vai aprovar as fotos.
2. Adicione o número dedicado a todos os grupos de turma e de família.
3. Rode `npm run grupos` e escaneie o QR code com o celular dedicado
   (WhatsApp → Configurações → Aparelhos conectados → Conectar aparelho).
   O comando lista o nome e o JID de todos os grupos (formato
   `123456789@g.us`) e a sessão fica salva para os próximos passos.
4. Copie `config.exemplo.json` para `config.json` e preencha com esses JIDs:

```bash
cp config.exemplo.json config.json
```

### 2. Preencher o config.json

```json
{
  "modoEnvio": "revisao",
  "distanciaMaxima": 0.45,
  "legendaEnvio": "📸 Fotinha de hoje na escola 💚",
  "grupoAdmin": "JID do grupo de revisão",
  "gruposTurma": ["JID do grupo interno de cada turma"],
  "alunos": [
    {
      "nome": "joao-silva",
      "nomeExibicao": "João Silva",
      "grupoFamilia": "JID do grupo da família do João"
    }
  ]
}
```

- `nome` deve bater com o nome da pasta em `fotos-referencia/` (use letras
  minúsculas e hífens, sem acentos).
- `distanciaMaxima`: quão parecido o rosto precisa ser para contar como
  reconhecido. Menor = mais rigoroso. Comece com `0.45`; se estiver deixando
  de reconhecer alunos, suba para `0.5`; se estiver confundindo alunos,
  desça para `0.4`.
- `limiteDiarioPorFamilia`: máximo de fotos enviadas a cada grupo de família
  por dia (padrão `5`; `0` desativa o limite).
- `limiarFotoParecida`: bloqueia o reenvio de foto igual ou muito parecida
  com uma já enviada àquela família. É a distância máxima entre os hashes
  perceptuais (0–64): `0` bloqueia só fotos idênticas, `10` (padrão) pega
  também recompressões e pequenas edições; `-1` desativa.
- `diasHistoricoFotos`: por quantos dias o histórico de envios é lembrado
  para a checagem de fotos repetidas (padrão `7`). Fica em `historico.json`.

### 3. Fotos de referência dos alunos

Crie uma pasta por aluno com 3 a 5 fotos **do rosto**, bem iluminadas, de
ângulos levemente diferentes (foto de perfil escolar funciona bem):

```
fotos-referencia/
  joao-silva/
    1.jpg
    2.jpg
    3.jpg
  maria-souza/
    1.jpg
    2.jpg
```

Depois rode:

```bash
npm run treinar
```

O treino avisa se alguma foto não tiver rosto detectável. Repita o comando
sempre que adicionar/trocar fotos de referência (faça isso pelo menos a cada
semestre — crianças mudam rápido).

### 4. Rodar

```bash
npm start
```

Deixe rodando. A sessão fica salva na pasta `auth/`, então não precisa
escanear o QR de novo a cada reinício.

## Comandos no grupo de administração

| Comando     | O que faz                                              |
|-------------|--------------------------------------------------------|
| `ok 12`     | Aprova a foto #12 e envia às famílias reconhecidas     |
| `nao 12`    | Descarta a foto #12                                    |
| `pendentes` | Lista as fotos aguardando revisão                      |
| `grupos`    | Lista todos os grupos e seus JIDs (para o config.json) |
| `status`    | Resumo da configuração                                 |
| `ajuda`     | Lista os comandos                                      |

## Dicas de operação

- Fotos sem nenhum aluno reconhecido são enviadas ao grupo de administração
  com um aviso, para encaminhamento manual.
- Uma foto com vários alunos reconhecidos é enviada ao grupo de cada família.
- Fotos repetidas/parecidas e envios além do limite diário são bloqueados
  automaticamente por família, com aviso no grupo de administração. O
  controle usa hash perceptual (dHash) e o histórico em `historico.json`.
- As fotos pendentes de revisão ficam só na memória: se o programa reiniciar,
  a professora precisa repostar (ou alguém encaminha manualmente).
- **Nunca versione nem compartilhe** as pastas `auth/` (credenciais da sessão
  do WhatsApp), `fotos-referencia/` e o arquivo `descritores.json` — o
  `.gitignore` já as exclui do repositório.
