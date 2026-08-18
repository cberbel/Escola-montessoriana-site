import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2 } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight, LandingImage } from '../../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const EscolaMontessoriRio: React.FC = () => (
  <BlogLayout
    title="Escola Montessori no Rio de Janeiro: como saber se é de verdade"
    metaDescription='O nome "Montessori" não é marca registrada. Como avaliar uma escola Montessori no Rio de Janeiro: critérios objetivos, perguntas para a visita e sinais de alerta.'
    dateDisplay="18 de agosto de 2026"
    readingTime="8 min"
    image="/images/montessori/vida-pratica-estante.jpg"
    imageAlt="Criança pega seu trabalho sozinha na estante baixa de uma sala Montessori preparada"
  >
    <P>
      Quem pesquisa <em>escola Montessori no Rio de Janeiro</em> encontra dezenas de resultados — da Zona Sul à
      Barra, do Centro à Tijuca. E esbarra num problema que poucos pais conhecem: <strong>"Montessori" não é uma
      marca registrada</strong>. Qualquer escola pode escrever o nome na fachada, sem compromisso nenhum com o
      método. Algumas são Montessori de verdade; outras têm uma prateleira de madeira na foto e uma rotina
      tradicional por trás dela.
    </P>
    <P>
      A boa notícia: Montessori de verdade é <strong>observável</strong>. Não depende de discurso — depende de
      práticas concretas que você consegue verificar em uma única visita, sabendo o que olhar. Este guia é esse
      roteiro.
    </P>

    <H2>Os 7 sinais de uma escola Montessori de verdade</H2>
    <Bullets
      items={[
        <><strong>Ambiente preparado de verdade.</strong> Mobília na altura das crianças, materiais completos, organizados e ao alcance das mãos, sala dividida por áreas (vida prática, sensorial, linguagem, matemática). A sala é feita para a criança usar sozinha — não para o adulto administrar.</>,
        <><strong>Idades misturadas.</strong> As turmas agrupam ciclos de cerca de 3 anos (por exemplo, 2,5 a 6 anos), e não um ano de nascimento por sala. É estrutural no método: os maiores consolidam ensinando, os menores se inspiram nos maiores.</>,
        <><strong>Ciclo de trabalho longo e ininterrupto.</strong> A criança tem um longo período seguido para escolher, mergulhar e repetir o trabalho — sem a rotina picada em "aulinhas" de 30 minutos que interrompem justamente a concentração que o método existe para construir.</>,
        <><strong>Liberdade com limites.</strong> A criança escolhe o próprio trabalho dentro de um repertório apresentado; não faz "todos a mesma atividade ao mesmo tempo".</>,
        <><strong>Guias com formação montessoriana.</strong> Ser professora Montessori exige formação específica no método — pergunte qual é e como a equipe se forma e se atualiza.</>,
        <><strong>Materiais científicos originais.</strong> Torre rosa, escada marrom, material dourado, letras de lixa: os materiais clássicos, em bom estado e em uso real — não de decoração.</>,
        <><strong>Observação em vez de prova.</strong> Na primeira infância, o acompanhamento é feito por observação e registro do que a criança já conquistou — não por avaliações formais, notas ou comparações.</>,
      ]}
    />
    <LandingImage
      src="/images/montessori/sensorial-torre-rosa.jpg"
      alt="Criança concentrada montando a Torre Rosa, material Montessori clássico, na sala preparada"
    />

    <H2>Sinais de alerta</H2>
    <Bullets
      items={[
        <><strong>Turmas separadas por ano de nascimento</strong> com nome Montessori na porta.</>,
        <><strong>Rotina fragmentada:</strong> troca de atividade a cada meia hora, comandada pelo adulto.</>,
        <><strong>Prêmios, castigos e quadros de comportamento</strong> como motor da disciplina — o oposto da disciplina interior que o método constrói.</>,
        <><strong>Telas na primeira infância</strong> — desenho na TV para "acalmar" é o contrário de um ambiente preparado.</>,
        <><strong>"Montessori" só no berçário do marketing:</strong> materiais novos demais, expostos alto demais, sala bonita de foto em que nenhuma criança mexe em nada.</>,
      ]}
    />

    <H2>As perguntas certas para fazer na visita</H2>
    <Bullets
      items={[
        'Quantos anos as crianças ficam na mesma sala, e qual a faixa de idades dela?',
        'Quanto tempo dura o ciclo de trabalho sem interrupção?',
        'Qual a formação montessoriana das guias?',
        'Como vocês conduzem a adaptação? O que fazem quando o bebê chora?',
        'Posso observar uma sala em funcionamento?',
      ]}
    />
    <P>
      A última pergunta é a mais importante. Uma escola Montessori de verdade tem orgulho de mostrar a sala em
      atividade — dez minutos observando crianças concentradas, circulando com propósito e trabalhando sozinhas
      dizem mais do que qualquer apresentação.
    </P>

    <H2>Zona Sul, Tijuca, Barra: onde procurar escola Montessori no Rio</H2>
    <P>
      As escolas que se apresentam como Montessori estão espalhadas pela cidade — e é justamente por isso que os
      critérios acima importam mais do que o bairro: eles viajam com você para qualquer visita, em qualquer zona.
      Comece pelas escolas no seu raio possível de deslocamento, aplique a lista e só então compare.
    </P>
    <P>
      No Rio, a escolha muitas vezes se resume a "a escola boa fica longe" contra "a escolinha perto de casa".
      Essa conta tem mais variáveis do que parece — já fizemos{' '}
      <L to="/blog/erro-escolher-escola-perto-de-casa">a conta entre os minutos de trajeto e as horas que seu
      filho vive dentro da escola</L>.
    </P>

    <H2>Onde entra a nossa escola nessa conversa</H2>
    <P>
      A <strong>Escola Montessoriana de Laranjeiras</strong> fica na Zona Sul do Rio, na Rua das Laranjeiras, 540 —
      a poucos minutos do Cosme Velho, do Catete, do Flamengo e de Botafogo. Atendemos do{' '}
      <L to="/creche-laranjeiras">berçário, a partir dos 9 meses</L>, ao Ensino Fundamental, em{' '}
      <L to="/turmas">turmas de idades misturadas</L>, com ciclo de trabalho longo, política de zero telas e
      imersão diária no inglês. E fazemos questão do critério mais exigente da lista: <strong>visite e observe uma
      sala em funcionamento</strong> — é assim que preferimos ser avaliados.{' '}
      <L to="/metodo-montessori">Aqui explicamos o método na prática</L>.
    </P>

    <Highlight>
      "Montessori" na fachada não diz nada; a sala em funcionamento diz tudo. Idades misturadas, ciclo de trabalho
      longo, ambiente preparado, guias formadas no método e liberdade com limites — esses cinco pontos, observados
      ao vivo, separam o método de verdade do Montessori de marketing.
    </Highlight>
  </BlogLayout>
);
