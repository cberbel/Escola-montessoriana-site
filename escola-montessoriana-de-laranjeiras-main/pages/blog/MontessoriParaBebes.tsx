import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2, Referencias } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight, LandingImage } from '../../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const MontessoriParaBebes: React.FC = () => (
  <BlogLayout
    title="Método Montessori para bebês: como funciona na prática"
    metaDescription="O que é o método Montessori para bebês e crianças pequenas: mente absorvente, ambiente preparado, vida prática, materiais sensoriais e o que muda no desenvolvimento — explicado por quem vive isso todos os dias."
    dateDisplay="18 de julho de 2026"
    readingTime="6 min"
    image="/images/cerebro/bebe-material.jpg"
    imageAlt="Bebê concentrado encaixando discos coloridos em pinos de madeira numa sala Montessori"
  >
    <P>
      Quando os pais ouvem "Montessori", muitos imaginam móveis baixinhos e materiais de madeira. Isso existe — mas é
      só a parte visível. O essencial do método é outra coisa: uma forma de <strong>respeitar a inteligência da
      criança</strong> desde bebê, preparando o ambiente para que ela possa fazer sozinha o que já é capaz de fazer.
    </P>
    <P>
      Neste artigo, mostramos como isso funciona na prática com bebês e crianças pequenas — sem teoria abstrata, com
      exemplos do nosso dia a dia em sala.
    </P>

    <H2>A descoberta de Maria Montessori: a mente absorvente</H2>
    <P>
      Maria Montessori — médica e cientista — observou que a criança de 0 a 6
      anos não aprende como um adulto. Ela não "estuda" o mundo: ela o <strong>absorve</strong>, como uma esponja,
      pelo simples fato de viver nele. A língua materna é o melhor exemplo: nenhum bebê tem aula de português, e
      ainda assim todos aprendem — porque o cérebro dessa fase é uma máquina de absorver o ambiente.
    </P>
    <P>
      A consequência prática é enorme: se o ambiente é rico, calmo e cheio de experiências reais, é isso que a
      criança absorve. A neurociência moderna confirmou essa intuição —{' '}
      <L to="/desenvolvimento-cerebral">os primeiros anos constroem a arquitetura do cérebro</L>.
    </P>

    <H2>Como é uma sala Montessori para bebês</H2>
    <Bullets
      items={[
        <><strong>Tudo na altura da criança:</strong> estantes baixas, espelho no chão, barras para se levantar. O bebê não espera ser servido — ele alcança, escolhe, tenta.</>,
        <><strong>Materiais reais, um desafio de cada vez:</strong> encaixes, cestos de tesouros, objetos da vida real. Cada material isola uma habilidade e tem "controle de erro" — a própria criança percebe quando conseguiu.</>,
        <><strong>Movimento livre:</strong> nada de bebê "estacionado". Rolar, engatinhar, subir — o movimento é literalmente construção do cérebro, não bagunça.</>,
        <><strong>Poucos brinquedos, muita concentração:</strong> um ambiente com menos estímulos e mais propósito produz algo que surpreende os pais: bebês profundamente concentrados.</>,
        <><strong>Zero telas:</strong> nessa idade, o cérebro aprende com pessoas e com as mãos — nunca com vídeos.</>,
      ]}
    />
    <LandingImage src="/images/montessori/sensorial-encaixes.jpg" alt="Criança pequena trabalhando concentrada com encaixes sólidos Montessori" portrait />

    <H2>Vida prática: o "currículo" que parece rotina</H2>
    <P>
      Na sala Montessori, o bebê que já anda lava as mãos sozinho, serve a própria água, guarda o material na
      estante, ajuda a cuidar do espaço. Parece pouco? É exatamente o contrário: cada um desses gestos treina
      concentração, sequência lógica, coordenação fina e — acima de tudo — a convicção de que{' '}
      <em>"eu sou capaz"</em>. Autoestima não se ensina com elogio: se constrói com conquista real.
    </P>

    <H2>O papel do adulto: guia, não controlador</H2>
    <P>
      A professora Montessori observa cada criança individualmente e apresenta o material certo na hora certa. Ela
      não interrompe a concentração, não corrige por cima, não faz pela criança o que ela pode fazer sozinha. Com
      bebês, isso exige proximidade de verdade — por isso trabalhamos com{' '}
      <strong>1 professora para cada 3 bebês</strong> menores de 18 meses.
    </P>

    <H2>O que muda na criança</H2>
    <Bullets
      items={[
        'Concentração: períodos longos de atenção profunda, raros em crianças da mesma idade.',
        'Autonomia: vestir-se, comer, escolher — cada vez mais "eu consigo sozinho".',
        'Calma: um ambiente ordenado e previsível produz crianças mais seguras e menos ansiosas.',
        'Linguagem: adultos que conversam de verdade, na altura dos olhos, aceleram o vocabulário.',
        'Gentileza: cuidar do espaço, esperar a vez, ajudar o colega — vivido, não sermonizado.',
      ]}
    />

    <Highlight>
      Montessori não é "deixar a criança solta" nem "método rígido de madeira". É liberdade dentro de limites
      claros, num ambiente cientificamente preparado — e cem anos de prática (e de neurociência) mostrando que
      funciona.
    </Highlight>

    <P>
      Quer entender o método a fundo? Preparamos uma página completa sobre{' '}
      <L to="/metodo-montessori">o método Montessori</L> — de Maria Montessori ao currículo de cada área da sala. E
      se quiser ver uma sala Montessori de verdade funcionando, com bebês concentrados e crianças autônomas,{' '}
      <strong>venha nos visitar em Laranjeiras</strong>.
    </P>
    <Referencias
      itens={[
        { texto: "Center on the Developing Child, Harvard University. InBrief: The Science of Early Childhood Development (períodos sensíveis e interações de servir e devolver).", url: "https://developingchild.harvard.edu/resources/inbrief-science-of-ecd/" },
        { texto: "Lillard, A. S. et al. (2017). Montessori Preschool Elevates and Equalizes Child Outcomes: A Longitudinal Study. Frontiers in Psychology, 8:1783.", url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2017.01783/full" },
        { texto: "Lillard, A.; Else-Quest, N. (2006). Evaluating Montessori Education. Science, 313(5795), 1893–1894.", url: "https://www.science.org/doi/10.1126/science.1132362" },
      ]}
    />
  </BlogLayout>
);
