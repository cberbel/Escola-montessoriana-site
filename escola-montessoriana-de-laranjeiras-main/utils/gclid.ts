/**
 * Captura e guarda o GCLID (Google Click ID) — o identificador do clique no anúncio.
 *
 * Por que isso existe: o GCLID chega uma única vez, na URL de destino do anúncio
 * (`?gclid=...`). Se a pessoa navega pelo site, fecha e volta depois, o parâmetro
 * some. Guardando aqui, o identificador continua disponível no momento em que ela
 * clica no WhatsApp — que pode ser dias depois.
 *
 * Para que serve: permite subir "conversa respondida" como conversão offline no
 * Google Ads, amarrada ao clique que originou o contato. É o que faz o Google
 * otimizar para quem vira cliente, e não para quem clica no botão.
 *
 * A janela de 90 dias acompanha a janela de conversão de clique configurada na
 * ação "Contato no Whatsapp" do Google Ads.
 */

const CHAVE_GCLID = 'alm_gclid';
const CHAVE_REF = 'alm_ref';
const CHAVE_REGISTRADO = 'alm_ref_registrado';
const CHAVE_ORIGEM = 'alm_origem';
const CHAVE_CAMPANHA = 'alm_campanha';
const VALIDADE_MS = 90 * 24 * 60 * 60 * 1000; // 90 dias

/** Projeto Supabase ponto-escola-montessoriana. Chave publicável — feita para o navegador. */
const SUPABASE_URL = 'https://rmpnqrvsmxhnrwlgqmdp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_bg4n-MXnoYVWomRN90WTOg_HOdq3_9G';

type RegistroGclid = {
  gclid: string;
  /** epoch ms de quando o clique no anúncio aconteceu */
  ts: number;
  /** Palavra-chave que disparou o anúncio ({keyword} do modelo de acompanhamento). */
  kw?: string;
  /** Tipo de correspondência: e = exata, p = frase, b = ampla ({matchtype}). */
  mt?: string;
  /** Rede: g = pesquisa Google, s = parceiros, d = display ({network}). */
  net?: string;
  /** Id do grupo de anúncios ({adgroupid}). */
  agid?: string;
};

/**
 * Detalhe da peça que trouxe a visita, quando o referrer sozinho não basta.
 *
 * Por que isso existe: o referrer do Instagram é sempre `instagram.com`, e no
 * navegador interno do app costuma chegar VAZIO. Link da bio, story, reels e
 * anúncio pago são indistinguíveis por referrer — a única forma de separá-los é
 * marcar o link na origem (`utm_content=bio|story|reels|post`).
 *
 * O `fbclid` é a exceção: o Meta o acrescenta sozinho na URL de destino de todo
 * anúncio. A presença dele é prova de clique PAGO, mesmo sem nenhuma utm.
 */
type RegistroCampanha = {
  ts: number;
  /** Click ID do Meta. Presente = clique pago. */
  fbclid?: string;
  utm_source?: string;
  /** 'pago' | 'organico' */
  utm_medium?: string;
  utm_campaign?: string;
  /** 'bio' | 'story' | 'reels' | 'post' | nome do anúncio */
  utm_content?: string;
};

/**
 * De onde a visita veio. Vale para TODO visitante, não só para quem clicou em
 * anúncio — é o que permite ao atendimento saber, na hora de responder, se a
 * pessoa achou a escola na busca, no Instagram ou já conhecia.
 */
export type Origem =
  | 'google_ads'       // clique em anúncio (tem gclid)
  | 'google_organico'  // achou na busca do Google, sem anúncio
  | 'instagram'
  | 'facebook'
  | 'bing'
  | 'informativo'      // veio de uma das páginas informativo*.html
  | 'outro_site'       // referência de um site que não é nenhum dos acima
  | 'direto';          // digitou o endereço, salvou ou veio de app sem referrer

type RegistroOrigem = { origem: Origem; ts: number };

function lerJson<T>(chave: string): T | null {
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : null;
  } catch {
    // localStorage pode estar indisponível (modo privado, cookies bloqueados)
    return null;
  }
}

function gravarJson(chave: string, valor: unknown): void {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* silencioso: sem storage, o site segue funcionando normalmente */
  }
}

/**
 * Descobre de onde veio esta visita, olhando a URL e o `document.referrer`.
 *
 * Devolve `null` de propósito quando o referrer é do PRÓPRIO site e não é um
 * informativo: isso é navegação interna, e navegação interna não pode apagar a
 * origem real da sessão (quem chegou pela busca e clicou em 3 páginas continua
 * vindo da busca).
 */
function detectarOrigem(): Origem | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);

  // 1. Anúncio é o sinal mais forte e o único pago: vence tudo.
  if (params.get('gclid')) return 'google_ads';

  // 2. UTM explícita, quando existir, vale mais que o referrer.
  const utm = (params.get('utm_source') || '').toLowerCase();
  if (utm) {
    if (utm.includes('instagram') || utm === 'ig' || utm === 'meta') return 'instagram';
    if (utm.includes('facebook') || utm === 'fb') return 'facebook';
    if (utm.includes('bing')) return 'bing';
    if (utm.includes('google')) return 'google_organico';
  }

  const ref = document.referrer;
  if (!ref) return 'direto';

  try {
    const url = new URL(ref);

    // 3. Veio de dentro do próprio site.
    if (url.hostname === window.location.hostname) {
      return url.pathname.startsWith('/informativo') ? 'informativo' : null;
    }

    const h = url.hostname;
    if (/(^|\.)google\./.test(h)) return 'google_organico';
    if (/(^|\.)instagram\.com$/.test(h)) return 'instagram';
    if (/(^|\.)(facebook\.com|fb\.me)$/.test(h)) return 'facebook';
    if (/(^|\.)bing\.com$/.test(h)) return 'bing';
    return 'outro_site';
  } catch {
    return 'direto';
  }
}

/**
 * Lê `fbclid` e as `utm_*` da URL e guarda.
 *
 * Ao contrário da origem (primeiro toque vence), aqui vale o toque MAIS RECENTE:
 * estes campos identificam a peça que trouxe ESTA visita, e quem voltou por um
 * story depois de ter vindo pela bio veio, desta vez, pelo story.
 *
 * Sem nenhum destes parâmetros na URL a função não faz nada — não apaga o que já
 * estava guardado, senão qualquer navegação interna zeraria a marcação.
 *
 * Os cortes de tamanho espelham os limites da política de RLS da tabela: campo
 * grande demais faria o insert inteiro ser recusado, e a medição sumiria em
 * silêncio (foi assim que o gclid se perdeu até 18/08/2026).
 */
function capturarCampanha(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const reg: RegistroCampanha = { ts: Date.now() };

  const fbclid = (params.get('fbclid') ?? '').trim();
  // A política recusa fbclid com espaço em branco; um valor quebrado é melhor
  // descartado do que levar junto o resto do registro.
  if (fbclid && !/\s/.test(fbclid)) reg.fbclid = fbclid.slice(0, 255);

  const texto = (chave: string, max: number): string | undefined => {
    const v = (params.get(chave) ?? '').trim();
    return v ? v.slice(0, max).toLowerCase() : undefined;
  };
  const source = texto('utm_source', 60);
  const medium = texto('utm_medium', 60);
  const campaign = texto('utm_campaign', 120);
  const content = texto('utm_content', 120);
  // O link da bio do @escola_montessoriana está no ar desde antes desta medição e usa
  // `utm_source=ig`. Sem normalizar, o banco guardaria dois nomes para a mesma coisa e
  // qualquer contagem por 'instagram' perderia exatamente o tráfego da bio — que é o
  // maior. `detectarOrigem()` já trata `ig` e `instagram` como a mesma origem; aqui a
  // gravação passa a concordar com ela.
  const APELIDOS: Record<string, string> = { ig: 'instagram', fb: 'facebook' };
  if (source) reg.utm_source = APELIDOS[source] ?? source;
  if (medium) reg.utm_medium = medium;
  if (campaign) reg.utm_campaign = campaign;
  if (content) reg.utm_content = content;

  const temSinal = reg.fbclid || reg.utm_source || reg.utm_medium || reg.utm_campaign || reg.utm_content;
  if (!temSinal) return;
  gravarJson(CHAVE_CAMPANHA, reg);
}

/** Marcação de campanha guardada, ou null se não houver ou já tiver passado de 90 dias. */
function obterCampanha(): RegistroCampanha | null {
  if (typeof window === 'undefined') return null;
  const reg = lerJson<RegistroCampanha>(CHAVE_CAMPANHA);
  if (!reg) return null;
  if (Date.now() - reg.ts > VALIDADE_MS) return null;
  return reg;
}

/**
 * Guarda a origem da visita. Regra: **o primeiro toque vence** — quem chegou pela
 * busca e voltou depois direto continua creditado à busca. A exceção é o clique
 * PAGO, que sempre promove: é o caminho que custou dinheiro e o que identifica a
 * campanha.
 *
 * Até 25/08/2026 só o `gclid` promovia, porque o Google era o único anunciante.
 * Medido naquele dia: um navegador que tinha visitado o site em 23/08 e guardado
 * `direto` recebeu um clique com `utm_source=instagram` e continuou gravando
 * `origem = 'direto'`. Com o Meta de volta isso esconderia todo clique pago de
 * visitante que já conhecia o site.
 *
 * O `fbclid` só promove quando a peça se identifica como Meta (`instagram` ou
 * `facebook`). Sem essa guarda, um anúncio sem `utm_source` e sem referrer seria
 * detectado como `direto` e apagaria uma origem boa que já estava guardada.
 */
function definirOrigem(): void {
  const detectada = detectarOrigem();
  if (!detectada) return; // navegação interna: não decide nada

  const atual = lerJson<RegistroOrigem>(CHAVE_ORIGEM);
  const valida = atual && Date.now() - atual.ts <= VALIDADE_MS;

  // Lido da URL, e não do storage: o valor guardado sobrevive 90 dias, e usá-lo aqui
  // faria toda visita seguinte re-promover a origem como se fosse um clique novo.
  const params = new URLSearchParams(window.location.search);
  const pagoAgora =
    !!params.get('gclid') ||
    (!!params.get('fbclid') && (detectada === 'instagram' || detectada === 'facebook'));
  if (valida && !pagoAgora) return; // primeiro toque vence

  // Coorte anterior a 18/08/2026: tem gclid guardado (clicou em anúncio no fluxo
  // antigo) mas nenhuma origem. Sem esta linha, a visita de RETORNO dela ("direto",
  // busca) viraria o primeiro toque e o painel mostraria "Direto" para um lead pago.
  const efetiva: Origem = detectada !== 'google_ads' && obterGclid() ? 'google_ads' : detectada;

  gravarJson(CHAVE_ORIGEM, { origem: efetiva, ts: Date.now() } satisfies RegistroOrigem);
}

/** Origem guardada, ou null se não houver ou já tiver passado de 90 dias. */
export function obterOrigem(): Origem | null {
  if (typeof window === 'undefined') return null;
  const reg = lerJson<RegistroOrigem>(CHAVE_ORIGEM);
  if (!reg || !reg.origem) return null;
  if (Date.now() - reg.ts > VALIDADE_MS) return null;
  return reg.origem;
}

/**
 * Lê o `gclid` da URL atual e guarda. Chame uma vez no carregamento do site.
 * Um GCLID novo sempre sobrescreve o anterior: vale o clique mais recente.
 */
export function capturarGclid(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const daUrl = params.get('gclid');
  if (daUrl) {
    // kw/mt/net/agid vêm do modelo de acompanhamento da campanha
    // ({keyword}/{matchtype}/{network}/{adgroupid}) e chegam junto com o gclid.
    // Guardados no mesmo registro: pertencem ao mesmo clique.
    const reg: RegistroGclid = { gclid: daUrl, ts: Date.now() };
    const kw = params.get('kw');
    const mt = params.get('mt');
    const net = params.get('net');
    const agid = params.get('agid');
    if (kw) reg.kw = kw;
    if (mt) reg.mt = mt;
    if (net) reg.net = net;
    if (agid) reg.agid = agid;
    gravarJson(CHAVE_GCLID, reg);
    // NÃO apagar CHAVE_REGISTRADO aqui. Até 18/08/2026 esta linha existia e criava
    // um buraco no caminho mais valioso: quem já tinha sido registrado como orgânico
    // e depois clicava num anúncio perdia a marca de "já registrei", registrarClique()
    // reusava o ref antigo, o insert batia na chave primária (409, tratado como
    // sucesso) e o gclid do anúncio NUNCA chegava ao banco. A assinatura origem+gclid
    // já detecta sozinha que algo mudou e força um ref novo via renovarRef().
  }
  // A marcação de campanha entra antes da origem: `detectarOrigem()` lê
  // `utm_source` da URL, e é ela que decide se um clique do Instagram é
  // instagram ou cai em 'direto' por falta de referrer.
  capturarCampanha();
  // A origem tem que estar decidida antes do POST.
  definirOrigem();
  // Registra o par código → origem/GCLID no banco. Feito no carregamento, e não no
  // clique, porque um POST disparado durante a navegação para o WhatsApp seria cancelado.
  void registrarClique();
}

/**
 * Grava o par `ref → origem (+ gclid)` em public.cliques_anuncio. É o que permite
 * ao webhook do WhatsApp descobrir de onde veio a conversa: o código curto viaja na
 * mensagem e o resto fica guardado aqui.
 *
 * Até 18/08/2026 só gravava quem tinha gclid, e por isso todo contato que não fosse
 * de anúncio chegava ao atendimento como um `whatsapp` genérico — busca orgânica,
 * Instagram e indicação no mesmo balde. Agora grava toda visita.
 *
 * Roda uma vez por combinação origem+gclid. Falha em silêncio: medição nunca quebra
 * o site nem atrapalha o clique no WhatsApp.
 */
async function registrarClique(): Promise<void> {
  const gclid = obterGclid();
  const origem = obterOrigem();
  if (!gclid && !origem) return; // sem storage ou sem sinal nenhum

  // Campos do clique (palavra-chave etc.) — só existem quando o registro do gclid
  // ainda é válido; viajam no mesmo POST, para as colunas kw/mt/net/agid.
  const regClique = lerJson<RegistroGclid>(CHAVE_GCLID);
  const doClique =
    gclid && regClique && regClique.gclid === gclid
      ? {
          ...(regClique.kw ? { kw: regClique.kw } : {}),
          ...(regClique.mt ? { mt: regClique.mt } : {}),
          ...(regClique.net ? { net: regClique.net } : {}),
          ...(regClique.agid ? { agid: regClique.agid } : {})
        }
      : {};

  // Detalhe da peça (bio, story, anúncio…). Entra no POST e TAMBÉM na assinatura:
  // sem isso, quem já tinha visitado pela bio e volta por um story reusaria o
  // mesmo registro — origem e gclid não mudaram — e o story nunca apareceria.
  const campanha = obterCampanha();
  const daCampanha = campanha
    ? {
        ...(campanha.fbclid ? { fbclid: campanha.fbclid } : {}),
        ...(campanha.utm_source ? { utm_source: campanha.utm_source } : {}),
        ...(campanha.utm_medium ? { utm_medium: campanha.utm_medium } : {}),
        ...(campanha.utm_campaign ? { utm_campaign: campanha.utm_campaign } : {}),
        ...(campanha.utm_content ? { utm_content: campanha.utm_content } : {})
      }
    : {};

  const assinatura = `${origem ?? 'sem'}|${gclid ?? 'sem'}|${campanha?.fbclid ?? 'sem'}|${campanha?.utm_content ?? 'sem'}`;
  const jaRegistrado = lerJson<string>(CHAVE_REGISTRADO);
  if (jaRegistrado === assinatura) return;

  // O ref atual é mantido até o banco RECUSAR (409 = já existe linha com esse
  // código, de uma assinatura antiga ou de colisão com outro visitante). Só então
  // um código novo é gerado e o POST é refeito UMA vez. Renovar antes do POST — o
  // desenho anterior — abandonava um ref válido quando o fetch falhava offline.
  // E 409 deixou de contar como sucesso: era ele que engolia gclid em silêncio.
  let ref = obterOuCriarRef();
  if (!ref) return;

  try {
    const enviar = (codigo: string) =>
      fetch(`${SUPABASE_URL}/rest/v1/cliques_anuncio`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          // Insert puro, sem `resolution=ignore-duplicates`: aquele header transforma o
          // POST em upsert, e upsert exigiria também política de UPDATE no RLS.
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({ ref: codigo, ...(origem ? { origem } : {}), ...(gclid ? { gclid } : {}), ...doClique, ...daCampanha })
      });

    let r = await enviar(ref);
    if (r.status === 409) {
      ref = renovarRef();
      if (!ref) return;
      r = await enviar(ref);
    }
    if (r.ok) gravarJson(CHAVE_REGISTRADO, assinatura);
  } catch {
    /* offline ou bloqueado: tenta de novo no próximo carregamento */
  }
}

/**
 * Protocolo a carimbar na mensagem. Desde 18/08/2026 vale para TODO visitante, não
 * só para quem veio de anúncio — é ele que leva a origem até a conversa.
 */
export function protocoloAtual(): string | null {
  const ref = obterOuCriarRef();
  return ref ? `[#${ref}]` : null;
}

/**
 * Carimba o protocolo no texto pré-preenchido de qualquer link do WhatsApp da página.
 * Intercepta o clique na fase de captura e reescreve o href antes da navegação —
 * assim vale para todos os botões, inclusive os que forem criados depois.
 * Todo visitante recebe o carimbo: é ele que leva a origem da visita até a conversa.
 * Retorna a função de limpeza do listener.
 */
export function carimbarLinksWhatsApp(): () => void {
  if (typeof document === 'undefined') return () => {};
  const aoClicar = (e: MouseEvent) => {
    const alvo = e.target as HTMLElement | null;
    const link = alvo?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null;
    if (!link) return;
    const protocolo = protocoloAtual();
    if (!protocolo) return;
    try {
      const url = new URL(link.href);
      const texto = url.searchParams.get('text') ?? '';
      // A checagem procura o que o carimbo ESCREVE ("Protocolo: XXXXXX"), não o formato
      // interno "[#XXXXXX]". Até 15/08/2026 procurava o formato interno, que nunca está
      // no texto — cada toque a mais no botão acrescentava outro carimbo (um lead chegou
      // ao WhatsApp com o protocolo escrito 7 vezes).
      const codigo = protocolo.slice(2, -1);
      // Guarda genérica: se JÁ existe um "Protocolo:" no texto, não acrescenta outro.
      // Sem localStorage (Safari privado) cada toque gera código diferente — comparar
      // só o código atual deixava os carimbos acumularem de novo.
      if (/Protocolo:/i.test(texto)) return;
      if (texto.includes(codigo)) return; // já carimbado
      url.searchParams.set('text', `${texto}\n\nProtocolo: ${codigo}`);
      link.href = url.toString();
    } catch {
      /* href fora do padrão: segue sem carimbo */
    }
  };
  document.addEventListener('click', aoClicar, true);
  return () => document.removeEventListener('click', aoClicar, true);
}

/** Devolve o GCLID guardado, ou null se não houver ou já tiver passado de 90 dias. */
export function obterGclid(): string | null {
  if (typeof window === 'undefined') return null;
  const reg = lerJson<RegistroGclid>(CHAVE_GCLID);
  if (!reg || !reg.gclid) return null;
  if (Date.now() - reg.ts > VALIDADE_MS) return null;
  return reg.gclid;
}

/**
 * Código curto e estável por navegador, para viajar no texto da mensagem do
 * WhatsApp. É ele que o webhook usa para achar o GCLID correspondente —
 * o GCLID em si é longo demais para colocar na mensagem.
 */
export function obterOuCriarRef(): string {
  if (typeof window === 'undefined') return '';
  const existente = lerJson<string>(CHAVE_REF);
  if (existente) return existente;
  return renovarRef();
}

/**
 * Gera um código novo e passa a usá-lo. Chamado quando a origem da visita muda —
 * por exemplo, alguém que já tinha vindo pela busca clica agora num anúncio. Como
 * `ref` é a chave primária da tabela de cliques, reaproveitar o código antigo faria
 * o registro novo ser recusado e a campanha nunca seria identificada.
 */
function renovarRef(): string {
  if (typeof window === 'undefined') return '';
  const novo = Math.random().toString(36).slice(2, 8).toUpperCase();
  gravarJson(CHAVE_REF, novo);
  return novo;
}
