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

      <LandingSection heading="Por que a natureza é essencial (e não decoração)" className="pt-10 sm:pt-14">
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
        <LandingImage src="/images/natureza/patio-arborizado.jpg" alt="Pátio coberto da escola cercado por uma copa densa de árvores, com professora e crianças em aula de música no chão" />
        <P>
          Nosso pátio coberto fica cercado de verde: de qualquer ponto, a criança levanta os olhos e encontra árvores.
          É nele que acontecem as aulas de movimento — e é raro, em plena Laranjeiras, ter tanta árvore à vista.
        </P>
        <LandingImagePair
          images={[
            { src: '/images/natureza/quadra-danca.jpg', alt: 'Crianças dançando no pátio coberto, com árvores visíveis ao fundo através da tela de proteção' },
            { src: '/images/natureza/quadra-capoeira.jpg', alt: 'Aula de capoeira no pátio, com o professor de branco e árvores ao fundo' },
          ]}
          caption="Capoeira, dança e movimento no pátio arborizado."
        />
        <LandingImage src="/images/natureza/area-externa.jpg" alt="Criança pequena andando de bicicleta de equilíbrio na área externa coberta, com árvores ao fundo" />
        <LandingImage src="/images/espaco.png" alt="Sala ampla da Escola Montessoriana, com mesas baixas, materiais ao alcance das crianças e janelas para o paredão de pedra verde" />
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
      </LandingSection>

      <LandingSection heading="Permacultura na prática: horta, minhocário e abelhas">
        <P>
          Aqui, a educação cósmica não fica na teoria: as crianças têm <strong>aulas de permacultura</strong> como
          parte da rotina, com um educador especializado. Permacultura é o desenho de sistemas que imitam a
          inteligência da natureza — onde nada se perde e tudo se transforma.
        </P>
        <P>
          <strong>Na horta</strong>, a criança prepara a terra, planta, rega, espera e colhe. Cada etapa é uma lição de
          ciclo, paciência e causa e efeito — com as mãos na terra, do jeito que criança aprende de verdade.
        </P>
        <LandingImage src="/images/natureza/horta-plantio.jpg" alt="Duas crianças agachadas na horta da escola, plantando uma muda juntas na terra" />
        <P>
          <strong>No minhocário</strong>, os restos do lanche viram terra fértil pelo trabalho das minhocas — a tarefa
          cósmica acontecendo na palma da mão. As crianças observam, tocam e acompanham a transformação semana a
          semana. Veja uma aula de verdade:
        </P>
        <div className="max-w-xs mx-auto my-6">
          <div className="aspect-[9/16] overflow-hidden rounded-sm shadow-lg bg-black">
            <video
              src="/videos/video2.mp4"
              poster="/images/natureza/permacultura-minhocario-poster.jpg"
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
            { src: '/images/natureza/minhocario-maos.jpg', alt: 'Mão de uma criança e de um adulto segurando terra do minhocário, com uma minhoca na palma' },
            { src: '/images/natureza/minhocario-turma.jpg', alt: 'Turma reunida em roda ao redor da bandeja do minhocário durante a aula de permacultura' },
          ]}
          caption="A tarefa cósmica na palma da mão: a turma inteira ao redor do minhocário."
        />
        <P>
          <strong>E em breve, abelhas nativas sem ferrão:</strong> estamos preparando a chegada de um meliponário com
          abelhas brasileiras como a jataí — que não têm ferrão, são seguras para as crianças e estão entre as
          principais polinizadoras da nossa flora. As crianças vão acompanhar de perto o trabalho de um dos seres mais
          importantes do planeta.
        </P>
      </LandingSection>

      <LandingSection heading="Na nossa escola, isso significa">
        <Bullets
          items={[
            'Ambiente arborizado em plena Laranjeiras — um refúgio verde no ritmo da cidade.',
            'Área ao ar livre todos os dias, com tanque de areia e exploração livre.',
            'Aulas de permacultura na rotina: horta, minhocário e, em breve, abelhas nativas sem ferrão.',
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
