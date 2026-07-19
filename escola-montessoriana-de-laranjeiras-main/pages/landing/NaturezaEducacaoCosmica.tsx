import React from 'react';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

export const NaturezaEducacaoCosmica: React.FC = () => {
  usePageMeta(
    'Natureza, Espaços Amplos e Educação Cósmica | Escola Montessoriana de Laranjeiras',
    'Ambiente arborizado, espaços amplos, movimento livre e educação cósmica: como o contato com a natureza e o senso de interdependência formam crianças confiantes e conectadas ao mundo.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Natureza e pertencimento"
        title="Um refúgio verde para crescer: natureza, espaço e educação cósmica"
        subtitle="No meio da cidade, um ambiente arborizado onde a criança corre, planta, observa e descobre que faz parte de algo maior."
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
        <LandingImage src="/images/ambiente-preparado.png" alt="Crianças concentradas brincando no tanque de areia da Escola Montessoriana" />
      </LandingSection>

      <LandingSection heading="Espaço amplo é liberdade de movimento">
        <P>
          Maria Montessori foi pioneira em afirmar o que a neurociência confirmou depois: movimento e inteligência se
          desenvolvem juntos. A criança que engatinha, sobe, corre, carrega e equilibra está construindo o cérebro
          através do corpo.
        </P>
        <P>
          Por isso nossos espaços são amplos por projeto, não por acaso: salas onde o movimento é livre, área externa
          com tanque de areia, e atividades — capoeira, circo, dança e movimento, psicomotricidade — que fazem do corpo
          um instrumento de aprendizagem.
        </P>
      </LandingSection>

      <LandingSection heading="Educação cósmica: o lugar da criança no mundo">
        <P>
          "Educação cósmica" é um dos conceitos mais bonitos de Montessori. A ideia é simples e profunda: ajudar a
          criança a perceber que tudo está conectado — o sol que alimenta a planta, a planta que alimenta o animal, a
          água que circula, as pessoas que dependem umas das outras.
        </P>
        <P>
          Quando a criança planta, cuida da horta, composta restos do lanche e observa o ciclo acontecer (é a nossa
          permacultura na prática), ela não está só "fazendo atividade". Está descobrindo interdependência: que suas
          ações afetam o mundo, e que ela tem um papel nele.
        </P>
        <Highlight>
          Dessa percepção nascem o cuidado com o outro, a responsabilidade ambiental e o senso de propósito — não por
          sermão, mas por experiência vivida.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Na nossa escola, isso significa">
        <Bullets
          items={[
            'Ambiente arborizado em plena Laranjeiras — um refúgio verde no ritmo da cidade.',
            'Área ao ar livre todos os dias, com tanque de areia e exploração livre.',
            'Permacultura e cuidado com plantas como parte da rotina, não evento.',
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
