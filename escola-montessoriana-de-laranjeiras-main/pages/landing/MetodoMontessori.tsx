import React from 'react';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

export const MetodoMontessori: React.FC = () => {
  usePageMeta(
    'O Método Montessori | Escola Montessoriana de Laranjeiras',
    'Entenda o método Montessori: ambiente preparado, autonomia, períodos sensíveis e educação personalizada. Mais de 100 anos formando crianças confiantes e independentes.'
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
          Maria Montessori (1870–1952) foi uma das primeiras mulheres a se formar em medicina na Itália. Observando
          cientificamente como as crianças aprendem, ela chegou a uma conclusão revolucionária para a época: a criança
          não é um adulto em miniatura que precisa ser "ensinado" o tempo todo — é um ser que se constrói sozinho,
          desde que encontre o ambiente certo para isso.
        </P>
        <P>
          Seu método se espalhou por mais de 140 países e segue vivo em milhares de escolas. Fundadores de empresas como
          Google, Amazon e Wikipedia passaram por escolas Montessori — e costumam citar essa formação como decisiva na
          capacidade de pensar por conta própria.
        </P>
        <Highlight>
          "A criança não é um vaso a ser preenchido, mas uma fonte que deixamos jorrar." — Maria Montessori
        </Highlight>
      </LandingSection>

      <LandingSection heading="Os pilares do método">
        <Bullets
          items={[
            <><strong>Ambiente preparado:</strong> tudo na sala — móveis, materiais, alturas — é pensado para a criança usar sozinha, sem depender de um adulto a cada passo.</>,
            <><strong>Autonomia e independência:</strong> a criança escolhe suas atividades e aprende a cuidar de si, do outro e do espaço. Autoestima não se dá, se constrói.</>,
            <><strong>Liberdade com limites:</strong> liberdade não é ausência de regras — é poder escolher dentro de um quadro claro e seguro, que a criança compreende e respeita.</>,
            <><strong>Períodos sensíveis:</strong> cada fase da infância tem janelas em que certos aprendizados acontecem quase sem esforço — linguagem, ordem, movimento, refinamento dos sentidos. O método aproveita cada janela no momento certo.</>,
            <><strong>Materiais científicos:</strong> os materiais Montessori isolam uma dificuldade por vez e permitem que a própria criança perceba o erro e se corrija — sem depender da aprovação do adulto.</>,
            <><strong>O adulto como guia:</strong> a professora observa cada criança individualmente e apresenta o material certo na hora certa. É isso que torna a educação verdadeiramente personalizada.</>,
          ]}
        />
      </LandingSection>

      <LandingSection heading="Na prática: como é um dia Montessori">
        <LandingImage src="/images/espaco.png" alt="Sala Montessori ampla da Escola Montessoriana de Laranjeiras, com materiais ao alcance das crianças" />
        <P>
          Ao entrar na sala, a criança escolhe seu trabalho. Pode ser lavar uma mesa, montar a torre rosa, explorar os
          sons das letras ou preparar seu próprio lanche. A professora acompanha de perto, apresenta materiais novos
          quando percebe que a criança está pronta, e interfere o mínimo necessário.
        </P>
        <P>
          O silêncio concentrado de uma sala Montessori costuma surpreender quem visita pela primeira vez. Não é
          disciplina imposta — é o que acontece quando cada criança está genuinamente interessada no que faz.
        </P>
      </LandingSection>

      <LandingSection heading="O que isso muda na vida do seu filho">
        <Bullets
          items={[
            'Concentração: a capacidade de se dedicar a uma tarefa por longos períodos — cada vez mais rara, cada vez mais valiosa.',
            'Segurança emocional: a criança que faz por si mesma confia em si mesma.',
            'Amor por aprender: o aprendizado nunca foi obrigação; sempre foi descoberta.',
            'Responsabilidade real: cuidar do ambiente, dos materiais e dos colegas faz parte do dia, não do discurso.',
          ]}
        />
        <P>
          Bem diferente do modelo tradicional, em que todas as crianças fazem a mesma coisa, ao mesmo tempo, no mesmo
          ritmo — como numa linha de produção. Montessori educa para a vida real, onde pensar por conta própria faz
          toda a diferença.
        </P>
      </LandingSection>

      <LandingCTA
        heading="Veja o método acontecendo de perto"
        text="Nenhum texto substitui ver uma sala Montessori em funcionamento. Agende uma visita e observe como as crianças trabalham."
      />
    </div>
  );
};
