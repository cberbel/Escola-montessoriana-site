import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Bullets, P, FAQ, usePageMeta } from '../../components/landing/Landing';
import { faqCrecheCatete } from './faqs';

/**
 * Página de SEO local para "creche catete". Mesma regra das páginas de
 * Flamengo e Botafogo: a escola NÃO fica no Catete e a página diz isso na
 * primeira linha. O que ela tem de próprio são os caminhos reais do Catete
 * até a escola (carro, ônibus e a pé), que só servem a quem mora lá.
 *
 * Tudo conferido no Google Maps em 21/11/2026, com partida marcada para
 * segunda-feira 23/11/2026 (destino: R. das Laranjeiras, 540, que o Maps
 * rotula como "Cosme Velho"):
 * - Carro, 7h45: Largo do Machado 2,0 km / 6–16 min; Rua Bento Lisboa
 *   2,4 km / 7–18 min; Palácio do Catete (Museu da República) 3,2 km /
 *   9–22 min, por Pedro Américo, Bento Lisboa, Largo do Machado, Ministro
 *   Tavares de Lira e 1,9 km de Rua das Laranjeiras.
 * - Carro, volta às 17h: até o Largo do Machado 2,4 km / 6–16 min; até o
 *   Palácio do Catete 2,9 km / 6–18 min, por Laranjeiras e Rua do Catete.
 * - Ônibus, 7h45: linha 422 (sentido Cosme Velho), descida no ponto Pires de
 *   Almeida. Largo do Machado: ponto Ministro Tavares de Lira a 96 m,
 *   6 paradas, 6 min de viagem, 12 min no total (17 min às 10h30). Bento
 *   Lisboa: ponto Tavares Bastos, 12 min no total. Palácio do Catete: 400 m
 *   a pé até o ponto Santo Amaro, 12 paradas, 20 min no total; a opção de
 *   metrô + ônibus deu 35 min.
 * - A pé: Largo do Machado 2,0 km / 29 min; Bento Lisboa 2,4 km / 34 min;
 *   Palácio do Catete 2,7 km / 38 min ("predominantemente plana").
 * Ao mexer em qualquer número daqui, mexer também em faqCrecheCatete.
 */
export const CrecheCatete: React.FC = () => {
  usePageMeta(
    'Creche perto do Catete, a 10 minutos | Escola Montessoriana',
    'Creche e berçário Montessori a cerca de 10 minutos do Catete, no fim da Rua das Laranjeiras. Os caminhos de carro, de ônibus (linha 422) e a pé, e os tempos.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Para famílias do Catete"
        title="Do Catete até a creche: é subir a Rua das Laranjeiras"
        subtitle="Não ficamos no Catete: ficamos no trecho final da Rua das Laranjeiras, no número 540. Do Largo do Machado são 2 km pela mesma rua. Aqui estão os caminhos de carro, de ônibus e a pé, com os tempos."
      />

      <LandingSection heading="Onde a escola fica de verdade" className="pt-10 sm:pt-14">
        <P>
          A escola fica na <strong>Rua das Laranjeiras, 540 (fundos, segundo andar)</strong>, em Laranjeiras. O número
          540 está no fim da rua, tão perto do Cosme Velho que o Google Maps mostra o endereço como Cosme Velho.
        </P>
        <P>
          Para quem mora no Catete, o caminho é simples: chegar ao <strong>Largo do Machado</strong> e seguir a Rua das
          Laranjeiras até quase o fim.
        </P>
      </LandingSection>

      <LandingSection heading="De carro: de 2 a 3 km">
        <P>
          Os tempos abaixo são a estimativa do Google Maps para uma segunda-feira às 7h45, perto do horário de entrada.
          A faixa é larga porque o trecho é curto: quem decide é o trânsito, não a distância.
        </P>
        <Bullets
          items={[
            <>Do <strong>Largo do Machado</strong>: 2 km, de <strong>6 a 16 minutos</strong>.</>,
            <>Da <strong>Rua Bento Lisboa</strong>: 2,4 km, de <strong>7 a 18 minutos</strong>.</>,
            <>Do <strong>Palácio do Catete</strong> (Museu da República): 3,2 km, de <strong>9 a 22 minutos</strong>.</>,
          ]}
        />
        <P>
          Saindo do Palácio, o caminho indicado segue pela Rua Pedro Américo e pela Rua Bento Lisboa até o Largo do
          Machado. Dali em diante é a Rua das Laranjeiras por 1,9 km, com a escola à direita.
        </P>
        <P>
          Na volta, às 17h, a estimativa é de 6 a 16 minutos até o Largo do Machado e de 6 a 18 até o Palácio do
          Catete, descendo pela Rua das Laranjeiras e pela Rua do Catete.
        </P>
      </LandingSection>

      <LandingSection heading="De ônibus: a linha 422 vai direto">
        <P>
          A linha <strong>422</strong>, no sentido Cosme Velho, liga o Catete à escola sem baldeação. A descida é no
          ponto <strong>Pires de Almeida</strong>, a menos de um minuto a pé do número 540.
        </P>
        <Bullets
          items={[
            <>
              Do <strong>Largo do Machado</strong>: o ponto Ministro Tavares de Lira fica a cerca de 100 metros do
              largo. São 6 paradas e uns 6 minutos de viagem, ou 12 minutos no total com a espera.
            </>,
            <>Da <strong>Rua Bento Lisboa</strong>: embarque no ponto Tavares Bastos, 12 minutos no total.</>,
            <>
              Do <strong>Palácio do Catete</strong>: 400 metros a pé até o ponto Santo Amaro e depois 12 paradas. Cerca
              de 20 minutos no total.
            </>,
          ]}
        />
        <P>
          Esses totais são da consulta das 7h45. Fora do pico a espera pesa mais: às 10h30, o trajeto do Largo do
          Machado deu 17 minutos.
        </P>
        <P>
          Vem de metrô? Desça na estação Largo do Machado e pegue o 422 ali ao lado. Saindo do Palácio do Catete, o
          ônibus direto saiu mais rápido do que metrô com baldeação: 20 minutos contra 35, na mesma consulta.
        </P>
        <P>Horário e itinerário de ônibus mudam. Vale conferir no aplicativo no dia.</P>
      </LandingSection>

      <LandingSection heading="A pé">
        <P>Dá para ir, e o trajeto é quase todo plano. Mas é longe para a rotina com um bebê:</P>
        <Bullets
          items={[
            <>Do Largo do Machado: 2 km, cerca de <strong>29 minutos</strong>.</>,
            <>Da Rua Bento Lisboa: 2,4 km, cerca de <strong>34 minutos</strong>.</>,
            <>Do Palácio do Catete: 2,7 km, cerca de <strong>38 minutos</strong>.</>,
          ]}
        />
        <LandingImage
          src="/images/acolhimento/colo-patio.jpg"
          alt="Professora com bebê no colo no pátio arborizado da escola"
          position="center 30%"
        />
      </LandingSection>

      <LandingSection heading="Horários para combinar com o trajeto">
        <P>
          A escola funciona das <strong>7h30 às 19h</strong>. Você escolhe o período que encaixa na sua rotina:
        </P>
        <Bullets
          items={[
            <><strong>Meio período:</strong> das 8h às 12h ou das 13h às 17h.</>,
            <><strong>Integral:</strong> das 8h às 17h.</>,
            <><strong>Estendido:</strong> das 7h30 às 19h.</>,
            <><strong>Frequência reduzida:</strong> em dias alternados.</>,
          ]}
        />
        <P>
          O valor muda conforme o período.{' '}
          <Link to="/mensalidade" className="text-montessori-green font-semibold underline hover:no-underline">
            Veja como funciona a mensalidade
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="O que o bebê encontra no fim da rua">
        <Bullets
          items={[
            <><strong>Berçário a partir de 9 meses.</strong></>,
            <><strong>1 professora para cada 3 bebês</strong> até os 18 meses.</>,
            <><strong>Comida feita na escola</strong>, sem óleo vegetal, sal refinado ou açúcar.</>,
            <><strong>Inglês por imersão diária.</strong></>,
            <><strong>Nenhuma tela.</strong></>,
            <><strong>Pátio arborizado</strong> para brincar ao ar livre.</>,
          ]}
        />
        <LandingImage
          src="/images/acolhimento/almoco-bebes.jpg"
          alt="Bebês almoçando juntos à mesa baixa da creche, comendo sozinhos"
        />
        <P>
          Os detalhes do berçário estão na página da{' '}
          <Link to="/creche-laranjeiras" className="text-montessori-green font-semibold underline hover:no-underline">
            creche em Laranjeiras
          </Link>.
        </P>
        <P>
          Mora mais para o lado do Flamengo?{' '}
          <Link to="/creche-flamengo" className="text-montessori-green font-semibold underline hover:no-underline">
            Veja a página de quem vem do Flamengo
          </Link>. Quer saber como é a vizinhança da escola?{' '}
          <Link to="/creche-cosme-velho" className="text-montessori-green font-semibold underline hover:no-underline">
            Veja a do Cosme Velho
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="Perguntas de quem vem do Catete">
        <FAQ itens={faqCrecheCatete} />
      </LandingSection>

      <LandingCTA
        heading="Venha ver a escola funcionando"
        text="A visita é feita com as salas em atividade. Vindo do Catete, o 422 deixa a menos de um minuto da escola. Agende pelo WhatsApp ou pela página de agendamento."
      />
    </div>
  );
};
