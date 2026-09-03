/**
 * Registro LAZY das páginas (code-splitting). Cada import() vira um chunk
 * separado no build: a home em português baixa só o que usa; /en, /es, /fr,
 * o blog e as landings chegam sob demanda. Antes era um único bundle de
 * 774 KB com os quatro idiomas e todas as páginas (71% não usado na home).
 * A hidratação de página pré-renderizada funciona porque o <Suspense> do
 * App mantém o HTML do servidor na tela até o chunk chegar (React 18+).
 */
import { lazy } from 'react';
import type { Pages } from './routes.types';
import { blogPostComponents } from './pages/blog/posts.lazy';

export const pages: Pages = {
  Agendamento: lazy(() => import('./pages/Agendamento').then((m) => ({ default: m.Agendamento }))),
  Blog: lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog }))),
  MetodoMontessori: lazy(() => import('./pages/landing/MetodoMontessori').then((m) => ({ default: m.MetodoMontessori }))),
  Acolhimento: lazy(() => import('./pages/landing/Acolhimento').then((m) => ({ default: m.Acolhimento }))),
  InglesPrimeiraInfancia: lazy(() => import('./pages/landing/InglesPrimeiraInfancia').then((m) => ({ default: m.InglesPrimeiraInfancia }))),
  DesenvolvimentoCerebral: lazy(() => import('./pages/landing/DesenvolvimentoCerebral').then((m) => ({ default: m.DesenvolvimentoCerebral }))),
  NaturezaEducacaoCosmica: lazy(() => import('./pages/landing/NaturezaEducacaoCosmica').then((m) => ({ default: m.NaturezaEducacaoCosmica }))),
  Turmas: lazy(() => import('./pages/landing/Turmas').then((m) => ({ default: m.Turmas }))),
  Agrupada3: lazy(() => import('./pages/landing/Agrupada3').then((m) => ({ default: m.Agrupada3 }))),
  CrecheLaranjeiras: lazy(() => import('./pages/landing/CrecheLaranjeiras').then((m) => ({ default: m.CrecheLaranjeiras }))),
  CrecheFlamengo: lazy(() => import('./pages/landing/CrecheFlamengo').then((m) => ({ default: m.CrecheFlamengo }))),
  MainEn: lazy(() => import('./components/en/MainEn').then((m) => ({ default: m.MainEn }))),
  MainFr: lazy(() => import('./components/fr/MainFr').then((m) => ({ default: m.MainFr }))),
  HomeFr: lazy(() => import('./pages/fr/HomeFr').then((m) => ({ default: m.HomeFr }))),
  MontessoriMethodFr: lazy(() => import('./pages/fr/MontessoriMethodFr').then((m) => ({ default: m.MontessoriMethodFr }))),
  WelcomingFr: lazy(() => import('./pages/fr/WelcomingFr').then((m) => ({ default: m.WelcomingFr }))),
  BrainFr: lazy(() => import('./pages/fr/BrainFr').then((m) => ({ default: m.BrainFr }))),
  EnglishImmersionFr: lazy(() => import('./pages/fr/EnglishImmersionFr').then((m) => ({ default: m.EnglishImmersionFr }))),
  NatureFr: lazy(() => import('./pages/fr/NatureFr').then((m) => ({ default: m.NatureFr }))),
  ClassesFr: lazy(() => import('./pages/fr/ClassesFr').then((m) => ({ default: m.ClassesFr }))),
  ScheduleVisitFr: lazy(() => import('./pages/fr/ScheduleVisitFr').then((m) => ({ default: m.ScheduleVisitFr }))),
  HomeEn: lazy(() => import('./pages/en/HomeEn').then((m) => ({ default: m.HomeEn }))),
  MontessoriMethodEn: lazy(() => import('./pages/en/MontessoriMethodEn').then((m) => ({ default: m.MontessoriMethodEn }))),
  WelcomingEn: lazy(() => import('./pages/en/WelcomingEn').then((m) => ({ default: m.WelcomingEn }))),
  BrainEn: lazy(() => import('./pages/en/BrainEn').then((m) => ({ default: m.BrainEn }))),
  EnglishImmersionEn: lazy(() => import('./pages/en/EnglishImmersionEn').then((m) => ({ default: m.EnglishImmersionEn }))),
  NatureEn: lazy(() => import('./pages/en/NatureEn').then((m) => ({ default: m.NatureEn }))),
  ClassesEn: lazy(() => import('./pages/en/ClassesEn').then((m) => ({ default: m.ClassesEn }))),
  ScheduleVisitEn: lazy(() => import('./pages/en/ScheduleVisitEn').then((m) => ({ default: m.ScheduleVisitEn }))),
  MainEs: lazy(() => import('./components/es/MainEs').then((m) => ({ default: m.MainEs }))),
  HomeEs: lazy(() => import('./pages/es/HomeEs').then((m) => ({ default: m.HomeEs }))),
  MetodoMontessoriEs: lazy(() => import('./pages/es/MetodoMontessoriEs').then((m) => ({ default: m.MetodoMontessoriEs }))),
  AcogidaEs: lazy(() => import('./pages/es/AcogidaEs').then((m) => ({ default: m.AcogidaEs }))),
  CerebroEs: lazy(() => import('./pages/es/CerebroEs').then((m) => ({ default: m.CerebroEs }))),
  InmersionInglesEs: lazy(() => import('./pages/es/InmersionInglesEs').then((m) => ({ default: m.InmersionInglesEs }))),
  NaturalezaEs: lazy(() => import('./pages/es/NaturalezaEs').then((m) => ({ default: m.NaturalezaEs }))),
  GruposEs: lazy(() => import('./pages/es/GruposEs').then((m) => ({ default: m.GruposEs }))),
  AgendarVisitaEs: lazy(() => import('./pages/es/AgendarVisitaEs').then((m) => ({ default: m.AgendarVisitaEs }))),
  Sobre: lazy(() => import('./pages/Sobre').then((m) => ({ default: m.Sobre }))),
  NotFound: lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound }))),
  blogPosts: blogPostComponents,
};
