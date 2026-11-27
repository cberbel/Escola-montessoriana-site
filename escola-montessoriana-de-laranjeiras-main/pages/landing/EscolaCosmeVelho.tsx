import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Bullets, P, FAQ, usePageMeta } from '../../components/landing/Landing';
import { faqEscolaCosmeVelho } from './faqs';

/**
 * Página de SEO local para "escola cosme velho" (a /creche-cosme-velho cuida de
 * "creche"). Pedido do Claudio em 23/11/2026: dizer que a escola fica no INÍCIO
 * do Cosme Velho e que, apesar de o endereço ser Rua das Laranjeiras, o trecho
 * do número 540 já é Cosme Velho.
 *
 * Em que isso se apoia:
 * - o Google Maps rotula "R. das Laranjeiras, 540" como "Cosme Velho"
 *   (conferido em 21/11/2026);
 * - a Rua das Laranjeiras tem cerca de 2 km do Largo do Machado até a escola
 *   (Maps, página /creche-catete);
 * - nos Correios o CEP 22240-006 segue como Laranjeiras (ViaCEP, 23/11/2026).
 *   A página diz isso na FAQ, para não esconder de quem for conferir.
 *
 * Distâncias: as mesmas de /creche-cosme-velho (Google Maps, 21/11/2026). Ao
 * mexer num número aqui, mexer lá e em faqEscolaCosmeVelho.
 * Faixas de idade: as de /turmas (Agrupada 1, 2 e 3).
 */
const linkCls = 'text-montessori-green font-semibold underline hover:no-underline';

export const EscolaCosmeVelho: React.FC = () => {
  usePageMeta(
    'Escola infantil no Cosme Velho | Escola Montessoriana',
    'Escola infantil Montessori no início do Cosme Velho, de 9 meses ao Ensino Fundamental. Rua das Laranjeiras, 540, trecho que já é Cosme Velho.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Escola no Cosme Velho"
        title="Escola infantil Montessori no início do Cosme Velho"
        subtitle="Nosso endereço é Rua das Laranjeiras, 540. Apesar do nome da rua, esse trecho final já é Cosme Velho: a estação do Trem do Corcovado fica a 500 metros."
      />

      <LandingSection heading="Rua das Laranjeiras no endereço, Cosme Velho no mapa" className="pt-10 sm:pt-14">
        <P>
          A <strong>Rua das Laranjeiras</strong> é comprida. Ela sai das proximidades do Largo do Machado e sobe cerca
          de 2 km até a entrada do <strong>Cosme Velho</strong>, onde muda de nome e passa a se chamar Rua Cosme Velho.
        </P>
        <P>
          A escola fica no <strong>número 540 (fundos, segundo andar)</strong>, no último trecho da rua. Por isso,
          apesar de o endereço dizer Rua das Laranjeiras, a escola já está no Cosme Velho. No Google Maps, o número 540
          aparece como Cosme Velho.
        </P>
        <P>
          O nome da escola guarda Laranjeiras por causa da rua. Para quem mora no Cosme Velho, o que conta é o lugar:
          estamos logo no início do bairro.
        </P>
      </LandingSection>

      <LandingSection heading="A que distância fica da sua casa">
        <P>Medimos no Google Maps a caminhada a partir de quatro pontos do Cosme Velho:</P>
        <Bullets
          items={[
            <>Da <strong>Rua Marechal Pires Ferreira</strong>: cerca de 350 metros, <strong>4 minutos</strong>.</>,
            <>Da <strong>estação do Trem do Corcovado</strong>: 500 metros, <strong>7 minutos</strong>.</>,
            <>Da <strong>Praça São Judas Tadeu</strong>: 550 metros, <strong>7 minutos</strong>.</>,
            <>Do <strong>Largo do Boticário</strong>: 850 metros, <strong>10 minutos</strong>.</>,
          ]}
        />
        <P>
          O Maps descreve os quatro trajetos como predominantemente planos. De carro, numa segunda-feira às 8h, são
          cerca de 2 minutos saindo da estação e de 2 a 6 minutos saindo do Largo do Boticário.
        </P>
        <P>
          Os detalhes de cada caminho, incluindo ônibus e ladeiras, estão na página da{' '}
          <Link to="/creche-cosme-velho" className={linkCls}>
            creche no Cosme Velho
          </Link>.
        </P>
        <LandingImage
          src="/images/natureza/grupo-natureza.jpg"
          alt="Grupo de crianças com coroas de folhas na área verde da escola"
        />
      </LandingSection>

      <LandingSection heading="Da educação infantil ao Fundamental, no mesmo lugar">
        <P>
          A criança pode entrar bebê e seguir na mesma escola até o Ensino Fundamental. As turmas são de idades
          misturadas, como em toda escola Montessori:
        </P>
        <Bullets
          items={[
            <><strong>Agrupada 1:</strong> berçário e creche, de 9 meses a 3 anos, com 1 professora para cada 3 bebês até os 18 meses.</>,
            <><strong>Agrupada 2:</strong> pré-escola, de 2 anos e meio a 6 anos.</>,
            <><strong>Agrupada 3:</strong> Ensino Fundamental, de 7 a 12 anos.</>,
          ]}
        />
        <P>
          Veja como cada uma funciona na página das{' '}
          <Link to="/turmas" className={linkCls}>
            turmas
          </Link>{' '}
          e na do{' '}
          <Link to="/agrupada-3" className={linkCls}>
            Ensino Fundamental
          </Link>.
        </P>
        <LandingImage
          src="/images/turmas/agrupada-2.jpg"
          alt="Menina concentrada montando a torre rosa na sala Montessori"
          portrait
        />
      </LandingSection>

      <LandingSection heading="Como é o dia na escola">
        <P>
          Seguimos o{' '}
          <Link to="/metodo-montessori" className={linkCls}>
            método Montessori
          </Link>
          : ambiente preparado, materiais concretos e respeito ao ritmo de cada criança.
        </P>
        <Bullets
          items={[
            <><strong>Inglês</strong> por imersão diária, desde o berçário.</>,
            <><strong>Comida feita na escola</strong>, sem óleo vegetal, sal refinado ou açúcar.</>,
            <><strong>Sem telas</strong> com as crianças.</>,
            <><strong>Pátio arborizado</strong>, horta e minhocário.</>,
            <><strong>Atividades</strong> de capoeira, circo e teatro, dança, musicalização e permacultura.</>,
          ]}
        />
        <P>
          A escola funciona das <strong>7h30 às 19h</strong>, de segunda a sexta. Você escolhe meio período (8h às 12h
          ou 13h às 17h), integral (8h às 17h), estendido (7h30 às 19h) ou frequência reduzida em dias alternados.
          Para os valores,{' '}
          <Link to="/mensalidade" className={linkCls}>
            veja como funciona a mensalidade
          </Link>.
        </P>
      </LandingSection>

      <LandingSection heading="O bairro em três leituras">
        <P>
          Escrevemos sobre o lugar onde a escola fica:{' '}
          <Link to="/blog/machado-de-assis-cosme-velho-capitu-cafe" className={linkCls}>
            Machado de Assis no Cosme Velho e o Capitu Café
          </Link>
          ,{' '}
          <Link to="/blog/passeios-com-criancas-cosme-velho" className={linkCls}>
            passeios com crianças pelo bairro
          </Link>{' '}
          e{' '}
          <Link to="/blog/cosme-velho-historia-do-bairro" className={linkCls}>
            a história do Cosme Velho
          </Link>
          .
        </P>
      </LandingSection>

      <LandingSection heading="Perguntas de quem procura escola no Cosme Velho">
        <FAQ itens={faqEscolaCosmeVelho} />
      </LandingSection>

      <LandingCTA
        heading="Venha conhecer a escola"
        text="A visita acontece com as salas em atividade. Do Cosme Velho dá para vir a pé. Agende pelo WhatsApp ou pela página de agendamento."
      />
    </div>
  );
};
