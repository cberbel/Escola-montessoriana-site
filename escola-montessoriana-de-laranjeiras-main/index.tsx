import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Páginas pré-renderizadas (SEO) chegam com o HTML já dentro do #root: hidratar
// em vez de re-renderizar, senão a página pisca e o trabalho do prerender se perde.
// O caminho createRoot continua para o dev server (que não pré-renderiza).
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}