# vercel.json — por que está assim (set/2026)

A Vercel não aceita comentários nem `$comment` no `vercel.json`, então a explicação fica aqui.

- **Sem rewrite catch-all para `/index.html`.** Cada rota real já existe em `dist/<rota>/index.html`
  (gerado por `prerender.mjs`). O que não existe cai no `dist/404.html` com status 404 de verdade —
  antes, qualquer URL inválida devolvia a home com 200 (soft 404 para o Google).
- **`trailingSlash: false`**: `/turmas/` vira 308 para `/turmas`. `/index.html` tem redirect explícito.
- **Redirect do domínio sem www**: redundante com a configuração de Domains da Vercel (que já faz 307);
  fica como garantia.
- **Cache-Control**: `/assets` e `/fonts` têm hash/versão no nome → imutáveis por 1 ano; imagens e vídeos 30 dias.
- **`X-Robots-Tag: noindex`** em `/lp/*`, `informativo*.html` e `daycare.html` (landings de anúncio e
  materiais com preço — não devem aparecer na busca). O `robots.txt` NÃO bloqueia esses caminhos de
  propósito: o Google precisa rastrear para ver o noindex.
