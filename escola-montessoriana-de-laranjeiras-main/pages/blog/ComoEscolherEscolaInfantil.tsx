import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2, Referencias } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight } from '../../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const ComoEscolherEscolaInfantil: React.FC = () => (
  <BlogLayout
    title="Como escolher uma escola infantil em Laranjeiras: o guia para pais"
    metaDescription="O que observar ao escolher uma escola de educação infantil em Laranjeiras, RJ: proporção de adultos por criança, projeto pedagógico, alimentação, telas, espaço externo — e as perguntas certas para fazer na visita."
    dateDisplay="20 de julho de 2026"
    readingTime="7 min"
    image="/images/acolhimento/colo-patio.jpg"
    imageAlt="Professora com bebê no colo no pátio arborizado de uma escola infantil em Laranjeiras"
  >
    <P>
      Escolher a primeira escola do seu filho é uma das decisões mais importantes que uma família toma — e uma das
      mais difíceis. Em Laranjeiras e arredores há dezenas de opções, os sites são todos bonitos e, na visita, todas
      as escolas parecem acolhedoras. Como decidir de verdade?
    </P>
    <P>
      Este guia reúne o que a ciência do desenvolvimento infantil e a nossa experiência no dia a dia mostram que{' '}
      <strong>realmente faz diferença</strong> — incluindo o que observar numa visita e as perguntas que poucos pais
      fazem (e deveriam).
    </P>

    <H2>Comece pelo critério certo (e não é a distância)</H2>
    <P>
      A maioria das famílias começa a busca por "creche perto de casa" — é natural, a logística pesa. Mas vale fazer
      uma conta simples: a diferença entre a escola mais próxima e uma escola melhor costuma ser de{' '}
      <strong>minutos no trajeto</strong>, enquanto a criança passa <strong>de 4 a 9 horas por dia</strong> dentro da
      escola, nos anos em que o cérebro dela mais se desenvolve em toda a vida.
    </P>
    <P>
      Nos primeiros anos, o cérebro forma até 1 milhão de novas conexões por segundo, e a qualidade das interações
      nesse período constrói a base de tudo o que vem depois —{' '}
      <L to="/desenvolvimento-cerebral">explicamos a ciência disso aqui</L>. Dez minutos a mais de deslocamento por
      um ambiente muito melhor é, provavelmente, a melhor troca que você fará.
    </P>

    <H2>O que observar na visita</H2>
    <Bullets
      items={[
        <><strong>Quantos adultos por criança?</strong> É o indicador de qualidade mais estudado. Para bebês, procure proporções próximas de 1 adulto para cada 3 bebês — com mais crianças por adulto, não há colo, olhar e resposta suficientes para cada um.</>,
        <><strong>As crianças estão engajadas?</strong> Repare se estão concentradas em atividades reais ou vagando sem propósito. Crianças pequenas concentradas e calmas são o melhor "atestado" de um ambiente bem preparado.</>,
        <><strong>Como os adultos falam com as crianças?</strong> Agachados, na altura dos olhos, pelo nome? A linguagem dirigida individualmente a cada criança é um dos maiores previsores do desenvolvimento futuro.</>,
        <><strong>Tem espaço externo de verdade?</strong> Sol, verde, areia, movimento livre. Corpo e cérebro se desenvolvem juntos — uma escola sem área externa cobra esse preço do desenvolvimento motor.</>,
        <><strong>O que as crianças comem?</strong> Peça para ver o cardápio. Comida de verdade, feita na escola, sem ultraprocessados, é cuidado de saúde — não detalhe.</>,
        <><strong>Tem tela?</strong> A Sociedade Brasileira de Pediatria recomenda zero telas antes dos 2 anos. Se a escola usa TV ou tablet para "acalmar" as crianças, isso diz muito sobre a proposta.</>,
      ]}
    />

    <H2>As perguntas que poucos pais fazem</H2>
    <Bullets
      items={[
        <><strong>"Qual é o projeto pedagógico — e como ele aparece na prática?"</strong> Qualquer escola diz que tem um. Peça exemplos concretos: o que uma criança de 2 anos fez ontem de manhã? Numa escola com método sério (como o <L to="/metodo-montessori">Montessori</L>), a resposta é específica, não genérica.</>,
        <><strong>"Como funciona a adaptação?"</strong> Escolas cuidadosas têm um processo gradual, com a família participando, no ritmo de cada criança — <L to="/acolhimento">veja como fazemos</L>.</>,
        <><strong>"Como vocês me contam sobre o dia do meu filho?"</strong> Agenda real, fotos, conversa na porta? Comunicação transparente é sinal de escola segura de si.</>,
        <><strong>"Qual a rotatividade da equipe?"</strong> Professoras que ficam anos na escola criam vínculos estáveis — e vínculo é a base de tudo nessa idade.</>,
      ]}
    />

    <H2>Sinais de alerta</H2>
    <Bullets
      items={[
        'Visita apenas com hora marcada e sala "preparada para receber" — desconfie de escola que não permite ver a rotina real.',
        'Muitas crianças chorando por longos períodos sem colo ou consolo.',
        'TV ligada, telas como entretenimento.',
        'Respostas vagas sobre proporção de adultos, formação da equipe ou cardápio.',
        'Promessas de alfabetização precoce como argumento principal — nessa fase, a base certa não é apostila, é vínculo, movimento, linguagem e autonomia.',
      ]}
    />

    <Highlight>
      Resumo prático: visite pelo menos três escolas, vá com as perguntas deste guia, observe as crianças (mais do
      que a decoração) — e não deixe a distância decidir sozinha o que os próximos anos do cérebro do seu filho vão
      viver todos os dias.
    </Highlight>

    <P>
      Se você está nessa busca em Laranjeiras, Flamengo, Botafogo, Catete ou Cosme Velho, venha nos visitar: a
      Escola Montessoriana de Laranjeiras atende crianças <strong>a partir de 9 meses</strong>, com método
      Montessori, <L to="/ingles-primeira-infancia">imersão diária em inglês</L>, alimentação saudável feita na
      escola, política de zero telas e um pátio verde onde a infância acontece ao ar livre.
    </P>
    <Referencias
      itens={[
        { texto: "Center on the Developing Child, Harvard University. Brain Architecture — mais de 1 milhão de novas conexões neurais por segundo nos primeiros anos.", url: "https://developingchild.harvard.edu/science/key-concepts/brain-architecture/" },
        { texto: "NICHD Early Child Care Research Network (2006). The NICHD Study of Early Child Care and Youth Development: Findings for Children up to Age 4½ Years — a qualidade do cuidado prediz mais os resultados do que a idade de entrada ou a quantidade de horas.", url: "https://www.nichd.nih.gov/sites/default/files/publications/pubs/documents/seccyd_06.pdf" },
        { texto: "Sociedade Brasileira de Pediatria (2019). Manual de Orientação: #MenosTelas #MaisSaúde — recomenda evitar telas antes dos 2 anos.", url: "https://www.sbp.com.br/fileadmin/user_upload/_22246c-ManOrient_-__MenosTelas__MaisSaude.pdf" },
        { texto: "American Academy of Pediatrics, Council on Communications and Media (2016). Media and Young Minds. Pediatrics, 138(5).", url: "https://doi.org/10.1542/peds.2016-2591" },
      ]}
    />
  </BlogLayout>
);
