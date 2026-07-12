<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1zkvSs_XHxO9ar7ZuvI7ZREYVsl8NaIio

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Chatbot (Vercel AI Gateway + Claude)

O widget de chat (`components/ChatBot.tsx`) chama a function serverless `api/chat.ts`,
que usa o [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) (pacote `ai`) para
responder com Claude, usando como system prompt a base de conhecimento da escola. Se
essa chamada falhar, o chat cai automaticamente para o webhook do n8n já existente.

- Em produção na Vercel, habilite o AI Gateway no projeto (Storage → AI Gateway ou
  Project Settings → AI Gateway); a autenticação é feita automaticamente via OIDC,
  sem precisar de chave.
- Para rodar localmente com `vercel dev`, copie `.env.example` para `.env.local` e
  preencha `AI_GATEWAY_API_KEY` com uma chave gerada em
  [vercel.com/docs/ai-gateway](https://vercel.com/docs/ai-gateway).
- O modelo padrão é `anthropic/claude-sonnet-5`; troque via `AI_GATEWAY_MODEL` sem
  precisar mexer no código.
- `npm run dev` (Vite puro) não executa functions serverless — para testar o `/api/chat`
  localmente use `vercel dev`.
