/**
 * Registro EAGER das páginas (imports estáticos). Usado só pelo prerender
 * (entry-server.tsx): no servidor tudo já está carregado, então nada suspende
 * e o HTML sai completo. No navegador vale o routes.lazy.tsx.
 */
import type { Pages } from './routes.types';
import { blogPostComponents } from './pages/blog/posts.eager';
import { Sobre } from './pages/Sobre';
import { Mensalidade } from './pages/Mensalidade';
import { NotFound } from './pages/NotFound';
import { Agendamento } from './pages/Agendamento';
import { Blog } from './pages/Blog';
import { MetodoMontessori } from './pages/landing/MetodoMontessori';
import { Acolhimento } from './pages/landing/Acolhimento';
import { InglesPrimeiraInfancia } from './pages/landing/InglesPrimeiraInfancia';
import { DesenvolvimentoCerebral } from './pages/landing/DesenvolvimentoCerebral';
import { NaturezaEducacaoCosmica } from './pages/landing/NaturezaEducacaoCosmica';
import { Turmas } from './pages/landing/Turmas';
import { Agrupada3 } from './pages/landing/Agrupada3';
import { CrecheLaranjeiras } from './pages/landing/CrecheLaranjeiras';
import { CrecheFlamengo } from './pages/landing/CrecheFlamengo';
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

export const pages: Pages = {
  Agendamento,
  Blog,
  MetodoMontessori,
  Acolhimento,
  InglesPrimeiraInfancia,
  DesenvolvimentoCerebral,
  NaturezaEducacaoCosmica,
  Turmas,
  Agrupada3,
  CrecheLaranjeiras,
  CrecheFlamengo,
  MainEn,
  MainFr,
  HomeFr,
  MontessoriMethodFr,
  WelcomingFr,
  BrainFr,
  EnglishImmersionFr,
  NatureFr,
  ClassesFr,
  ScheduleVisitFr,
  HomeEn,
  MontessoriMethodEn,
  WelcomingEn,
  BrainEn,
  EnglishImmersionEn,
  NatureEn,
  ClassesEn,
  ScheduleVisitEn,
  MainEs,
  HomeEs,
  MetodoMontessoriEs,
  AcogidaEs,
  CerebroEs,
  InmersionInglesEs,
  NaturalezaEs,
  GruposEs,
  AgendarVisitaEs,
  Sobre,
  Mensalidade,
  NotFound,
  blogPosts: blogPostComponents,
};
