import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2, Referencias } from '../../components/blog/BlogLayout';
import { P, Bullets } from '../../components/landing/Landing';

/**
 * Post de bairro (27/11/2026). Fontes conferidas em 27/11/2026. A data em que Cosme Velho
 * Pereira viveu ali diverge (século XVI no Diário do Rio, 1727 na EcuRed): o texto não crava.
 * Casa de Portinari e Solar dos Abacaxis: só história, porque não abrem à visita (e o Solar
 * dos Abacaxis, como instituição de arte, mudou-se para o Centro em 2023).
 */
const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const HistoriaCosmeVelho: React.FC = () => (
  <BlogLayout
    title="Cosme Velho: a história do bairro onde a Rua das Laranjeiras termina"
    metaDescription="De onde vem o nome Cosme Velho, por que o bairro já se chamou Águas Férreas e quem morou ali: Machado de Assis, Portinari, o boticário da Família Real. Uma história curta do bairro."
    dateDisplay="27 de novembro de 2026"
    date="2026-11-27"
    readingTime="4 min"
    image="/images/natureza/grupo-natureza.jpg"
    imageAlt="Educador e crianças com coroas de folhas diante do muro de pedra do pátio da escola"
  >
    <P>
      A Rua das Laranjeiras sobe cerca de 2 quilômetros desde as proximidades do Largo do Machado e, no fim, muda de
      nome: vira Rua Cosme Velho. É nesse ponto de encontro, no número 540, que fica a escola. Por isso dizemos que
      estamos no início do Cosme Velho. Este é um resumo da história do bairro, para quem mora aqui e para quem quer
      contar às crianças.
    </P>

    <H2>De onde vem o nome</H2>
    <P>
      O bairro leva o nome de <strong>Cosme Velho Pereira</strong>, um comerciante português que tinha uma chácara na
      parte alta do vale do Rio Carioca. As fontes não concordam sobre a época em que ele viveu ali: há quem fale do
      século XVI e quem cite uma compra de terras em 1727. Certo mesmo é que o nome pegou e atravessou os séculos.
    </P>
    <P>
      Durante muito tempo, porém, a região foi conhecida como <strong>Águas Férreas</strong>. O Cosme Velho só foi oficializado como bairro em 23 de julho de 1981.
    </P>

    <H2>A água, o rio e a rainha</H2>
    <P>
      O Rio Carioca, que dá nome a quem nasce no Rio, desce exatamente por esse vale. Perto da estação do trem fica a{' '}
      <strong>Bica da Rainha</strong>, uma fonte do século XIX. O nome lembra D. Maria I, que, segundo a tradição, era
      levada até ali para beber a água.
    </P>
    <P>
      Um pouco adiante, o <strong>Largo do Boticário</strong> guarda o nome de outro morador ilustre: Joaquim Luís da
      Silva Souto, boticário que tinha a Família Real entre os clientes. As casas coloridas que se veem hoje são dos
      anos 1920 e foram restauradas há poucos anos.
    </P>

    <H2>O trem que sobe a montanha</H2>
    <P>
      Em 1884, D. Pedro II inaugurou a estrada de ferro que sobe o Corcovado a partir da Rua Cosme Velho. Em 1910 ela
      foi eletrificada e se tornou o primeiro trem elétrico do Brasil. O Cristo Redentor só chegaria ao alto da
      montanha em 1931; o trem é mais velho que ele.
    </P>

    <H2>Quem morou no Cosme Velho</H2>
    <Bullets
      items={[
        <><strong>Machado de Assis</strong> viveu mais de vinte anos na Rua Cosme Velho e morreu ali, em 1908. Ganhou o apelido de "Bruxo do Cosme Velho". No lugar da casa funciona hoje o Capitu Café, com uma estátua dele na calçada (<L to="/blog/machado-de-assis-cosme-velho-capitu-cafe">contamos a história aqui</L>).</>,
        <><strong>Candido Portinari</strong> morou de 1943 a 1950 num casarão da Rua Cosme Velho, 353. A casa tem tombamento provisório e não está aberta à visitação.</>,
        <>O <strong>Solar dos Abacaxis</strong>, casarão de 1843 no número 857, abrigou por anos uma instituição de arte que levava o mesmo nome e que se mudou para o Centro em 2023.</>,
      ]}
    />

    <H2>Um bairro para crescer</H2>
    <P>
      Mata Atlântica na encosta, rio, casarões, um trem do século XIX: o Cosme Velho é um bairro em que a história está
      à vista, ao alcance da mão de uma criança. Para ver tudo isso de perto, montamos um{' '}
      <L to="/blog/passeios-com-criancas-cosme-velho">roteiro de passeios com crianças pelo bairro</L>.
    </P>
    <P>
      E, se você mora aqui e procura escola, conheça a <L to="/escola-cosme-velho">escola infantil no Cosme Velho</L>{' '}
      e a <L to="/creche-cosme-velho">creche no Cosme Velho</L>, dos 9 meses ao Ensino Fundamental, com inglês todos os
      dias.
    </P>

    <Referencias
      itens={[
        { texto: 'Origem do nome de todos os bairros do Rio de Janeiro. Diário do Rio, 25/10/2023.', url: 'https://diariodorio.com/origem-do-nome-de-todos-bairros-do-rio-de-janeiro/' },
        { texto: 'Cosme Velho. Wikipédia (oficialização do bairro em 1981).', url: 'https://pt.wikipedia.org/wiki/Cosme_Velho' },
        { texto: 'História do bairro Cosme Velho. Diário do Rio.', url: 'https://diariodorio.com/historia-do-bairro-cosme-velho/' },
        { texto: "Queen's Spout (Bica da Rainha). Wikipedia.", url: 'https://en.wikipedia.org/wiki/Queen%27s_Spout' },
        { texto: 'Passado e futuro do Largo do Boticário. Diário do Rio.', url: 'https://www.diariodorio.com/passado-e-futuro-do-largo-do-boticrio/' },
        { texto: 'Corcovado Rack Railway. Wikipedia.', url: 'https://en.wikipedia.org/wiki/Corcovado_Rack_Railway' },
        { texto: 'Prefeitura desapropria Casa de Portinari e Solar dos Abacaxis no Cosme Velho. Diário do Rio, 22/09/2026.', url: 'https://diariodorio.com/rio-de-janeiro/2026/09/22/prefeitura-desapropria-casa-de-portinari-e-solar-dos-abacaxis-no-cosme-velho.html' },
        { texto: 'Solar dos Abacaxis. Time Out Rio de Janeiro.', url: 'https://www.timeout.com/pt/rio-de-janeiro/arte/solar-dos-abacaxis' },
      ]}
    />
  </BlogLayout>
);
