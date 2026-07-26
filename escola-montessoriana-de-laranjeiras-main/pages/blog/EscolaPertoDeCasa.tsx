import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2 } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight, LandingImage } from '../../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

const distancias = [
  { local: 'Praça São Salvador', distancia: '~1,1 km', carro: '4–6 min', pe: '~15 min' },
  { local: 'Rua Conde de Baependi', distancia: '~1,4 km', carro: '5–7 min', pe: '~18 min' },
  { local: 'Catete (Largo do Machado)', distancia: '~1,9 km', carro: '6–9 min', pe: '~24 min' },
  { local: 'Glória', distancia: '~2,8 km', carro: '10–15 min', pe: '—' },
  { local: 'Praia do Flamengo', distancia: '~2,9 km', carro: '~15 min', pe: '—' },
  { local: 'Largo dos Leões (Humaitá)', distancia: '~3,4 km', carro: '10–14 min', pe: '—' },
];

export const EscolaPertoDeCasa: React.FC = () => (
  <BlogLayout
    title="O erro mais comum na escolha da escola infantil: a escolinha perto de casa"
    metaDescription="Por que escolher a escola infantil apenas pela proximidade é o erro mais frequente dos pais: arquitetura cerebral, skills beget skills, o diferencial Montessori — e a conta real entre minutos de trajeto e horas de escola."
    dateDisplay="26 de julho de 2026"
    readingTime="7 min"
    image="/images/espaco.jpg"
    imageAlt="Espaço amplo e preparado da Escola Montessoriana de Laranjeiras"
  >
    <P>
      Depois de centenas de conversas com famílias, dá para dizer com segurança qual é o erro mais frequente na
      escolha da escola infantil. Não é escolher a mais barata, nem a mais bonita. É outro, cometido inclusive por
      pais muito cuidadosos: <strong>escolher a escolinha mais perto de casa — e deixar a distância decidir
      sozinha</strong>.
    </P>
    <P>
      A lógica parece razoável: "criança pequena, escola é tudo igual, então que seja a mais prática". O problema é
      que as duas premissas estão erradas. Escola de educação infantil <em>não</em> é tudo igual — e é justamente
      nessa fase que a diferença entre ambientes mais importa.
    </P>

    <H2>O que está em jogo: a arquitetura do cérebro</H2>
    <P>
      Nos primeiros anos de vida, o cérebro forma até <strong>1 milhão de novas conexões neurais por segundo</strong> —
      um ritmo que nunca mais se repete. O Center on the Developing Child, de Harvard, chama esse processo de{' '}
      <strong>arquitetura cerebral</strong>: como num prédio, a fundação se constrói uma única vez, e a qualidade
      dessa fundação depende diretamente da qualidade das experiências vividas — conversa dirigida, movimento,
      afeto, desafios na medida. <L to="/desenvolvimento-cerebral">Mostramos essa ciência em detalhes aqui</L>.
    </P>
    <P>
      E há um efeito multiplicador que o Nobel de economia James Heckman batizou de{' '}
      <strong>"skills beget skills"</strong>: habilidade gera habilidade. Atenção, autorregulação e linguagem
      construídas agora são os alicerces sobre os quais a leitura, o raciocínio e as relações sociais se apoiam
      depois. Quem constrói a base cedo acumula juros pela vida inteira; quem não constrói tenta erguer o segundo
      andar sem o primeiro pronto.
    </P>

    <H2>Por que o ambiente Montessori faz diferença nessa construção</H2>
    <P>
      Se o que constrói o cérebro é a qualidade da experiência diária, o método importa — e muito. No ambiente
      Montessori, dois resultados aparecem de forma consistente, inclusive em pesquisas comparativas (como as da
      psicóloga Angeline Lillard):
    </P>
    <Bullets
      items={[
        <><strong>Funções executivas mais fortes:</strong> a criança escolhe seu trabalho, sustenta longos períodos de concentração ininterrupta e se autocorrige com materiais que mostram o próprio erro. Foco, controle inibitório e persistência são exercitados o dia inteiro — não em "aulinhas", mas na estrutura do método.</>,
        <><strong>Mais criatividade, não menos:</strong> a livre escolha dentro de um ambiente preparado ensina a criança a formular o próprio plano — o oposto de passar o dia executando comandos de um adulto. Criatividade nasce de autonomia com repertório, e é exatamente isso que a sala Montessori oferece.</>,
      ]}
    />
    <P>
      <L to="/metodo-montessori">Explicamos o método área por área aqui</L>. O ponto central: entre uma escola onde a
      criança espera, assiste e obedece, e uma onde ela escolhe, se concentra e se corrige — o cérebro construído ao
      longo de milhares de horas não é o mesmo.
    </P>

    <H2>A conta que ninguém faz: minutos de trajeto × horas de escola</H2>
    <P>
      Agora, a matemática da "praticidade". Uma criança em período integral passa <strong>de 7 a 9 horas por dia</strong>{' '}
      na escola — cerca de <strong>1.800 horas por ano</strong>. A diferença de trajeto para uma escola 1 ou 2 km
      mais distante? Uns 5 a 10 minutos por viagem. Somando o ano inteiro, isso dá em torno de 30 a 60 horas extras
      de deslocamento — contra <strong>1.800 horas</strong> em que seu filho estará dentro do ambiente que você
      escolheu.
    </P>
    <P>
      Em outras palavras: você troca <strong>3%</strong> de tempo a mais no carrinho ou no carro por{' '}
      <strong>100%</strong> das horas do dia do seu filho num ambiente muito melhor.
    </P>

    <H2>"Mas eu moro longe…" — moro mesmo?</H2>
    <P>
      Muita gente dos bairros vizinhos acha que a Rua das Laranjeiras, 540 é "longe". Fizemos a conta real, em
      trânsito normal:
    </P>
    <div className="overflow-x-auto my-6">
      <table className="w-full text-left border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-montessori-green text-white">
            <th className="px-4 py-3 font-semibold rounded-tl-sm">Saindo de</th>
            <th className="px-4 py-3 font-semibold">Distância</th>
            <th className="px-4 py-3 font-semibold">De carro</th>
            <th className="px-4 py-3 font-semibold rounded-tr-sm">A pé</th>
          </tr>
        </thead>
        <tbody>
          {distancias.map((d, i) => (
            <tr key={d.local} className={i % 2 === 0 ? 'bg-montessori-cream/60' : 'bg-white'}>
              <td className="px-4 py-3 font-medium text-montessori-dark">{d.local}</td>
              <td className="px-4 py-3 text-gray-700">{d.distancia}</td>
              <td className="px-4 py-3 text-gray-700">{d.carro}</td>
              <td className="px-4 py-3 text-gray-700">{d.pe}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-sm text-gray-500">
        Estimativas em horário fora de pico, a partir da Rua das Laranjeiras, 540 (fundos) — o trajeto da Praia do
        Flamengo foi cronometrado de verdade, de carro, no meio da manhã. Vale conferir no seu aplicativo de mapas
        no seu horário real.
      </p>
    </div>
    <P>
      Da Praça São Salvador ou da Conde de Baependi, o "longe" são <strong>5 minutos de carro</strong> — menos tempo
      do que se gasta procurando desenho na TV. Do Catete e do Largo dos Leões, cabe num café. A pergunta honesta
      não é "quanto tempo a mais eu gasto?", e sim:{' '}
      <strong>"o que meu filho recebe nas 8 horas seguintes em troca desses minutos?"</strong>
    </P>
    <LandingImage src="/images/natureza/patio-verde.jpg" alt="Crianças observando o verde no pátio da escola" portrait />

    <Highlight>
      A escola mais perto de casa é a melhor escolha quando ela é, também, a melhor escola. Quando não é, os minutos
      economizados no trajeto são pagos — com juros — pelas milhares de horas que o cérebro do seu filho passa no
      lugar errado, na única fase da vida em que a fundação está sendo construída.
    </Highlight>

    <P>
      Quer fazer o teste na prática? Use nosso{' '}
      <L to="/blog/como-escolher-escola-infantil-laranjeiras">guia de escolha de escola infantil</L> para visitar as
      opções perto de você — e depois venha nos conhecer. Deixe as crianças (as nossas e o seu filho) mostrarem a
      diferença.
    </P>
  </BlogLayout>
);
