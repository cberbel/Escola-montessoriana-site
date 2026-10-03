import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Highlight, Bullets, P, FAQ, usePageMeta } from '../../components/landing/Landing';
import { faqCrecheBotafogo } from './faqs';

/**
 * Página de SEO local para "creche botafogo". Mesma regra da /creche-flamengo:
 * a escola NÃO fica em Botafogo e a página diz isso na primeira linha. O que
 * ela oferece de próprio são os CAMINHOS reais de Botafogo até a escola —
 * conteúdo que só serve a quem mora lá (o que evita a "página porta" que o
 * Google penaliza).
 *
 * Tempos e distâncias conferidos no Google Maps em 03/10/2026, fora do pico:
 * Praia de Botafogo → escola 2,8 km / ~9 min pela Pinheiro Machado;
 * São Clemente → 5,5 km / 11–13 min pelo Rebouças ou 4,6 km / 12 min pela
 * Rua das Laranjeiras; Voluntários da Pátria → 15–16 min. Transporte público
 * a partir da estação Botafogo: 33–43 min. A tabela do post
 * /blog/erro-escolher-escola-perto-de-casa usa "Praia de Botafogo ~3,5 km,
 * 10–15 min" — manter os dois coerentes.
 */
export const CrecheBotafogo: React.FC = () => {
  usePageMeta(
    'Creche perto de Botafogo, a 10 minutos | Escola Montessoriana',
    'Creche e berçário Montessori a cerca de 10 minutos de Botafogo, no final da Rua das Laranjeiras. Os caminhos pela Pinheiro Machado e pelo Rebouças.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Para famílias de Botafogo"
        title="De Botafogo até a creche: os dois caminhos"
        subtitle="Não ficamos em Botafogo: ficamos no final da Rua das Laranjeiras, no número 540. De carro, são cerca de 10 minutos de quase toda Botafogo. Aqui está como chegar."
      />

      <LandingSection heading="Onde fica a escola" className="pt-10 sm:pt-14">
        <P>
          A escola fica na <strong>Rua das Laranjeiras, 540 (fundos)</strong>, já no fim da rua, entre Laranjeiras e o
          Cosme Velho. De Botafogo há dois jeitos de chegar, e o melhor depende de que lado do bairro você sai.
        </P>
      </LandingSection>

      <LandingSection heading="Da praia e da Farani: pela Pinheiro Machado">
        <P>
          Para quem mora perto da <strong>Praia de Botafogo</strong>, da Farani ou do começo da Voluntários da Pátria, o
          caminho natural é subir a <strong>Rua Pinheiro Machado</strong>, passar pelo Palácio Guanabara e entrar na
          Rua das Laranjeiras. Daí é seguir a rua até o fim.
        </P>
        <Bullets
          items={[
            <>Da Praia de Botafogo: cerca de <strong>3 km</strong> e <strong>10 minutos</strong> de carro, fora do pico.</>,
            <>É o caminho mais curto e o mais previsível no dia a dia.</>,
          ]}
        />
      </LandingSection>

      <LandingSection heading="Do miolo do bairro e do Humaitá: pelo Rebouças">
        <P>
          Para quem sai da <strong>São Clemente</strong>, do meio da <strong>Voluntários da Pátria</strong> ou do{' '}
          <strong>Humaitá</strong>, muitas vezes compensa pegar o <strong>Túnel Rebouças</strong> e sair no Cosme Velho.
          A escola fica a poucos minutos da saída, descendo para a Rua das Laranjeiras.
        </P>
        <Bullets
          items={[
            <>Da São Clemente: de <strong>11 a 13 minutos</strong>, cerca de 5,5 km pelo Rebouças, fora do pico.</>,
            <>Da Voluntários da Pátria: cerca de <strong>15 minutos</strong>.</>,
            <>O GPS costuma oferecer as duas rotas, pelo Rebouças e pela Rua das Laranjeiras, com diferença de um ou dois minutos.</>,
          ]}
        />
        <LandingImage
          src="/images/natureza/patio-verde.jpg"
          alt="Duas crianças de costas, apoiadas na grade do pátio, observando uma parede de árvores verdes através da tela"
        />
      </LandingSection>

      <LandingSection heading="Sem carro">
        <P>
          De metrô, desça no <strong>Largo do Machado</strong> e siga de ônibus pela Rua das Laranjeiras acima. Saindo da
          estação Botafogo, o trajeto completo leva de <strong>30 a 40 minutos</strong>, conforme a espera do ônibus. Para
          quem vai e volta de carro ou de aplicativo, os 10 minutos valem quase sempre.
        </P>
        <P>
          No horário de entrada, perto das 8h, o trânsito em Botafogo pesa mais. Por isso sugerimos fazer a visita no
          mesmo horário em que você faria o trajeto no dia a dia, e cronometrar.
        </P>
      </LandingSection>

      <LandingSection heading="Por que vale atravessar o bairro">
        <P>
          Dez minutos por viagem somam algumas dezenas de horas por ano. Uma criança em período integral passa cerca de{' '}
          <strong>1.800 horas por ano</strong> dentro da escola. O tempo no carro é um custo pequeno e fixo; o que
          acontece nessas horas se acumula, na fase em que o cérebro mais se forma.{' '}
          <Link to="/blog/erro-escolher-escola-perto-de-casa" className="text-montessori-green font-semibold underline hover:no-underline">
            A conta completa está neste artigo
          </Link>.
        </P>
        <Highlight>
          A pergunta que decide não é quanto tempo leva o trajeto, e sim o que o seu filho recebe nas horas seguintes.
        </Highlight>
      </LandingSection>

      <LandingSection heading="O que seu filho encontra do outro lado">
        <Bullets
          items={[
            <><strong>Berçário a partir de 9 meses</strong>, com 1 professora para cada 3 bebês até os 18 meses.</>,
            <><strong>Adaptação respeitosa</strong>, no ritmo da criança, com a família junto.</>,
            <><strong>Imersão diária em inglês</strong>, com professoras nativas e brasileiras bilíngues.</>,
            <><strong>Alimentação preparada na escola</strong>, sem óleo vegetal, sal refinado ou açúcar.</>,
            <><strong>Pátio arborizado e horta</strong>, com espaço de verdade para o corpo.</>,
            <><strong>Zero telas</strong> e turmas de idades misturadas, do berçário ao Ensino Fundamental.</>,
          ]}
        />
        <P>
          Horários das <strong>7h30 às 19h</strong>, com meio período, integral, estendido e frequência reduzida.{' '}
          <Link to="/creche-laranjeiras" className="text-montessori-green font-semibold underline hover:no-underline">
            Veja os detalhes da creche e do berçário
          </Link>{' '}
          ou{' '}
          <Link to="/mensalidade" className="text-montessori-green font-semibold underline hover:no-underline">
            como funciona a mensalidade
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="Perguntas de quem vem de Botafogo">
        <FAQ itens={faqCrecheBotafogo} />
      </LandingSection>

      <LandingCTA
        heading="Venha cronometrar o caminho"
        text="Marque a visita no horário em que você faria o trajeto e veja a escola funcionando. Agende pelo WhatsApp ou pela página de agendamento."
      />
    </div>
  );
};
