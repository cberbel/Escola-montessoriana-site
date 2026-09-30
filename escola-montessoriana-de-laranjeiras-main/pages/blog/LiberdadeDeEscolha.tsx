import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2, Referencias } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight, LandingImage } from '../../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const LiberdadeDeEscolha: React.FC = () => (
  <BlogLayout
    title="Liberdade de escolha na Montessori: como a criança decide o próprio dia"
    metaDescription="Na sala Montessori a criança chega, observa, escolhe o trabalho, fica enquanto o interesse durar, guarda e escolhe de novo. Como funciona essa liberdade, quais são os limites e por que escolher sustenta a aprendizagem."
    dateDisplay="30 de setembro de 2026"
    readingTime="5 min"
    image="/images/montessori/vida-pratica-tapete.jpg"
    imageAlt="Criança escolhe um trabalho e o leva para o tapete, na sala Montessori"
  >
    <P>
      Duas salas, duas manhãs, duas lógicas de escolha. A diferença entre elas diz muito sobre como a criança
      aprende — e sobre o que ela aprende a esperar de si mesma.
    </P>

    <H2>A manhã na sala tradicional</H2>
    <P>
      Na sala tradicional, o dia chega pronto. O que estudar, em que ordem e por quanto tempo foi decidido antes de a
      criança passar pela porta: a turma inteira faz a mesma atividade ao mesmo tempo, e o sinal marca a hora de
      trocar, esteja ela no começo ou no meio de uma descoberta. O momento de escolha livre costuma ser um só — o
      recreio. Não por acaso, é a parte preferida do dia para tanta criança.
    </P>

    <H2>A manhã na sala Montessori</H2>
    <P>
      Na sala Montessori, a criança decide o próprio dia. E essa liberdade não é um detalhe simpático do método:{' '}
      <strong>ela é a própria estrutura da manhã</strong>. O ciclo é simples e se repete do começo ao fim:
    </P>
    <Bullets
      items={[
        <><strong>Chega e observa.</strong> A criança olha as estantes baixas, os colegas trabalhando, o que está ao alcance.</>,
        <><strong>Escolhe.</strong> Pega um trabalho sozinha — o encaixe, a bandeja de transferir água, as letras de lixa.</>,
        <><strong>Permanece enquanto o interesse durar.</strong> Pode ser cinco minutos ou quarenta. Ninguém toca o sinal no meio.</>,
        <><strong>Guarda.</strong> Devolve o material no lugar, pronto para o próximo colega.</>,
        <><strong>Escolhe de novo.</strong> E o ciclo recomeça.</>,
      ]}
    />
    <LandingImage src="/images/turmas/agrupada-2.jpg" alt="Menina trabalha com a torre rosa enquanto a sala segue em atividade ao redor" portrait />

    <H2>Liberdade, sim — mas com limites claros</H2>
    <P>
      Liberdade de escolha não é "cada um faz o que quer". Ela tem contornos bem definidos, e é justamente isso que
      a torna possível:
    </P>
    <Bullets
      items={[
        <><strong>A criança escolhe entre o que já aprendeu a usar.</strong> Cada material é apresentado antes por um adulto; a partir daí, ele entra no repertório de escolhas.</>,
        <><strong>O trabalho precisa ser construtivo</strong> — para ela e para o grupo. Usar o material com cuidado, respeitar quem está concentrado, não atrapalhar o trabalho do outro.</>,
        <><strong>O ambiente é preparado.</strong> Há um exemplar de cada material, tudo tem lugar e tudo está ao alcance. Esperar a vez também faz parte.</>,
      ]}
    />
    <P>
      É uma liberdade que se aprende. Quanto mais a criança se conhece e conhece o ambiente, mais ela consegue
      escolher sozinha — e mais escolhas passam a caber no dia dela.
    </P>

    <H2>Por que escolher faz tanta diferença</H2>
    <P>
      A psicologia do desenvolvimento chegou, por outro caminho, ao que Maria Montessori observou há mais de um
      século. A teoria da autodeterminação, de Edward Deci e Richard Ryan, descreve a <strong>autonomia</strong> —
      sentir que as próprias ações partem de si — como uma necessidade psicológica básica, ao lado de se sentir
      competente e de estar em vínculo com os outros. Quando essas necessidades são atendidas, a motivação que nasce
      de dentro floresce. Uma meta-análise com dezenas de estudos encontrou o mesmo padrão: poder escolher aumenta o
      interesse e o esforço na tarefa.
    </P>
    <P>
      Em outras palavras: a escolha não compete com a aprendizagem. <strong>Ela sustenta a aprendizagem.</strong> A
      criança que escolheu o que está fazendo fica mais tempo, tenta de novo quando erra e termina o que começou.
    </P>
    <LandingImage src="/images/montessori/sensorial-encaixes.jpg" alt="Criança concentrada trabalhando com os encaixes sólidos" portrait />

    <H2>Como isso acontece aqui na escola</H2>
    <Bullets
      items={[
        <><strong>3 horas de trabalho sem cortes.</strong> A manhã é um bloco longo, sem troca de atividade a cada meia hora — tempo para a escolha virar concentração.</>,
        <><strong>Estantes abertas e baixas.</strong> Tudo à vista e ao alcance da criança, organizado por área.</>,
        <><strong>Turmas agrupadas por idade.</strong> Os menores escolhem inspirados pelo que veem os maiores fazendo; os maiores consolidam o que sabem ajudando os menores.</>,
      ]}
    />
    <P>
      Quer ver como isso funciona na prática? A página sobre o <L to="/metodo-montessori">método Montessori</L> mostra
      as áreas da sala, e a de <L to="/turmas">turmas</L> explica os agrupamentos.
    </P>

    <H2>E em casa?</H2>
    <P>
      Não é preciso transformar a casa numa sala de aula. Pequenas escolhas reais já fazem diferença: qual das duas
      camisetas vestir, que livro ler antes de dormir, se ajuda a lavar as folhas da salada ou a pôr a mesa. Oferecer
      duas ou três opções possíveis — e respeitar a escolha — é um exercício diário de autonomia.
    </P>

    <Highlight>
      Na Montessori, a liberdade de escolher não é um prêmio no fim do dia. É a forma como o dia é construído — e é a
      partir dela que a criança aprende a se concentrar, a persistir e a confiar em si mesma.
    </Highlight>

    <P>
      A melhor forma de entender é ver de perto: <L to="/agendamento">agende uma visita</L> e passe uma manhã
      olhando as crianças escolherem.
    </P>
    <Referencias
      itens={[
        { texto: 'Ryan, R. M. & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68–78.', url: 'https://selfdeterminationtheory.org/SDT/documents/2000_RyanDeci_SDT.pdf' },
        { texto: 'Patall, E. A., Cooper, H. & Robinson, J. C. (2008). The effects of choice on intrinsic motivation and related outcomes: a meta-analysis of research findings. Psychological Bulletin, 134(2), 270–300.', url: 'https://doi.org/10.1037/0033-2909.134.2.270' },
        { texto: 'Lillard, A. & Else-Quest, N. (2006). Evaluating Montessori education. Science, 313(5795), 1893–1894.', url: 'https://doi.org/10.1126/science.1132362' },
      ]}
    />
  </BlogLayout>
);
