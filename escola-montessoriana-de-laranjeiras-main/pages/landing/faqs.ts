/**
 * Perguntas e respostas das páginas de creche, em texto puro.
 *
 * Fonte única de propósito: o MESMO array alimenta (1) a seção visível de FAQ
 * na página, via <FAQ itens={...} />, e (2) o JSON-LD FAQPage que o
 * prerender.mjs injeta no <head> daquela rota (schema.org/FAQPage) — o que o
 * Google e os buscadores de IA leem para responder direto. Se a pergunta
 * aparecer no schema mas não na página, é violação da diretriz do Google; por
 * isso as duas coisas nascem daqui.
 *
 * As perguntas vêm do que as famílias mais perguntam de verdade no WhatsApp
 * (base limpa, sem as simulações do bot): idade, onde fica, visita, método,
 * horários, vaga e alimentação. Preço tem página própria (/mensalidade) e o
 * FAQ dela vive aqui também, pelo mesmo motivo.
 * Respostas curtas e auto-suficientes — cada uma precisa fazer sentido lida
 * sozinha, fora da página.
 */
export interface ItemFAQ {
  /** Pergunta, do jeito que a família pergunta. */
  p: string;
  /** Resposta completa em uma frase ou duas, sem depender do resto da página. */
  r: string;
}

export const faqCrecheLaranjeiras: ItemFAQ[] = [
  {
    p: 'A partir de que idade a escola recebe bebês?',
    r: 'A Escola Montessoriana de Laranjeiras recebe bebês a partir de 9 meses, na turma Agrupada 1. Depois a criança segue na mesma casa pela pré-escola e pelo Ensino Fundamental.',
  },
  {
    p: 'Onde fica a creche e o que tem por perto?',
    r: 'Na Rua das Laranjeiras, 540, fundos, segundo andar, em Laranjeiras, Rio de Janeiro. Fica a poucos minutos do Cosme Velho, do Catete, do Flamengo e de Botafogo.',
  },
  {
    p: 'Quantos bebês há para cada professora?',
    r: 'Até os 18 meses, a proporção é de 1 professora para cada 3 bebês. É o que permite vínculo estável e atenção de verdade nessa fase.',
  },
  {
    p: 'Quais são os horários e os períodos?',
    r: 'A escola funciona das 7h30 às 19h. Há meio período (8h às 12h ou 13h às 17h), integral (8h às 17h) e estendido (7h30 às 19h). Também existe frequência reduzida, em dias alternados.',
  },
  {
    p: 'Como funciona a adaptação do bebê?',
    r: 'A adaptação é gradual e sem imposições: os primeiros dias são curtos e acompanhados pela família, o bebê forma vínculo com uma professora de referência e o choro é sempre acolhido no colo, nunca ignorado.',
  },
  {
    p: 'O que é uma creche Montessori na prática?',
    r: 'É uma sala preparada para o bebê agir sozinho: materiais ao alcance das mãos, chão livre para engatinhar e andar, estruturas de movimento e mobiliário na altura dele. A professora observa e apresenta, em vez de entreter.',
  },
  {
    p: 'A escola serve as refeições?',
    r: 'Sim. As refeições são preparadas na própria escola com alimentos frescos, sem óleo vegetal, sem sal refinado e sem açúcar. As crianças comem juntas, à mesa, e aprendem desde cedo a comer sozinhas.',
  },
  {
    p: 'Tem vaga e como agendar uma visita?',
    r: 'A disponibilidade varia por turma ao longo do ano. A visita pode ser agendada pelo WhatsApp da escola ou pela página de agendamento do site, e é feita com a escola em funcionamento, para a família ver as salas em atividade.',
  },
];

export const faqCrecheFlamengo: ItemFAQ[] = [
  {
    p: 'A Escola Montessoriana fica no Flamengo?',
    r: 'Não. A escola fica em Laranjeiras, na Rua das Laranjeiras, 540 — cerca de 5 minutos de carro da Rua Conde de Baependi e do Largo do Machado.',
  },
  {
    p: 'Quanto tempo leva do Flamengo até a escola?',
    r: 'Da Conde de Baependi ou da Praça São Salvador, cerca de 5 minutos de carro. Do Largo do Machado e do Catete o trajeto é igualmente curto: é subir a Rua das Laranjeiras.',
  },
  {
    p: 'Vale a pena sair do bairro por causa de uma escola?',
    r: 'A conta ajuda a decidir: uma criança em período integral passa cerca de 1.800 horas por ano na escola, enquanto 5 a 10 minutos a mais de trajeto somam de 30 a 60 horas no ano. São cerca de 3% de tempo a mais em troca da qualidade de 100% das horas do dia da criança.',
  },
  {
    p: 'A partir de que idade a escola recebe bebês?',
    r: 'A partir de 9 meses, com 1 professora para cada 3 bebês até os 18 meses. A escola vai da creche ao Ensino Fundamental, na mesma casa.',
  },
  {
    p: 'Quais são os horários?',
    r: 'Das 7h30 às 19h, com meio período (8h às 12h ou 13h às 17h), integral (8h às 17h), estendido (7h30 às 19h) e frequência reduzida em dias alternados.',
  },
  {
    p: 'Como agendar uma visita vindo do Flamengo?',
    r: 'Pelo WhatsApp da escola ou pela página de agendamento do site. Vale marcar no mesmo horário em que você faria o trajeto no dia a dia, para medir o tempo real de casa até a porta.',
  },
];

export const faqCrecheBotafogo: ItemFAQ[] = [
  {
    p: 'A Escola Montessoriana fica em Botafogo?',
    r: 'Não. A escola fica no final da Rua das Laranjeiras, no número 540, entre Laranjeiras e o Cosme Velho — cerca de 10 minutos de carro da Praia de Botafogo, fora do horário de pico.',
  },
  {
    p: 'Qual o melhor caminho de Botafogo até a escola?',
    r: 'Perto da praia ou da Farani, subir a Rua Pinheiro Machado e seguir a Rua das Laranjeiras até o fim (cerca de 3 km). Da São Clemente, da Voluntários da Pátria ou do Humaitá, o Túnel Rebouças com saída no Cosme Velho costuma ser tão rápido quanto.',
  },
  {
    p: 'Dá para chegar de transporte público?',
    r: 'Sim: metrô até o Largo do Machado e ônibus pela Rua das Laranjeiras acima. Saindo da estação Botafogo, o trajeto leva de 30 a 40 minutos, conforme a espera do ônibus.',
  },
  {
    p: 'A partir de que idade a escola recebe bebês?',
    r: 'A partir de 9 meses, com 1 professora para cada 3 bebês até os 18 meses. A escola vai da creche ao Ensino Fundamental, na mesma casa.',
  },
  {
    p: 'Quais são os horários?',
    r: 'Das 7h30 às 19h, com meio período (8h às 12h ou 13h às 17h), integral (8h às 17h), estendido (7h30 às 19h) e frequência reduzida em dias alternados.',
  },
];

/** Página /creche-catete. Tempos do Google Maps (21/11/2026); manter iguais aos de CrecheCatete.tsx. */
export const faqCrecheCatete: ItemFAQ[] = [
  {
    p: 'A Escola Montessoriana fica no Catete?',
    r: 'Não. A escola fica em Laranjeiras, na Rua das Laranjeiras, 540, no trecho final da rua, perto do Cosme Velho. Do Largo do Machado são 2 km pela própria Rua das Laranjeiras.',
  },
  {
    p: 'Quanto tempo leva de carro do Catete até a escola?',
    r: 'Num dia útil às 7h45, o Google Maps estima de 6 a 16 minutos saindo do Largo do Machado (2 km) e de 9 a 22 minutos saindo do Palácio do Catete (3,2 km). A distância é curta; o que varia é o trânsito.',
  },
  {
    p: 'Qual ônibus vai do Catete até a escola?',
    r: 'A linha 422, no sentido Cosme Velho, vai direto, sem baldeação. Do ponto ao lado do Largo do Machado são 6 paradas e cerca de 6 minutos de viagem, e a descida é no ponto Pires de Almeida, a menos de um minuto a pé da escola.',
  },
  {
    p: 'Dá para ir a pé do Catete até a escola?',
    r: 'Dá, mas é uma caminhada longa para o dia a dia: cerca de 29 minutos do Largo do Machado (2 km) e 38 minutos do Palácio do Catete (2,7 km), em trajeto quase todo plano.',
  },
  {
    p: 'A partir de que idade a escola recebe bebês, e em que horários?',
    r: 'A partir de 9 meses, com 1 professora para cada 3 bebês até os 18 meses. A escola funciona das 7h30 às 19h, com meio período, integral, estendido e frequência reduzida em dias alternados.',
  },
];

/** Página /creche-cosme-velho. Tempos do Google Maps (21/11/2026); manter iguais aos de CrecheCosmeVelho.tsx. */
export const faqCrecheCosmeVelho: ItemFAQ[] = [
  {
    p: 'A Escola Montessoriana fica no Cosme Velho?',
    r: 'O endereço oficial é Laranjeiras: Rua das Laranjeiras, 540, fundos, segundo andar. O número 540 fica no último trecho da rua, junto à divisa com o Cosme Velho, tanto que o Google Maps mostra o endereço como Cosme Velho.',
  },
  {
    p: 'Dá para ir a pé do Cosme Velho até a creche?',
    r: 'Sim. Da estação do Trem do Corcovado são 500 metros, cerca de 7 minutos. Do Largo do Boticário são 850 metros, cerca de 10 minutos. É descer a Rua Cosme Velho, em trajeto predominantemente plano.',
  },
  {
    p: 'Quanto tempo leva de carro do Cosme Velho até a escola?',
    r: 'Numa segunda-feira às 8h, o Google Maps estima de 2 a 6 minutos saindo do Largo do Boticário (850 metros) e de 2 a 3 minutos saindo da estação do Trem do Corcovado ou da Praça São Judas Tadeu.',
  },
  {
    p: 'E para quem mora nas ladeiras do Cosme Velho?',
    r: 'A distância aumenta e há desnível. Da Ladeira do Ascurra, por exemplo, são cerca de 1,5 km: uns 20 minutos a pé, com descida na ida e subida na volta, ou de 4 a 8 minutos de carro às 8h de um dia útil.',
  },
  {
    p: 'A partir de que idade a creche recebe bebês e qual é o horário?',
    r: 'A partir de 9 meses, com 1 professora para cada 3 bebês até os 18 meses. A escola funciona das 7h30 às 19h, com meio período (8h às 12h ou 13h às 17h), integral (8h às 17h), estendido e frequência reduzida em dias alternados.',
  },
];

/** Página /mensalidade. Valor de partida e como ele é composto. */
export const faqMensalidade: ItemFAQ[] = [
  {
    p: 'Quanto custa a mensalidade da Escola Montessoriana de Laranjeiras?',
    r: 'A mensalidade começa em R$ 2.000. O valor depende do período (meio período, semi-integral, integral ou estendido) e da frequência semanal. O Atendimento, pelo WhatsApp, informa o valor para o horário que a família precisa.',
  },
  {
    p: 'O que muda o valor da mensalidade?',
    r: 'O tempo que a criança passa na escola: meio período (8h–12h ou 13h–17h), semi-integral (8h–15h ou 10h–17h), integral (8h–17h) e estendido (7h30–19h). Também é possível combinar frequência reduzida, com menos dias na semana.',
  },
  {
    p: 'A partir de que idade a criança pode entrar?',
    r: 'A partir de 9 meses, no berçário, com um educador para cada três crianças até os 18 meses. A escola vai até o Ensino Fundamental.',
  },
];
