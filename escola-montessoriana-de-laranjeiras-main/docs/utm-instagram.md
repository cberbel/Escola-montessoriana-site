# Como saber de onde vem a visita do Instagram

Criado em 25/08/2026.

## O problema

`origem = 'instagram'` em `public.cliques_anuncio` é **referrer**, não peça. Link da
bio, story, reels, post e anúncio pago caem todos no mesmo balde. Pior: no navegador
interno do Instagram o referrer muitas vezes chega **vazio**, e aí a visita vira
`direto`.

Medição de 19–25/08/2026: **983 visitas de Instagram e 0 leads** — a segunda maior
fonte de tráfego do site, e não dá para dizer qual peça a produziu.

Nenhuma informação sobre a peça existe no clique. Ou **nós marcamos o link**, ou a
resposta não existe. Não há como recuperar isso depois.

## A convenção

Todo link do Instagram para o site leva estes parâmetros:

| Parâmetro | Valor | Para quê |
|---|---|---|
| `utm_source` | `ig` ou `instagram` | garante a origem mesmo sem referrer |
| `utm_medium` | `social` (orgânico) ou `paid_social` | intenção; para pago **confie no `fbclid`** |
| `utm_content` | `link_in_bio`, `story`, `reels` ou o nome do anúncio | **qual peça trouxe** |
| `utm_campaign` | nome da campanha (opcional) | agrupa peças de uma mesma ação |

**`ig` e `instagram` são a mesma coisa.** O link da bio já estava no ar com `ig` antes
desta medição existir; o site normaliza `ig` → `instagram` na gravação, para não ficarem
dois nomes da mesma coisa no banco. Sempre consulte por `instagram`.

### Links prontos

**Bio — já está no ar e já está marcada, não mexa.** Verificado em 25/08/2026 no perfil:
`utm_source=ig`, `utm_medium=social`, `utm_content=link_in_bio`. Além disso, **link de bio
só é editável pelo app do celular** ("Editing your links is only available on mobile").

Story (figurinha de link):
```
https://www.escolamontessoriana.com.br/?utm_source=ig&utm_medium=social&utm_content=story
```

Quando o story for divulgar um reel específico:
```
https://www.escolamontessoriana.com.br/?utm_source=ig&utm_medium=social&utm_content=reels
```

Anúncio do Meta — no campo **Parâmetros de URL** do anúncio:
```
utm_source=ig&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```

## O que o `fbclid` resolve sozinho

O Meta acrescenta `?fbclid=...` na URL de destino de **todo anúncio**, sem
configuração nenhuma. O site passou a guardar esse valor em 25/08/2026.

Consequência prática: **`fbclid` preenchido = clique pago**, mesmo que alguém
esqueça de configurar as utm no anúncio. É a rede de segurança do "pago vs orgânico".

O que ele **não** diz: em qual plataforma (Instagram ou Facebook) nem qual peça.
Isso continua dependendo das utm.

## Limites honestos

- **Reels não aceita link.** Não existe link clicável na legenda de um reel. Quem vê
  um reel e quer o site passa pela bio — e chega marcado como `bio`. `utm_content=reels`
  só funciona se você usar a figurinha de link num story que divulga aquele reel, ou
  trocar o link da bio enquanto o reel está no ar. Não dá para atribuir reels de outro
  jeito.
- **Post e carrossel também não aceitam link.** Mesma história da bio.
- **Anúncio sem utm e sem referrer vira `direto`.** O `fbclid` marca que foi pago, mas
  a `origem` só fica certa se `utm_source=instagram` estiver no anúncio. Por isso o
  campo de parâmetros de URL não é opcional.
- **Vale o toque mais recente.** Quem veio pela bio e voltou por um story é contado, na
  segunda visita, como story. A `origem` (instagram) continua sendo primeiro toque; só
  o detalhe da peça é do último.
- **`utm_medium` não é prova de pago.** A bio está no ar com `medium=social` desde antes
  disto, e um anúncio mal configurado pode vir com qualquer coisa. Para pago x orgânico,
  a prova é o `fbclid`.

## `origem` x `utm_source`: qual usar para contar

**Use `utm_source`/`fbclid`, não `origem`.**

`origem` guarda o **primeiro toque** e vale 90 dias: quem conheceu o site pela busca
em julho e clicou num anúncio do Instagram hoje continua com `origem = google_organico`.
Contar Instagram por `origem` subestima, e subestima justamente os visitantes que
voltam — que são os mais próximos de matricular.

Medido em 25/08/2026 durante o teste desta mudança: um navegador que tinha visitado o
site em 23/08 recebeu um clique com `utm_source=instagram` e gravou `origem = direto`.
As colunas `utm_*` e `fbclid` registraram tudo certo — elas descrevem ESTE clique, não
a história do visitante.

Desde 25/08/2026 o clique **pago** promove a origem (antes só o `gclid` fazia isso),
então anúncio do Meta com `utm_source` configurado passa a corrigir a origem sozinho.
O tráfego **orgânico** continua respeitando o primeiro toque, de propósito.

## Como ler o resultado

```sql
select coalesce(utm_content,'(sem marcação)') as peca,
       coalesce(utm_medium,'(sem medium)')    as tipo,
       count(*) filter (where fbclid is not null) as cliques_pagos,
       count(*) filter (where fbclid is null)     as cliques_organicos,
       count(*) as visitas,
       count(distinct l.id) as leads
from public.cliques_anuncio c
left join crm.leads l on l.ref = c.ref
where (c.utm_source = 'instagram' or c.origem = 'instagram')
  and c.criado_em >= now() - interval '30 days'
group by 1,2 order by visitas desc;
```

Enquanto os links não forem trocados, tudo cai em `(sem marcação)` — o que já é uma
informação: significa que ninguém chegou por um link marcado ainda.

## Onde isso mora no código

`utils/gclid.ts`: `capturarCampanha()` lê os parâmetros da URL e guarda por 90 dias;
`registrarClique()` os envia no POST e os inclui na assinatura (sem isso, quem já
visitou pela bio e volta por um story reusaria o registro antigo e o story sumiria).

Os cortes de tamanho no código espelham os limites da política de RLS da tabela. Campo
grande demais faz o insert inteiro ser recusado e a medição some em silêncio — foi o
que aconteceu com o gclid até 18/08/2026.
