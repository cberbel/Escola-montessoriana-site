import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import { Main } from './components/Main';
import { Home } from './pages/Home';
import { Agendamento } from './pages/Agendamento';
import { MetodoMontessori } from './pages/landing/MetodoMontessori';
import { InglesPrimeiraInfancia } from './pages/landing/InglesPrimeiraInfancia';
import { DesenvolvimentoCerebral } from './pages/landing/DesenvolvimentoCerebral';
import { NaturezaEducacaoCosmica } from './pages/landing/NaturezaEducacaoCosmica';

/** Rola para o topo a cada troca de página (rotas com âncora #... continuam funcionando). */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
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
          <Route path="metodo-montessori" element={<MetodoMontessori />} />
          <Route path="ingles-primeira-infancia" element={<InglesPrimeiraInfancia />} />
          <Route path="desenvolvimento-cerebral" element={<DesenvolvimentoCerebral />} />
          <Route path="natureza-educacao-cosmica" element={<NaturezaEducacaoCosmica />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
