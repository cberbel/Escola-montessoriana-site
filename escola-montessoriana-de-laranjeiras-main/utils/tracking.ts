/**
 * Dispara conversão (Meta Pixel + Google) ao clicar em qualquer botão/link do WhatsApp.
 * Deve ser chamado em todo clique que leva ao WhatsApp.
 * @param source identifica QUAL botão foi clicado (ex.: 'hero', 'menu', 'rodape'),
 *               permitindo o ranking de botões no GA4/GTM pelo parâmetro button_id.
 */
export function trackWhatsAppClick(source?: string): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    trackWhatsAppConversion?: () => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  };
  const button = typeof source === 'string' && source ? source : 'nao-identificado';
  if (typeof w.trackWhatsAppConversion === 'function') w.trackWhatsAppConversion();
  // GA4: evento com o parâmetro button_id (crie a dimensão personalizada button_id para os relatórios)
  if (typeof w.gtag === 'function') w.gtag('event', 'whatsapp_click', { button_id: button });
  // Evento para o GTM: permite criar tags/conversões no painel, sem mexer no código
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'whatsapp_click', page_path: window.location.pathname, button_id: button });
}

/**
 * Dispara conversão ao ENVIAR o formulário de contato por e-mail.
 * - Meta Pixel: evento padrão 'Lead' (o Meta otimiza campanhas para ele)
 * - GTM: evento 'form_submit' no dataLayer (para tags/conversões no painel)
 * - Google Ads: mesma conversão do WhatsApp (ambos significam "novo contato")
 */
export function trackFormSubmit(): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
    trackWhatsAppConversion?: () => void;
  };
  if (typeof w.fbq === 'function') w.fbq('track', 'Lead');
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'generate_lead');
    // Conversão do Google Ads: um formulário enviado vale o mesmo que um contato no WhatsApp
    w.gtag('event', 'conversion', { send_to: 'AW-16743400376/psM9CKCH4PUbELiH8K8-' });
  }
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'form_submit', page_path: window.location.pathname });
}

/**
 * Dispara conversão quando a família AGENDA UMA VISITA pelo Calendly.
 * É a conversão mais valiosa do site: a pessoa marcou dia e hora para vir conhecer.
 * - GA4: evento 'schedule_visit' (marque como evento principal na propriedade)
 * - Meta Pixel: evento padrão 'Schedule'
 * - GTM: evento 'schedule_visit' no dataLayer
 */
export function trackVisitScheduled(): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  };
  if (typeof w.fbq === 'function') w.fbq('track', 'Schedule');
  if (typeof w.gtag === 'function') w.gtag('event', 'schedule_visit');
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'schedule_visit', page_path: window.location.pathname });
}

/**
 * Escuta o Calendly (widget incorporado) e dispara a conversão quando o
 * agendamento é concluído. O Calendly avisa a página hospedeira por postMessage;
 * o evento que interessa é 'calendly.event_scheduled'.
 * Retorna a função de limpeza do listener.
 */
export function listenCalendlyScheduled(): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: MessageEvent) => {
    if (typeof e.origin === 'string' && !e.origin.includes('calendly.com')) return;
    const data = e.data as { event?: string } | null;
    if (data && typeof data.event === 'string' && data.event === 'calendly.event_scheduled') {
      trackVisitScheduled();
    }
  };
  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
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
