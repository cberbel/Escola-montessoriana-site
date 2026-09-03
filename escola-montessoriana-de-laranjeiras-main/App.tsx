import React, { Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { trackPageView, listenCalendlyScheduled } from './utils/tracking';
import { capturarGclid, carimbarLinksWhatsApp } from './utils/gclid';
import { Main } from './components/Main';
import { Home } from './pages/Home';
import { blogPosts } from './pages/blog/posts';
import type { Pages } from './routes.types';
import { pages as lazyPages } from './routes.lazy';

/**
 * A cada troca de rota: rola para o topo, ou — quando a URL tem uma âncora (#...) —
 * rola até a seção correspondente. Isso faz os links de âncora (Depoimentos, Contato)
 * funcionarem a partir de qualquer página, inclusive das landing pages.
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  // PageView a cada troca de página (SPA). Pula o 1º render, pois o carregamento
  // inicial já é contado pelo Pixel/GTM no index.html.
  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    trackPageView(pathname + hash);
  }, [pathname]);

  // Canonical por página: aponta sempre para o domínio oficial + rota atual (SEO).
  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute('href', `https://www.escolamontessoriana.com.br${pathname === '/' ? '/' : pathname}`);
  }, [pathname]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    // Tenta algumas vezes, pois a seção-alvo pode ainda estar montando após a navegação.
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tries++ < 10) {
        setTimeout(tryScroll, 80);
      }
    };
    tryScroll();
  }, [pathname, hash]);
  return null;
};

/**
 * Miolo do app SEM o Router. Existe separado por causa do PRERENDER (SEO):
 * no navegador ele roda dentro de <BrowserRouter> (App abaixo); no build da
 * Vercel, o entry-server.tsx o renderiza dentro de <StaticRouter> para gerar
 * um index.html com texto real para cada rota. Os useEffect não rodam no
 * servidor, então a medição (gclid/Calendly/carimbo) continua só no cliente.
 */
export const AppShell: React.FC<{ pages?: Pages }> = ({ pages: P = lazyPages }) => {
  // Conversão de agendamento: o Calendly (em qualquer idioma) avisa por postMessage
  // quando a visita é efetivamente marcada. Um listener só, para o site inteiro.
  useEffect(() => listenCalendlyScheduled(), []);

  // Guarda o GCLID que veio na URL do anúncio e registra o par código → GCLID.
  // Roda uma vez, antes de qualquer navegação interna apagar o parâmetro.
  useEffect(() => capturarGclid(), []);

  // Carimba o protocolo nas mensagens do WhatsApp de quem chegou por anúncio,
  // para o webhook conseguir ligar a conversa ao clique.
  useEffect(() => carimbarLinksWhatsApp(), []);

  return (
    <>
      <ScrollToTop />
      {/* fallback={null}: numa página pré-renderizada o React mantém o HTML do servidor
          visível enquanto o chunk da rota baixa; em navegação interna a tela anterior
          some e a nova entra assim que chega (chunks são pequenos, cacheados por 1 ano). */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<P.Sobre />} />
            <Route path="agendamento" element={<P.Agendamento />} />
            <Route path="blog" element={<P.Blog />} />
            {blogPosts.map((post) => {
              const Post = P.blogPosts[post.slug];
              return <Route key={post.slug} path={`blog/${post.slug}`} element={<Post />} />;
            })}
            <Route path="metodo-montessori" element={<P.MetodoMontessori />} />
            <Route path="acolhimento" element={<P.Acolhimento />} />
            <Route path="ingles-primeira-infancia" element={<P.InglesPrimeiraInfancia />} />
            <Route path="desenvolvimento-cerebral" element={<P.DesenvolvimentoCerebral />} />
            <Route path="natureza-educacao-cosmica" element={<P.NaturezaEducacaoCosmica />} />
            <Route path="turmas" element={<P.Turmas />} />
            <Route path="agrupada-3" element={<P.Agrupada3 />} />
            <Route path="creche-laranjeiras" element={<P.CrecheLaranjeiras />} />
            <Route path="creche-flamengo" element={<P.CrecheFlamengo />} />
            {/* 404 de verdade: o prerender grava esta tela em dist/404.html e a Vercel a
                serve com status 404 para qualquer caminho que não exista (antes, a home
                voltava com 200 — "soft 404" para o Google). */}
            <Route path="*" element={<P.NotFound />} />
          </Route>
          <Route path="/en" element={<P.MainEn />}>
            <Route index element={<P.HomeEn />} />
            <Route path="montessori-method" element={<P.MontessoriMethodEn />} />
            <Route path="welcoming" element={<P.WelcomingEn />} />
            <Route path="your-childs-brain" element={<P.BrainEn />} />
            <Route path="english-immersion" element={<P.EnglishImmersionEn />} />
            <Route path="nature-cosmic-education" element={<P.NatureEn />} />
            <Route path="classes" element={<P.ClassesEn />} />
            <Route path="schedule-visit" element={<P.ScheduleVisitEn />} />
          </Route>
          <Route path="/fr" element={<P.MainFr />}>
            <Route index element={<P.HomeFr />} />
            <Route path="methode-montessori" element={<P.MontessoriMethodFr />} />
            <Route path="bienveillance" element={<P.WelcomingFr />} />
            <Route path="cerveau-de-votre-enfant" element={<P.BrainFr />} />
            <Route path="immersion-anglais" element={<P.EnglishImmersionFr />} />
            <Route path="nature-education-cosmique" element={<P.NatureFr />} />
            <Route path="ambiances" element={<P.ClassesFr />} />
            <Route path="planifier-visite" element={<P.ScheduleVisitFr />} />
          </Route>
          <Route path="/es" element={<P.MainEs />}>
            <Route index element={<P.HomeEs />} />
            <Route path="metodo-montessori" element={<P.MetodoMontessoriEs />} />
            <Route path="acogida" element={<P.AcogidaEs />} />
            <Route path="el-cerebro-de-tu-hijo" element={<P.CerebroEs />} />
            <Route path="inmersion-en-ingles" element={<P.InmersionInglesEs />} />
            <Route path="naturaleza-educacion-cosmica" element={<P.NaturalezaEs />} />
            <Route path="grupos" element={<P.GruposEs />} />
            <Route path="agendar-visita" element={<P.AgendarVisitaEs />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
