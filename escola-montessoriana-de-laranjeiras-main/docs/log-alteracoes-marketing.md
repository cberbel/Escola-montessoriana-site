# Log de alterações — Google Ads, GTM, Supabase e site

Registro do que foi mexido fora do código, onde o histórico não fica guardado sozinho.
O que é código está no git (com a explicação inteira em cada mensagem de commit); aqui
ficam as alterações de painel — Google Ads, Tag Manager e banco — que não têm `git log`.

**Cada item traz como desfazer.** Ordem cronológica inversa: o mais recente primeiro.

Conta Google Ads: **617-529-1009** (Escola Montessoriana)
Contêiner GTM: **GTM-56ZSQTXF** · Projeto Supabase: **ponto-escola-montessoriana** (`rmpnqrvsmxhnrwlgqmdp`)

---

## 31/07/2026

### Supabase — colunas `gclid` e `ref` em `crm.leads`

Migration `leads_recebem_gclid`. Duas colunas nulas mais um índice parcial. Ligam o lead
do WhatsApp ao clique no anúncio que o originou.

Aditivo: o `whatsapp-bot` em produção não foi alterado e não sente a mudança.

**Desfazer:**
```sql
alter table crm.leads drop column if exists gclid, drop column if exists ref;
drop index if exists crm.leads_gclid_idx;
```

### Supabase — tabela `public.cliques_anuncio`

Migrations `cria_cliques_anuncio` e `valida_insercao_cliques_anuncio`.
Guarda o par `protocolo → GCLID` gravado pelo site. RLS ligado, política só de INSERT
para `anon` com validação de formato, nenhuma política de leitura (o webhook lê com
`service_role`, que ignora RLS).

**Desfazer:** `drop table public.cliques_anuncio;`

### Site — captura do GCLID (`82ebb99`)

`utils/gclid.ts` novo + um `useEffect` no `App.tsx`. Guarda em localStorage por 90 dias
o identificador do clique que vem na URL do anúncio. Invisível para o visitante.

**Desfazer:** `git revert 82ebb99`

### Site — honeypot nos formulários (`6e72963`)

Campo oculto nos 4 idiomas. Bot que o preenche não envia e-mail **nem dispara a conversão**.
Os formulários estavam com `_captcha: 'false'` e nenhuma outra proteção.

**Desfazer:** `git revert 6e72963`

---

## 29–30/07/2026

### Google Ads — fusão das duas campanhas de Pesquisa

As duas concorriam entre si: raios de 4 km sobrepostos (Botafogo e Laranjeiras são
vizinhos) e palavras amplas parecidas.

Sobrevivente: **[ALM] [C3] Campanha de Leads** — escolhida por ter CTR 6,54% vs 5,22%,
CPC R$ 3,53 vs R$ 4,73, CPA R$ 32,73 vs R$ 34,65 e pontuação 85,9% vs 76,1%.

1. Copiado o grupo "Grupo de anúncios 1" de `(google) Leads-Search-2 #2` para a Campanha
   de Leads, com palavras-chave e anúncio
2. Migradas 42 palavras-chave negativas (15 → 57): bairros fora da região, termos de
   gratuidade, termos de emprego e escolas concorrentes
3. Vinculada a lista compartilhada "palavras negativas" (estava na PMax e na campanha
   antiga, faltava nesta)
4. **`(google) Leads-Search-2 #2` pausada** — não removida

**Desfazer:** reativar a `Leads-Search-2 #2` (Campanhas → menu de status → Ativar) e
pausar o grupo "Grupo de anúncios 1" que foi colado na Campanha de Leads. As negativas
migradas podem ficar: não atrapalham.

> Efeito colateral esperado: a campanha entrou em "Estratégia de lances com aprendizado
> em andamento". Oscilação por 2–3 semanas é normal.

### Google Ads — 3 palavras-chave negativas (83 → 86)

Termos que custaram entre R$ 16 e R$ 34 **por clique**, todos em correspondência exata:

| Negativa | Campanha |
|---|---|
| `[creche criativa copacabana]` | (google) Leads-Search-2 #2 |
| `[escolas particulares copacabana]` | (google) Leads-Search-2 #2 |
| `[creche começo do caminho]` | [ALM] [C3] [PMAX] |

**Desfazer:** Palavras-chave → Palavras-chave negativas → selecionar → remover.

### Google Ads — colunas do relatório

Adicionadas "Cliques inválidos" e "Taxa de cliques inválidos" na tabela de campanhas.
Só exibição, não altera nada da conta. *(Resultado: 5,33% na conta, dentro do normal de
mercado, e o Google já filtra e não cobra.)*

---

## 28/07/2026

### Google Ads — ação "Whatsapp" passou a secundária

Era duplicata de "Contato no Whatsapp": verificado que **as duas disparavam nas mesmas
7 páginas, com a mesma contagem de tags por página**. Somadas davam exatamente as 1.259
conversões do grupo "Contatos".

Agora só reporta, não guia mais o lance, e saiu das metas da conta.

**Desfazer:** Metas → Conversões → Ver todas as ações → Whatsapp → Configurações →
Otimização de ações → "Ação primária" → Salvar.

### GTM — tag de conversão do formulário

A tag `tag formulario` estava no acionador nativo **"Envio de formulário"** (filtro
`Form Classes = space-y-6`), que não dispara no formulário React da home: **2 conversões
em 90 dias**.

Trocada para o acionador **"Evento - form_submit"** — evento personalizado que o próprio
site empurra no dataLayer, e que a tag do GA4 `generate_lead` já usava com sucesso.
O acionador antigo foi removido da tag para não contar em dobro.

*(Alteração salva por mim; a publicação do contêiner foi feita pelo Cláudio.)*

**Desfazer:** GTM → Versões → selecionar a versão anterior → Publicar. Rollback em 2 cliques.

### Site — formulário deixou de contar como conversão de WhatsApp (`cf41222`)

`trackFormSubmit` disparava direto a conversão `AW-16743400376/psM9...` — a ação
**"Contato no Whatsapp"** — com o comentário *"um formulário enviado vale o mesmo que um
contato no WhatsApp"*. Fazia sentido na primeira versão do site, em que o formulário era
enviado pelo WhatsApp. Hoje ele vai por e-mail, então envios estavam sendo contados na
ação errada: é parte da explicação de "Contato no Whatsapp" ter 996 e "formulario site"
ter 2.

A conversão passou a ser disparada só pelo GTM. Sem essa remoção haveria contagem dupla.

**Desfazer:** `git revert cf41222`

---

## Feito e depois desfeito

**CTA pós-formulário apontando para o Calendly** — implementado nos 4 idiomas e revertido
antes do push, por decisão do Cláudio de manter o botão indo para o WhatsApp. Não está no
histórico do git.

---

## O que foi tentado e bloqueado

Duas ações foram barradas pelo sistema de permissões e ficaram para o Cláudio:

- **Orçamento da Campanha de Leads** — eu sugeri R$ 98/dia (48 + 50, para manter o gasto
  total após a fusão). Ele definiu **R$ 80/dia**, e ajustou a PMax de R$ 70 para R$ 74.
  Total da conta: R$ 154/dia, contra R$ 168 antes da fusão.
- **Publicação do contêiner GTM** — feita por ele.

---

## Pendente

1. **Semana de 03/08** — trocar `993311000` → `992973454` nos 7 botões do site, passar a
   gravar `ref → gclid` no Supabase e incluir `Protocolo: XXXXXX` na mensagem. Os três
   juntos: separados não funcionam.
2. **`whatsapp-bot`** — aplicar o trecho que lê o protocolo e grava `gclid` no lead
   (~12 linhas, substitui o `detectarOrigem` atual). Não foi feito deploy para não
   atropelar o desenvolvimento em curso.
3. **Subir conversão offline** no Google Ads — começar por CSV (funciona hoje, sem token)
   e pedir o developer token da API em paralelo.
4. **Depois de 3–4 semanas de dado novo** — rebaixar "Contato no Whatsapp" para secundária
   e a conversão passa a ser "respondeu".
