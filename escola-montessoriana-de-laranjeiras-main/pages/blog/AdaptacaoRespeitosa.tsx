import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2, Referencias } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight, LandingImage } from '../../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const AdaptacaoRespeitosa: React.FC = () => (
  <BlogLayout
    title="Adaptação escolar sem trauma: como é uma adaptação respeitosa"
    metaDescription="Como funciona a adaptação respeitosa na escola infantil: o passo a passo do primeiro dia, o papel dos pais, o que fazer com o choro e como aumentar a permanência no ritmo da criança — sem imposições."
    dateDisplay="22 de julho de 2026"
    readingTime="6 min"
    image="/images/acolhimento/sorriso-professora.jpg"
    imageAlt="Professora sorrindo acolhe criança pequena na sala, durante o período de adaptação"
  >
    <P>
      Poucos momentos geram tanta ansiedade nos pais quanto a primeira semana de escola. E com razão: a forma como a
      criança entra na vida escolar marca a relação dela com a escola — e com as separações — por muito tempo. A boa
      notícia: quando a adaptação é <strong>respeitosa, seguindo o tempo da criança e sem imposições</strong>, esse
      capítulo pode ser tranquilo. Neste artigo, abrimos exatamente como fazemos.
    </P>

    <H2>O princípio: seguir a criança</H2>
    <P>
      "Seguir a criança" é um princípio montessoriano que vale dobrado na adaptação. Cada criança tem seu ritmo:
      algumas se sentem em casa no segundo dia; outras precisam de duas semanas. Uma adaptação respeitosa não
      força etapas nem ignora sinais — ela <strong>observa e ajusta</strong>. O cronograma serve à criança, nunca o
      contrário.
    </P>

    <H2>Como funciona, na prática, o primeiro dia</H2>
    <Bullets
      items={[
        <><strong>O responsável entra junto.</strong> Pai, mãe ou outra pessoa de referência entra com a criança na sala e fica de 20 a 30 minutos ao lado dela, participando desse primeiro contato.</>,
        <><strong>Afastamento gradual, ainda na sala.</strong> Depois, o adulto se afasta — mas permanece sentado dentro da sala por mais 20 a 30 minutos. A criança explora sabendo que a sua base segura está ali.</>,
        <><strong>A saída é avisada, nunca escondida.</strong> Quando chega o momento, avisamos a criança e o responsável sai da sala. Nada de "fugir" enquanto ela não está olhando — a confiança da criança vale mais do que evitar um choro.</>,
        <><strong>O choro é acolhido.</strong> É normal haver algum choro, e ele não é ignorado: a criança é acolhida no colo e envolvida em algo interessante. Choro nessa fase é comunicação, não birra.</>,
        <><strong>Se não ficar bem, chamamos de volta.</strong> O responsável fica por perto e, caso a criança não se acalme, é chamado novamente. Sem heroísmo, sem "deixa chorar que passa".</>,
        <><strong>Conhecendo os outros ambientes.</strong> Aos poucos, a criança passa a explorar os demais espaços da escola — pátio, refeitório — sempre acompanhada de um adulto de referência.</>,
        <><strong>Permanência que cresce aos poucos.</strong> No primeiro dia, recomendamos cerca de 2 horas de permanência, aumentando gradativamente conforme a resposta de cada criança.</>,
      ]}
    />
    <LandingImage src="/images/acolhimento/adaptacao-artes.jpg" alt="Criança em atividade de artes acompanhada de perto durante a adaptação" portrait />

    <H2>O que os pais podem fazer para ajudar</H2>
    <Bullets
      items={[
        'Transmitir segurança: a criança lê a emoção dos pais. Despedidas curtas, carinhosas e confiantes ajudam mais do que despedidas longas e aflitas.',
        'Contar para a criança o que vai acontecer ("a mamãe vai sair e volta depois do lanche") — mesmo para bebês. Previsibilidade acalma.',
        'Manter a constância: idas regulares, no mesmo horário, aceleram a construção da rotina interna.',
        'Evitar começar a adaptação junto de outras grandes mudanças (mudança de casa, desfralde, chegada de irmão) quando possível.',
        'Confiar no processo — e perguntar tudo. Escola que faz adaptação respeitosa gosta de pais presentes e informados.',
      ]}
    />

    <H2>Quanto tempo demora?</H2>
    <P>
      Em geral, entre alguns dias e duas semanas — mas o critério não é o calendário, é a criança: ela chega sem
      angústia, aceita o colo das professoras, come, explora, se despede sem desespero? Então a adaptação cumpriu o
      seu papel. Se ainda não, seguimos no ritmo dela, sem pressa e sem pressão.
    </P>

    <Highlight>
      Adaptação não é a criança "aguentar" a escola — é a escola e a família construírem, juntas, a segurança de que
      aquele é um lugar bom, onde ela é acolhida como é. Feito assim, o choro dos primeiros dias vira, em pouco
      tempo, pressa para entrar.
    </Highlight>

    <P>
      Quer entender melhor como cuidamos dessa fase — e de toda a rotina de acolhimento?{' '}
      <L to="/acolhimento">Conheça nossa página sobre acolhimento</L>, ou venha visitar a escola e ver uma adaptação
      acontecendo de perto.
    </P>
    <Referencias
      itens={[
        { texto: "Center on the Developing Child, Harvard University. InBrief: The Science of Early Childhood Development (períodos sensíveis e interações de servir e devolver).", url: "https://developingchild.harvard.edu/resources/inbrief-science-of-ecd/" },
        { texto: "NICHD Early Child Care Research Network (2006). The NICHD Study of Early Child Care and Youth Development: Findings for Children up to Age 4½ Years — a qualidade do cuidado prediz mais os resultados do que a idade de entrada ou a quantidade de horas.", url: "https://www.nichd.nih.gov/sites/default/files/publications/pubs/documents/seccyd_06.pdf" },
      ]}
    />
  </BlogLayout>
);
