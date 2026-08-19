import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

/**
 * Página de SEO local para "creche flamengo". A escola NÃO fica no Flamengo —
 * fica em Laranjeiras, a poucos minutos — e a página diz isso na primeira linha.
 * Fingir endereço no bairro seria desonesto com a mãe e frágil no Google, que
 * cruza a página com o endereço do perfil.
 *
 * O eixo é o argumento dos juros compostos (ideia do Claudio): os minutos a mais
 * de trajeto são um custo pequeno e linear; o ambiente onde a criança passa
 * 1.800 horas por ano é um efeito grande e acumulado. Os números vêm do artigo
 * /blog/erro-escolher-escola-perto-de-casa — mantê-los iguais nos dois lugares.
 */
export const CrecheFlamengo: React.FC = () => {
  usePageMeta(
    'Creche perto do Flamengo, a 5 minutos | Escola Montessoriana',
    'Creche e berçário Montessori a 5 minutos do Flamengo, na Rua das Laranjeiras. A partir de 9 meses, 1 professora para cada 3 bebês e horários das 7h30 às 19h.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Para famílias do Flamengo"
        title="A creche que vale os cinco minutos de carro"
        subtitle="Não ficamos no Flamengo: ficamos na Rua das Laranjeiras, 540 — a cinco minutos da Conde de Baependi. Esta página existe para explicar por que essa distância é o melhor negócio que você pode fazer pelo seu filho."
      />

      <LandingSection heading="Primeiro, a verdade sobre a distância" className="pt-10 sm:pt-14">
        <P>
          A escola fica em <strong>Laranjeiras</strong>, não no Flamengo. Da Conde de Baependi ou da Praça São
          Salvador são cerca de <strong>5 minutos de carro</strong>. Do Largo do Machado e do Catete, cabe num café.
          É subir a Rua das Laranjeiras — o mesmo caminho de quem vai ao Cosme Velho.
        </P>
        <P>
          Muita família do Flamengo descarta uma escola por causa desses minutos. É uma decisão que parece prudente e
          quase sempre sai cara. A conta abaixo mostra por quê.
        </P>
      </LandingSection>

      <LandingSection heading="A conta dos minutos contra a conta das horas">
        <P>
          Uma criança em período integral passa de <strong>7 a 9 horas por dia</strong> na escola — cerca de{' '}
          <strong>1.800 horas por ano</strong>. A diferença de trajeto para uma escola um ou dois quilômetros mais
          longe é de <strong>5 a 10 minutos por viagem</strong>: somando o ano inteiro, algo entre 30 e 60 horas.
        </P>
        <Highlight>
          Você troca cerca de <strong>3%</strong> de tempo a mais no carro por <strong>100%</strong> das horas do dia
          do seu filho — todos os dias, durante anos.
        </Highlight>
        <P>
          E o mais importante não é o tamanho da troca: é que os dois lados dela se comportam de maneiras
          completamente diferentes ao longo do tempo.
        </P>
      </LandingSection>

      <LandingSection heading="Um custo linear contra um efeito composto">
        <P>
          <strong>Os minutos no carro são um custo linear.</strong> Cinco minutos hoje, cinco minutos amanhã, cinco
          minutos daqui a três anos. Eles somam, mas nunca multiplicam. No fim do ano você pagou aquelas 30 ou 60
          horas e acabou ali.
        </P>
        <P>
          <strong>O que acontece dentro da escola não soma: compõe.</strong> A criança que passa o dia num ambiente
          preparado desenvolve concentração; a concentração faz ela aprender mais no mês seguinte; o que ela aprendeu
          torna o ano seguinte mais fácil. O economista James Heckman resumiu isso em três palavras —{' '}
          <em>skills beget skills</em>, habilidade gera habilidade. Atenção, autorregulação e linguagem construídas
          agora são o alicerce da leitura, do raciocínio e das relações depois.
        </P>
        <P>
          É a mesma lógica de juros compostos que você conhece do dinheiro, com uma diferença cruel: aqui os juros
          correm em <strong>uma janela que não volta</strong>. Os primeiros anos são o período em que o cérebro forma
          conexões num ritmo que nunca mais se repete. Uma aplicação começada dez anos depois ainda rende; uma
          infância, não.
        </P>
        <LandingImage
          src="/images/montessori/concentracao.jpg"
          alt="Criança pequena profundamente concentrada em um trabalho com material concreto"
        />
        <P>
          Por isso a pergunta honesta não é <em>"quanto tempo a mais eu gasto no trajeto?"</em>, e sim:{' '}
          <strong>"o que meu filho recebe nas oito horas seguintes em troca desses minutos?"</strong>{' '}
          <Link to="/blog/erro-escolher-escola-perto-de-casa" className="text-montessori-green font-semibold underline hover:no-underline">
            Desenvolvemos essa conta em detalhe neste artigo
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="O que seu filho encontra do outro lado desses minutos">
        <Bullets
          items={[
            <><strong>Berçário a partir de 9 meses</strong>, com 1 professora para cada 3 bebês até os 18 meses.</>,
            <><strong>Adaptação respeitosa</strong>, no ritmo da criança, com a família junto e o choro sempre acolhido no colo.</>,
            <><strong>Imersão diária em inglês</strong>, com professoras fluentes, nativas e brasileiras bilíngues.</>,
            <><strong>Alimentação preparada na escola</strong>, sem óleo vegetal, sal refinado ou açúcar.</>,
            <><strong>Pátio arborizado e horta</strong>, com espaço de verdade para o corpo — coisa rara nesta parte da Zona Sul.</>,
            <><strong>Política de zero telas</strong> e turmas de idades misturadas, do berçário ao Ensino Fundamental.</>,
          ]}
        />
        <P>
          Horários das <strong>7h30 às 19h</strong>, com meio período, integral, estendido e frequência reduzida —
          para caber na rotina de quem trabalha no Centro, na Zona Sul ou em casa.
        </P>
      </LandingSection>

      <LandingSection heading="Em resumo" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <Highlight>
          Cinco minutos a mais de carro custam cerca de 3% do tempo e não crescem nunca. As 1.800 horas por ano dentro
          da escola rendem juros compostos — na única fase da vida em que essa fundação está sendo construída.
        </Highlight>
        <P>
          Quer ver os detalhes da creche e do berçário?{' '}
          <Link to="/creche-laranjeiras" className="text-montessori-green font-semibold underline hover:no-underline">
            Conheça a nossa creche em Laranjeiras
          </Link>{' '}
          ou{' '}
          <Link to="/turmas" className="text-montessori-green font-semibold underline hover:no-underline">
            veja todas as turmas
          </Link>.
        </P>
      </LandingSection>

      <LandingCTA
        heading="Venha medir os cinco minutos"
        text="A melhor forma de decidir é vir uma vez: você cronometra o trajeto e vê a escola funcionando. Agende sua visita."
      />
    </div>
  );
};
