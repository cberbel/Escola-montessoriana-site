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
const VALIDADE_MS = 90 * 24 * 60 * 60 * 1000; // 90 dias

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
  if (!daUrl) return;
  gravarJson(CHAVE_GCLID, { gclid: daUrl, ts: Date.now() } satisfies RegistroGclid);
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
