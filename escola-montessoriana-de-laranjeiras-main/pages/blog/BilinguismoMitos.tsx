import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2 } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight, LandingImage } from '../../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const BilinguismoMitos: React.FC = () => (
  <BlogLayout
    title="Bilinguismo na infância: 5 mitos que ainda confundem os pais"
    metaDescription="Criança bilíngue confunde as línguas? O inglês atrasa a fala? Precisa de pai nativo? Separamos o que a ciência diz sobre bilinguismo na primeira infância — e o que é mito repetido há décadas."
    dateDisplay="24 de julho de 2026"
    readingTime="6 min"
    image="/images/cerebro/patio-musica.jpg"
    imageAlt="Crianças pequenas em roda de música no pátio da escola, momento típico de imersão em inglês"
  >
    <P>
      Poucos assuntos acumulam tanto palpite quanto criar um filho com duas línguas. Avós, vizinhos e até alguns
      profissionais repetem alertas que a ciência já desmontou há décadas. Vamos aos cinco mitos mais comuns — e ao
      que os estudos realmente mostram.
    </P>

    <H2>Mito 1: "A criança vai confundir as línguas"</H2>
    <P>
      O medo mais antigo — e o mais estudado. Bebês expostos a duas línguas <strong>distinguem os dois sistemas
      desde muito cedo</strong>, inclusive antes de falar. O que os pais interpretam como "confusão" — misturar
      palavras das duas línguas numa frase — tem nome (<em>code-switching</em>), é normal, temporário e
      desaparece à medida que o vocabulário cresce. Adultos bilíngues fluentes fazem o mesmo, por escolha.
    </P>

    <H2>Mito 2: "Duas línguas atrasam a fala"</H2>
    <P>
      A pesquisa é consistente: bilinguismo <strong>não causa atraso de linguagem</strong>. A criança bilíngue pode
      ter, em cada língua isolada, um vocabulário um pouco menor no início — mas a soma das duas línguas é igual ou
      maior que a de uma criança monolíngue, e a diferença por língua se fecha com o tempo. Atrasos de fala reais
      têm outras causas e acontecem na mesma proporção em monolíngues.
    </P>

    <H2>Mito 3: "Só vale a pena se os pais falarem inglês em casa"</H2>
    <P>
      Ajuda? Sim. É necessário? Não. O que constrói a segunda língua é <strong>exposição consistente e
      significativa</strong> — pessoas reais, interagindo com a criança, em situações que importam para ela. É
      exatamente o que a imersão diária na escola oferece: o inglês na brincadeira, na música, no lanche,{' '}
      <L to="/ingles-primeira-infancia">como parte natural da vida</L>. Os pais não precisam mudar a língua da casa.
    </P>

    <H2>Mito 4: "É melhor esperar alfabetizar em português primeiro"</H2>
    <P>
      Esperar é, na verdade, a única forma de perder algo. A capacidade de absorver os sons de um idioma é máxima na
      primeira infância e diminui com os anos — é a janela que a pesquisadora Patricia Kuhl mapeou em laboratório.{' '}
      <L to="/desenvolvimento-cerebral">A ciência dos períodos sensíveis</L> mostra: quem começa cedo fala sem
      sotaque e sem esforço; quem começa tarde estuda anos para alcançar menos. E não: a segunda língua não
      atrapalha a alfabetização — pesquisas apontam vantagens de consciência fonológica em crianças bilíngues.
    </P>

    <H2>Mito 5: "Criança pequena não aprende de verdade, esquece tudo"</H2>
    <P>
      O que a criança pequena constrói não é uma lista de palavras — é a <strong>arquitetura</strong> da língua: os
      sons, a prosódia, a intuição gramatical. Mesmo que o vocabulário mude, essa fundação fica. E os ganhos vão além
      do idioma: a pesquisa de Ellen Bialystok mostra que o cérebro bilíngue exercita constantemente a{' '}
      <strong>função executiva</strong> — foco, autocontrole, flexibilidade — o conjunto de habilidades que melhor
      prevê o sucesso escolar.
    </P>

    <LandingImage src="/images/ingles/safira-patio.jpg" alt="Bebê brincando no pátio da escola, na fase de maior absorção da linguagem" portrait />

    <Highlight>
      Resumo honesto: não há evidência de prejuízo — e há décadas de evidência de benefício. O único "risco" real do
      bilinguismo precoce é a janela passar enquanto se espera a criança "ficar pronta". Ela já nasce pronta.
    </Highlight>

    <P>
      Quer ver como a imersão funciona na prática, com professoras nativas e bilíngues no dia a dia?{' '}
      <L to="/ingles-primeira-infancia">Leia nossa página sobre inglês na primeira infância</L> ou venha ouvir as
      crianças vivendo em dois idiomas — de perto, numa visita.
    </P>
  </BlogLayout>
);
