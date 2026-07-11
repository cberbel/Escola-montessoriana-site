# Ponto · Escola Montessoriana

Aplicativo de ponto independente para até 25 funcionários. Não tem nenhuma
ligação com o código do site da escola — é um projeto separado, com deploy
próprio.

## Telas

- **`/`** — Relógio de ponto. Fica aberto em um tablet ou computador na
  recepção. O funcionário digita seu PIN de 4 números e registra a
  entrada/saída com um toque.
- **`/admin`** — Administração, protegida por PIN (padrão: **1234** — troque
  no primeiro acesso, na aba Configurações). Cadastro de funcionários,
  registros por mês, lançamento manual de batidas, resumo de horas e
  exportação CSV.

## Onde os dados ficam

Os dados (funcionários e registros) ficam salvos no navegador do próprio
dispositivo (localStorage). Por isso:

- Use **sempre o mesmo aparelho** para registrar os pontos.
- Não limpe os dados de navegação desse aparelho.
- Exporte o CSV todo mês como cópia de segurança.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar (Vercel)

O projeto já tem `vercel.json` configurado. Na Vercel, crie um **novo projeto**
apontando para este repositório e defina o **Root Directory** como `app-ponto`.
Cada projeto (site e ponto) terá sua própria URL.
