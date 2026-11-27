import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2, Referencias } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight } from '../../components/landing/Landing';

/**
 * Post de bairro (27/11/2026), pedido do Claudio: a casa de Machado de Assis e o Capitu Café.
 * Fatos conferidos em 27/11/2026 (fontes nas Referências). O que as fontes NÃO sustentam ficou
 * de fora de propósito: o ano em que a casa foi demolida (JB fala em 1910, o Diário do Rio em
 * "anos 1980"), a história do caldeirão como fato (biógrafos tratam como lenda) e o ano exato
 * da mudança (1883 ou 1884, conforme a fonte). Os trechos de livros nas paredes do café vêm do
 * Claudio, que frequenta o lugar.
 */
const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const MachadoCosmeVelho: React.FC = () => (
  <BlogLayout
    title="Machado de Assis no Cosme Velho: a casa do Bruxo, o Capitu Café e a estátua"
    metaDescription="Machado de Assis viveu mais de duas décadas na Rua Cosme Velho e morreu ali, em 1908. No lugar da casa hoje funciona o Capitu Café, com a estátua do escritor à mesa e uma placa da Prefeitura e da Academia Brasileira de Letras."
    dateDisplay="27 de novembro de 2026"
    date="2026-11-27"
    readingTime="5 min"
    image="/images/cerebro/leitura-bebes.jpg"
    imageAlt="Professora lendo um livro ilustrado para bebês atentos"
  >
    <P>
      O maior escritor brasileiro foi nosso vizinho. Machado de Assis passou as últimas duas décadas e meia da vida
      numa casa da <strong>Rua Cosme Velho</strong>, a poucos minutos a pé da escola, no caminho de quem sobe para o
      Trem do Corcovado. Foi ali que viveu com Carolina, foi ali que publicou boa parte dos livros que até hoje se
      leem nas escolas do país e foi ali que morreu, em 29 de setembro de 1908.
    </P>

    <H2>A casa do número 18</H2>
    <P>
      Machado e Carolina, casados desde 1869, mudaram-se para a casa de número 18 da Rua Cosme Velho em meados da
      década de 1880 (as fontes divergem entre 1883 e 1884). Carolina morreu em outubro de 1904; Machado continuou na
      mesma casa até o fim. Nesse período saíram livros que qualquer estudante brasileiro conhece:
    </P>
    <Bullets
      items={[
        <><strong>Quincas Borba</strong> (1891);</>,
        <><strong>Dom Casmurro</strong> (1899), o livro de Bentinho e Capitu;</>,
        <><strong>Esaú e Jacó</strong> (1904);</>,
        <><strong>Relíquias de Casa Velha</strong> (1906), que abre com o soneto "A Carolina";</>,
        <><strong>Memorial de Aires</strong> (1908), o último romance.</>,
      ]}
    />
    <P>
      A casa não existe mais: no terreno há hoje um prédio residencial. A numeração da rua também mudou, e o endereço
      atual é <strong>Rua Cosme Velho, 174</strong>.
    </P>

    <H2>"O Bruxo do Cosme Velho"</H2>
    <P>
      Foi por causa do bairro que Machado ganhou o apelido mais famoso. Conta-se que um vizinho o viu queimando cartas
      num caldeirão e gritou "bruxo!". Os biógrafos tratam a cena como lenda, e o primeiro registro escrito do apelido
      é de 1944. Quem o espalhou de vez foi Carlos Drummond de Andrade, com o poema "A um bruxo, com amor", publicado
      em 1958, no cinquentenário da morte do escritor.
    </P>

    <H2>O Capitu Café, no lugar da casa</H2>
    <P>
      No térreo do prédio do número 174 funciona, desde 2021, o <strong>Capitu Café</strong>. O nome já diz o tema: a
      decoração e o cardápio homenageiam os personagens de Machado, e nas paredes estão trechos dos livros dele.
      Há música ao vivo aos sábados e, de tempos em tempos, exposições; em março de 2026 o espaço recebeu caricaturas
      de figuras ilustres feitas por Loredano e Palomanes.
    </P>
    <P>
      Na parede do prédio está a <strong>placa azul do Circuito da Literatura</strong>, colocada em julho de 2022 pela
      Prefeitura do Rio e pela Academia Brasileira de Letras para marcar a última residência do escritor. E na calçada,
      desde setembro de 2024, há uma <strong>estátua de bronze de Machado de Assis em tamanho real</strong>, sentado à
      mesa, como se tomasse um café com quem passa.
    </P>
    <Highlight>
      Para uma criança, a estátua é o melhor jeito de conhecer Machado: dá para sentar ao lado dele, olhar o rosto de
      perto e ouvir que ali morava um homem que escrevia histórias. A leitura dos livros vem anos depois; a curiosidade
      pode começar agora.
    </Highlight>

    <H2>Por que contamos isso</H2>
    <P>
      Na Montessori, a criança aprende do concreto para o abstrato, e a história do lugar onde ela vive é um ótimo
      concreto. Um nome na placa, uma estátua na calçada, uma rua que mudou de número: tudo isso vira pergunta, e a
      pergunta da criança é por onde a aprendizagem começa. É a mesma ideia da{' '}
      <L to="/natureza-educacao-cosmica">educação cósmica</L>, que liga o que a criança vê ao mundo inteiro.
    </P>
    <P>
      A escola fica no início do bairro, na Rua das Laranjeiras, 540, e recebe crianças dos 9 meses ao Ensino
      Fundamental. Veja como chegar e o que oferecemos na página da{' '}
      <L to="/escola-cosme-velho">escola no Cosme Velho</L>, ou siga para o{' '}
      <L to="/blog/passeios-com-criancas-cosme-velho">roteiro de passeios com crianças pelo bairro</L>.
    </P>

    <Referencias
      itens={[
        { texto: 'Machado de Assis. Wikipédia (biografia, endereço na Rua Cosme Velho, datas de publicação).', url: 'https://pt.wikipedia.org/wiki/Machado_de_Assis' },
        { texto: 'Rio inaugura mais duas placas em imóveis onde viveram membros da ABL. O Povo, 24/07/2022.', url: 'https://www.opovo.com.br/noticias/brasil/2022/07/24/amp/rio-inaugura-mais-duas-placas-em-imoveis-onde-viveram-membros-da-abl.html' },
        { texto: 'Cafeteria do Cosme Velho homenageia Machado de Assis com estátua no local de sua antiga residência. Diário do Rio, 11/09/2024.', url: 'https://diariodorio.com/cafeteria-do-cosme-velho-homenageia-machado-de-assis-com-estatua-no-local-de-sua-antiga-residencia/' },
        { texto: 'Casa onde viveu Machado de Assis no Cosme Velho recebe exposição. Academia Brasileira de Letras (ABL na mídia), março de 2026.', url: 'https://www.academia.org.br/noticias/abl-na-midia-o-globo-casa-onde-viveu-machado-de-assis-no-cosme-velho-recebe-exposicao-de' },
        { texto: 'Análise: a invenção do "Bruxo do Cosme Velho". Brasil de Fato, 29/09/2021.', url: 'https://www.brasildefato.com.br/2021/09/29/analise-a-invencao-do-bruxo-do-cosme-velho' },
        { texto: 'Capitu Café. Os Melhores da Gastronomia, 08/05/2023.', url: 'https://www.osmelhoresdagastronomia.com.br/2023/05/08/capitu-cafe/' },
      ]}
    />
  </BlogLayout>
);
