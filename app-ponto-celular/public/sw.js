// Service worker do app do ponto.
//
// O aviso chega sem conteudo (push vazio) de proposito: o texto mora aqui, o
// servidor so precisa acordar o aparelho. Menos coisa para dar errado no envio
// e nada de dado pessoal trafegando no push.

const TEXTO = {
  title: 'Você ainda não bateu o ponto',
  body: 'Toque aqui para registrar sua entrada.',
};

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (evento) => {
  // Se algum dia vier payload, ele manda; senao vale o texto padrao.
  let dados = TEXTO;
  try {
    if (evento.data) dados = { ...TEXTO, ...evento.data.json() };
  } catch {
    /* payload nao-JSON: fica o texto padrao */
  }

  evento.waitUntil(
    self.registration.showNotification(dados.title, {
      body: dados.body,
      icon: '/icone-512.png',
      badge: '/icone-512.png',
      tag: 'ponto-entrada',        // um aviso so na bandeja, nao empilha
      renotify: false,
      requireInteraction: false,
      data: { url: '/' },
    })
  );
});

self.addEventListener('notificationclick', (evento) => {
  evento.notification.close();
  const destino = new URL((evento.notification.data && evento.notification.data.url) || '/', self.location.origin).href;

  evento.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((abas) => {
      for (const aba of abas) {
        if (aba.url.startsWith(self.location.origin) && 'focus' in aba) return aba.focus();
      }
      return self.clients.openWindow(destino);
    })
  );
});
