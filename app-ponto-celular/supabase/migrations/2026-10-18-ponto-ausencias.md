# Avisos de falta e atraso (18/10/2026)

Aplicado direto no Supabase (projeto ponto-escola-montessoriana) como migrations
`ponto_ausencias_avisos`, `ponto_ausencias_integracao` e `ponto_quadro_avisos`.

- Tabela `public.ponto_ausencias`: aviso dado pela própria pessoa no app —
  `falta` (dia..dia_ate) ou `atraso` (hora_prevista). `cancelado_em` quando a
  pessoa desiste; `notificado_em` quando o e-mail à direção saiu.
- RPCs: `ponto_avisar_ausencia`, `ponto_cancelar_aviso` (PIN da pessoa),
  `admin_ausencias_listar` (PIN admin). `entrar_funcionario` devolve `ausencias`.
- Integração: `_ponto_pendentes_agora` não cobra quem avisou (push de 1h e
  e-mail de 10 min); `_mei_calcular` marca `avisou`/`aviso` em cada dia e conta
  `faltas_avisadas`/`atrasos_avisados` — o desconto NÃO muda, abonar segue sendo
  decisão da direção; `ponto_quadro` leva `avisos` e `faltas_avisadas` por linha;
  `admin_resumo_funcionarios` leva `aviso_hoje`.
- Edge function `avisa-atraso` (cron a cada 10 min, agora todos os dias): manda
  à direção os avisos novos da equipe e, separado, quem atrasou sem avisar.
