import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Highlight, Bullets, P, FAQ, usePageMeta } from '../../components/landing/Landing';
import { faqCrecheLaranjeiras } from './faqs';

/**
 * Página de SEO local para a busca "creche laranjeiras" (e variações: berçário,
 * creche montessori, creche zona sul). É a irmã INDEXÁVEL da /lp/creche.html —
 * aquela é noindex de propósito (só anúncios); esta entra no sitemap, no
 * prerender e nos links internos (rodapé e /turmas).
 */
export const CrecheLaranjeiras: React.FC = () => {
  usePageMeta(
    'Creche em Laranjeiras a partir de 9 meses | Escola Montessoriana',
    'Creche e berçário Montessori na Rua das Laranjeiras, 540, a partir de 9 meses: 1 professora para cada 3 bebês, adaptação respeitosa e horários das 7h30 às 19h.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Creche em Laranjeiras"
        title="Creche Montessori em Laranjeiras, a partir de 9 meses"
        subtitle="Berçário e educação infantil na Rua das Laranjeiras, 540 — ambiente preparado, muito colo, natureza e imersão em inglês, a poucos minutos do Cosme Velho, do Catete e do Flamengo."
      />

      <LandingSection heading="Uma creche onde o bebê é protagonista" className="pt-10 sm:pt-14">
        <P>
          Procurar creche em Laranjeiras é escolher onde o seu bebê vai viver as horas mais importantes do
          desenvolvimento dele. Aqui, o berçário é um <strong>ambiente Montessori preparado para bebês</strong>:
          estruturas de movimento e psicomotricidade, materiais ao alcance das mãos, chão livre para explorar — e
          muito, muito colo.
        </P>
        <P>
          A proporção é de <strong>1 professora para cada 3 bebês até os 18 meses</strong>, para que cada criança
          tenha vínculo estável e atenção de verdade. É a fase do andar, do falar e da autonomia que começa — e tudo
          na sala existe para servir a ela.
        </P>
        <LandingImage
          src="/images/turmas/agrupada-1.jpg"
          alt="Bebê sorrindo em pé numa estrutura de madeira de psicomotricidade, na sala do berçário da creche em Laranjeiras"
          portrait
        />
        <P>
          Quer entender o que o método muda na prática nessa idade?{' '}
          <Link to="/blog/metodo-montessori-para-bebes" className="text-montessori-green font-semibold underline hover:no-underline">
            Método Montessori para bebês: como funciona
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="Adaptação respeitosa, no ritmo do seu bebê">
        <P>
          A entrada na creche é uma transição delicada — para o bebê e para a família. Nossa adaptação é
          <strong> gradual e sem imposições</strong>: primeiros dias curtos e acompanhados, vínculo com uma
          professora de referência e choro sempre acolhido no colo, nunca ignorado. A família participa do processo
          do começo ao fim.
        </P>
        <LandingImage
          src="/images/acolhimento/colo-patio.jpg"
          alt="Professora com bebê no colo no pátio arborizado da escola"
          position="center 30%"
        />
        <P>
          <Link to="/acolhimento" className="text-montessori-green font-semibold underline hover:no-underline">
            Veja como conduzimos o acolhimento e a adaptação
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="Alimentação de verdade, feita na escola">
        <P>
          As refeições são preparadas com alimentos frescos, <strong>sem óleo vegetal, sem sal refinado e sem
          açúcar</strong>. As crianças comem juntas, à mesa, e aprendem desde cedo a comer sozinhas — a alimentação
          também é parte do acolhimento e da autonomia.
        </P>
        <LandingImage
          src="/images/acolhimento/almoco-bebes.jpg"
          alt="Bebês almoçando juntos à mesa baixa da creche, comendo sozinhos"
        />
      </LandingSection>

      <LandingSection heading="Inglês desde o berçário">
        <P>
          Na creche, o inglês entra por <strong>imersão diária</strong> — nas músicas, nas brincadeiras e nas
          refeições, na voz de professoras fluentes, nativas e brasileiras bilíngues. Nessa idade o cérebro absorve
          idiomas sem esforço: o que começa como brincadeira vira fluência natural.{' '}
          <Link to="/ingles-primeira-infancia" className="text-montessori-green font-semibold underline hover:no-underline">
            Saiba como funciona a imersão no inglês
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="Horários que cabem na rotina da família">
        <P>Funcionamos das <strong>7h30 às 19h</strong>, com três formatos de período:</P>
        <Bullets
          items={[
            <><strong>Meio período:</strong> matutino, das 8h às 12h, ou vespertino, das 13h às 17h.</>,
            <><strong>Integral:</strong> das 8h às 17h, com almoço e momento de descanso.</>,
            <><strong>Estendido:</strong> das 7h30 às 19h, para famílias que precisam de mais tempo.</>,
          ]}
        />
        <P>
          Também há <strong>frequência reduzida</strong> (dias alternados) e flexibilidade para adaptar entradas e
          saídas à realidade de cada casa. A melhor combinação para o seu bebê a gente monta junto com você.
        </P>
      </LandingSection>

      <LandingSection heading="Onde estamos" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Ficamos na <strong>Rua das Laranjeiras, 540 (fundos)</strong>, no coração de Laranjeiras — a poucos
          minutos do Cosme Velho, do Catete, do Flamengo e de Botafogo. Uma casa com pátio arborizado, horta e
          espaço de verdade para o movimento, no meio da Zona Sul do Rio.
        </P>
        <P>
          Vem do Flamengo ou do Catete?{' '}
          <Link to="/creche-flamengo" className="text-montessori-green font-semibold underline hover:no-underline">
            São cinco minutos — e explicamos por que valem a pena
          </Link>.
        </P>
        <P>
          Nossa nota no Google é <strong>5,0</strong>, nas avaliações das famílias que vivem a escola todos os
          dias.{' '}
          <Link to="/agendamento" className="text-montessori-green font-semibold underline hover:no-underline">
            Agende uma visita
          </Link>{' '}
          e venha ver de perto.
        </P>
      </LandingSection>

      <LandingSection heading="Depois da creche: a mesma casa até o Fundamental">
        <P>
          O berçário é só o começo. Na mesma escola, o seu filho segue para a <strong>pré-escola</strong> (2,5 a 6
          anos) e para o <strong>Ensino Fundamental</strong> Montessori — sem trocar de casa, de filosofia nem de
          vínculos.{' '}
          <Link to="/turmas" className="text-montessori-green font-semibold underline hover:no-underline">
            Conheça as turmas
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="Em resumo">
        <Highlight>
          Creche Montessori em Laranjeiras, a partir de 9 meses: 1 professora para cada 3 bebês até os 18 meses,
          adaptação respeitosa no ritmo da criança, alimentação de verdade feita na escola, imersão diária no
          inglês, pátio arborizado e horários flexíveis — das 7h30 às 19h, com meio período, integral, estendido e
          frequência reduzida.
        </Highlight>
        <P>
          Quer se aprofundar antes de visitar? No nosso blog:{' '}
          <Link to="/blog/escola-montessori-rio-de-janeiro-como-avaliar" className="text-montessori-green font-semibold underline hover:no-underline">
            Escola Montessori no Rio de Janeiro: como saber se é de verdade
          </Link>{' '}
          e{' '}
          <Link to="/blog/como-escolher-escola-infantil-laranjeiras" className="text-montessori-green font-semibold underline hover:no-underline">
            Como escolher uma escola infantil em Laranjeiras
          </Link>.
        </P>
      </LandingSection>


      <LandingSection heading="Perguntas que as famílias mais fazem">
        <FAQ itens={faqCrecheLaranjeiras} />
      </LandingSection>

      <LandingCTA
        heading="Venha conhecer o berçário de perto"
        text="Dez minutos observando uma sala tranquila respondem mais do que qualquer texto. Agende uma visita e veja os bebês em ação."
      />
    </div>
  );
};
