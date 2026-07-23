/**
 * Dispara conversão (Meta Pixel + Google) ao clicar em qualquer botão/link do WhatsApp.
 * Deve ser chamado em todo clique que leva ao WhatsApp.
 */
export function trackWhatsAppClick(): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    trackWhatsAppConversion?: () => void;
    dataLayer?: Record<string, unknown>[];
  };
  if (typeof w.trackWhatsAppConversion === 'function') w.trackWhatsAppConversion();
  // Evento para o GTM: permite criar tags/conversões no painel, sem mexer no código
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'whatsapp_click', page_path: window.location.pathname });
}

/**
 * Dispara um PageView a cada troca de rota (SPA). O carregamento inicial já é
 * contado pelo código-base do Meta Pixel e do GTM no index.html, por isso este
 * disparo é usado apenas nas navegações seguintes (para não contar duas vezes).
 * - Meta Pixel: track('PageView')
 * - GTM/GA: push de um evento no dataLayer (page virtual), para acionar tags.
 */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  };
  if (typeof w.fbq === 'function') w.fbq('track', 'PageView');
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'spa_pageview', page_path: path });
}
