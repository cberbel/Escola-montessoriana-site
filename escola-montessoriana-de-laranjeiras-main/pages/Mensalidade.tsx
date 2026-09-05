import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta, LandingSection, P, Bullets, Highlight, FAQ, LandingCTA } from '../components/landing/Landing';
import { faqMensalidade } from './landing/faqs';
import { trackWhatsAppClick } from '../utils/tracking';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">
    {children}
  </Link>
);

const WHATSAPP_MENSALIDADE =
  'https://wa.me/5521992973454?text=' +
  encodeURIComponent('Olá! Quero saber o valor da mensalidade para o meu filho de ___ meses/anos, no período ___.');

/**
 * /mensalidade — a página que a busca "mensalidade escola montessori rio" não
 * encontrava. Diz o valor de partida (R$ 2.000) e como ele é composto, e faz a
 * conta que a família raramente faz sozinha: o custo real da escola não é a
 * mensalidade, é o que se deixa de aproveitar na etapa que não volta.
 * O FAQ vem de pages/landing/faqs.ts e alimenta também o schema FAQPage.
 */
export const Mensalidade: React.FC = () => {
  usePageMeta(
    'Mensalidade a partir de R$ 2.000 | Escola Montessoriana',
    'Mensalidade a partir de R$ 2.000, com inglês por imersão, alimentação e atividades incluídos. O valor varia com o período. E a conta que vale fazer antes.'
  );

  return (
    <div className="bg-white">
      <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0">
          <span className="block text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-3">
            Mensalidade
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-5 break-words">
            A partir de R$ 2.000 por mês
          </h1>
          <p className="font-sans text-lg sm:text-xl text-montessori-cream/90 leading-relaxed mb-6">
            O valor depende do período e da frequência que a sua família precisa. Inglês por imersão, alimentação feita
            na escola e atividades complementares já estão dentro.
          </p>
          <a
            href={WHATSAPP_MENSALIDADE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('mensalidade-hero')}
            className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-montessori-gold text-montessori-dark font-semibold rounded-sm hover:bg-yellow-300 transition-colors"
          >
            Consultar o valor para o meu caso
          </a>
        </div>
      </div>

      <LandingSection heading="O que está dentro da mensalidade">
        <P>
          Antes de comparar números, vale saber o que cada número compra. Aqui, a mensalidade cobre o dia inteiro da
          criança, não só a sala de aula:
        </P>
        <Bullets
          items={[
            <>
              <strong>Sala Montessori</strong> com ambiente preparado, material completo e turmas de idades
              misturadas — a criança escolhe o próprio trabalho e é acompanhada individualmente.
            </>,
            <>
              <strong>Inglês por imersão, todos os dias</strong>, com professoras nativas e bilíngues dentro da rotina.
              Não é aula de inglês: é o inglês vivido enquanto se brinca, come e trabalha.
            </>,
            <>
              <strong>Alimentação feita na escola</strong>, sem açúcar e sem ultraprocessados, incluída no período —
              lanche e refeição no meio período; almoço e jantar conforme o horário.
            </>,
            <>
              <strong>Atividades complementares duas vezes ao dia</strong>: capoeira, musicalização, circo e teatro,
              dança e movimento, horta e permacultura, cozinha experimental, contação de histórias.
            </>,
            <>
              <strong>Um educador para cada três bebês</strong> até os 18 meses, e adultos presentes de verdade em
              todas as idades — colo, escuta e vínculo não são extras.
            </>,
            <>
              <strong>Horário das 7h30 às 19h</strong>, com meio período, semi-integral, integral e estendido, e a
              opção de frequência reduzida.
            </>,
          ]}
        />
        <P>
          O único item cobrado à parte é um terceiro idioma, quando a família escolhe — francês, mandarim, espanhol,
          italiano ou alemão.
        </P>
      </LandingSection>

      <LandingSection heading="A conta que quase ninguém faz" className="bg-montessori-cream/40">
        <P>
          A comparação natural é mensalidade contra mensalidade. É a comparação errada, por dois motivos. O primeiro é
          simples: a mensalidade de uma escola convencional raramente é o que a família paga por mês. Somam-se em volta
          dela, quase sem perceber:
        </P>
        <Bullets
          items={[
            <>
              O <strong>cursinho de inglês</strong> a partir dos 4 ou 5 anos, duas vezes por semana, para tentar
              compensar o que a escola não deu — e que aqui já vem dentro, na idade em que o cérebro absorve idiomas
              sem esforço.
            </>,
            <>
              A <strong>natação, o judô, a música, o balé</strong> — cada um com sua mensalidade, seu uniforme, seu
              deslocamento e seu dia da semana.
            </>,
            <>
              O <strong>contraturno</strong> ou a <strong>babá</strong> para cobrir o intervalo entre as 12h em que a
              escola acaba e as 18h em que a família chega.
            </>,
            <>
              A <strong>alimentação</strong> comprada fora, a lancheira montada às pressas, o lanche pronto que se
              compra no caminho.
            </>,
            <>
              O <strong>reforço escolar</strong> e, mais tarde, a <strong>fonoaudióloga</strong>, a{' '}
              <strong>psicopedagoga</strong>, a <strong>terapia ocupacional</strong> — para recuperar concentração,
              linguagem ou autonomia que teriam custado quase nada para construir aos dois anos.
            </>,
          ]}
        />
        <P>
          Feita a soma honesta, a distância entre as mensalidades costuma encolher ou desaparecer. Mas esse ainda é o
          motivo menor.
        </P>
        <Highlight>
          O maior custo de uma escola não aparece no boleto. É o custo de oportunidade: o que a criança deixa de
          construir na única etapa da vida em que construir era barato, natural e alegre.
        </Highlight>
        <P>
          Entre o nascimento e os seis anos, o cérebro forma{' '}
          <L to="/desenvolvimento-cerebral">mais de um milhão de conexões por segundo</L>. É a fase em que a
          concentração profunda se instala, em que a linguagem — inclusive uma segunda língua — se grava sem sotaque e
          sem estudo, em que a criança aprende a se vestir, a se servir, a cuidar do que é seu, a esperar a vez e a
          terminar o que começou. Nenhuma dessas conquistas é impossível depois. Todas ficam mais caras, mais lentas
          e mais sofridas.
        </P>
        <P>
          O que essa etapa produz, quando é bem aproveitada, é o que se vê em casa: a criança de três anos que se
          concentra vinte minutos num trabalho e não quer ser interrompida; a de quatro que responde em inglês à
          professora sem saber que está "falando inglês"; a de cinco que põe a mesa, resolve uma briga com o colega e
          escolhe o próprio desafio. Isso não é resultado de cobrança. É resultado de ambiente.
        </P>
      </LandingSection>

      <LandingSection heading="Aproveitar ao máximo — com respeito, sem pressão">
        <P>
          "Aproveitar ao máximo" costuma ser lido como acelerar: alfabetizar aos três, encher a agenda, cobrar
          resultado. Não é disso que se trata, e é o contrário do que fazemos. Aproveitar ao máximo é oferecer, no
          momento certo, o que a criança já está pronta para pegar — e deixar que ela pegue no seu ritmo.
        </P>
        <Bullets
          items={[
            <>
              A criança que ainda não se interessa por letras tem letras de lixa ao alcance da mão, e ninguém a
              chama. Um dia ela passa o dedo por uma, pergunta o som, e a alfabetização começa por vontade própria.
            </>,
            <>
              O inglês entra pela música, pela história e pelo pedido da professora na hora do lanche — nunca por
              lição de casa. A criança não estuda a língua; convive com ela.
            </>,
            <>
              A matemática começa em contas de ouro e cubos que se empilham e se trocam. A criança vê e toca o que o
              número significa antes de escrever um único algarismo.
            </>,
            <>
              O bebê de dez meses que ainda não anda tem o chão, o espelho baixo e a barra para se puxar. Ninguém o
              coloca em pé; o ambiente o convida a levantar quando o corpo pedir.
            </>,
            <>
              Quem chega inseguro é <L to="/acolhimento">acolhido no colo</L> pelo tempo que precisar. Só é convidado
              a trabalhar quando se sente seguro — e por isso, quando trabalha, trabalha de verdade.
            </>,
          ]}
        />
        <P>
          Respeito, aqui, não é o oposto de aproveitar. É a condição. A criança pressionada aprende a evitar; a
          criança respeitada aprende a querer. E querer aprender, construído aos dois, três, quatro anos, é o ativo que
          rende pela vida inteira — na escola seguinte, no vestibular, no trabalho, nas relações.
        </P>
        <Highlight>
          Colocar na escolinha mais perto de casa, ou na mais barata, não é economia. É trocar os anos que mais
          rendem por minutos de trajeto ou por uma diferença de boleto que, na soma honesta, muitas vezes nem existe.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Como o valor é composto" className="bg-montessori-cream/40">
        <P>
          O ponto de partida é R$ 2.000. A partir daí, o que define o valor é o tempo que a criança passa na escola:
        </P>
        <Bullets
          items={[
            <>
              <strong>Meio período</strong> — manhã (8h–12h) ou tarde (13h–17h).
            </>,
            <>
              <strong>Semi-integral</strong> — 8h–15h ou 10h–17h, o formato mais escolhido pelas famílias.
            </>,
            <>
              <strong>Integral</strong> — 8h–17h, com almoço e descanso.
            </>,
            <>
              <strong>Estendido</strong> — 7h30–19h, para quem precisa de mais tempo nas pontas do dia.
            </>,
            <>
              <strong>Frequência reduzida</strong> — menos dias por semana, combinada caso a caso.
            </>,
          ]}
        />
        <P>
          Não publicamos a tabela completa porque a rotina de cada família é diferente, e o valor certo é o da sua
          rotina. Diga a idade da criança e o horário de que precisa; a resposta vem em minutos.
        </P>
        <a
          href={WHATSAPP_MENSALIDADE}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mensalidade-composicao')}
          className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-md"
        >
          Consultar pelo WhatsApp
        </a>
      </LandingSection>

      <LandingSection heading="Perguntas frequentes sobre a mensalidade">
        <FAQ itens={faqMensalidade} />
      </LandingSection>

      <LandingCTA
        heading="O melhor jeito de decidir é ver a escola funcionando"
        text="Agende uma visita, conheça as salas com as crianças trabalhando e saia com o valor exato para a sua rotina."
      />
    </div>
  );
};
