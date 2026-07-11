import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { Main } from './components/Main';
import { Home } from './pages/Home';
import { Agendamento } from './pages/Agendamento';
import { RelogioPonto } from './pages/ponto/RelogioPonto';
import { AdminPonto } from './pages/ponto/AdminPonto';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="agendamento" element={<Agendamento />} />
        </Route>
        <Route path="/ponto" element={<RelogioPonto />} />
        <Route path="/ponto/admin" element={<AdminPonto />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
