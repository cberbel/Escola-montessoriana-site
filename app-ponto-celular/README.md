# Ponto Celular · Escola Montessoriana

Versão do app de ponto em que **cada funcionário bate o ponto pelo próprio
celular**, com GPS e horário do servidor (não dá para fraudar mudando a hora
do aparelho). Os dados ficam num banco de dados na nuvem (Supabase, plano
gratuito), então a administração pode ser acessada de qualquer lugar.

É um projeto totalmente independente do site da escola e do app `app-ponto`
(versão para um único computador/tablet fixo).

## Telas

- **`/`** — cada funcionário abre pelo navegador do próprio celular, digita
  seu PIN de 4 números uma vez (fica salvo no aparelho) e toca em "Registrar"
  para bater entrada/saída. O app pede permissão de localização a cada
  batida.
- **`/admin`** — administração, acessível de qualquer aparelho, protegida por
  PIN (padrão **1234** — troque no primeiro acesso). Cadastro de
  funcionários, definição da localização da escola, registros por mês com
  selo "Na escola" / "a X km da escola", lançamento manual, resumo de horas e
  exportação CSV.

## Como instalar (uma vez só)

### 1. Criar o banco de dados no Supabase (gratuito)

1. Crie uma conta em https://supabase.com e um novo projeto.
2. No menu lateral, abra **SQL Editor** → **New query**.
3. Copie todo o conteúdo do arquivo [`supabase/schema.sql`](./supabase/schema.sql)
   deste projeto, cole no editor e clique em **Run**. Isso cria as tabelas e
   todas as regras de segurança.
4. Vá em **Project Settings → API** e copie dois valores:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public key** (uma chave longa)

### 2. Conectar o app ao banco

Edite o arquivo [`public/config.json`](./public/config.json) e preencha:

```json
{
  "supabaseUrl": "https://xxxxx.supabase.co",
  "supabaseAnonKey": "cole-a-chave-anon-aqui"
}
```

A chave `anon` é pública por natureza (ela some visível no navegador de
qualquer usuário) — a segurança real está nas funções do banco de dados
(`schema.sql`), que conferem o PIN a cada chamada antes de ler ou escrever
qualquer dado.

### 3. Publicar (Vercel)

Crie um **novo projeto** na Vercel apontando para este repositório, com
**Root Directory** definido como `app-ponto-celular`. Cada funcionário
acessa o link pelo navegador do celular (não precisa instalar nada de loja
de aplicativos).

### 4. Primeiro uso

1. Abra `/admin`, entre com o PIN **1234** e troque-o em Configurações.
2. Ainda em Configurações, **estando dentro da escola**, toque em "Usar
   minha localização atual" para definir onde fica a escola.
3. Cadastre os funcionários (até 25 ativos) com um PIN de 4 números cada.
4. Compartilhe o link do app (a URL de `/`) com a equipe — cada um entra com
   o próprio PIN pelo celular.

## Segurança e privacidade

- O horário de cada batida é sempre o do **servidor**, não o do celular.
- A localização só é enviada no momento da batida — o app não rastreia o
  funcionário fora disso.
- Se o GPS estiver indisponível ou a permissão for negada, a batida é
  registrada mesmo assim (sem localização), para nunca impedir o registro
  do ponto.
- As tabelas do banco não têm acesso direto: todo acesso passa por funções
  que exigem o PIN correto a cada chamada.

## Rodar localmente

```bash
npm install
npm run dev
```
