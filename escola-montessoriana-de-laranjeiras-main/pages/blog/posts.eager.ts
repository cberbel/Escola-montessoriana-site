import type React from 'react';
import { EscolaMontessoriRio } from './EscolaMontessoriRio';
import { EscolaPertoDeCasa } from './EscolaPertoDeCasa';
import { ZeroTelas } from './ZeroTelas';
import { BilinguismoMitos } from './BilinguismoMitos';
import { AdaptacaoRespeitosa } from './AdaptacaoRespeitosa';
import { ComoEscolherEscolaInfantil } from './ComoEscolherEscolaInfantil';
import { MontessoriParaBebes } from './MontessoriParaBebes';
import { QuandoMatricular } from './QuandoMatricular';

/** slug -> componente (imports estáticos; só o prerender usa). */
export const blogPostComponents: Record<string, React.ComponentType> = {
  'escola-montessori-rio-de-janeiro-como-avaliar': EscolaMontessoriRio,
  'erro-escolher-escola-perto-de-casa': EscolaPertoDeCasa,
  'zero-telas-primeira-infancia': ZeroTelas,
  'bilinguismo-infantil-mitos-e-verdades': BilinguismoMitos,
  'adaptacao-escolar-respeitosa': AdaptacaoRespeitosa,
  'como-escolher-escola-infantil-laranjeiras': ComoEscolherEscolaInfantil,
  'metodo-montessori-para-bebes': MontessoriParaBebes,
  'quando-matricular-bebe-na-escola': QuandoMatricular,
};
