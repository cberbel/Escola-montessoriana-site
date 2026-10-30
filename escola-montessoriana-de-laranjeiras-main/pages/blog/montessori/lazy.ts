// GERADO por gera.py (Documents/Montessori - Obras gratuitas/07 - Artigos comentados (blog)). Não editar à mão.
import { lazy } from 'react';
import type React from 'react';

/** slug -> artigo carregado sob demanda (um chunk por artigo). */
export const montessoriComponents: Record<string, React.ComponentType> = {
  'montessori-os-desvios-da-crianca': lazy(() => import('./artigos/montessori-os-desvios-da-crianca')),
  'montessori-o-estudo-das-criancas-bem-pequenas': lazy(() => import('./artigos/montessori-o-estudo-das-criancas-bem-pequenas')),
  'montessori-o-chamado': lazy(() => import('./artigos/montessori-o-chamado')),
  'montessori-o-carater-da-crianca': lazy(() => import('./artigos/montessori-o-carater-da-crianca')),
  'montessori-a-crianca-pequena-construtora-da-independencia': lazy(() => import('./artigos/montessori-a-crianca-pequena-construtora-da-independencia')),
  'montessori-desvio-e-normalizacao': lazy(() => import('./artigos/montessori-desvio-e-normalizacao')),
  'montessori-como-recebemos-a-crianca-na-vida': lazy(() => import('./artigos/montessori-como-recebemos-a-crianca-na-vida')),
  'montessori-encontrei-ouro-em-vez-de-trigo': lazy(() => import('./artigos/montessori-encontrei-ouro-em-vez-de-trigo')),
};
