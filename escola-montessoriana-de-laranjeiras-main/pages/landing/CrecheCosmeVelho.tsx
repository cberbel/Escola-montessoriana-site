import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Bullets, P, FAQ, usePageMeta } from '../../components/landing/Landing';
import { faqCrecheCosmeVelho } from './faqs';

/**
 * Página de SEO local para "creche cosme velho". Diferente das de Flamengo,
 * Botafogo e Catete, aqui a escola é VIZINHA de fato: o número 540 fica no
 * último trecho da Rua das Laranjeiras, junto à divisa, e o Google Maps
 * rotula o endereço como "Cosme Velho". Em 23/11/2026 o Claudio disse que o
 * bairro da escola é o Cosme Velho, e a página passou a dizer "no Cosme Velho".
 * Ela também diz, sem esconder, que pelos Correios o CEP 22240-006 é de
 * Laranjeiras (conferido no ViaCEP): por isso a escola aparece pelos dois nomes.
 *
 * Tudo conferido no Google Maps em 21/11/2026 (destino: R. das Laranjeiras,
 * 540 - Cosme Velho, 22240-006):
 * - A pé (todos "predominantemente plana", via R. Cosme Velho):
 *   R. Marechal Pires Ferreira 350 m / 4 min; estação do Trem do Corcovado
 *   (R. Cosme Velho, 513) 500 m / 7 min; Praça São Judas Tadeu 550 m / 7 min;
 *   Largo do Boticário 850 m / 10 min. Ladeira do Ascurra 1,5 km / 20 min
 *   (com desnível; o Maps fixa o ponto no meio da ladeira).
 * - Carro, partida marcada para segunda 23/11/2026 às 8h: estação 500 m /
 *   "normalmente 2 min"; Praça São Judas Tadeu 600 m / "normalmente 3 min";
 *   Largo do Boticário 850 m / "de 2 a 6 min" (2 min de madrugada, sem
 *   trânsito); Ladeira do Ascurra 1,5 km / "de 4 a 8 min".
 * - Carro, volta às 17h: escola → Largo do Boticário 850 m / "normalmente 3 min".
 * - Ônibus, segunda às 8h, do Largo do Boticário: linha 422 saindo do Terminal
 *   do Cosme Velho, 4 min de viagem, 12 min no total (a pé são 10).
 * Ao mexer em qualquer número daqui, mexer também em faqCrecheCosmeVelho.
 */
export const CrecheCosmeVelho: React.FC = () => {
  usePageMeta(
    'Creche no Cosme Velho, a partir de 9 meses | Escola Montessoriana',
    'Creche e berçário Montessori no Cosme Velho, no trecho final da Rua das Laranjeiras: 7 minutos a pé da estação do Trem do Corcovado. A partir de 9 meses.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Creche no Cosme Velho"
        title="Creche Montessori no Cosme Velho"
        subtitle="Estamos na Rua das Laranjeiras, 540, no trecho final da rua, que no mapa já é Cosme Velho. Da estação do Trem do Corcovado são 500 metros de caminhada."
      />

      <LandingSection heading="No Cosme Velho, com endereço na Rua das Laranjeiras" className="pt-10 sm:pt-14">
        <P>
          A escola fica na <strong>Rua das Laranjeiras, 540 (fundos, segundo andar)</strong>, no último trecho da
          rua. É o pedaço em que Laranjeiras encontra o <strong>Cosme Velho</strong>.
        </P>
        <P>
          Por isso você nos encontra pelos dois nomes. No Google Maps, nosso endereço aparece como Cosme Velho. Pelos
          Correios, o CEP 22240-006 é de Laranjeiras, e a escola leva Laranjeiras no nome.
        </P>
        <P>
          Para quem mora no bairro, isso quer dizer uma coisa simples: a creche fica aqui mesmo. A{' '}
          <strong>Rua Cosme Velho</strong> desce direto até a escola. No caminho ela muda de nome e passa a se chamar
          Rua das Laranjeiras.
        </P>
      </LandingSection>

      <LandingSection heading="A pé, pela Rua Cosme Velho">
        <P>Medimos no Google Maps a caminhada a partir de quatro pontos do bairro:</P>
        <Bullets
          items={[
            <>Da <strong>Rua Marechal Pires Ferreira</strong>: cerca de 350 metros, <strong>4 minutos</strong>.</>,
            <>Da <strong>estação do Trem do Corcovado</strong> (Rua Cosme Velho, 513): 500 metros, <strong>7 minutos</strong>.</>,
            <>Da <strong>Praça São Judas Tadeu</strong>: 550 metros, <strong>7 minutos</strong>.</>,
            <>Do <strong>Largo do Boticário</strong>: 850 metros, <strong>10 minutos</strong>.</>,
          ]}
        />
        <P>
          Nos quatro casos, o Maps descreve o trajeto como predominantemente plano. É uma distância que cabe na rotina
          de quem leva e busca todos os dias.
        </P>
        <P>
          Nas ladeiras a conta muda. Da <strong>Ladeira do Ascurra</strong>, por exemplo, são cerca de 1,5 km e uns 20
          minutos, com descida na ida e subida na volta. O número exato depende da altura da ladeira em que você mora.
        </P>
        <LandingImage
          src="/images/natureza/patio-bolhas.jpg"
          alt="Crianças estourando bolhas de sabão no pátio coberto da escola, com árvores e flores por cima da tela de proteção"
          portrait
        />
      </LandingSection>

      <LandingSection heading="De carro e de ônibus">
        <P>
          De carro, o trajeto é tão curto que quase não aparece no relógio. Estas são as estimativas do Google Maps para
          uma segunda-feira às 8h:
        </P>
        <Bullets
          items={[
            <>Da estação do Trem do Corcovado: 500 metros, cerca de <strong>2 minutos</strong>.</>,
            <>Da Praça São Judas Tadeu: 600 metros, cerca de <strong>3 minutos</strong>.</>,
            <>Do Largo do Boticário: 850 metros, de <strong>2 a 6 minutos</strong>.</>,
            <>Da Ladeira do Ascurra: 1,5 km, de <strong>4 a 8 minutos</strong>.</>,
          ]}
        />
        <P>Na volta, às 17h, o Maps estima cerca de 3 minutos da escola até o Largo do Boticário.</P>
        <P>
          O ônibus raramente compensa numa distância dessas. Do Largo do Boticário, o Maps sugere a linha 422, com
          embarque no Terminal do Cosme Velho: são 4 minutos de viagem e 12 no total, com a espera. A pé, são 10.
          Linhas e horários mudam; confira no aplicativo no dia.
        </P>
      </LandingSection>

      <LandingSection heading="O que a proximidade muda na rotina">
        <P>
          Morar perto da creche tira peso do dia. Uma reunião que atrasou, uma febre no meio da tarde, um imprevisto
          qualquer: quando a escola fica a dez minutos a pé, buscar seu filho deixa de ser uma operação.
        </P>
        <P>
          O horário ajuda. A escola funciona das <strong>7h30 às 19h</strong>, e você escolhe o período:
        </P>
        <Bullets
          items={[
            <><strong>Meio período:</strong> das 8h às 12h ou das 13h às 17h.</>,
            <><strong>Integral:</strong> das 8h às 17h.</>,
            <><strong>Estendido:</strong> das 7h30 às 19h.</>,
            <><strong>Frequência reduzida:</strong> em dias alternados.</>,
          ]}
        />
        <P>
          Quem desce para o trabalho também passa pela porta: a Rua das Laranjeiras segue da escola até o Largo do
          Machado.{' '}
          <Link to="/creche-catete" className="text-montessori-green font-semibold underline hover:no-underline">
            Veja os caminhos entre a escola e o Catete
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="O que seu filho encontra aqui dentro">
        <P>
          A creche recebe bebês <strong>a partir de 9 meses</strong>. Até os 18 meses, há{' '}
          <strong>1 professora para cada 3 bebês</strong>.
        </P>
        <P>
          A comida é feita na própria escola, <strong>sem óleo vegetal, sal refinado ou açúcar</strong>. O inglês entra
          por <strong>imersão diária</strong>. Não há telas. E as crianças têm um pátio arborizado para o corpo se
          mexer.
        </P>
        <LandingImage
          src="/images/turmas/agrupada-1.jpg"
          alt="Bebê sorrindo, em pé numa estrutura de madeira de psicomotricidade, na sala do berçário"
          portrait
        />
        <P>
          O dia a dia do berçário está na página da{' '}
          <Link to="/creche-laranjeiras" className="text-montessori-green font-semibold underline hover:no-underline">
            creche em Laranjeiras
          </Link>
          . Para os valores,{' '}
          <Link to="/mensalidade" className="text-montessori-green font-semibold underline hover:no-underline">
            veja como funciona a mensalidade
          </Link>
          . E, para saber o que vem depois da creche,{' '}
          <Link to="/turmas" className="text-montessori-green font-semibold underline hover:no-underline">
            conheça as turmas
          </Link>.
        </P>
        <P>
          Para a escola inteira, do berçário ao Ensino Fundamental, veja a página da{' '}
          <Link to="/escola-cosme-velho" className="text-montessori-green font-semibold underline hover:no-underline">
            escola no início do Cosme Velho
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="O bairro em três leituras">
        <P>
          Escrevemos sobre o lugar onde a escola fica:{' '}
          <Link to="/blog/machado-de-assis-cosme-velho-capitu-cafe" className="text-montessori-green font-semibold underline hover:no-underline">
            Machado de Assis no Cosme Velho e o Capitu Café
          </Link>
          ,{' '}
          <Link to="/blog/passeios-com-criancas-cosme-velho" className="text-montessori-green font-semibold underline hover:no-underline">
            passeios com crianças pelo bairro
          </Link>{' '}
          e{' '}
          <Link to="/blog/cosme-velho-historia-do-bairro" className="text-montessori-green font-semibold underline hover:no-underline">
            a história do Cosme Velho
          </Link>
          .
        </P>
      </LandingSection>

      <LandingSection heading="Perguntas de quem mora no Cosme Velho">
        <FAQ itens={faqCrecheCosmeVelho} />
      </LandingSection>

      <LandingCTA
        heading="Venha a pé e conheça a escola"
        text="A visita acontece com as salas em atividade. Saia de casa no horário em que você traria seu filho e veja quanto tempo o caminho leva. Agende pelo WhatsApp ou pela página de agendamento."
      />
    </div>
  );
};
