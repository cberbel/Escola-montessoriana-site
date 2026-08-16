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
const VALIDADE_MS = 90 * 24 * 60 * 60 * 1000; // 90 dias

/** Projeto Supabase ponto-escola-montessoriana. Chave publicável — feita para o navegador. */
const SUPABASE_URL = 'https://rmpnqrvsmxhnrwlgqmdp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_bg4n-MXnoYVWomRN90WTOg_HOdq3_9G';

type RegistroGclid = {
  gclid: string;
  /** epoch ms de quando o clique no anúncio aconteceu */
  ts: number;
};

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
 * Lê o `gclid` da URL atual e guarda. Chame uma vez no carregamento do site.
 * Um GCLID novo sempre sobrescreve o anterior: vale o clique mais recente.
 */
export function capturarGclid(): void {
  if (typeof window === 'undefined') return;
  const daUrl = new URLSearchParams(window.location.search).get('gclid');
  if (daUrl) {
    gravarJson(CHAVE_GCLID, { gclid: daUrl, ts: Date.now() } satisfies RegistroGclid);
    try { window.localStorage.removeItem(CHAVE_REGISTRADO); } catch { /* sem storage */ }
  }
  // Registra o par código → GCLID no banco. Feito no carregamento, e não no clique,
  // porque um POST disparado durante a navegação para o WhatsApp seria cancelado.
  void registrarClique();
}

/**
 * Grava o par `ref → gclid` em public.cliques_anuncio. É o que permite ao webhook
 * do WhatsApp descobrir qual clique originou a conversa: o código curto viaja na
 * mensagem, o GCLID (longo demais para isso) fica guardado aqui.
 * Roda uma única vez por GCLID. Falha em silêncio: medição nunca quebra o site.
 */
async function registrarClique(): Promise<void> {
  const gclid = obterGclid();
  if (!gclid) return;
  if (lerJson<string>(CHAVE_REGISTRADO) === gclid) return;

  const ref = obterOuCriarRef();
  if (!ref) return;

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/cliques_anuncio`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        // Insert puro, sem `resolution=ignore-duplicates`: aquele header transforma o
        // POST em upsert, e upsert exigiria também política de UPDATE no RLS.
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({ ref, gclid })
    });
    // 409 = o par já está gravado, que é exatamente o resultado desejado.
    if (r.ok || r.status === 409) gravarJson(CHAVE_REGISTRADO, gclid);
  } catch {
    /* offline ou bloqueado: tenta de novo no próximo carregamento */
  }
}

/** Protocolo a carimbar na mensagem — só existe se a visita veio de um anúncio. */
export function protocoloAtual(): string | null {
  if (!obterGclid()) return null;
  const ref = obterOuCriarRef();
  return ref ? `[#${ref}]` : null;
}

/**
 * Carimba o protocolo no texto pré-preenchido de qualquer link do WhatsApp da página.
 * Intercepta o clique na fase de captura e reescreve o href antes da navegação —
 * assim vale para todos os botões, inclusive os que forem criados depois.
 * Visitante que não veio de anúncio não recebe carimbo nenhum.
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
  const novo = Math.random().toString(36).slice(2, 8).toUpperCase();
  gravarJson(CHAVE_REF, novo);
  return novo;
}
