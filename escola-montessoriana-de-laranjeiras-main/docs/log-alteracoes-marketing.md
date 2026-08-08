# Log de alterações — Google Ads, GTM, Supabase e site

Registro do que foi mexido fora do código, onde o histórico não fica guardado sozinho.
O que é código está no git (com a explicação inteira em cada mensagem de commit); aqui
ficam as alterações de painel — Google Ads, Tag Manager e banco — que não têm `git log`.

**Cada item traz como desfazer.** Ordem cronológica inversa: o mais recente primeiro.

Conta Google Ads: **617-529-1009** (Escola Montessoriana)
Contêiner GTM: **GTM-56ZSQTXF** · Projeto Supabase: **ponto-escola-montessoriana** (`rmpnqrvsmxhnrwlgqmdp`)

---

## 07–08/08/2026

### A cadeia clique → conversa → conversão offline entrou no ar

Cinco peças que só funcionam juntas. Antes disto, o Google otimizava para *clique no
botão do WhatsApp*; agora existe caminho para otimizar por *conversa respondida*.

```
anúncio → ?gclid=... → site grava (ref → gclid) → carimbo na mensagem
        → trigger lê o protocolo → lead ganha gclid → view monta o CSV
```

**1. Site — carimbo do protocolo (`4a4ddaa`)**
Interceptador global de cliques reescreve o `href` de qualquer link `wa.me` antes da
navegação, acrescentando `Protocolo: XXXXXX`. Vale para os 7+ botões sem editar cada
componente. Quem não veio de anúncio não recebe carimbo.
*O formato visível ao cliente foi aprovado pelo Cláudio em 08/08.*
**Desfazer:** `git revert 4a4ddaa`

**2. Supabase — trigger `crm.vincular_gclid()`** (migration `trigger_vincular_gclid_ao_lead`)
Trigger `mensagens_vincular_gclid` em `crm.mensagens`. Lê o protocolo na mensagem,
busca o GCLID em `public.cliques_anuncio` e grava `ref`/`gclid` no lead, marcando
`origem = 'google_ads'`.

Foi escolhido no lugar de alterar o `whatsapp-bot` porque aquela função estava em
desenvolvimento ativo (v19 → v24 em poucos dias) e um deploy meu sobrescreveria o
trabalho em curso. Tem `exception when others then return new`: se a medição falhar,
o atendimento continua.
**Desfazer:** `drop trigger mensagens_vincular_gclid on crm.mensagens;`

**3. Supabase — view `crm.conversoes_offline`** (migrations `view_conversoes_offline_google_ads`
e `view_conversoes_offline_robusta`)
Monta as colunas do CSV de upload do Google Ads. Critério de conversão: **2 mensagens
de entrada e pelo menos 1 de saída** — ou seja, o lead respondeu depois da resposta da
escola. O horário da conversão é o da 2ª mensagem dele.
**Desfazer:** `drop view crm.conversoes_offline;`

**4. Supabase — views de simulação do bot** (migration `placar_simulacao_bot`)
`crm.simulacao_conversas` e `crm.placar_simulacao`. Placar por rodada de simulação, para
medir se o bot melhorou. Linha de base: 30 conversas simuladas, 0 agendamentos.
**Desfazer:** `drop view crm.placar_simulacao; drop view crm.simulacao_conversas;`

**5. `crm.config.prompt_sistema`** — 8 edições pontuais no prompt do bot.
**Desfazer:** a versão anterior está inteira em `prompt_sistema_backup_20260807`.

> **Dois bugs achados no teste ponta a ponta e corrigidos:**
> - O header `Prefer: resolution=ignore-duplicates` transformava o POST do site em
>   *upsert*, que exige política de UPDATE no RLS — resultado, 401. Trocado por insert
>   puro, tratando 409 como sucesso.
> - O site carimbava `Protocolo: XXXXXX` e o trigger procurava `[#XXXXXX]`. Nunca teriam
>   se encontrado. Migration `corrige_regex_protocolo` fez o trigger aceitar as duas formas.

> **Ainda inerte.** Os botões do site apontam para `993311000`, que é o número pessoal do
> Cláudio e não passa pelo bot. Nada disso conta conversão até a troca para `992973454`.

---

## 04–06/08/2026

### YouTube — 5 vídeos publicados como "não listado"

Canal **Escola Montessoriana** (`UCVwqQLLbz8k8Ae9xzwLDjNA`). Recortes feitos com FFmpeg
a partir de material que já estava no site, para atender o formato horizontal que o
PMax exigia. Todos marcados como **não é conteúdo para crianças** (material dirigido a
pais) — declaração confirmada pelo Cláudio.

| Vídeo | Link | Origem |
|---|---|---|
| manu abertura horizontal | `youtu.be/wP3-WHE8tO0` | depoimento-manu.mp4, corte 0–21,5s |
| manu fecho horizontal | `youtu.be/op-5GJ8ydpg` | depoimento-manu.mp4, corte 146,2–167,2s |
| video1 horizontal | `youtu.be/S-QkeGbKAgg` | public/videos/video1.mp4, corte 0–28s |
| video2 horizontal | `youtu.be/FmdVYCtSWk8` | public/videos/video2.mp4 |
| video3 horizontal | `youtu.be/1D17BafzN8w` | public/videos/video3.mp4 |

Os originais eram todos verticais 9:16; o horizontal foi montado com fundo desfocado e
o vídeo centralizado. Arquivos de origem em `Documents\pmax-google-ads\videos`.

**Desfazer:** YouTube Studio → Conteúdo → selecionar → excluir (ou mudar para privado).

### Google Ads — 5 vídeos adicionados ao grupo de recursos da PMax

Grupo "Grupo de recursos 1", campanha `[ALM] [C3] [PMAX]`. Passou de 3 para **8 vídeos**.

Motivo: o painel de qualidade do anúncio marcava tudo como suficiente (imagens, títulos,
descrições, sitelinks) **menos vídeos**, com a dica *"adicione vídeos quadrados e
horizontais"*. Depois de adicionar o primeiro horizontal, o alerta encolheu para apenas
*"adicione vídeos quadrados"* — confirmando que a metade horizontal foi resolvida.

O grupo entrou em **"Pendente — em revisão"**, normal para recursos novos.

**Desfazer:** grupo de recursos → Editar → Vídeos → Editar → desmarcar os 5 → Salvar.

> **Ainda falta:** os 5 vídeos **quadrados (1:1)** estão prontos em
> `Documents\pmax-google-ads\videos` mas não foram enviados ao YouTube. Enquanto não
> forem, a qualidade não chega a "Excelente".

> **Não foi feito:** as 20 imagens preparadas em `Documents\pmax-google-ads` não foram
> adicionadas. O painel já marca "Imagens" como suficiente, então não mudariam a nota —
> só acrescentariam variedade.

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

1. **Trocar `993311000` → `992973454`** nos 7 botões do site e no recurso de mensagem da
   PMax. **É o que falta para tudo acima sair do papel:** o número de hoje é o pessoal do
   Cláudio e não passa pelo bot, então nenhuma conversa é registrada e nenhuma conversão
   é medida.
2. **Vídeos quadrados (1:1)** — os 5 arquivos `*-quadrado.mp4` estão prontos em
   `Documents\pmax-google-ads\videos` e não foram enviados ao YouTube. Enquanto não forem,
   a qualidade do grupo de recursos não chega a "Excelente". Falta também excluir o
   rascunho interrompido "video3 horizontal" no YouTube Studio.
3. **Subir conversão offline** no Google Ads — CSV semanal a partir de
   `crm.conversoes_offline`, em Ferramentas → Uploads. Funciona hoje, sem token. Pedir o
   developer token da API em paralelo, para automatizar depois.
4. **Depois de 3–4 semanas de dado novo** — rebaixar "Contato no Whatsapp" para secundária
   e a conversão passa a ser "respondeu".
5. **Nova rodada de simulação do bot** — depende do `META_VERIFY_TOKEN`, que está com o
   Cláudio. Linha de base a bater: 30 conversas, 0 agendamentos.
6. **Duas avaliações abertas em `crm.avaliacoes`** — enviar a tabela de preços como arquivo
   (exige mudança no bot: o `enviarWhatsApp` atual só manda texto) e o texto de adaptação.

*Resolvido de outro jeito:* a alteração no `whatsapp-bot` para ler o protocolo virou o
trigger `mensagens_vincular_gclid` — não é mais necessária.
