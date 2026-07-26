import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2 } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight, LandingImage } from '../../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const QuandoMatricular: React.FC = () => (
  <BlogLayout
    title="Com quantos meses colocar o bebê na escola? O que diz a ciência"
    metaDescription="Qual a melhor idade para matricular o bebê na escola infantil? O que a neurociência mostra sobre os primeiros anos, por que a qualidade importa mais que a idade, e como saber se a família está pronta."
<<<<<<< HEAD
    dateDisplay="16 de julho de 2026"
=======
    dateDisplay="julho de 2026"
>>>>>>> origin/main
    readingTime="6 min"
    image="/images/cerebro/leitura-bebes.jpg"
    imageAlt="Professora lendo um livro ilustrado para bebês atentos sentados ao seu redor"
  >
    <P>
      Essa talvez seja a pergunta mais frequente — e mais carregada de emoção — que ouvimos das famílias: <em>"não é
      cedo demais?"</em>. Ela costuma vir acompanhada de culpa, palpites dos avós e muita informação desencontrada.
      Vamos organizar essa conversa com o que a ciência realmente mostra.
    </P>

    <H2>O que acontece no cérebro do bebê nessa fase</H2>
    <P>
      Nos primeiros anos de vida, o cérebro forma até <strong>1 milhão de novas conexões por segundo</strong> — um
      ritmo que nunca mais se repete. Aos 3 anos, ele já alcançou cerca de 80% do peso adulto. O que constrói essas
      conexões não é apostila nem estimulação artificial: é <strong>interação humana de qualidade</strong> — colo,
      conversa, resposta, movimento, experiência.{' '}
      <L to="/desenvolvimento-cerebral">Explicamos essa ciência em detalhes aqui</L>.
    </P>
    <P>
      A pergunta certa, portanto, não é <em>"qual a idade mínima?"</em>, e sim: <strong>"onde meu filho vai receber
      mais interação de qualidade ao longo do dia?"</strong>. E a resposta é honesta: depende — da sua rede de apoio
      e da escola em questão.
    </P>

    <H2>O que os estudos mostram (sem simplificar demais)</H2>
    <Bullets
      items={[
        <><strong>Qualidade importa mais do que idade.</strong> Os grandes estudos convergem: o que prediz bons resultados não é "com quantos meses entrou", e sim a qualidade do cuidado — proporção de adultos por criança, estabilidade dos vínculos, linguagem dirigida ao bebê, ambiente seguro.</>,
        <><strong>Educação infantil de qualidade tem efeito positivo duradouro.</strong> A pesquisa do Nobel James Heckman mostra retornos altos da primeira infância bem cuidada — em linguagem, autorregulação e até saúde décadas depois.</>,
        <><strong>O risco está no cuidado de baixa qualidade</strong> — muitas crianças por adulto, rotatividade, telas, pouco colo. Não na escola em si.</>,
      ]}
    />
    <LandingImage src="/images/acolhimento/bebe-tranquilo.jpg" alt="Bebê tranquilo no colo de uma professora, em ambiente acolhedor da escola" portrait />

    <H2>Sinais de que pode ser a hora</H2>
    <Bullets
      items={[
        'A licença acabou (ou está acabando) e a alternativa seria o bebê passar o dia com pouca interação — TV ligada, adulto ocupado, pouco estímulo.',
        'A rede de apoio está esgotada, e o cuidado em casa virou sobrevivência, não presença.',
        'Vocês encontraram uma escola em que confiam de verdade — com poucos bebês por adulto e vínculo estável.',
        'O bebê já demonstra interesse por outras crianças e pelo mundo além do colo.',
      ]}
    />
    <P>
      Na prática, recebemos bebês <strong>a partir de 9 meses</strong> — idade em que a maioria já se beneficia
      muito de um ambiente preparado, desde que a proporção seja de poucos bebês por adulto (aqui,{' '}
      <strong>1 professora para cada 3 bebês</strong> até os 18 meses).
    </P>

    <H2>A adaptação: o que separa uma boa experiência de uma difícil</H2>
    <P>
      Mais importante do que a idade de entrada é <strong>como</strong> se entra. Uma adaptação bem-feita é gradual,
      respeita o ritmo do bebê e inclui a família no processo — primeiros dias curtos e acompanhados, vínculo com
      uma professora de referência, choro acolhido no colo (nunca ignorado).{' '}
      <L to="/acolhimento">Veja como conduzimos a adaptação</L>.
    </P>

    <H2>E a culpa?</H2>
    <P>
      Uma palavra para as mães e pais que chegam até aqui com o coração apertado: colocar o filho numa escola de
      qualidade <strong>não é terceirizar o amor</strong> — é ampliar a rede de gente que cuida, conversa e responde
      ao seu bebê. As horas em casa continuam sendo insubstituíveis. E um bebê que passa o dia recebendo linguagem,
      colo e experiência volta para casa com mais — não menos — para viver com vocês.
    </P>

    <Highlight>
      Não existe idade mágica igual para todas as famílias. Existe uma pergunta honesta — "onde meu filho recebe
      mais qualidade de interação ao longo do dia?" — e a tranquilidade de saber que, com a escola certa, a resposta
      pode ser "na escola" desde bem cedo.
    </Highlight>

    <P>
      Se quiser conversar sobre o momento da sua família — sem pressa e sem pressão — venha tomar um café conosco e
      ver os bebês da nossa Agrupada 1 em ação. Às vezes, dez minutos observando uma sala tranquila respondem mais
      do que qualquer artigo.
    </P>
  </BlogLayout>
);
