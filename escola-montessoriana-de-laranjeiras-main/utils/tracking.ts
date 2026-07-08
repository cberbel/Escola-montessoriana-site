/**
 * Dispara conversão (Meta Pixel + Google) ao clicar em qualquer botão/link do WhatsApp.
 * Deve ser chamado em todo clique que leva ao WhatsApp.
 */
export function trackWhatsAppClick(): void {
  if (typeof window === 'undefined') return;
  const fn = (window as unknown as { trackWhatsAppConversion?: () => void }).trackWhatsAppConversion;
  if (typeof fn === 'function') fn();
}
