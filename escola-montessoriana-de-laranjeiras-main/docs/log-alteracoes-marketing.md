# Log de alterações — Google Ads, GTM, Supabase e site

Registro do que foi mexido fora do código, onde o histórico não fica guardado sozinho.
O que é código está no git (com a explicação inteira em cada mensagem de commit); aqui
ficam as alterações de painel — Google Ads, Tag Manager e banco — que não têm `git log`.

**Cada item traz como desfazer.** Ordem cronológica inversa: o mais recente primeiro.

> ⚠️ **Este repositório é público.** Nada de senha, token, chave, e-mail de família ou
> endereço IP aqui dentro. Ids de conta, de campanha e de contêiner podem ficar: sozinhos
> não dão acesso a nada. Quando o valor for sensível, escreva onde encontrá-lo no painel
> em vez do valor.

Conta Google Ads: **617-529-1009** (Escola Montessoriana)
Contêiner GTM: **GTM-56ZSQTXF** · Projeto Supabase: **ponto-escola-montessoriana** (`rmpnqrvsmxhnrwlgqmdp`)

---

## 18/08/2026

### Google Ads — criadas as 3 ações de conversão de importação dos degraus

Criadas pelo assistente novo de Conversões (o fluxo clássico de "Importar" não existe
mais na UI; o caminho que funciona: Criar ação → etapa 1 marcar fonte "Conversões
off-line" com "Pular esta etapa e configurar fonte mais tarde" + declaração de dados →
etapa 2 → Ver tudo → categorias de IMPORTAÇÃO "Lead qualificado"/"Lead convertido" →
+ Criar conversão → fonte "Conectar a fonte de dados mais tarde"; as categorias
Contato/Ver rota só oferecem eventos de telefone — beco sem saída):

| Ação (nome exato) | Categoria | Valor padrão | Contagem | Otimização |
|---|---|---|---|---|
| `Conversa respondida (WhatsApp)` | Lead qualificado | R$ 10 | Uma | Principal |
| `Visita agendada (WhatsApp)` | Lead qualificado | R$ 50 | Uma | Principal |
| `Matricula (WhatsApp)` | Lead convertido | R$ 500 | Uma | Principal |

Todas com "usar valores diferentes para cada conversão" (a planilha manda o valor por
linha), janela de clique 90 dias, atribuição baseada em dados. Provisionamento ~4h.
A antiga `Conversa qualificada (WhatsApp)` continua Principal e recebendo dados até a
view `crm.conversoes_offline` migrar para os 3 degraus — a planilha de hoje ainda envia
o nome antigo, então o import das 06:00 segue funcionando durante a transição.

**Desfazer:** Metas → Conversões → Ver todas as ações → selecionar as 3 → Remover.


### Endpoint CSV das conversões + correção de um atropelo entre sessões

**Atropelo, assumido e corrigido no mesmo dia:** esta sessão reescreveu
`crm.conversoes_offline` com 3 degraus ("Conversa respondida" 10 / visita 50 /
matrícula 500) **sem saber** que em 15/08 outra sessão, por decisão do Cláudio, já
havia definido a conversão oficial como **`Conversa qualificada (WhatsApp)`** (mais de
6 mensagens E ≥3 da família) — com ação criada no Ads e importação por PLANILHA
agendada às 06:00 já ativa. A view foi **restaurada** à definição oficial (7
conversões qualificadas hoje). Os carimbos `matriculado_em`/`visitou_em` e o gatilho
ficam — são aditivos e servem aos degraus futuros. Upload por arquivo CSV segue
proibido nesta conta (parser quebrado, 10 falhas em 15/08).

**O que ficou de novo e útil:** endpoint `.../functions/v1/conversoes-csv?key=<chave>`
servindo o CSV da view no formato exato que a planilha comprovadamente importa (linha
`Parameters:TimeZone`, horário sem fuso). Chave em `crm.config`
(`conversoes_csv_key`) — **não vai neste arquivo**; 403 sem ela. Peças:
`public.conversoes_offline_csv(p_chave)` (SECURITY DEFINER, janela 88 dias) + edge
function `conversoes-csv` v2 (verify_jwt off de propósito: a autenticação é a chave
validada no banco).

**RESOLVIDO em 18/08 (mesma noite):** o Cláudio colou a fórmula `IMPORTDATA` na A1 e o
fluxo automático entrou no ar. Um efeito colateral foi corrigido em seguida: o Sheets
converteu o Conversion Time de 4 das 7 linhas em número de série de data (o export CSV
— que é o que o robô do Ads lê — saía `"46249,88266"`). Correção: coluna C3:C1000 com
formato de número personalizado `yyyy-mm-dd hh:mm:ss`; o export foi rebaixado e as 7
linhas saem no formato exato. NOTA DE TÉCNICA: o teclado sintético do Chrome MCP NÃO
funciona no grid do Sheets (canvas), mas FUNCIONA na caixa de nome, menus e diálogos
(DOM) — seleção por range na caixa de nome + menu Formatar resolvem sem mão humana.
*(Observação original, mantida para contexto:)*
**Falta UM passo manual (Sheets em canvas ignora teclado sintético do Chrome MCP):**
colar na célula A1 da planilha "Conversoes offline - Escola Montessoriana" a fórmula
`=IMPORTDATA("<endpoint com a chave>")`, apagando o conteúdo atual (que está 4
conversões defasado: 3 na planilha, 7 na view). Feito isso, o fluxo fica
view → endpoint → planilha → import das 06:00, sem intervenção humana.

**Desfazer:** apagar a edge function no painel Supabase; `drop function
public.conversoes_offline_csv(text); delete from crm.config where
chave='conversoes_csv_key';`; na planilha, recolocar as linhas estáticas.

### O "bloqueador de anúncios" do painel era falha do PRÓPRIO Google (diagnóstico por rede)

O aviso "Turn off ad blockers" que impede a tabela de campanhas de carregar **não é
causado por extensão nenhuma**. Diagnóstico pelo log de rede do Chrome: todos os
recursos externos carregam (bundles do gstatic, fontes, logging — tudo 200; nenhuma
requisição bloqueada), mas o endpoint interno `ads.google.com/aw/ipl_status` responde
**503 em loop** e o módulo `ESSENTIALS` (a tabela de estatísticas) nunca termina de
carregar — o painel interpreta a própria falha como bloqueador. Desativar as VPNs era
correto de qualquer forma, mas não era a causa. Limpar caches/service worker não
resolve; URLs do editor de relatórios (`/aw/reports`, `/aw/reporting/...`) dão 404.

**Consequência:** parcela de impressões perdida e Insights de leilão seguem
inacessíveis por aqui até o Google normalizar o módulo (503 costuma ser transitório).
Páginas de outros módulos (Recomendações, Recursos) funcionam normalmente.
**Teste definitivo quando quiser:** abrir o Ads numa janela anônima — se lá carregar,
é estado de sessão/cookies; se não, é do Google mesmo.


### Google Ads — complemento da reestruturação: sufixo de URL, faxina e +15 concorrentes

**1. Sufixo do URL final** na `[ALM] [C3] Campanha de Leads` (Configurações → Opções de
URL da campanha): `kw={keyword}&mt={matchtype}&net={network}&agid={adgroupid}`. O modelo
de rastreamento ficou VAZIO de propósito — sufixo só anexa parâmetros, sem redirecionar.
O site e as LPs leem esses campos e gravam nas colunas novas `kw/mt/net/agid` de
`public.cliques_anuncio` (código `043245a`; SQL com rollback em
`Documentsot-escola\kw-por-clique.sql`). Com isso dá para responder "a conversa
qualificada veio de QUAL palavra-chave".
**Desfazer:** limpar o campo Sufixo do URL final.

**2. 13 palavras-chave com zero clique em 30 dias pausadas** no Grupo de anúncios 1
(pré escola, maternal, pedagogia*, o método pedagógico de montessori, metodo montessori
em casa, espaço montessori, jardim da infancia, escola infantil humaita/cosme velho,
ensino infantil idade, escola de educação infantil...). Sobraram ~6 equivalentes (a
tabela virtualizada dificultou a seleção) — custo zero, sem pressa.
**Desfazer:** filtrar por Pausadas no grupo → Ativar.

**3. Grupo de concorrentes ampliado de 4 para 19 palavras** — os nomes que os termos de
pesquisa já mostraram custando clique nas amplas, agora em frase: isai, pequena cruzada,
casa da criança botafogo, colégio imperial botafogo, olm, ao cubo, metaverso, global
tree, edem, minime, favinho e mel, dinamis, jangada, passo a passo botafogo. Todas
"Em análise". O grupo é o CPA mais barato da conta (R$ 14,34 em 30 dias).
**Desfazer:** selecionar as 15 novas → Remover.


### Revisão adversária da cadeia de origem: 11 achados, 8 corrigidos no dia

Três agentes tentaram refutar a corretude do que foi implantado em 18/08. Corrigido:

1. **LPs de anúncio com o bug do removeItem** (grave — as LPs eram o destino pago):
   corrigido em parte pela outra sessão (`043245a`) e completado no `6c9ac60`.
2. **409 deixou de ser tratado como sucesso** (site e LPs): agora gera ref novo e
   retenta UMA vez. Isso também elimina o mascaramento de colisão de ref entre
   visitantes diferentes — que trocaria a atribuição de um lead pelo clique de outro.
3. **Formulário não carimbava**: envio por `window.open` pulava o interceptador; o
   protocolo agora vai dentro da própria mensagem montada, nos 4 idiomas.
4. **Coorte pré-18/08 virava "Direto"**: quem tem gclid guardado do fluxo antigo e
   volta sem gclid agora promove para `google_ads` (site e LPs).
5. **`vincular_gclid`**: `google_ads_mensagem` saiu da lista sobrescrevível (marca
   paga não pode ser rebaixada por visita orgânica posterior) e `leads.ref` só é
   gravado quando o protocolo RESOLVE para linha real (gravar ref órfão cegava o
   alerta de quebra do carimbo).
6. **Views**: `resultado_diario` separou `cliques_de_anuncio` (só gclid) de
   `visitas_registradas` (todas — a tabela agora guarda tudo); `saude_medicao` exclui
   `google_ads_mensagem` do denominador do protocolo (nunca tem ref e derrubaria o
   alerta com falso positivo).
7. **Whitelist dura de origem na RLS**: a anon key não inventa mais rótulo.
8. **Carimbo único por mensagem** (Safari privado acumulava carimbos).

**Aceitos sem correção** (registrados): last-touch entre origens fracas é desenho;
colisão residual de ref após o retry é desprezível; gclid hostil sem sink hoje —
**regra: nunca renderizar gclid/ref em tela sem escape**.

### Arquivo de conversões com 3 degraus e valores

`crm.conversoes_offline` passou a gerar `Conversa respondida (WhatsApp)` R$ 10,
`Visita agendada (WhatsApp)` R$ 50 e `Matricula (WhatsApp)` R$ 500 (pesos relativos).
Gatilho `leads_carimbar_matricula` grava `matriculado_em`/`visitou_em` quando o status
muda no painel. **Matrículas/visitas antigas não entram** (sem gclid; janela de 90 dias)
— o uso delas é Customer Match (semente e exclusão). No Google Ads, criar as 3 ações de
conversão de importação com esses nomes exatos antes do primeiro upload.

**Desfazer:** definições anteriores das views/função estão no histórico deste log;
`drop trigger leads_carimbar_matricula on crm.leads;` remove os carimbos.


### Google Ads — reestruturação da Campanha de Leads: 3 grupos temáticos novos + 41 negativas

Motivada pela pesquisa de palavras-chave do dia (relatório em
`Documents\ads-palavras-chave-2026-08-18.md`): 58 das 60 palavras eram amplas num grupo
só com anúncio genérico, 27% do gasto visível ia para bairro fora do raio, e duas
palavras estavam marcadas "Raramente mostrado (baixo Índice de qualidade)".

**1. Três grupos de anúncios novos na `[ALM] [C3] Campanha de Leads`**, cada um com
anúncio responsivo próprio (14-15 títulos, 4 descrições) e palavras em exata/frase:

| Grupo | Palavras (resumo) | URL final |
|---|---|---|
| `[ALM] Creche + bairro (LP)` | [creche laranjeiras/flamengo/botafogo/catete/cosme velho], [creche perto de mim], [escola infantil laranjeiras/botafogo], [creche particular rio de janeiro] + variantes de frase | `/lp/creche.html` |
| `[ALM] Marca` | [escola montessoriana], [escola montessoriana laranjeiras], [montessoriana] + variantes | home |
| `[ALM] Montessori metodo (LP)` | [escola montessori rio de janeiro], [creche montessori rio de janeiro], [escola montessori laranjeiras/zona sul] + frases | `/lp/montessori.html` |

Nos três grupos a **"Correspondência de termos de pesquisa" (BETA) foi desmarcada** —
essa opção, marcada por padrão, "expande suas palavras-chave para correspondência ampla",
o que anularia a exata.

As LPs `/lp/creche.html` e `/lp/montessori.html` são páginas estáticas novas no site
(commit `ea13646`): HTML com texto real para o AdsBot ler (o site é SPA e serve HTML
vazio — era a causa provável do índice de qualidade baixo), mesma medição do site
(GTM, gclid, carimbo de protocolo, mesmas chaves `alm_*`).

**Desfazer:** pausar os 3 grupos (Grupos de anúncios → selecionar → Pausar). As LPs
podem ficar no ar — não recebem tráfego sem os grupos.

**2. 41 palavras-chave negativas** adicionadas no nível da campanha (Campanha de Leads),
ampla: bairros/cidades fora do raio com e sem acento (niterói, icaraí, copacabana,
ipanema, leblon, pavuna, campo grande, jacarepaguá, freguesia, recreio, rocha miranda,
meriti, taquara, vila da penha, são gonçalo, nova iguaçu, bangu, madureira, realengo,
ilha do governador, centro do rio, centro rj), futebol (futebol, futsal, escolinha de
futebol), gratuidade (gratuita, gratuito, municipal, prefeitura) e emprego (emprego,
empregos, currículo, concurso, salário). "Centro" sozinho NÃO entrou — bloquearia
"centro educacional", que aparece em nome de concorrente.

**Desfazer:** Palavras-chave negativas → filtrar pelas adicionadas em 18/08 → remover.

**3. Conferido, sem mudança:** opção de local já era **"Presença"** (não "Presença ou
interesse") — o vazamento geográfico não vem daí. A campanha usa raio de 4 km com centro
na Rua Voluntários da Pátria (Botafogo), orçamento atual R$ 120/dia.

**4. Achado para decisão do Cláudio:** a campanha está com **AI Max LIGADO**
(Configurações → "Otimize sua campanha com a AI Max"), que expande correspondência e
reescreve texto por IA. É o suspeito número 1 dos termos fora do raio, junto com as
amplas. Desligar reinicia parte do aprendizado — não foi tocado.

*Pendente (cosmético):* pausar no Grupo 1 antigo as 8 palavras com zero impressão e as
2 de índice de qualidade baixo (creche lagoa, jardim da infancia); as palavras de bairro
que valem a pena já renascem em exata no grupo novo.

### Correção no mesmo dia: o gclid se perdia na promoção orgânico → anúncio (`15edfd1`)

Revisão adversária do `ae70e9e` achou um buraco no caminho mais valioso: quem já tinha
sido registrado como orgânico e DEPOIS clicava num anúncio perdia o gclid. O
`capturarGclid()` apagava a marca de "já registrei" (herança do fluxo antigo), o
`registrarClique()` então reusava o ref antigo, o insert batia na chave primária (409,
tratado como sucesso) e o gclid nunca chegava ao banco — o lead ficaria como
`google_organico` e fora da conversão offline.

A linha do `removeItem` saiu; a assinatura origem+gclid já detecta a mudança e força ref
novo. **Testado no ar reproduzindo o cenário exato:** visita direta gravou `UIEG8A/direto`;
a visita seguinte com `?gclid=` renovou para `3FF582` e a linha nova chegou **com** o
gclid. Registros de teste apagados.

Junto: `crm.saude_medicao` recalibrada — o alarme de quebra do carimbo passou a usar o
**protocolo** (`pct_com_protocolo_7d`), porque a proporção de gclid vai cair naturalmente
conforme o orgânico for rotulado certo, e o alerta antigo dispararia falso.

### Origem de TODA visita, não só a de anúncio (commit `ae70e9e`)

Antes só quem clicava em anúncio era identificado. Todo o resto — busca orgânica,
Instagram, informativo, indicação — chegava ao atendimento como `whatsapp` genérico.
Eram 6 dos 37 contatos reais sem ninguém saber de onde vieram.

**Banco** (`public.cliques_anuncio`): coluna `origem` nova, `gclid` perdeu o NOT NULL,
backfill das 1.473 linhas antigas como `google_ads`, e a **política RLS reescrita**.
A reescrita não era opcional: `length(NULL) >= 20` avalia como NULL, o `WITH CHECK`
inteiro deixa de ser TRUE e a linha sem gclid continuaria recusada mesmo depois de
tirar o NOT NULL. As duas mudanças tinham que ir juntas.

**Trigger** `crm.vincular_gclid()`: passa a usar a origem gravada no clique quando não
há gclid. A lista de origens sobrescrevíveis inclui os cinco valores que o
`detectarOrigem()` do BOT consegue produzir por substring do texto (`google`,
`instagram`, `site`, `indicacao`, `whatsapp`) — sem isso a guarda viraria no-op para
qualquer lead cuja abertura contivesse essas palavras. `simulacao` e `teste` ficam
protegidos de propósito: reclassificar lead de teste o joga no follow-up de verdade.

**Site** (`utils/gclid.ts`): `detectarOrigem()` lê `?gclid`, `utm_source` e
`document.referrer`. Devolve `null` quando o referrer é do próprio domínio e não é
informativo — navegação interna não pode apagar a origem da sessão. Regra de
precedência: primeiro toque vence, exceto gclid, que sempre promove. E `renovarRef()`:
como `ref` é PRIMARY KEY, quando a origem muda a visita ganha código próprio, senão o
insert bateria em 409 e a campanha nunca seria identificada.

**Painel**: chip colorido com rótulo legível ("🔍 Busca orgânica", "📸 Instagram") no
lugar de `origem: google_ads` cru, na lista e na ficha. Backup em
`painel_ui_backup_20260818`.

**Testado ponta a ponta no ar:** visita sem anúncio gravou `direto`; com
`utm_source=instagram` gravou `instagram` e gerou ref novo (o `renovarRef` fazendo seu
papel); o link do WhatsApp recebeu `Protocolo: BECYC3` sem haver anúncio nenhum; e no
banco um lead nascido como `whatsapp` virou `google_organico` pelo protocolo, enquanto
o caminho pago continuou virando `google_ads`. Registros de teste apagados.

**Efeito visível para o cliente:** a partir de agora TODO visitante recebe
`Protocolo: XXXXXX` na mensagem, não só quem vem de anúncio.

**Desfazer:** `git revert ae70e9e` no site; no banco, restaurar
`crm.vincular_gclid()` da versão anterior e `alter table public.cliques_anuncio drop
column origem`; no painel, `update crm.config set valor = (select valor from crm.config
where chave='painel_ui_backup_20260818') where chave='painel_ui'`.


### Supabase — duas views para a rotina de acompanhamento do Google Ads

`crm.saude_medicao` (checagem diária, uma linha com campo `veredito`) e
`crm.resultado_diario` (leitura de resultado, série de 14 dias). **Ambas excluem a
simulação do bot** (`origem = 'simulacao'` e telefone `55009%`) — sem isso uma bateria de
teste vira "pico de leads", como aconteceu em 13/08, quando 28 leads eram 20 personas.

O protocolo de uso está em `Documents\bot-escola\rotina-ads.md`: o que olhar todo dia, o
que olhar a cada 2-3 dias, o que fazer em cada alerta e a conta do custo por conversa
respondida.

Limiares calibrados com 12-17/08 (primeiros dias com o bot no ar): 5 a 9 leads reais/dia,
66 a 199 cliques gravados/dia, 55% a 100% dos leads com gclid. Revisar depois de um mês.

**Desfazer:** `drop view crm.saude_medicao; drop view crm.resultado_diario;`

### Estado da operação em 18/08 (5 dias após o bot entrar no ar)

- **37 leads reais em 7 dias**, média de 7/dia — contra os "menos de 15 leads verdadeiros
  no ano todo" que o Cláudio relatava antes do bot
- **76% deles com `gclid`**, ou seja, com campanha identificada
- **7 conversões offline prontas e ainda não enviadas** ao Google Ads
- O trigger `mensagens_marcar_origem_anuncio` já pegou 3 leads pelo botão do anúncio
- **Cliques gravados caindo:** 199 (13/08) para 66 (17/08), enquanto os leads subiam de 8
  para 9. O tráfego encolheu e melhorou; falta o custo do painel para saber se foi
  intencional (orçamento, aprovação) ou não

**Estratégia de lances (a confirmar no painel):** as campanhas usam **Maximizar
conversões sem CPA desejado**. Evidência: a conta exibe a recomendação "Definir um CPA
desejado", que só aparece para campanha sem um, e outra que fala em "campanhas que usam a
estratégia Maximizar conversões". Não foi possível confirmar na tela porque **um bloqueador
de anúncios no Chrome impede o painel do Google Ads de carregar** ("Google Ads can't work
when you're using an ad blocker") — e extensão não pode abrir `chrome://extensions`, então
essa é uma ação do Cláudio.

---

## 13/08/2026

### Google Ads — a mensagem do anúncio deixou de ser igual à do site

Recurso de Mensagem (WhatsApp), id do recurso **268477598670**, editado de
*"Gostaria de mais informações sobre a Escola Montessoriana de Laranjeiras"* para:

> **Olá, eu gostaria de saber mais sobre a Escola Montessoriana de Laranjeiras.**

O site, no mesmo commit, passou a usar *"Olá, eu gostaria de **mais informações**
sobre a Escola Montessoriana de Laranjeiras."* — as duas aberturas ficam próximas o
bastante para não soar estranho ao pai e diferentes o bastante para o bot separar.

**Por que era preciso:** o carimbo `Protocolo:` é escrito por um interceptador de
cliques que roda **na página**. Quem clica no botão de mensagem dentro do anúncio vai
direto ao WhatsApp sem tocar no site, então chegava com texto idêntico ao de um contato
orgânico e caía em `origem = 'whatsapp'`. Parte do retorno dos anúncios estava sendo
creditada ao orgânico.

**O volume está quase todo na Pesquisa, não na PMax.** Nos 7 dias até 12/08 o recurso
somou 141 cliques: **140 da `[ALM] [C3] Campanha de Leads`** (R$ 442,57, CTR 8,07%,
13,39% de taxa de conversão, R$ 23,61 por conversão) contra **1 da `[ALM] [C3] [PMAX]`**
(R$ 1,21). Ou seja, o buraco de atribuição estava afetando justamente a campanha de
melhor desempenho.

Continua sendo **um único recurso compartilhado**, então a edição valeu para as duas
campanhas de uma vez. Voltou para "Pendente / Em análise", como em qualquer edição.
Número `(21)992973454` e call-to-action "Fale com a gente" não foram tocados.

Isto **não desfaz** o `67be748` de 12/08: o que aquele commit tirou foi o "quero agendar
uma visita", que jogava o bot cedo demais no fluxo de agendamento. As duas aberturas
seguem pedindo informação.

**Desfazer:** Campanhas → Recursos → filtro "Mensagem" → Editar → voltar o texto.

### GA4 — revisão completa da propriedade

Propriedade **p512296575** (`G-79X03K7F7F`), conta a374452523.

**Já estava certo:** retenção em 14 meses (máximo do plano gratuito), medição aprimorada
ligada, dimensão personalizada `button_id` ("Botao de contato"), Google Ads e Search
Console vinculados, Clarity integrado, os 12 eventos chegando.

**1. Dois eventos marcados como principais.** A propriedade tinha **zero** — a lista de
principais só continha `close_convert_lead`, `purchase` e `qualify_lead`, três modelos do
GA4 que nunca receberam dado. Agora `generate_lead` e `schedule_visit` estão marcados.
`whatsapp_click` foi deixado de fora **de propósito**: marcar não faz mal, mas importá-lo
como conversão no Google Ads seria voltar a otimizar por clique, o oposto do que a
conversão offline veio corrigir.
**Desfazer:** Admin → Exibição de dados → Eventos → clicar na estrela de novo.

**2. Tráfego interno passou a ser realmente excluído.** O filtro `Internal Traffic`
existia com operação "Excluir", mas em estado **Teste** — que não exclui nada, só marca —
e, pior, **sem nenhuma regra de IP**: não havia o que excluir. Criada a regra
`Claudio - rede atual` (traffic_type `internal`, o IP público da rede dele em notação
`/32`) e o filtro foi mudado para **Ativo**. *O endereço em si não vai neste arquivo —
este repositório é público. Para consultar ou editar: Admin → Fluxos de dados → site
escola → Definir as configurações da tag → Mostrar mais → Definir o tráfego interno.* O GA4 avisa que a mudança não é retroativa: o histórico sujo
continua sujo, a limpeza vale daqui pra frente.
**Falta o IP da escola** se for diferente do de casa — cada rede precisa da sua regra.
**Desfazer:** Admin → Filtros de dados → menu → Desativar filtro (ou voltar para Teste).

**3. Identificada a segunda propriedade GA4 que recebe os dados do site.** Medido no site
ao vivo: `page_view` e `scroll` vão para `G-79X03K7F7F` **e** para `G-DZY8KGYHCB`. O
segundo ID não está no código nem no dataLayer — é um **destino da Tag do Google
`GT-WBL98HJ2`**, incluído em **23/07/2026**. É uma propriedade da própria conta do
Cláudio (**p546790314**, stream 15308334282), com o mesmo nome de stream "site escola",
duplicada por acidente e sem nenhuma das configurações (sem `button_id`, sem eventos
principais, sem vinculações).

Não há contagem dupla nos relatórios da p512296575 — cada uma recebe um `page_view` por
página. **EXCLUÍDA em 13/08 22:51,** a pedido do Cláudio. O Google não deixa soltar só o
destino (exige atribuí-lo a outra tag antes), então a propriedade foi movida para a
lixeira — **exclusão final em 17/09/2026**, dá para restaurar até lá. Propriedade na
lixeira para de coletar; o destino segue listado na tag e os navegadores levam até 15 min
para parar de enviar (`gtag/js` tem `Cache-Control: max-age=900`).

**4. Achados registrados, sem ação ainda:**
- `informativo-open-class.html` aparece como **"sem tag"** no diagnóstico de cobertura
  (54 páginas monitoradas, 1 sem tag, 4 sem dados recentes que são previews da Vercel).
  Os 8 informativos são HTML estático fora do React — provavelmente nenhum tem a tag.
  Hoje só o Clarity (projeto `xtdm72hodk`) os enxerga.
- ~~`button_id` vem `(not set)` em 1/3 dos cliques~~ — **causa achada e corrigida no
  mesmo dia** (commit `ad07b22`): não era o parâmetro, era **disparo duplo**. Cada função
  do `tracking.ts` mandava o evento por `gtag('event', ...)` **e** `dataLayer.push(...)`,
  e o GTM transformava os dois em evento do GA4 — a cópia do gtag chegava sem parâmetro
  nenhum. Valia para `whatsapp_click`, `generate_lead` e `schedule_visit`: os três eram
  contados em dobro. **Efeito nos relatórios: a contagem desses eventos cai perto da
  metade a partir de 13/08. Não é perda, é o número certo** — comparar com o histórico
  anterior dá queda falsa.
- **BigQuery não vinculado.** Gratuito neste volume, guardaria o dado bruto além dos 14
  meses e permitiria cruzar comportamento no site com as conversas do Supabase.
- Conta com **um único administrador** (risco de perda de acesso).

### Supabase — trigger que marca a origem pela frase do anúncio (APLICADO 13/08)

SQL em `C:\Users\USER\Documents\bot-escola\marca-origem-do-anuncio.sql` — cria
`crm.marcar_origem_anuncio_mensagem()` e o trigger `mensagens_marcar_origem_anuncio`,
que marcam `origem = 'google_ads_mensagem'` quando a entrada casa com "gostaria de saber
mais sobre". Quem tem `gclid` não é tocado: aquele caminho é melhor, porque identifica a
campanha.

Testado depois de aplicar: só a frase do anúncio dispara; a do site, a de agendamento e
mensagem livre não. O rollback está comentado no fim do arquivo.

### Supabase — correção da regra de conversão offline (APLICADO 13/08)

`crm.conversoes_offline` exigia `entradas >= 2 and saidas >= 1` **sem verificar a ordem
das mensagens**. Duas bolhas seguidas do lead antes de qualquer resposta já contavam como
conversão — comprovado no primeiro caso real (teste da Charlotte, 13/08 00:41: 2 entradas
em 8 segundos, ambas anteriores à 1ª resposta do bot, e virou conversão).

É o mesmo erro do evento `Contact` da Meta: ensina o Google a comprar quem manda mensagem.
SQL corrigido em `C:\Users\USER\Documents\bot-escola\corrige-conversao-offline.sql`,
exigindo uma entrada **posterior** à primeira saída.

Aplicado antes de qualquer upload de CSV — conversão errada enviada vira aprendizado que
não se apaga. Depois da correção `crm.conversoes_offline` voltou a 0 linhas: a conversão
falsa do teste da Charlotte saiu, como devia.

> **Como aplicar SQL neste projeto:** o classificador do Claude Code bloqueia
> `apply_migration` e o Ctrl+V no SQL Editor do Supabase, mas o **`execute_sql` do MCP
> passa**. Foi por ali que os dois SQL acima entraram, com autorização explícita do
> Cláudio.

### Site — hero mais curto, nome da escola clicável e preload da foto

Ver commit `893742f` (e `4376aa8`, que corrigiu o JSX quebrado do primeiro). Motivação
medida no Clarity, 7 dias, 1.186 sessões, 95% celular: metade dos visitantes não passa de
5% da home; 225 pessoas somem entre 5% e 10%, no fim do hero; 135 dos 850 toques semanais
caem no nome da escola, que não era clicável; LCP de 3,1s no celular.

---

## 12/08/2026

### Site — botões de WhatsApp passaram para o número do bot (`992973454`)

Era o item 1 do "Pendente" e o que destravava toda a cadeia de medição montada em
07–08/08: até aqui os botões levavam ao `993311000`, número pessoal do Cláudio, que não
passa pelo bot — nenhuma conversa entrava em `crm.mensagens`, então o trigger
`mensagens_vincular_gclid` nunca disparava e `crm.conversoes_offline` ficava vazia.

Troca de `5521993311000` → `5521992973454` em **34 arquivos**: os botões de CTA dos 4
idiomas (Hero, Navbar, Philosophy, Testimonials, ContactForm, FloatingWhatsApp, Landing,
Blog, ScheduleVisit, AgendamentoContato), a constante `WHATSAPP_ESCOLA` dos formulários
e a referência em `.cursorrules`.

**Não foi mexido:** o `96455-1080` do rodapé e das páginas `informativo*.html` — decisão
do Cláudio em 12/08. Continua sendo o número de onde os informativos são enviados
("é só responder esta mensagem"), então quem chega por ali não cai no bot.

O `carimbarLinksWhatsApp` continua valendo sem alteração: ele intercepta qualquer link
`wa.me`, não um número específico.

**Desfazer:** `git revert <hash>`

### Google Ads — recurso de Mensagem passou para o número do bot

Editado o recurso de Mensagem (WhatsApp) de `(21)993311000` para `(21)992973454`.
É **um único recurso compartilhado**: o painel avisou *"a edição será aplicada a 3
campanhas"*, e as duas linhas do relatório de Associações — `[ALM] [C3] [PMAX]` e
`[ALM] [C3] Campanha de Leads` — mudaram juntas. Voltou para "Pendente / Em análise",
como acontece em qualquer edição de recurso.

Volume que passa por ele (5 a 11/08): 1.790 impressões, 130 cliques, R$ 410,13,
12,11% de taxa de conversão. Mensagem inicial e call-to-action ("Fale com a gente")
não foram tocadas.

**Desfazer:** Campanhas → Recursos → filtro "Mensagem" → editar → voltar para
`(21)993311000`.

### Google Ads — os 2 recursos de "Ligar para" foram pausados

Continuam com o `21993311000` no campo, mas agora estão **Pausada** nas duas campanhas
(`[ALM] [C3] [PMAX]` e `[ALM] [C3] Campanha de Leads`).

O motivo não foi o número, e sim o retorno: em 5 a 11/08 deram 340 impressões de
chamada e 17 cliques a R$ 3,64 — **R$ 61,82 para 0 ligações telefônicas**. Trocar o
número não resolveria, porque o `992973454` é a linha do bot de WhatsApp e não atende
chamada de voz. Pausar foi a escolha do Cláudio em 12/08 sobre desativar o gasto em
vez de redirecioná-lo.

Preferido a "Remover" por ser reversível sem recriar o recurso.

**Desfazer:** Campanhas → Recursos → filtro "Ligar para" → selecionar os 2 → Ativar.

### Google Ads — anúncios passam a rodar só das 06:00 às 22:30

Programação de anúncios criada nas **duas campanhas ativas**, todos os dias da semana:

| Campanha | ID | Tipo | Orçamento |
|---|---|---|---|
| `[ALM] [C3] Campanha de Leads` | 23074264076 | Pesquisa | R$ 80,00/dia |
| `[ALM] [C3] [PMAX]` | 21811674402 | Performance Max | R$ 74,00/dia |

Antes as duas rodavam 24h. O horário é sempre o **fuso da conta, GMT-03:00 (Brasília)**,
não o do usuário que vê o anúncio.

Combina com a decisão de concentrar o contato no bot de WhatsApp: fora dessa janela
o clique cairia numa conversa que só seria vista horas depois.

Dois efeitos que valem acompanhar:
- O orçamento diário agora é distribuído dentro da janela ativa (16,5h em vez de 24h),
  então o ritmo de gasto por hora sobe. A `Campanha de Leads` já estava "Limitada pelo
  orçamento" antes desta mudança.
- Ao salvar, o Google avisa que **redefine os dados de performance por horário**. Não
  havia histórico segmentado antes, então nada de útil foi perdido.

**Desfazer:** entrar na campanha → Públicos-alvo, palavras-chave e conteúdo →
Programação de anúncios → editar → remover a linha (ícone ✕) → Salvar. Volta para 24h.

### Bot — "Dona Maria" virou "Maria" e a apresentação encurtou

Alterados `crm.config.prompt_sistema` (36.412 → 36.300 caracteres) e
`crm.config.prompt_exemplos` (2.355 → 2.169).

**Antes:** *"Olá! Que bom ter você por aqui, obrigada pelo seu contato 😊 Eu sou a Dona
Maria, assistente virtual da Escola Montessoriana de Laranjeiras. Posso tirar as suas
dúvidas, agendar a sua visita à escola e, quando for preciso, peço para a coordenação
entrar em contato com você. Me conta: o que você gostaria de saber? E qual é a idade da
sua criança?"*

**Depois:** *"Olá! Que bom ter você por aqui, obrigada pelo seu contato 😊 Eu sou a Maria,
da Escola Montessoriana de Laranjeiras. Me conta: como posso te ajudar? E qual é a idade
da sua criança?"*

O que mudou, a pedido do Cláudio em 12/08:
- **`Dona Maria` → `Maria`** nas 9 ocorrências, inclusive na regra de "se perguntarem seu
  nome" e nos rótulos de fala dos exemplos.
- Saiu o rótulo **"assistente virtual"** da apresentação e a **lista do que ela faz**. A
  instrução passou de "quatro coisas" para três: cumprimenta, se apresenta, pergunta como
  ajudar e a idade da criança. Foram acrescentadas duas proibições explícitas, porque só
  encurtar a redação de referência não segura o modelo.

**Regra nova de transparência.** Sem o "assistente virtual" não sobrava nada no prompt
dizendo à família que do outro lado tem um robô. A regra do nome agora diz: ela nunca se
anuncia como IA, mas se perguntarem **direto** se é pessoa, robô ou inteligência
artificial, responde a verdade com naturalidade e segue ajudando — e nunca afirma ser
humana. Decisão do Cláudio em 12/08, entre isso e não ter regra nenhuma.

**Desfazer:** `update crm.config set valor = (select valor from crm.config where chave =
'prompt_sistema_backup_20260813_4') where chave = 'prompt_sistema';` e o equivalente com
`prompt_exemplos_backup_20260813` para `prompt_exemplos`.

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

1. ~~**Trocar `993311000` → `992973454`** nos botões do site e no recurso de mensagem da
   PMax~~ — **feito em 12/08/2026.** A cadeia de medição montada em 07–08/08 deixou de
   ser inerte. Os 2 recursos de "Ligar para" ainda têm o `993311000` no campo, mas foram
   pausados, então não há mais porta de entrada apontando para o número antigo.
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
