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
  // Um único caminho para o GA4: este push. O GTM é o dono do dataLayer nesta página e
  // tem a tag "GA4 - Evento whatsapp_click e schedule_visit" lendo daqui, com
  // button_id = {{DLV - button_id}}.
  //
  // NÃO acrescentar `gtag('event', ...)` aqui. Até 13/08/2026 existia essa segunda
  // chamada e cada clique virava DOIS eventos no GA4: o do gtag chegava sem button_id
  // (os parâmetros ficam aninhados e a variável do GTM não os enxerga) e o deste push
  // chegava certo. Resultado medido: contagem de cliques inflada ~2x e 243 de 708
  // eventos em 28 dias com button_id "(not set)".
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
  // O `generate_lead` do GA4 sai pela tag "GA4 - Evento generate_lead (formulario)" do
  // GTM, que lê o push abaixo. Não chamar `gtag('event','generate_lead')` aqui: até
  // 13/08/2026 essa chamada existia e cada envio de formulário virava dois eventos.
  //
  // A conversão do Google Ads é disparada pelo GTM (tag "tag formulario", acionador
  // "Evento - form_submit"), que lê o push abaixo. Não dispare aqui também: até jul/2026
  // este ponto enviava a conversão de "Contato no Whatsapp" — herança de quando o
  // formulário era enviado pelo WhatsApp — o que contava envios de formulário na ação errada.
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
  // Idem: o `schedule_visit` do GA4 sai pela tag do GTM que lê este push (o acionador
  // é o regex ^(whatsapp_click|schedule_visit)$). Sem `gtag('event', ...)` aqui, senão
  // a conversão mais valiosa do site seria contada duas vezes.
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
