import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { AppConfig, definirConfig } from './api';
import { PontoFuncionario } from './PontoFuncionario';
import { AdminNuvem } from './AdminNuvem';

async function iniciar() {
  let cfg: AppConfig = { supabaseUrl: '', supabaseAnonKey: '' };
  try {
    cfg = await (await fetch('/config.json', { cache: 'no-store' })).json();
  } catch {
    // sem config: o app mostra a tela de configuração pendente
  }
  definirConfig(cfg);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PontoFuncionario />} />
          <Route path="/estacao" element={<PontoFuncionario modoCompartilhado />} />
          <Route path="/admin" element={<AdminNuvem />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

iniciar();
