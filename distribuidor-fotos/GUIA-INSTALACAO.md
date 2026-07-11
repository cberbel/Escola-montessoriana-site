# Guia de Instalação — Distribuidor de Fotos

Guia passo a passo para quem vai instalar e operar o sistema na escola.
Não é preciso saber programar — basta seguir os passos na ordem.

## O que você vai precisar

- [ ] **Um computador** que fique ligado no horário em que as professoras
      postam as fotos (Windows ou Mac). Pode ser o computador da secretaria.
- [ ] **Um celular exclusivo com chip próprio** para o WhatsApp do sistema.
      ⚠️ Nunca use o número principal da escola: a automação viola os termos
      do WhatsApp e o número pode ser banido.
- [ ] **Autorização por escrito dos responsáveis** de cada aluno, cobrindo
      uso de imagem **e** reconhecimento facial (exigência da LGPD — é dado
      biométrico de criança). Sem a autorização de uma família, não cadastre
      o aluno no sistema.
- [ ] **3 a 5 fotos do rosto de cada aluno** (a foto de perfil escolar
      funciona bem).

## Parte 1 — Instalar (faz uma vez só)

### 1. Instalar o Node.js

1. Acesse https://nodejs.org e baixe a versão **LTS**.
2. Instale clicando em "Avançar" até o final (não precisa mudar nada).

### 2. Baixar o sistema

1. Acesse o repositório no GitHub: `cberbel/Escola-montessoriana-site`.
2. Clique no botão verde **Code → Download ZIP**.
3. Descompacte o arquivo e copie a pasta **`distribuidor-fotos`** para um
   lugar fácil, por exemplo `C:\distribuidor-fotos` (Windows) ou a pasta
   pessoal (Mac).

### 3. Abrir o terminal na pasta

- **Windows:** abra a pasta `distribuidor-fotos` no Explorador de Arquivos,
  clique na barra de endereço, digite `cmd` e aperte Enter.
- **Mac:** abra o app Terminal e digite `cd ` (com espaço), arraste a pasta
  `distribuidor-fotos` para a janela e aperte Enter.

### 4. Instalar os componentes

No terminal, digite os dois comandos abaixo (um de cada vez, aguardando
cada um terminar):

```
npm install
npm run modelos
```

O primeiro demora alguns minutos. Se aparecer alguma pergunta de firewall,
permita o acesso.

## Parte 2 — Configurar o WhatsApp

### 5. Preparar o celular dedicado

1. Instale o WhatsApp no celular exclusivo e ative o número.
2. Crie um grupo chamado **"Revisão de Fotos"** com esse número + as pessoas
   da escola que vão aprovar as fotos (direção/coordenação).
3. Adicione esse número a **todos os grupos internos de turma** e a
   **todos os grupos de família**.

### 6. Conectar o sistema ao WhatsApp

No terminal, digite:

```
npm run grupos
```

Vai aparecer um QR code na tela. No celular dedicado, abra o WhatsApp e vá
em **Configurações → Aparelhos conectados → Conectar um aparelho** e aponte
a câmera para o QR code.

Depois de conectar, o comando mostra a lista de todos os grupos com seus
códigos (chamados JIDs, algo como `120363012345678@g.us`). **Guarde essa
lista** — você vai precisar dela no próximo passo. Para ver de novo, é só
rodar o comando outra vez.

### 7. Preencher a configuração

1. Na pasta `distribuidor-fotos`, copie o arquivo `config.exemplo.json` e
   renomeie a cópia para **`config.json`**.
2. Abra o `config.json` no Bloco de Notas e preencha:
   - `grupoAdmin`: o código do grupo "Revisão de Fotos";
   - `gruposTurma`: os códigos dos grupos internos das turmas;
   - `alunos`: um bloco por aluno, com o código do grupo da família dele.

O campo `nome` de cada aluno deve ser em letras minúsculas, sem acentos e
com hífen no lugar de espaço (ex.: João Silva → `joao-silva`).

Configurações opcionais (já vêm com valores bons):

| Campo                  | O que faz                                       | Padrão |
|------------------------|--------------------------------------------------|--------|
| `limiteDiarioPorFamilia` | Máximo de fotos por família por dia (0 = sem limite) | 5      |
| `limiarFotoParecida`   | Bloqueia foto repetida/parecida já enviada (-1 desativa) | 10     |
| `diasHistoricoFotos`   | Por quantos dias lembrar as fotos já enviadas    | 7      |
| `legendaEnvio`         | Texto que acompanha a foto enviada à família     | 📸 ... |

### 8. Cadastrar os rostos dos alunos

1. Dentro de `distribuidor-fotos`, crie a pasta `fotos-referencia`.
2. Dentro dela, crie uma pasta para cada aluno com o **mesmo nome** usado no
   `config.json` (ex.: `fotos-referencia\joao-silva`).
3. Coloque 3 a 5 fotos do rosto de cada aluno na pasta dele.
4. No terminal, rode:

```
npm run treinar
```

O comando avisa se alguma foto não serviu (rosto não detectado). Repita esse
comando sempre que trocar fotos — o ideal é atualizar a cada semestre, porque
o rosto das crianças muda rápido.

## Parte 3 — Usar no dia a dia

### 9. Ligar o sistema

```
npm start
```

Deixe a janela do terminal aberta. Pronto: quando uma professora postar foto
no grupo da turma, o sistema analisa e manda para o grupo **"Revisão de
Fotos"** com a lista de quem foi reconhecido.

### 10. Aprovar as fotos

No grupo "Revisão de Fotos", responda:

- `ok 12` → envia a foto #12 para as famílias reconhecidas
- `nao 12` → descarta a foto #12
- `pendentes` → lista o que está aguardando
- `status` → mostra um resumo (fotos enviadas hoje, limites etc.)
- `ajuda` → lista os comandos

O sistema **não envia** automaticamente: fotos repetidas ou muito parecidas
com uma já enviada, e fotos além do limite diário da família — nesses casos
ele avisa no grupo de revisão.

## Problemas comuns

| Sintoma | O que fazer |
|---------|-------------|
| QR code não aparece | Verifique a internet do computador e rode o comando de novo |
| "Sessão encerrada no celular" | Apague a pasta `auth` e conecte de novo com `npm run grupos` |
| Sistema não reconhece um aluno | Adicione mais fotos de referência dele e rode `npm run treinar`; se persistir, aumente `distanciaMaxima` para `0.5` no config.json |
| Sistema confunde dois alunos | Diminua `distanciaMaxima` para `0.4` e use fotos de referência mais nítidas |
| Computador reiniciou | Abra o terminal na pasta e rode `npm start` de novo (não precisa escanear QR) |
| Número foi banido pelo WhatsApp | Risco conhecido de automação não oficial. Ative um novo chip, apague a pasta `auth` e reconecte. Reduza o volume de mensagens |

## Cuidados permanentes

- O computador guarda fotos e dados biométricos dos alunos: use senha de
  acesso e não compartilhe a pasta do sistema.
- Nunca envie a ninguém as pastas `auth` (é a "chave" do WhatsApp),
  `fotos-referencia` e os arquivos `descritores.json` e `historico.json`.
- Quando um aluno sair da escola, apague a pasta dele em `fotos-referencia`,
  remova-o do `config.json` e rode `npm run treinar` de novo.
