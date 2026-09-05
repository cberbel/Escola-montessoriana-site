import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta, LandingSection, P, Highlight, FAQ, LandingCTA } from '../components/landing/Landing';
import { faqMensalidade } from './landing/faqs';
import { trackWhatsAppClick } from '../utils/tracking';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">
    {children}
  </Link>
);

const WHATSAPP_MENSALIDADE =
  'https://wa.me/5521992973454?text=' +
  encodeURIComponent('Olá! Gostaria de saber o valor da mensalidade para uma criança de ___ (idade), no período ___.');

/**
 * /mensalidade — o valor de partida e a conta que a família raramente faz.
 * Escrita no mesmo registro das páginas /desenvolvimento-cerebral e
 * /metodo-montessori: prosa, referência científica onde cabe (Heckman, Kuhl),
 * Montessori como fundamento e não como item de lista. O FAQ vem de
 * pages/landing/faqs.ts e alimenta também o schema FAQPage.
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
            A partir de R$ 2.000
          </h1>
          <p className="font-sans text-lg sm:text-xl text-montessori-cream/90 leading-relaxed mb-6">
            O valor varia com o período e com a frequência. Antes do número, porém, há uma conta que vale a pena fazer
            — e que quase nenhuma família faz.
          </p>
          <a
            href={WHATSAPP_MENSALIDADE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('mensalidade-hero')}
            className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-montessori-gold text-montessori-dark font-semibold rounded-sm hover:bg-yellow-300 transition-colors"
          >
            Consultar o valor
          </a>
        </div>
      </div>

      <LandingSection heading="O que a mensalidade sustenta">
        <P>
          A mensalidade paga um dia inteiro de uma criança em uma{' '}
          <L to="/metodo-montessori">escola Montessori</L> — e Montessori não é uma sala, é o fundamento de tudo o que
          acontece aqui. É o ambiente preparado em que a criança escolhe o próprio trabalho e se concentra nele sem ser
          interrompida; é a professora que observa cada uma individualmente e apresenta o material certo na hora
          certa; são as turmas de idades misturadas, em que o mais velho ensina e o mais novo observa. A mensalidade
          sustenta esse ambiente, e o resto se organiza em torno dele.
        </P>
        <P>
          O inglês atravessa o dia por <L to="/ingles-primeira-infancia">imersão</L>, com professoras nativas e
          bilíngues que só falam inglês, na idade em que o cérebro ainda distingue os sons de qualquer língua. As
          refeições são feitas na escola, sem açúcar e sem ultraprocessados, e as crianças comem juntas — a mesa
          também educa. Duas vezes ao dia, o corpo e a arte: capoeira no pátio, musicalização, circo e teatro, a
          horta e a permacultura, a contação de histórias. No berçário, um educador para cada três crianças. E um
          horário que cabe na vida da família, das 7h30 às 19h.
        </P>
        <P>
          Nada disso é cobrado à parte. A única exceção é um terceiro idioma, quando a família escolhe — francês,
          mandarim, espanhol, italiano ou alemão.
        </P>
      </LandingSection>

      <LandingSection heading="A conta que raramente se faz" className="bg-montessori-cream/40">
        <P>
          A comparação instintiva é mensalidade contra mensalidade. Ela engana duas vezes. A primeira é aritmética:
          a mensalidade de uma escola convencional raramente é o que a família gasta com a escola. Em volta dela vão
          se acumulando, um a um, os complementos — as aulas de inglês contratadas aos cinco ou seis anos para suprir
          o que não veio; a natação, a música, o judô, cada um com seu horário e seu deslocamento; o contraturno ou a
          babá para cobrir a tarde que a escola não cobre; a lancheira; e, mais adiante, o reforço, a fonoaudióloga, a
          psicopedagoga — para reconstruir a concentração, a linguagem e a autonomia que, aos dois anos, se construíam
          sozinhas, brincando.
        </P>
        <P>
          Somados com honestidade, os números se aproximam. Mas esse é o menor dos dois enganos.
        </P>
        <Highlight>
          O maior custo de uma escola não está no boleto. Está no que a criança deixa de construir na única fase da
          vida em que construir custa pouco — porque é exatamente para isso que o cérebro dessa idade está preparado.
        </Highlight>
        <P>
          Em economia, o custo de uma escolha é aquilo de que se abre mão. Na primeira infância, abre-se mão de algo
          que não volta. O economista James Heckman, Prêmio Nobel, passou décadas medindo o retorno de investir em
          cada fase da vida e chegou a uma curva que se tornou célebre: quanto mais cedo, maior o retorno — e nenhuma
          fase posterior chega perto dos primeiros anos. A razão está na{' '}
          <L to="/desenvolvimento-cerebral">arquitetura do cérebro</L>: até 1 milhão de conexões por segundo, uma
          fundação que se constrói uma vez, e sobre a qual tudo o que vem depois se apoia. Habilidade gera habilidade.
          O atraso também se acumula.
        </P>
        <P>
          É nessa janela que a concentração profunda se instala — ou não. Que uma segunda língua entra sem sotaque e
          sem estudo — ou vira matéria. Que a criança aprende a se vestir, a se servir, a cuidar do que é seu, a
          esperar a vez, a terminar o que começou — ou aprende a esperar que façam por ela. Nenhuma dessas conquistas
          é impossível mais tarde. Todas ficam mais caras, mais lentas e mais difíceis. Uma escola que não aproveita
          essa janela não custa menos: custa o que a criança deixou de construir, e a conta chega depois.
        </P>
      </LandingSection>

      <LandingSection heading="Aproveitar ao máximo — e com respeito">
        <P>
          "Aproveitar ao máximo" costuma ser confundido com acelerar: alfabetizar aos três, encher a agenda, cobrar.
          É o contrário do que fazemos, e é o contrário do que a ciência recomenda. Maria Montessori descreveu os{' '}
          <L to="/metodo-montessori">períodos sensíveis</L> — as janelas em que certos aprendizados acontecem quase
          sem esforço — e a neurociência as confirmou. Aproveitar ao máximo é oferecer, no momento em que a criança
          está pronta, aquilo que ela já quer pegar. E deixar que ela pegue no seu ritmo.
        </P>
        <P>
          As letras de lixa ficam na estante, ao alcance da mão, e ninguém chama a criança para elas. Um dia ela
          passa o dedo por uma, pergunta o som, e a alfabetização começa por vontade própria — como começa a
          matemática, nas contas de ouro que se pegam e se contam antes de qualquer algarismo. O inglês entra pela
          canção, pela história, pelo pedido da professora na hora do lanche; a criança não estuda a língua, convive
          com ela. O bebê de dez meses tem o chão, o espelho baixo e a barra: ninguém o coloca em pé, o ambiente o
          convida a levantar quando o corpo pedir. E quem chega inseguro é <L to="/acolhimento">acolhido</L> pelo
          tempo que precisar, porque só se trabalha de verdade quando se está seguro.
        </P>
        <P>
          Respeito não é o oposto de aproveitar; é a condição. A criança pressionada aprende a evitar. A criança
          respeitada aprende a querer — e querer aprender, construído aos dois, aos três, aos quatro anos, é o que
          rende pela vida inteira.
        </P>
        <Highlight>
          "Colocar na escolinha mais perto de casa não era um erro que eu me permitiria cometer." —{' '}
          <L to="/sobre">Claudio Berbel, fundador</L>
        </Highlight>
      </LandingSection>

      <LandingSection heading="Como o valor é composto" className="bg-montessori-cream/40">
        <P>
          O ponto de partida é R$ 2.000. A partir daí, o que define o valor é o tempo que a criança passa na escola:
          meio período, pela manhã (8h–12h) ou pela tarde (13h–17h); semi-integral, das 8h às 15h ou das 10h às 17h;
          integral, das 8h às 17h, com almoço e descanso; e estendido, das 7h30 às 19h, para famílias que precisam de
          mais tempo nas pontas do dia. Também é possível combinar frequência reduzida, com menos dias na semana.
        </P>
        <P>
          Para saber o valor do período que a sua família precisa, mande a idade da criança e o horário. A resposta
          vem em minutos.
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

      <LandingSection heading="Perguntas frequentes">
        <FAQ itens={faqMensalidade} />
      </LandingSection>

      <LandingCTA
        heading="O melhor jeito de decidir é ver a escola funcionando"
        text="Agende uma visita, veja as salas com as crianças trabalhando e saia com o valor exato para a sua rotina."
      />
    </div>
  );
};
