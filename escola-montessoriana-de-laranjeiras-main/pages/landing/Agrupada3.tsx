import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

export const Agrupada3: React.FC = () => {
  usePageMeta(
    'Agrupada 3 — Ensino Fundamental (7 a 12 anos) | Escola Montessoriana de Laranjeiras',
    'O Ensino Fundamental Montessori: o segundo plano do desenvolvimento (6 a 12 anos), a mente que raciocina e imagina, o caminho da abstração, a educação cósmica em escala maior e o trabalho em grupo com autonomia.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Turmas · Agrupada 3"
        title="Ensino Fundamental: a continuidade natural do caminho Montessori"
        subtitle="Dos 7 aos 12 anos, a criança muda. Não pergunta mais só 'o quê' — quer saber 'por quê'. E o método acompanha essa nova fome de compreender o mundo."
      />

      <LandingSection heading="Um novo plano do desenvolvimento" className="pt-10 sm:pt-14">
        <P>
          Maria Montessori observou que o desenvolvimento humano acontece em etapas com características muito distintas —
          ela as chamou de "planos do desenvolvimento". Dos 0 aos 6 anos, a criança absorve o mundo pelos sentidos. A
          partir dos 6, entra em um novo plano: a <strong>mente que raciocina e imagina</strong>.
        </P>
        <P>
          É uma criança diferente que chega aqui: cheia de perguntas, ávida por entender como as coisas funcionam,
          fascinada por justiça, por grandes histórias e pelo lugar dela no mundo. O ambiente da Agrupada 3 é preparado
          justamente para essa mente — mais social, mais abstrata e com muita energia para grandes projetos.
        </P>
        <Highlight>
          Não se ensina a mesma coisa da mesma forma para uma criança de 3 e uma de 9 anos. Cada plano pede um ambiente,
          um material e um adulto preparados para aquela fase.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Da mão para a abstração">
        <P>
          Nos primeiros anos, a criança segura a quantidade antes de conhecer o número. Agora, esse alicerce concreto se
          transforma em pensamento abstrato: a matemática ganha operações e frações, a geometria vira demonstração, a
          linguagem se aprofunda em gramática e composição. Porque a base foi construída com as mãos, a abstração chega
          sem medo — apoiada em algo que a criança já entende no corpo.
        </P>
      </LandingSection>

      <LandingSection heading="Educação cósmica em escala maior">
        <P>
          Se na Agrupada 2 a educação cósmica começa no quintal — na horta, no minhocário, no ciclo da vida —, aqui ela
          ganha o universo inteiro. A criança estuda a origem do cosmos, o surgimento da vida, a história da humanidade,
          da linguagem e dos números, e percebe como tudo se conecta.
        </P>
        <Bullets
          items={[
            'A grande visão do todo antes dos detalhes: primeiro a história, depois os fatos ganham sentido.',
            'Interdependência e responsabilidade: entender o mundo é também descobrir como cuidar dele.',
            'Saídas de estudo e projetos: a sala se estende para a cidade, a natureza e a comunidade.',
          ]}
        />
        <P>
          É a mesma semente da{' '}
          <Link to="/natureza-educacao-cosmica" className="text-montessori-green font-semibold underline hover:no-underline">
            educação cósmica
          </Link>{' '}
          que plantamos desde pequenos — agora florescendo em escala maior.
        </P>
      </LandingSection>

      <LandingSection heading="Autonomia, responsabilidade e vida em grupo">
        <P>
          Esta é a fase social por excelência. As crianças trabalham em grupo, planejam, dividem tarefas, negociam,
          erram e recomeçam. Aprendem a administrar o próprio tempo e a assumir responsabilidades reais — dentro de uma
          liberdade que vem sempre acompanhada de limites claros.
        </P>
        <P>
          O adulto deixa de ser quem entrega respostas e passa a ser quem provoca boas perguntas. É assim que se forma
          um jovem que pensa por conta própria, coopera e se responsabiliza — as competências que o futuro mais vai
          exigir.
        </P>
      </LandingSection>

      <LandingCTA
        heading="Vamos conversar sobre a Agrupada 3"
        text="É a etapa mais nova da nossa escola e cresce a cada ano. Agende uma visita ou fale com a gente para conhecer a proposta do Fundamental de perto."
      />
    </div>
  );
};
