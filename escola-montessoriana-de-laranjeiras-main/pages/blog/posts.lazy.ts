import { lazy } from 'react';
import type React from 'react';

/** slug -> componente carregado sob demanda (um chunk por artigo). */
export const blogPostComponents: Record<string, React.ComponentType> = {
  'escola-montessori-rio-de-janeiro-como-avaliar': lazy(() => import('./EscolaMontessoriRio').then((m) => ({ default: m.EscolaMontessoriRio }))),
  'erro-escolher-escola-perto-de-casa': lazy(() => import('./EscolaPertoDeCasa').then((m) => ({ default: m.EscolaPertoDeCasa }))),
  'zero-telas-primeira-infancia': lazy(() => import('./ZeroTelas').then((m) => ({ default: m.ZeroTelas }))),
  'bilinguismo-infantil-mitos-e-verdades': lazy(() => import('./BilinguismoMitos').then((m) => ({ default: m.BilinguismoMitos }))),
  'adaptacao-escolar-respeitosa': lazy(() => import('./AdaptacaoRespeitosa').then((m) => ({ default: m.AdaptacaoRespeitosa }))),
  'como-escolher-escola-infantil-laranjeiras': lazy(() => import('./ComoEscolherEscolaInfantil').then((m) => ({ default: m.ComoEscolherEscolaInfantil }))),
  'metodo-montessori-para-bebes': lazy(() => import('./MontessoriParaBebes').then((m) => ({ default: m.MontessoriParaBebes }))),
  'quando-matricular-bebe-na-escola': lazy(() => import('./QuandoMatricular').then((m) => ({ default: m.QuandoMatricular }))),
};
