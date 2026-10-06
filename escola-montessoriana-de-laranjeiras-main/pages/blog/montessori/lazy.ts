// GERADO por gera.py (Documents/Montessori - Obras gratuitas/07 - Artigos comentados (blog)). Não editar à mão.
import { lazy } from 'react';
import type React from 'react';

/** slug -> artigo carregado sob demanda (um chunk por artigo). */
export const montessoriComponents: Record<string, React.ComponentType> = {
  'montessori-encontrei-ouro-em-vez-de-trigo': lazy(() => import('./artigos/montessori-encontrei-ouro-em-vez-de-trigo')),
};
