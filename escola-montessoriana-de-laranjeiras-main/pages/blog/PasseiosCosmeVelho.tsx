import React from 'react';
import { Link } from 'react-router-dom';
import { BlogLayout, H2, Referencias } from '../../components/blog/BlogLayout';
import { P, Bullets, Highlight, LandingImage } from '../../components/landing/Landing';

/**
 * Post de bairro (27/11/2026). Distâncias a pé a partir da escola: as mesmas de
 * /creche-cosme-velho (Google Maps, 21/11/2026). Preços do trem vêm de guias de viagem
 * de 2026, não do site oficial (que bloqueou a consulta): o texto manda conferir.
 * Fora de propósito: MIAN (fechado desde 2016), Solar dos Abacaxis (não abre à visita),
 * trilha Paineiras–Corcovado (íngreme, não serve para criança pequena).
 */
const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">{children}</Link>
);

export const PasseiosCosmeVelho: React.FC = () => (
  <BlogLayout
    title="Passeios com crianças no Cosme Velho: trem, estátua, largo e história a pé"
    metaDescription="Um roteiro curto para fazer com crianças no Cosme Velho: o Trem do Corcovado, a estátua de Machado de Assis no Capitu Café, o Largo do Boticário e a Bica da Rainha, quase tudo a pé."
    dateDisplay="27 de novembro de 2026"
    date="2026-11-27"
    readingTime="5 min"
    image="/images/natureza/patio-verde.jpg"
    imageAlt="Crianças observando o verde no pátio da escola"
  >
    <P>
      O Cosme Velho é pequeno, verde e cheio de história, e quase tudo de bom fica na mesma rua. Quem mora no bairro
      ou perto dele tem, a poucos minutos de casa, um roteiro que encanta criança de qualquer idade: um trem que sobe
      a montanha, um escritor de bronze sentado à mesa e um largo que parece cenário de filme. Montamos este roteiro a
      partir da escola, que fica no início do bairro, na Rua das Laranjeiras, 540.
    </P>

    <H2>1. O Trem do Corcovado</H2>
    <P>
      A estação fica na <strong>Rua Cosme Velho, 513</strong>, a cerca de 500 metros da escola (uns 7 minutos a pé).
      Para a criança pequena, ver o trem chegar e sair já é o passeio. Para as maiores, a subida até o Cristo Redentor
      leva cerca de 20 minutos, por dentro da Mata Atlântica.
    </P>
    <Bullets
      items={[
        <>O trem foi inaugurado por D. Pedro II em <strong>1884</strong> e, em 1910, virou o primeiro trem elétrico do Brasil. É uma boa história para contar no caminho.</>,
        <>Segundo guias de viagem de 2026, criança de até 6 anos no colo não paga passagem, e de 7 a 11 anos paga tarifa reduzida. <strong>Confira preços e horários no site oficial</strong> antes de ir, porque mudam ao longo do ano.</>,
        <>Quem vai de carrinho deve saber que, desde agosto de 2026, as escadas rolantes do alto estão sendo trocadas por elevadores, e há uma escadaria de 80 degraus. Um canguru ou sling ajuda.</>,
      ]}
    />

    <H2>2. Machado de Assis à mesa, no Capitu Café</H2>
    <P>
      Antes de chegar à estação, no número 174 da Rua Cosme Velho, fica o <strong>Capitu Café</strong>, no lugar onde
      Machado de Assis morou até morrer, em 1908. Na calçada há uma <strong>estátua de bronze do escritor em tamanho
      real</strong>, sentado à mesa. As crianças adoram sentar ao lado dele. Contamos a história completa no post{' '}
      <L to="/blog/machado-de-assis-cosme-velho-capitu-cafe">Machado de Assis no Cosme Velho</L>.
    </P>

    <H2>3. O Largo do Boticário</H2>
    <P>
      A cerca de 850 metros da escola (uns 10 minutos a pé) fica o <strong>Largo do Boticário</strong>, um conjunto de
      casas coloridas em estilo neocolonial, dos anos 1920, à beira do Rio Carioca. O nome vem de um boticário que,
      no século XIX, tinha a Família Real entre os clientes. As casas foram restauradas e hoje abrigam um hotel, com
      restaurante aberto a quem não é hóspede. Para a criança, o que conta é o chão de pedra, as cores e o barulho da
      água.
    </P>

    <H2>4. A Bica da Rainha</H2>
    <P>
      Perto da estação do trem fica a <strong>Bica da Rainha</strong>, uma fonte do século XIX. O nome é uma homenagem
      a D. Maria I, que, segundo a tradição, era levada até ali para beber a água. É uma parada rápida, boa para
      explicar à criança de onde vinha a água da cidade antes das torneiras.
    </P>

    <H2>5. O Santuário de São Judas Tadeu</H2>
    <P>
      Na <strong>Rua Cosme Velho, 470</strong>, entre a escola e o trem, fica o Santuário de São Judas Tadeu. No dia 28
      de outubro, dia do santo, a rua se enche de gente. Nos outros dias é um lugar calmo, de passagem.
    </P>

    <LandingImage src="/images/natureza/grupo-natureza.jpg" alt="Educador e crianças com coroas de folhas diante do muro de pedra do pátio da escola" />

    <H2>Como montar o passeio</H2>
    <P>
      Com criança pequena, menos é mais: escolha uma ou duas paradas e deixe a criança ficar o tempo que quiser em
      cada uma. Ver o trem, sentar com o Machado e voltar já é uma manhã inteira. Com as maiores, dá para fazer o
      roteiro todo a pé, terminando no Largo do Boticário.
    </P>
    <Highlight>
      A criança pequena não precisa de muitos lugares; precisa de tempo em cada um. Um trem que passa três vezes vale
      mais do que três atrações vistas às pressas.
    </Highlight>
    <P>
      Quer saber mais sobre o bairro? Leia{' '}
      <L to="/blog/cosme-velho-historia-do-bairro">a história do Cosme Velho</L>. E, se procura escola por aqui,
      conheça a <L to="/escola-cosme-velho">escola infantil no Cosme Velho</L> ou a nossa{' '}
      <L to="/creche-cosme-velho">creche no Cosme Velho</L>, a partir de 9 meses.
    </P>

    <Referencias
      itens={[
        { texto: 'Corcovado Rack Railway. Wikipedia (inauguração em 1884 e eletrificação em 1910).', url: 'https://en.wikipedia.org/wiki/Corcovado_Rack_Railway' },
        { texto: 'Como visitar o Cristo Redentor (preços e acesso em 2026). Fui Ser Viajante.', url: 'https://www.fuiserviajante.com/rio-de-janeiro/como-visitar-o-cristo-redentor/' },
        { texto: 'Passado e futuro do Largo do Boticário. Diário do Rio.', url: 'https://www.diariodorio.com/passado-e-futuro-do-largo-do-boticrio/' },
        { texto: 'Jo&Joe Rio de Janeiro abre as portas no Largo do Boticário. Panrotas, julho de 2022.', url: 'https://www.panrotas.com.br/hotelaria/inauguracoes/2022/07/jo-joe-rio-de-janeiro-abre-as-portas-no-largo-do-boticario_190748.html' },
        { texto: "Queen's Spout (Bica da Rainha). Wikipedia.", url: 'https://en.wikipedia.org/wiki/Queen%27s_Spout' },
        { texto: 'Dia de São Judas Tadeu terá missas no Cosme Velho. Diário do Rio, 27/10/2026.', url: 'https://diariodorio.com/religiao/2026/10/27/dia-de-sao-judas-tadeu-tera-missas-com-dom-orani-no-cosme-velho-e-em-senador-vasconcelos.html' },
        { texto: 'Cafeteria do Cosme Velho homenageia Machado de Assis com estátua. Diário do Rio, 11/09/2024.', url: 'https://diariodorio.com/cafeteria-do-cosme-velho-homenageia-machado-de-assis-com-estatua-no-local-de-sua-antiga-residencia/' },
      ]}
    />
  </BlogLayout>
);
