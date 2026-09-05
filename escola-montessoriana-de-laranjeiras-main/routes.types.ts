import type React from 'react';

/** Mesmo formato para o registro eager (prerender) e o lazy (navegador). */
export interface Pages {
  Agendamento: React.ComponentType;
  Blog: React.ComponentType;
  MetodoMontessori: React.ComponentType;
  Acolhimento: React.ComponentType;
  InglesPrimeiraInfancia: React.ComponentType;
  DesenvolvimentoCerebral: React.ComponentType;
  NaturezaEducacaoCosmica: React.ComponentType;
  Turmas: React.ComponentType;
  Agrupada3: React.ComponentType;
  CrecheLaranjeiras: React.ComponentType;
  CrecheFlamengo: React.ComponentType;
  MainEn: React.ComponentType;
  MainFr: React.ComponentType;
  HomeFr: React.ComponentType;
  MontessoriMethodFr: React.ComponentType;
  WelcomingFr: React.ComponentType;
  BrainFr: React.ComponentType;
  EnglishImmersionFr: React.ComponentType;
  NatureFr: React.ComponentType;
  ClassesFr: React.ComponentType;
  ScheduleVisitFr: React.ComponentType;
  HomeEn: React.ComponentType;
  MontessoriMethodEn: React.ComponentType;
  WelcomingEn: React.ComponentType;
  BrainEn: React.ComponentType;
  EnglishImmersionEn: React.ComponentType;
  NatureEn: React.ComponentType;
  ClassesEn: React.ComponentType;
  ScheduleVisitEn: React.ComponentType;
  MainEs: React.ComponentType;
  HomeEs: React.ComponentType;
  MetodoMontessoriEs: React.ComponentType;
  AcogidaEs: React.ComponentType;
  CerebroEs: React.ComponentType;
  InmersionInglesEs: React.ComponentType;
  NaturalezaEs: React.ComponentType;
  GruposEs: React.ComponentType;
  AgendarVisitaEs: React.ComponentType;
  Sobre: React.ComponentType;
  Mensalidade: React.ComponentType;
  NotFound: React.ComponentType;
  /** slug -> componente do artigo */
  blogPosts: Record<string, React.ComponentType>;
}
