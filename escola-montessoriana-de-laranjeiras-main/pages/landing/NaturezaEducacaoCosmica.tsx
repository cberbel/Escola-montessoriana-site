import React from 'react';
import { LandingHero, LandingSection, LandingCTA, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

/** Tema da educação cósmica: título + texto, no mesmo estilo das áreas do currículo */
const Tema: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2">{title}</h3>
    <div className="text-gray-700 text-base sm:text-lg leading-relaxed [&>p]:mb-3">{children}</div>
  </div>
);

export const NaturezaEducacaoCosmica: React.FC = () => {
  usePageMeta(
    'Natureza, Permacultura e Educação Cósmica | Escola Montessoriana de Laranjeiras',
    'Ambiente arborizado, espaços amplos, aulas de permacultura com horta e minhocário, e a educação cósmica de Montessori: como a criança descobre a ordem da natureza e o seu lugar no mundo.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Natureza e pertencimento"
        title="Um refúgio verde para crescer: natureza, permacultura e educação cósmica"
        subtitle="No meio da cidade, um ambiente arborizado onde a criança corre, planta, cuida de minhocas e descobre que faz parte de algo maior."
      />

      <LandingSection heading="Permacultura na prática: horta, minhocário e abelhas" className="pt-10 sm:pt-14">
        <P>
          Vamos começar pelo que a criança mais ama: pôr a mão na terra. Aqui, as crianças têm{' '}
          <strong>aulas de permacultura</strong> como parte da rotina, com um educador especializado. Permacultura é o
          desenho de sistemas que imitam a inteligência da natureza — onde nada se perde e tudo se transforma.
        </P>
        <P>
          <strong>Na horta</strong>, a criança prepara a terra, planta, rega, espera e colhe. Cada etapa é uma lição de
          ciclo, paciência e causa e efeito — com as mãos na terra, do jeito que criança aprende de verdade. E a horta
          fica encostada na mata: de dentro dela, a criança está cercada de verde por todos os lados.
        </P>
        <LandingImage src="/images/natureza/horta-vista.jpg" alt="Vista ampla da horta da escola encostada num paredão de pedra tomado por vegetação densa, com crianças plantando no canteiro" />
        <LandingImage src="/images/natureza/horta-plantar.jpg" alt="Crianças plantando mudas em vasos de reaproveitamento na horta, com o educador ajudando" />
        <P>
          <strong>No minhocário</strong>, os restos do lanche viram terra fértil pelo trabalho das minhocas — a tarefa
          cósmica acontecendo na palma da mão. As crianças observam, tocam e acompanham a transformação semana a
          semana. Veja uma aula de verdade:
        </P>
        <div className="max-w-xs mx-auto my-6">
          <div className="aspect-[9/16] overflow-hidden rounded-sm shadow-lg bg-black">
            <video
              src="/videos/video2.mp4"
              poster="/images/natureza/minhocario-real.jpg"
              controls
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            >
              Seu navegador não suporta vídeo.
            </video>
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">
            Aula de permacultura: conhecendo as minhocas do minhocário
          </p>
        </div>
        <LandingImagePair
          images={[
            { src: '/images/natureza/minhocas-mao.jpg', alt: 'Mão cheia de minhocas tiradas do minhocário, com as crianças em volta observando' },
            { src: '/images/natureza/compostagem.jpg', alt: 'Educador e crianças ao redor da caixa de compostagem com restos de frutas e verduras virando terra' },
          ]}
          caption="A tarefa cósmica na palma da mão: os restos do lanche viram terra fértil, e a minhoca vira amiga."
        />
        <P>
          <strong>E em breve, abelhas nativas sem ferrão:</strong> estamos preparando a chegada de um meliponário com
          abelhas brasileiras como a jataí — que não têm ferrão, são seguras para as crianças e estão entre as
          principais polinizadoras da nossa flora. As crianças vão acompanhar de perto o trabalho de um dos seres mais
          importantes do planeta.
        </P>
      </LandingSection>

      <LandingSection heading="Por que a natureza é essencial (e não decoração)">
        <P>
          Criança pequena aprende com o corpo inteiro. Terra, areia, água, plantas e bichos oferecem o que nenhum
          brinquedo plástico oferece: texturas, pesos, cheiros e surpresas reais, que refinam os sentidos e alimentam a
          curiosidade científica que toda criança traz de fábrica.
        </P>
        <P>
          O contato diário com áreas verdes é associado a mais concentração, mais equilíbrio emocional, melhor
          coordenação motora e até um sistema imunológico mais forte. Numa infância cada vez mais trancada entre telas
          e apartamentos, um quintal de verdade virou privilégio raro — e a gente acha que deveria ser direito.
        </P>
        <LandingImagePair
          images={[
            { src: '/images/natureza/tanque-areia-1.jpg', alt: 'Duas crianças brincando descalças no tanque de areia da escola' },
            { src: '/images/natureza/tanque-areia-2.jpg', alt: 'Crianças explorando a areia com baldinhos e peneiras no tanque de areia' },
          ]}
          caption="No tanque de areia: textura, peso e temperatura que só a mão descobre."
        />
      </LandingSection>

      <LandingSection heading="Espaço amplo é liberdade de movimento">
        <P>
          Maria Montessori foi pioneira em afirmar o que a neurociência confirmou depois: movimento e inteligência se
          desenvolvem juntos. A criança que engatinha, sobe, corre, carrega e equilibra está construindo o cérebro
          através do corpo.
        </P>
        <P>
          Por isso nossos espaços são amplos por projeto, não por acaso: salas espaçosas com vista para o verde, onde o
          movimento é livre; um pátio coberto e arborizado; e atividades — capoeira, circo, dança e movimento,
          psicomotricidade — que fazem do corpo um instrumento de aprendizagem.
        </P>
        <LandingImage src="/images/natureza/patio-bolhas.jpg" portrait alt="Crianças brincando de estourar bolhas de sabão no amplo pátio coberto, com árvores e flores visíveis por cima da tela de proteção" />
        <LandingImage src="/images/natureza/maos-tinta.jpg" portrait alt="Menino mostrando as mãos pintadas, no pátio coberto, com as árvores ao fundo através da tela" />
        <LandingImage src="/images/natureza/patio-verde.jpg" alt="Duas crianças de costas, apoiadas na grade do pátio, observando uma parede de árvores verdes através da tela" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          Do pátio, a criança levanta os olhos e encontra árvores — é raro, em plena Laranjeiras, ter tanto verde à vista.
        </p>
        <LandingImage src="/images/espaco.png" alt="Sala ampla da Escola Montessoriana, vista de cima, com mesas baixas espalhadas, materiais ao alcance das crianças e janelas para o paredão de pedra verde" />
      </LandingSection>

      <LandingSection heading="Educação cósmica: o lugar da criança no mundo" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          "Educação cósmica" é um dos conceitos mais bonitos de Maria Montessori. A palavra vem do grego{' '}
          <em>kosmos</em> — que significa <strong>ordem</strong>, o contrário de caos. A ideia: apresentar o mundo à
          criança não como um amontoado de fatos soltos, mas como um todo organizado, onde cada parte tem um papel.
        </P>

        <Tema title="Ordem escondida no aparente caos">
          <p>
            À primeira vista, a natureza parece bagunça: folhas que caem, chuva que chega sem avisar, bichos para todo
            lado. Observada de perto — e a criança Montessori é treinada em observar —, ela revela uma ordem profunda:
            as estações se repetem, a água circula, a semente sabe a hora de germinar, cada ser vivo tem seu ritmo.
          </p>
          <p>
            Para a criança pequena, que vive um período sensível da ordem, descobrir que o mundo tem leis e ciclos
            confiáveis é profundamente tranquilizador. O mundo deixa de ser imprevisível e vira um lugar que dá para
            compreender — e é dessa segurança que nasce a coragem de explorar.
          </p>
        </Tema>
        <LandingImage src="/images/natureza/ciclo-vida.jpg" alt="Criança apontando para o material Montessori do ciclo de vida da rã: um disco com as etapas, do ovo à rã adulta" position="center 60%" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          O ciclo de vida em material concreto: a criança segura, na mão, a ordem por trás da natureza.
        </p>

        <Tema title="Tudo depende de tudo">
          <p>
            O sol alimenta a planta, a planta alimenta o animal, o animal devolve nutrientes ao solo, o solo alimenta a
            planta de novo. Nada na natureza vive sozinho — e as pessoas também não. Quando a criança percebe essas
            conexões na prática, entende que suas ações afetam o mundo, e que ela tem um papel nele.
          </p>
        </Tema>

        <Tema title="O trabalho dos seres vivos">
          <p>
            Cada ser vivo, sem saber, trabalha para o todo: a minhoca fofa e fertiliza o solo, a abelha poliniza as
            flores enquanto busca seu alimento, os fungos decompõem o que morreu para virar vida nova. Montessori
            chamava isso de <strong>tarefa cósmica</strong> — e mostrá-la à criança muda a relação dela com o próprio
            trabalho: trabalhar não é obrigação, é o jeito de cada um participar do mundo.
          </p>
        </Tema>
        <LandingImagePair
          images={[
            { src: '/images/natureza/material-folhas.jpg', alt: 'Criança pareando formas de folhas com o gabinete de botânica Montessori' },
            { src: '/images/natureza/animais-marinhos.jpg', alt: 'Criança classificando cartões e miniaturas de animais marinhos numa mesa Montessori' },
          ]}
          caption="Botânica e zoologia na sala: conhecer cada ser vivo é o primeiro passo para respeitá-lo."
        />

        <Tema title="Supranatureza: o que os humanos constroem">
          <p>
            E qual é a tarefa dos seres humanos? Montessori mostrava à criança que quase tudo ao nosso redor — o pão, a
            casa, a roupa, a estrada — é natureza transformada pelo trabalho acumulado de gerações. É a{' '}
            <strong>supranatureza</strong>: a camada que a humanidade construiu sobre o mundo natural. Perceber isso
            desperta gratidão pelos que vieram antes e o desejo de contribuir também.
          </p>
        </Tema>

        <Highlight>
          Dessa percepção nascem o cuidado com o outro, a responsabilidade ambiental e o senso de propósito — não por
          sermão, mas por experiência vivida.
        </Highlight>
        <LandingImage src="/images/natureza/grupo-natureza.jpg" alt="Grupo de crianças sorrindo com coroas de folhas na cabeça ao lado do educador de permacultura, diante do paredão de pedra" />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Guardiões da natureza: quem se sente parte do mundo aprende a cuidar dele.
        </p>
      </LandingSection>

      <LandingSection heading="Na nossa escola, isso significa">
        <Bullets
          items={[
            'Ambiente arborizado em plena Laranjeiras — um refúgio verde no ritmo da cidade.',
            'Aulas de permacultura na rotina: horta, minhocário e, em breve, abelhas nativas sem ferrão.',
            'Área ao ar livre todos os dias, com tanque de areia e exploração livre.',
            'Espaços amplos e movimento livre, dentro e fora da sala.',
            'Zero telas: experiência concreta no lugar de estímulo passivo.',
          ]}
        />
      </LandingSection>

      <LandingCTA
        heading="Venha sentir o espaço pessoalmente"
        text="Fotos ajudam, mas o verde, o som e a amplitude só se entendem ao vivo. Agende uma visita."
      />
    </div>
  );
};
