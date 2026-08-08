import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

/** Cabeçalho de uma turma: nome + faixa etária em destaque */
const TurmaHeading: React.FC<{ nome: string; faixa: string }> = ({ nome, faixa }) => (
  <div className="mb-4">
    <span className="inline-block bg-montessori-green text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-sm px-3 py-1 mb-2">
      {faixa}
    </span>
    <h2 className="font-serif text-2xl sm:text-3xl text-montessori-green break-words">{nome}</h2>
  </div>
);

export const Turmas: React.FC = () => {
  usePageMeta(
    'Turmas | Escola Montessoriana de Laranjeiras',
    'Nossas turmas de idades misturadas: Agrupada 1 (9 meses a 3 anos), Agrupada 2 (2,5 a 6 anos) e Agrupada 3 — Ensino Fundamental (7 a 12 anos). Ambientes preparados, horários e frequência flexíveis.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Turmas"
        title="Turmas de idades misturadas, do jeito Montessori"
        subtitle="Três agrupamentos, cada um com o seu ambiente preparado — onde os maiores ensinam, os menores se inspiram e cada criança avança no seu próprio ritmo."
      />

      <LandingSection heading="Por que agrupamos idades diferentes" className="pt-10 sm:pt-14">
        <P>
          Em Montessori, as turmas não são separadas ano a ano — são <strong>agrupamentos de faixas mais amplas</strong>,
          que convivem no mesmo ambiente por um ciclo de alguns anos. Não é acaso: é assim que a natureza da infância
          funciona.
        </P>
        <P>
          Pense bem: a turma separada por ano de nascimento é uma <strong>invenção da escola</strong> — essa
          discriminação por idade não existe em nenhum outro lugar da vida. Em casa, no prédio, na praça, as crianças
          crescem entre irmãos, primos, vizinhos e amigos de idades variadas: é assim que a convivência acontece de
          verdade.
        </P>
        <P>
          A classe agrupada também respeita o <strong>ritmo de cada criança em cada área</strong>. Quando ela está
          adiantada em alguma dimensão, encontra naturalmente colegas num grau mais avançado para acompanhá-la. E
          naquilo em que tem mais dificuldade, tem colegas mais novos com quem compartilhar e trocar experiências — e
          consolidar o que sabe.
        </P>
        <P>
          E as trocas transformam os dois lados: as crianças maiores consolidam o que sabem ao ajudar as menores — não
          há aprendizado mais profundo do que ensinar. As menores, por sua vez, se espelham nas maiores e são puxadas
          para cima, sem pressão. No lugar da competição de "todos fazendo a mesma coisa ao mesmo tempo", nasce a
          cooperação, o cuidado e o respeito ao ritmo de cada um.
        </P>
        <Highlight>
          Idades misturadas formam uma pequena comunidade — mais parecida com a vida real do que com uma linha de
          montagem por idade.
        </Highlight>
      </LandingSection>

      <LandingSection heading="">
        <TurmaHeading nome="Agrupada 1" faixa="9 meses a 3 anos" />
        <P>
          O primeiro ambiente fora de casa. Aqui tudo é pensado para o bebê e a criança bem pequena explorarem com
          segurança: estruturas de movimento e psicomotricidade, materiais ao alcance das mãos e muito, muito colo. É a
          fase do andar, do falar, da autonomia que começa — vestir-se, comer sozinho, cuidar de si — e da linguagem,
          que floresce quando a criança é ouvida e respeitada.
        </P>
        <LandingImage src="/images/turmas/agrupada-1.jpg" alt="Bebê sorrindo em pé numa estrutura de madeira de psicomotricidade, na sala da Agrupada 1" portrait />
      </LandingSection>

      <LandingSection heading="">
        <TurmaHeading nome="Agrupada 2" faixa="2,5 a 6 anos" />
        <P>
          A clássica "Casa das Crianças" de Maria Montessori. Neste ambiente, a criança circula livremente entre as
          áreas — vida prática, sensorial, linguagem, matemática e educação cósmica — escolhendo seu trabalho e
          repetindo quantas vezes quiser. É a fase de ouro da concentração, da leitura e da escrita, do número que ganha
          corpo na mão, e da imersão diária no inglês.
        </P>
        <LandingImage src="/images/turmas/agrupada-2.jpg" alt="Criança da Agrupada 2 com a Escada Marrom e a Torre Rosa na sala Montessori preparada" />
        <P>
          Quer entender a fundo o que acontece nessa sala?{' '}
          <Link to="/metodo-montessori" className="text-montessori-green font-semibold underline hover:no-underline">
            Conheça o método e o currículo
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <TurmaHeading nome="Agrupada 3 — Ensino Fundamental" faixa="7 a 12 anos" />
        <P>
          A continuidade natural do caminho Montessori: o Ensino Fundamental, para a criança que já não pergunta só
          "o quê", mas "por quê". É a fase do raciocínio, da imaginação e do trabalho em grupo — com autonomia,
          responsabilidade e o mundo inteiro como objeto de estudo.
        </P>
        <a
          href="/informativo-open-class.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-montessori-green font-semibold hover:gap-3 transition-all"
        >
          Saiba mais sobre a Agrupada 3 →
        </a>
      </LandingSection>

      <LandingSection heading="Horários e frequência">
        <P>
          Funcionamos das <strong>7h30 às 19h</strong>, com três formatos de período — válidos para todas as turmas:
        </P>
        <Bullets
          items={[
            <><strong>Meio período:</strong> matutino, das 8h às 12h, ou vespertino, das 13h às 17h.</>,
            <><strong>Integral:</strong> das 8h às 17h, com almoço e momento de descanso.</>,
            <><strong>Estendido:</strong> das 7h30 às 19h, para famílias que precisam de mais tempo.</>,
          ]}
        />
        <P>
          Além do período, há opções de <strong>frequência reduzida</strong> (dias alternados) e flexibilidade para
          adaptar entradas e saídas à realidade de cada casa — o mesmo acolhimento que atravessa toda a escola. A melhor
          combinação para o seu filho a gente monta junto com você.
        </P>
      </LandingSection>

      <LandingCTA
        heading="Venha conhecer as salas de perto"
        text="Cada ambiente tem um cheiro, uma luz e um ritmo próprios. Agende uma visita e conheça a turma do seu filho."
      />
    </div>
  );
};
