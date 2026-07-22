import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import { Main } from './components/Main';
import { Home } from './pages/Home';
import { Agendamento } from './pages/Agendamento';
import { Blog } from './pages/Blog';
import { MetodoMontessori } from './pages/landing/MetodoMontessori';
import { Acolhimento } from './pages/landing/Acolhimento';
import { InglesPrimeiraInfancia } from './pages/landing/InglesPrimeiraInfancia';
import { DesenvolvimentoCerebral } from './pages/landing/DesenvolvimentoCerebral';
import { NaturezaEducacaoCosmica } from './pages/landing/NaturezaEducacaoCosmica';
import { Turmas } from './pages/landing/Turmas';
import { Agrupada3 } from './pages/landing/Agrupada3';
import { MainEn } from './components/en/MainEn';
import { HomeEn } from './pages/en/HomeEn';
import { MontessoriMethodEn } from './pages/en/MontessoriMethodEn';
import { WelcomingEn } from './pages/en/WelcomingEn';
import { BrainEn } from './pages/en/BrainEn';
import { EnglishImmersionEn } from './pages/en/EnglishImmersionEn';
import { NatureEn } from './pages/en/NatureEn';
import { ClassesEn } from './pages/en/ClassesEn';
import { ScheduleVisitEn } from './pages/en/ScheduleVisitEn';

/**
 * A cada troca de rota: rola para o topo, ou — quando a URL tem uma âncora (#...) —
 * rola até a seção correspondente. Isso faz os links de âncora (Depoimentos, Contato)
 * funcionarem a partir de qualquer página, inclusive das landing pages.
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
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
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="blog" element={<Blog />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
