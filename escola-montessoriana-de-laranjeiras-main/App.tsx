import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import { trackPageView, listenCalendlyScheduled } from './utils/tracking';
import { capturarGclid, carimbarLinksWhatsApp } from './utils/gclid';
import { Main } from './components/Main';
import { Home } from './pages/Home';
import { Agendamento } from './pages/Agendamento';
import { Blog } from './pages/Blog';
import { blogPosts } from './pages/blog/posts';
import { MetodoMontessori } from './pages/landing/MetodoMontessori';
import { Acolhimento } from './pages/landing/Acolhimento';
import { InglesPrimeiraInfancia } from './pages/landing/InglesPrimeiraInfancia';
import { DesenvolvimentoCerebral } from './pages/landing/DesenvolvimentoCerebral';
import { NaturezaEducacaoCosmica } from './pages/landing/NaturezaEducacaoCosmica';
import { Turmas } from './pages/landing/Turmas';
import { Agrupada3 } from './pages/landing/Agrupada3';
import { MainEn } from './components/en/MainEn';
import { MainFr } from './components/fr/MainFr';
import { HomeFr } from './pages/fr/HomeFr';
import { MontessoriMethodFr } from './pages/fr/MontessoriMethodFr';
import { WelcomingFr } from './pages/fr/WelcomingFr';
import { BrainFr } from './pages/fr/BrainFr';
import { EnglishImmersionFr } from './pages/fr/EnglishImmersionFr';
import { NatureFr } from './pages/fr/NatureFr';
import { ClassesFr } from './pages/fr/ClassesFr';
import { ScheduleVisitFr } from './pages/fr/ScheduleVisitFr';
import { HomeEn } from './pages/en/HomeEn';
import { MontessoriMethodEn } from './pages/en/MontessoriMethodEn';
import { WelcomingEn } from './pages/en/WelcomingEn';
import { BrainEn } from './pages/en/BrainEn';
import { EnglishImmersionEn } from './pages/en/EnglishImmersionEn';
import { NatureEn } from './pages/en/NatureEn';
import { ClassesEn } from './pages/en/ClassesEn';
import { ScheduleVisitEn } from './pages/en/ScheduleVisitEn';
import { MainEs } from './components/es/MainEs';
import { HomeEs } from './pages/es/HomeEs';
import { MetodoMontessoriEs } from './pages/es/MetodoMontessoriEs';
import { AcogidaEs } from './pages/es/AcogidaEs';
import { CerebroEs } from './pages/es/CerebroEs';
import { InmersionInglesEs } from './pages/es/InmersionInglesEs';
import { NaturalezaEs } from './pages/es/NaturalezaEs';
import { GruposEs } from './pages/es/GruposEs';
import { AgendarVisitaEs } from './pages/es/AgendarVisitaEs';

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

const App: React.FC = () => {
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
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="blog" element={<Blog />} />
          {blogPosts.map((post) => (
            <Route key={post.slug} path={`blog/${post.slug}`} element={<post.Component />} />
          ))}
          <Route path="metodo-montessori" element={<MetodoMontessori />} />
          <Route path="acolhimento" element={<Acolhimento />} />
          <Route path="ingles-primeira-infancia" element={<InglesPrimeiraInfancia />} />
          <Route path="desenvolvimento-cerebral" element={<DesenvolvimentoCerebral />} />
          <Route path="natureza-educacao-cosmica" element={<NaturezaEducacaoCosmica />} />
          <Route path="turmas" element={<Turmas />} />
          <Route path="agrupada-3" element={<Agrupada3 />} />
        </Route>
        <Route path="/en" element={<MainEn />}>
          <Route index element={<HomeEn />} />
          <Route path="montessori-method" element={<MontessoriMethodEn />} />
          <Route path="welcoming" element={<WelcomingEn />} />
          <Route path="your-childs-brain" element={<BrainEn />} />
          <Route path="english-immersion" element={<EnglishImmersionEn />} />
          <Route path="nature-cosmic-education" element={<NatureEn />} />
          <Route path="classes" element={<ClassesEn />} />
          <Route path="schedule-visit" element={<ScheduleVisitEn />} />
        </Route>
        <Route path="/fr" element={<MainFr />}>
          <Route index element={<HomeFr />} />
          <Route path="methode-montessori" element={<MontessoriMethodFr />} />
          <Route path="bienveillance" element={<WelcomingFr />} />
          <Route path="cerveau-de-votre-enfant" element={<BrainFr />} />
          <Route path="immersion-anglais" element={<EnglishImmersionFr />} />
          <Route path="nature-education-cosmique" element={<NatureFr />} />
          <Route path="ambiances" element={<ClassesFr />} />
          <Route path="planifier-visite" element={<ScheduleVisitFr />} />
        </Route>
        <Route path="/es" element={<MainEs />}>
          <Route index element={<HomeEs />} />
          <Route path="metodo-montessori" element={<MetodoMontessoriEs />} />
          <Route path="acogida" element={<AcogidaEs />} />
          <Route path="el-cerebro-de-tu-hijo" element={<CerebroEs />} />
          <Route path="inmersion-en-ingles" element={<InmersionInglesEs />} />
          <Route path="naturaleza-educacion-cosmica" element={<NaturalezaEs />} />
          <Route path="grupos" element={<GruposEs />} />
          <Route path="agendar-visita" element={<AgendarVisitaEs />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
