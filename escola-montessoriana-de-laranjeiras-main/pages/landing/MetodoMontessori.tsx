import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

/** Área do currículo: título + texto + materiais reais usados na escola */
const Area: React.FC<{ title: string; children: React.ReactNode; materials?: string }> = ({ title, children, materials }) => (
  <div className="mb-8">
    <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2">{title}</h3>
    <div className="text-gray-700 text-base sm:text-lg leading-relaxed [&>p]:mb-3">{children}</div>
    {materials && (
      <p className="text-sm sm:text-base text-montessori-green/90 bg-montessori-green/5 border border-montessori-green/10 rounded-sm px-4 py-2.5 mt-3">
        <strong>Na nossa sala:</strong> {materials}
      </p>
    )}
  </div>
);

const alumni = [
  { name: 'Larry Page e Sergey Brin', role: 'fundadores do Google' },
  { name: 'Jeff Bezos', role: 'fundador da Amazon' },
  { name: 'Gabriel García Márquez', role: 'Nobel de Literatura' },
  { name: 'Beyoncé', role: 'cantora e empresária' },
  { name: 'Taylor Swift', role: 'cantora e compositora' },
  { name: 'George Clooney', role: 'ator e produtor' },
  { name: 'Stephen Curry', role: 'tetracampeão da NBA' },
  { name: 'Anne Frank', role: 'escritora' },
  { name: 'Príncipes William e Harry', role: 'realeza britânica' },
];

export const MetodoMontessori: React.FC = () => {
  usePageMeta(
    'O Método Montessori | Escola Montessoriana de Laranjeiras',
    'Entenda o método Montessori: Maria Montessori, os princípios, o currículo (vida prática, sensorial, linguagem, matemática e educação cósmica), o ciclo de trabalho e o que muda na criança.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="O Método"
        title="Montessori: a educação que respeita a inteligência da criança"
        subtitle="Há mais de 100 anos, uma médica italiana descobriu que as crianças aprendem melhor quando o ambiente é preparado para elas — e não elas moldadas para o ambiente. Essa descoberta mudou a educação no mundo inteiro."
      />

      <LandingSection heading="Quem foi Maria Montessori" className="pt-10 sm:pt-14">
        <P>
          Maria Montessori (1870–1952) foi uma das primeiras mulheres a se formar em medicina na Itália. Cientista
          antes de educadora, ela fez o que ninguém fazia: observou as crianças com rigor científico, sem pressa e sem
          preconceito. O que viu mudou tudo — a criança não é um adulto em miniatura que precisa ser "ensinado" o tempo
          todo; é um ser que se constrói sozinho, desde que encontre o ambiente certo para isso.
        </P>
        <P>
          Indicada três vezes ao Prêmio Nobel da Paz, Maria Montessori viu seu método se espalhar por mais de 140
          países. Mais de um século depois, a neurociência segue confirmando o que ela descobriu observando: movimento
          e aprendizagem caminham juntos, os primeiros anos são decisivos, e a concentração profunda é o motor do
          desenvolvimento.
        </P>
        <Highlight>
          "A criança não é um vaso a ser preenchido, mas uma fonte que deixamos jorrar." — Maria Montessori
        </Highlight>
      </LandingSection>

      <LandingSection heading="Os princípios do método">
        <Bullets
          items={[
            <><strong>Ambiente preparado:</strong> tudo na sala — móveis, materiais, alturas — é pensado para a criança usar sozinha, sem depender de um adulto a cada passo.</>,
            <><strong>Autonomia e independência:</strong> a criança escolhe suas atividades e aprende a cuidar de si, do outro e do espaço. Autoestima não se dá, se constrói.</>,
            <><strong>Liberdade com limites:</strong> liberdade não é ausência de regras — é poder escolher dentro de um quadro claro e seguro, que a criança compreende e respeita.</>,
            <><strong>Períodos sensíveis:</strong> cada fase da infância tem janelas em que certos aprendizados acontecem quase sem esforço — linguagem, ordem, movimento, refinamento dos sentidos. O método aproveita cada janela no momento certo.</>,
            <><strong>Materiais científicos:</strong> os materiais Montessori isolam uma dificuldade por vez e têm controle de erro embutido — a própria criança percebe e se corrige, sem depender da aprovação do adulto.</>,
            <><strong>O adulto como guia:</strong> a professora observa cada criança individualmente e apresenta o material certo na hora certa. É isso que torna a educação verdadeiramente personalizada.</>,
          ]}
        />
      </LandingSection>

      <LandingSection heading="O currículo: as áreas da sala Montessori">
        <P>
          A sala Montessori é organizada em áreas, e a criança circula entre elas escolhendo seu trabalho. Cada área
          tem materiais específicos, apresentados individualmente pela professora quando a criança está pronta. As
          fotos abaixo são da nossa própria sala, no dia a dia real.
        </P>
        <P>
          Apesar da livre escolha das atividades, orientada por uma professora não diretiva, o currículo é bem
          estruturado. Não é espontaneísmo: cada material tem um objetivo de desenvolvimento definido, uma sequência
          de apresentação e um lugar certo na estante. A liberdade da criança acontece dentro de uma progressão
          pedagógica cuidadosamente planejada — a professora sabe exatamente onde cada criança está e o que vem a
          seguir.
        </P>

        <Area
          title="Vida Prática"
          materials="Telaios (botões, zíperes e fechos), versar sólidos e líquidos, transpor com pinça e colher, lavar a própria louça, enrolar tapete, cuidar do bebê."
        >
          <p>
            A porta de entrada do método. Cuidar de si, do outro e do ambiente: vestir-se, servir água, limpar a mesa,
            pendurar roupas no varal. Parecem gestos simples — são exercícios de concentração, coordenação, sequência
            lógica e independência. É também aqui que a mão se prepara, movimento a movimento, para a escrita.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/vida-pratica-varal.jpg', alt: 'Criança pendurando roupas no varal com prendedores, atividade de Vida Prática Montessori' },
            { src: '/images/montessori/vida-pratica-tapete.jpg', alt: 'Criança enrolando o tapete sozinha ao terminar seu trabalho, na sala Montessori' },
          ]}
        />

        <Area
          title="Sensorial"
          materials="Encaixes Sólidos, Escada Marrom, Caixas de Cores, Cilindros de Cor, Barras Térmicas."
        >
          <p>
            Dos 0 aos 6 anos, a criança conhece o mundo pelos sentidos. Os materiais sensoriais transformam conceitos
            abstratos — grande e pequeno, fino e grosso, gradações de cor, texturas e pesos — em experiências que a mão
            toca e o cérebro organiza. É a base silenciosa da inteligência lógica e matemática.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/sensorial-encaixes.jpg', alt: 'Criança concentrada trabalhando com os Encaixes Sólidos, material sensorial Montessori' },
            { src: '/images/montessori/sensorial-torre-rosa.jpg', alt: 'Duas meninas montando juntas a Torre Rosa combinada com a Escada Marrom, na vertical' },
          ]}
        />

        <Area
          title="Linguagem"
          materials="Letras de Lixa, Caixa de Areia, pareamento de objetos e imagens, grafomotricidade, rodas de leitura."
        >
          <p>
            Do som à escrita, pelo caminho do corpo: a criança traça a Letra de Lixa com os dedos enquanto ouve o som,
            escreve na areia antes do papel, e descobre que as palavras carregam o mundo. Aqui também vive o nosso
            diferencial: a imersão diária em inglês com professoras nativas e bilíngues —{' '}
            <Link to="/ingles-primeira-infancia" className="text-montessori-green font-semibold underline hover:no-underline">
              entenda por que começar cedo
            </Link>.
          </p>
        </Area>
        <LandingImagePair
          images={[
            { src: '/images/montessori/linguagem-escrita.jpg', alt: 'Criança concentrada escrevendo seu nome, atividade de linguagem Montessori' },
            { src: '/images/montessori/linguagem-caixa-areia.jpg', alt: 'Menino traçando uma letra na Caixa de Areia, com a Letra de Lixa ao lado' },
          ]}
        />

        <Area
          title="Matemática"
          materials="Fusos, Numerais de Lixa, Barras Azuis e Vermelhas, Material Dourado."
        >
          <p>
            Em Montessori, a matemática entra pelas mãos: a criança segura a quantidade antes de conhecer o símbolo,
            empilha, compara, conta com materiais concretos. São abstrações materializadas — cada conceito matemático
            ganha um corpo físico que a criança manuseia antes de encontrá-lo no papel. Quando o número abstrato
            chega, ele já tem corpo, peso e significado — por isso a matemática Montessori é sólida e sem medo.
          </p>
        </Area>
        <LandingImage src="/images/montessori/matematica-dourado.jpg" alt="Crianças no tapete com a torre montada de Material Dourado e os cartões de números" />

        <Area title="Educação Cósmica">
          <p>
            A visão mais ampla do método: ajudar a criança a perceber que tudo está conectado — o sol, a planta, a
            água, as pessoas — e que ela tem um papel nesse todo. Na prática: natureza, permacultura, cuidado com o
            ambiente e com o outro.{' '}
            <Link to="/natureza-educacao-cosmica" className="text-montessori-green font-semibold underline hover:no-underline">
              Dedicamos uma página inteira a isso
            </Link>.
          </p>
        </Area>

        <Area title="E ao redor de tudo">
          <p>
            Artes, musicalização, socioemocional (a Casa dos Bonecos, onde a criança elabora o mundo brincando) e as
            atividades extras — capoeira, circo, dança e movimento, psicomotricidade e contação de histórias.
          </p>
        </Area>
      </LandingSection>

      <LandingSection heading="O ciclo de trabalho: concentração que não se interrompe" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Uma das descobertas mais importantes de Maria Montessori: quando a criança escolhe seu trabalho e ninguém a
          interrompe, ela entra em períodos de concentração profunda — e é exatamente nesses períodos que o
          desenvolvimento acontece.
        </P>
        <P>
          Por isso a rotina Montessori protege o <strong>ciclo de trabalho ininterrupto</strong>: um longo período em
          que cada criança escolhe, trabalha, repete quantas vezes quiser e guarda o material ao terminar. Sem sinal
          tocando de 50 em 50 minutos, sem adulto cortando a atividade no meio para "a próxima tarefa".
        </P>
        <Highlight>
          Num mundo que fragmenta a atenção desde cedo, uma criança capaz de se concentrar por longos períodos carrega
          uma vantagem para a vida inteira.
        </Highlight>
        <LandingImage src="/images/montessori/concentracao.jpg" alt="Criança de cócoras, absorta, traçando uma forma de metal redonda no chão da sala" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Concentração profunda não se ensina — se protege.
        </p>
      </LandingSection>

      <LandingSection heading="O que muda na criança">
        <Bullets
          items={[
            <><strong>Ela escolhe.</strong> Todos os dias, a criança toma decisões de verdade — e quem treina escolher desde pequeno decide melhor a vida inteira.</>,
            <><strong>Ela confia em si.</strong> A criança que faz por si mesma — e se corrige sozinha — constrói uma confiança que não depende de elogio.</>,
            <><strong>Ela se concentra.</strong> Longos períodos de atenção genuína, cada vez mais raros e cada vez mais valiosos.</>,
            <><strong>Ela cuida.</strong> Do ambiente, dos materiais, dos colegas — responsabilidade vivida, não sermão.</>,
            <><strong>Ela ama aprender.</strong> O aprendizado nunca foi obrigação; sempre foi descoberta.</>,
          ]}
        />
        <LandingImage src="/images/montessori/cuidado-banho.jpg" alt="Criança dando banho em um bebê de brinquedo com cuidado, atividade Montessori de cuidado com o outro" portrait />
      </LandingSection>

      <LandingSection heading="Eles começaram numa sala Montessori">
        <P>
          Não é coincidência que tantas pessoas criativas, empreendedoras e seguras de si tenham passado por escolas
          Montessori na infância:
        </P>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {alumni.map((a) => (
            <div key={a.name} className="bg-montessori-cream border border-montessori-green/10 rounded-sm px-4 py-3">
              <p className="font-serif text-montessori-green font-semibold leading-tight">{a.name}</p>
              <p className="text-gray-600 text-sm">{a.role}</p>
            </div>
          ))}
        </div>
        <P>
          Larry Page e Sergey Brin, fundadores do Google, já atribuíram publicamente à formação Montessori a
          capacidade de pensar por conta própria, questionar o estabelecido e se automotivar — as mesmas qualidades
          que o futuro vai exigir dos nossos filhos.
        </P>
      </LandingSection>

      <LandingCTA
        heading="Veja o método acontecendo de perto"
        text="Nenhum texto substitui ver uma sala Montessori em funcionamento. Agende uma visita e observe como as crianças trabalham."
      />
    </div>
  );
};
