import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta, LandingSection, P, Highlight, LandingImage, LandingCTA } from '../components/landing/Landing';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">
    {children}
  </Link>
);

/**
 * /sobre — quem está por trás da escola. Não existia: nenhuma página dizia quem é o
 * fundador, e o blog era assinado por "Equipe". Para o Google (E-E-A-T) e para os
 * buscadores de IA, uma entidade nomeada, com credenciais verificáveis, é o que
 * dá lastro ao que o site afirma. O schema Person desta página (injetado pelo
 * prerender) é referenciado como `founder` no schema da escola. O blog é assinado
 * pela equipe (autoria institucional), não pelo fundador.
 */
export const Sobre: React.FC = () => {
  usePageMeta(
    'Sobre a escola e o fundador | Escola Montessoriana de Laranjeiras',
    'Claudio Berbel, formador Montessori pela ABEM e doutor em economia pela FGV, e a história de uma escola em Laranjeiras criada para os próprios filhos.'
  );

  return (
    <div className="bg-white">
      <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0">
          <span className="block text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-3">
            Sobre
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-5 break-words">
            Uma escola criada por um pai que não encontrou o que procurava
          </h1>
          <p className="font-sans text-lg sm:text-xl text-montessori-cream/90 leading-relaxed">
            A Escola Montessoriana de Laranjeiras existe porque, quando meu primeiro filho nasceu, colocá-lo na
            escolinha mais perto de casa não era um erro que eu me permitiria cometer.
          </p>
        </div>
      </div>

      <LandingSection heading="A escola, em Laranjeiras">
        <P>
          Ficamos nos fundos da Rua das Laranjeiras, 540 — um refúgio silencioso e arborizado, longe do barulho da rua.
          Recebemos crianças a partir dos 9 meses, no berçário, e as acompanhamos pela pré-escola e pelo{' '}
          <L to="/agrupada-3">Ensino Fundamental</L>, sempre em <L to="/turmas">salas de idades misturadas</L>, do
          jeito Montessori. O inglês entra todos os dias, por imersão, com professoras nativas e bilíngues. A comida é
          feita na escola. Não há telas com as crianças.
        </P>
        <P>
          Desde 2025 estamos neste endereço, com o nome Escola Montessoriana de Laranjeiras. Antes, a mesma proposta
          viveu como Free School, na Cobal do Humaitá, e começou ainda mais cedo, como um tatame para bebês inspirado em
          Montessori no jardim do Palácio do Catete.
        </P>
      </LandingSection>

      <LandingSection heading="Quem sou eu" className="bg-montessori-cream/40">
        <P>
          Meu nome é <strong>Claudio Berbel</strong>. Sou o fundador e dirijo a escola no dia a dia — é comigo que as
          famílias conversam na visita e é minha a responsabilidade pelo que acontece em cada sala.
        </P>
        <P>
          Tenho o título de <strong>formador Montessori</strong> concedido pela ABEM (Associação Brasileira de Educação
          Montessoriana), da professora Talita de Almeida, e trabalho com educação Montessori há nove anos, desde o
          nascimento do meu primeiro filho. Antes disso, fiz <strong>doutorado em economia na FGV</strong>. Foi na
          pesquisa acadêmica — lendo os estudos sobre desenvolvimento humano, e não em manuais de pedagogia — que me
          convenci de algo que orienta tudo o que a escola faz: os primeiros anos de vida pesam mais do que a primeira
          série ou o vestibular.
        </P>
        <P>
          Não venho do establishment educacional. Isso me deu liberdade para pesquisar alternativas sem compromisso
          com nenhuma delas, e o que encontrei, ao fim, foi Montessori: o método mais completo que conheço, criado por
          Maria Montessori há mais de cem anos e praticado hoje em mais de cem países.
        </P>
      </LandingSection>

      <LandingSection heading="Por que abrir uma escola">
        <P>
          Meu filho mais velho só estudou em escolas Montessori. Mesmo nelas, eu sentia falta de detalhes: imersão em
          inglês de verdade, todos os dias, com professoras nativas; um <L to="/acolhimento">acolhimento total</L>,
          em que a criança só é convidada a trabalhar quando se sente segura; comida de verdade; nenhuma tela. A escola
          que eu queria para os meus filhos não existia, então eu a fiz.
        </P>
        <LandingImage
          src="/images/montessori/vida-pratica-estante.jpg"
          alt="Criança pega seu trabalho sozinha na estante baixa de uma sala Montessori preparada"
        />
        <P>
          A tese que sustenta a escola é simples e bem documentada:{' '}
          <L to="/desenvolvimento-cerebral">os primeiros anos são os mais importantes</L> para o desenvolvimento do
          cérebro e da personalidade. A escola tradicional tende a piorar com a idade, à medida que o foco migra para
          provas. Por isso criamos o programa de Fundamental 1 — para que a criança não precise trocar de proposta
          justamente quando começa a raciocinar em abstrato — e o Fundamental 2 está previsto na sequência.
        </P>
        <Highlight>
          Colocar na escolinha mais perto de casa não era um erro que eu me permitiria cometer. Escrevi sobre essa
          conta — minutos de trajeto contra as 1.800 horas por ano que a criança passa dentro da escola —{' '}
          <L to="/blog/erro-escolher-escola-perto-de-casa">neste artigo</L>.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Sobre o blog" className="bg-montessori-cream/40">
        <P>
          Os artigos do <L to="/blog">blog</L> são escritos pela equipe da escola, e eu respondo pelo que está lá.
          Quando um texto afirma o que "a ciência mostra", cita a fonte — os estudos e as instituições de onde o dado
          saiu estão listados ao fim de cada artigo, para quem quiser conferir.
        </P>
        <P>
          Se quiser conversar sobre a escola, a visita é o melhor caminho: recebemos famílias com as salas em
          funcionamento. <L to="/agendamento">Agende aqui</L> ou fale comigo pelo WhatsApp.
        </P>
      </LandingSection>

      <LandingCTA
        heading="Venha conhecer a escola em funcionamento"
        text="A melhor forma de saber se é o lugar certo para o seu filho é ver as salas trabalhando. Agende uma visita."
      />
    </div>
  );
};
