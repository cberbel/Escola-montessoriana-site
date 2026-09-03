import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2, Referencias } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight, LandingImage } from '../../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const ZeroTelas: React.FC = () => (
  <BlogLayout
    title="Zero telas na primeira infância: por que fomos além da recomendação oficial"
    metaDescription="O que as telas fazem com o cérebro da criança pequena: cortes rápidos demais, excesso de dopamina e de estímulo, e o custo de oportunidade de não trabalhar no concreto. E por que 'zero até os 2' pode ser pouco."
    dateDisplay="25 de julho de 2026"
    readingTime="7 min"
    image="/images/montessori/concentracao.jpg"
    imageAlt="Criança pequena profundamente concentrada em um trabalho manual com material concreto"
  >
    <P>
      Nossa escola tem uma política de <strong>zero telas</strong> — nenhuma TV, nenhum tablet, em nenhuma turma. Não
      é radicalismo estético: é uma decisão baseada no que se sabe sobre o cérebro em construção. Neste artigo,
      explicamos os mecanismos — e também por que achamos que a recomendação oficial, "zero telas até os 2 anos",
      merece ser lida com espírito crítico. Só que na direção oposta à que muitos imaginam.
    </P>

    <H2>O que a tela faz com um cérebro em construção</H2>
    <P>
      O problema não é "a tela" como objeto — é o que ela entrega e o que ela substitui. Quatro mecanismos merecem
      atenção:
    </P>
    <Bullets
      items={[
        <><strong>Cortes rápidos demais para um cérebro que está calibrando a atenção.</strong> Desenhos e vídeos infantis trocam de cena a cada poucos segundos — um ritmo que não existe no mundo real. O cérebro se habitua a receber novidade constante sem esforço, e o mundo concreto, no ritmo real, passa a parecer "lento demais". Num experimento clássico (Lillard e Peterson, 2011), <strong>9 minutos</strong> de um desenho acelerado bastaram para reduzir o autocontrole e a função executiva de crianças de 4 anos, medidos logo em seguida.</>,
        <><strong>Excesso de dopamina.</strong> Telas infantis são projetadas para recompensar sem parar: cores saturadas, sons de vitória, novidade a cada toque, próximo episódio automático. Esse gotejamento de dopamina fácil compete de forma desleal com as recompensas lentas do mundo real — que são justamente as que constroem persistência e tolerância à frustração.</>,
        <><strong>Excesso de estímulo.</strong> A hipótese da superestimulação, estudada por Dimitri Christakis, associa exposição precoce e intensa a telas com dificuldades posteriores de atenção. Um sistema nervoso pequeno, bombardeado além da sua medida, não fica "mais estimulado" — fica desregulado.</>,
        <><strong>O custo de oportunidade: cada hora de tela é uma hora sem o concreto.</strong> Talvez o dano mais subestimado. Nessa idade, o cérebro aprende pela mão: encaixar, versar, empilhar, rasgar, equilibrar. É o trabalho no concreto que constrói matemática, linguagem e coordenação — e a pesquisa de Patricia Kuhl mostrou que o bebê <strong>não aprende nada</strong> do mesmo conteúdo quando ele vem de um vídeo, sem uma pessoa real interagindo. A tela não acrescenta uma experiência: ela toma o lugar de uma.</>,
      ]}
    />
    <LandingImage src="/images/montessori/sensorial-encaixes-solidos.jpg" alt="Mãos de criança trabalhando com os encaixes sólidos: o aprendizado pelo concreto" portrait />

    <H2>"Zero até os 2 anos" — e depois, pode?</H2>
    <P>
      As recomendações oficiais (como as da Sociedade Brasileira de Pediatria) dizem: nenhuma tela antes dos 2 anos,
      e uso bem limitado dos 2 aos 5. São orientações valiosas — mas muita gente as lê como um alvará:{' '}
      <em>"fez 2 anos, liberou"</em>. Vale perguntar: <strong>quem disse que os mecanismos acima param de valer no
      aniversário de 2 anos?</strong>
    </P>
    <P>
      Não há nada mágico nessa data. O corte etário das diretrizes é uma convenção prudente, não uma fronteira
      biológica — e os estudos de dano não param nos 2 anos: o experimento dos desenhos acelerados foi feito com
      crianças de <strong>4 anos</strong>. Aos 3 e 4 anos, a atenção, a função executiva e a linguagem seguem em
      plena construção, pelos mesmos caminhos: interação humana, movimento e trabalho concreto. Se a tela compete
      com isso aos 18 meses, compete igualmente aos 4 anos.
    </P>

    <H2>O uso cresce com os anos — por isso o começo importa tanto</H2>
    <P>
      Há ainda um efeito de trajetória: o consumo de telas quase nunca diminui com a idade — ele{' '}
      <strong>escala</strong>. O desenho de 20 minutos vira o tablet no restaurante, que vira o celular próprio, que
      vira horas diárias na adolescência. Cada ano de início mais cedo tende a significar mais uso acumulado pela
      infância inteira, com hábitos e expectativas já instalados. Adiar o início não é ganhar meses: é ganhar a
      infância — e é muito mais fácil nunca instalar o hábito do que reduzi-lo depois.
    </P>

    <H2>O que oferecemos no lugar (e o que fazer em casa)</H2>
    <Bullets
      items={[
        <>Na escola: ambiente preparado com materiais concretos, <L to="/natureza-educacao-cosmica">pátio, horta e natureza</L>, música ao vivo, livros e conversa de verdade — <L to="/metodo-montessori">o método Montessori</L> é, na prática, um programa de atenção profunda.</>,
        'Em casa: caixas, panelas, água, massinha, livros — o "brinquedo" mais desenvolvedor é o mundo real com um adulto por perto.',
        'Refeições e trajetos sem tela: são os momentos de conversa que mais constroem vocabulário.',
        'Se optar por usar telas com crianças maiores: pouco, junto (não como babá eletrônica), conteúdo lento, e nunca perto do sono.',
        'O exemplo pesa: criança de pais que largam o celular no chão da sala aprende mais sobre atenção do que com qualquer regra.',
      ]}
    />

    <Highlight>
      Nossa posição é simples: se os mecanismos de dano — ritmo artificial, dopamina fácil, superestimulação e o
      roubo do tempo no concreto — não respeitam aniversários, a proteção também não deveria. Por isso, aqui, a
      primeira infância inteira é vivida sem telas. O cérebro do seu filho agradece —{' '}
      <L to="/desenvolvimento-cerebral">a ciência explica por quê</L>.
    </Highlight>
    <Referencias
      itens={[
        { texto: "Lillard, A. S.; Peterson, J. (2011). The Immediate Impact of Different Types of Television on Young Children's Executive Function. Pediatrics, 128(4), 644–649.", url: "https://doi.org/10.1542/peds.2010-1919" },
        { texto: "Kuhl, P. K.; Tsao, F.-M.; Liu, H.-M. (2003). Foreign-language experience in infancy: effects of short-term exposure and social interaction on phonetic learning. PNAS, 100(15), 9096–9101.", url: "https://www.pnas.org/doi/10.1073/pnas.1532872100" },
        { texto: "American Academy of Pediatrics, Council on Communications and Media (2016). Media and Young Minds. Pediatrics, 138(5).", url: "https://doi.org/10.1542/peds.2016-2591" },
        { texto: "Organização Mundial da Saúde (2019). Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age — nenhum tempo de tela antes de 1 ano; no máximo 1 hora entre 2 e 4 anos.", url: "https://www.who.int/publications/i/item/9789241550536" },
        { texto: "Sociedade Brasileira de Pediatria (2019). Manual de Orientação: #MenosTelas #MaisSaúde — recomenda evitar telas antes dos 2 anos.", url: "https://www.sbp.com.br/fileadmin/user_upload/_22246c-ManOrient_-__MenosTelas__MaisSaude.pdf" },
      ]}
    />
  </BlogLayout>
);
