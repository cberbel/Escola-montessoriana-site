import { lazy } from 'react';
import type React from 'react';
import { montessoriComponents } from './montessori/lazy';

/** slug -> componente carregado sob demanda (um chunk por artigo). */
export const blogPostComponents: Record<string, React.ComponentType> = {
  'machado-de-assis-cosme-velho-capitu-cafe': lazy(() => import('./MachadoCosmeVelho').then((m) => ({ default: m.MachadoCosmeVelho }))),
  'passeios-com-criancas-cosme-velho': lazy(() => import('./PasseiosCosmeVelho').then((m) => ({ default: m.PasseiosCosmeVelho }))),
  'cosme-velho-historia-do-bairro': lazy(() => import('./HistoriaCosmeVelho').then((m) => ({ default: m.HistoriaCosmeVelho }))),
  'liberdade-de-escolha-montessori': lazy(() => import('./LiberdadeDeEscolha').then((m) => ({ default: m.LiberdadeDeEscolha }))),
  'escola-montessori-rio-de-janeiro-como-avaliar': lazy(() => import('./EscolaMontessoriRio').then((m) => ({ default: m.EscolaMontessoriRio }))),
  'erro-escolher-escola-perto-de-casa': lazy(() => import('./EscolaPertoDeCasa').then((m) => ({ default: m.EscolaPertoDeCasa }))),
  'zero-telas-primeira-infancia': lazy(() => import('./ZeroTelas').then((m) => ({ default: m.ZeroTelas }))),
  'bilinguismo-infantil-mitos-e-verdades': lazy(() => import('./BilinguismoMitos').then((m) => ({ default: m.BilinguismoMitos }))),
  'adaptacao-escolar-respeitosa': lazy(() => import('./AdaptacaoRespeitosa').then((m) => ({ default: m.AdaptacaoRespeitosa }))),
  'como-escolher-escola-infantil-laranjeiras': lazy(() => import('./ComoEscolherEscolaInfantil').then((m) => ({ default: m.ComoEscolherEscolaInfantil }))),
  'metodo-montessori-para-bebes': lazy(() => import('./MontessoriParaBebes').then((m) => ({ default: m.MontessoriParaBebes }))),
  'quando-matricular-bebe-na-escola': lazy(() => import('./QuandoMatricular').then((m) => ({ default: m.QuandoMatricular }))),
  ...montessoriComponents,
};
