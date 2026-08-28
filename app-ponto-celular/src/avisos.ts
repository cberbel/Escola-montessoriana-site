// Aviso no celular quando a pessoa entrou e esqueceu de bater o ponto.
// Web Push: nao custa por mensagem, ao contrario do WhatsApp.

import { rpc, config } from './api';

const CHAVE_ENDPOINT = 'ponto.pushEndpoint';

export type EstadoAviso =
  | 'ligado'
  | 'desligado'
  | 'bloqueado'      // a pessoa ja negou uma vez; o navegador nao pergunta de novo
  | 'precisa_instalar' // iPhone: so funciona com o app na tela de inicio
  | 'indisponivel';

/** iPhone/iPad so entrega notificacao se o app estiver instalado na tela de início. */
function ehIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function estaInstalado(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;
}

function paraBytes(base64url: string): Uint8Array {
  const preenchido = (base64url + '='.repeat((4 - (base64url.length % 4)) % 4))
    .replace(/-/g, '+').replace(/_/g, '/');
  const bruto = atob(preenchido);
  return Uint8Array.from(bruto, (c) => c.charCodeAt(0));
}

function suportado(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

export async function estadoDoAviso(): Promise<EstadoAviso> {
  if (!suportado()) {
    return ehIOS() && !estaInstalado() ? 'precisa_instalar' : 'indisponivel';
  }
  if (ehIOS() && !estaInstalado()) return 'precisa_instalar';
  if (Notification.permission === 'denied') return 'bloqueado';

  try {
    const registro = await navigator.serviceWorker.getRegistration();
    const inscricao = await registro?.pushManager.getSubscription();
    return inscricao ? 'ligado' : 'desligado';
  } catch {
    return 'desligado';
  }
}

/** Pede a permissao e guarda a inscricao deste aparelho para este PIN. */
export async function ligarAviso(pin: string): Promise<{ ok: boolean; estado: EstadoAviso; erro?: string }> {
  if (!suportado()) return { ok: false, estado: 'indisponivel', erro: 'Este navegador não faz notificação.' };
  if (ehIOS() && !estaInstalado()) return { ok: false, estado: 'precisa_instalar' };
  if (!config.vapidPublica) return { ok: false, estado: 'indisponivel', erro: 'Aviso ainda não configurado.' };

  const permissao = await Notification.requestPermission();
  if (permissao !== 'granted') {
    return { ok: false, estado: permissao === 'denied' ? 'bloqueado' : 'desligado' };
  }

  const registro = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  await navigator.serviceWorker.ready;

  const inscricao =
    (await registro.pushManager.getSubscription()) ??
    (await registro.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: paraBytes(config.vapidPublica),
    }));

  const bruto = inscricao.toJSON() as { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
  if (!bruto.endpoint || !bruto.keys?.p256dh || !bruto.keys?.auth) {
    return { ok: false, estado: 'desligado', erro: 'O navegador não devolveu a inscrição.' };
  }

  const r = await rpc<{ ok: boolean; erro?: string }>('push_inscrever', {
    p_pin: pin,
    p_endpoint: bruto.endpoint,
    p_p256dh: bruto.keys.p256dh,
    p_auth: bruto.keys.auth,
    p_aparelho: navigator.userAgent.slice(0, 120),
  });
  if (!r.ok) return { ok: false, estado: 'desligado', erro: r.erro };

  localStorage.setItem(CHAVE_ENDPOINT, bruto.endpoint);
  return { ok: true, estado: 'ligado' };
}

export async function desligarAviso(): Promise<void> {
  try {
    const registro = await navigator.serviceWorker.getRegistration();
    const inscricao = await registro?.pushManager.getSubscription();
    if (inscricao) {
      await rpc('push_remover', { p_endpoint: inscricao.endpoint });
      await inscricao.unsubscribe();
    }
  } catch {
    /* se o aparelho ja perdeu a inscricao, nao ha o que desfazer */
  }
  localStorage.removeItem(CHAVE_ENDPOINT);
}
