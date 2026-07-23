import React from 'react';
import { LandingHero, LandingSection, LandingCTA, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

export const Acolhimento: React.FC = () => {
  usePageMeta(
    'Acolhimento | Escola Montessoriana de Laranjeiras',
    'Acolhimento total: segurança emocional como base do desenvolvimento, adaptação respeitosa no tempo da criança, muito colo, flexibilidade para a família e alimentação de verdade — sem óleo vegetal, sal refinado ou açúcar.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Acolhimento"
        title="Acolhimento total: criança só floresce quando se sente segura"
        subtitle="Antes de qualquer conteúdo, vem o colo. Aqui cada criança — e cada família — é recebida com tempo, respeito e afeto de verdade."
      />

      <LandingSection heading="Segurança é a base de todo o desenvolvimento" className="pt-10 sm:pt-14">
        <P>
          Existe uma ordem na natureza da criança que nenhuma escola deveria ignorar: <strong>primeiro a segurança,
          depois o aprendizado</strong>. Uma criança que não se sente segura vive em estado de alerta — o corpo entra
          no modo de sobrevivência, o famoso "luta ou fuga". Nesse estado, quase toda a energia do cérebro é gasta se
          defendendo de uma ameaça, e sobra pouquíssimo para explorar, se concentrar ou aprender.
        </P>
        <P>
          Quando a criança se sente acolhida e segura, acontece o contrário: o corpo relaxa, sai do estado de alerta, e
          o cérebro fica livre para o que realmente importa nessa fase — descobrir o mundo, criar vínculos, se
          concentrar e construir inteligência. Por isso o acolhimento não é um detalhe simpático da nossa rotina. É a
          fundação de tudo.
        </P>
        <Highlight>
          Nenhuma criança aprende com medo. A segurança emocional não é o oposto do aprendizado — é a condição dele.
        </Highlight>
        <LandingImagePair
          images={[
            { src: '/images/acolhimento/sorriso-professora.jpg', alt: 'Professora e criança abraçadas sorrindo juntas no pátio da escola' },
            { src: '/images/acolhimento/bebe-tranquilo.jpg', alt: 'Bebê tranquilo explorando um material na sala, com as estantes ao fundo' },
          ]}
          caption="O sorriso de quem se sente seguro — é dele que nasce todo o resto."
        />
      </LandingSection>

      <LandingSection heading="Adaptação respeitosa: quem dá o ritmo é a criança">
        <P>
          Chegar a um lugar novo, cheio de rostos desconhecidos, é grande para um adulto — imagine para alguém que tem
          um, dois, três anos. Por isso a nossa adaptação nunca é uma imposição. Não "arrancamos" a criança do colo dos
          pais nem cronometramos um número de dias igual para todos.
        </P>
        <P>
          Fazemos o oposto: <strong>seguimos a criança</strong>. A entrada é gradual, com a presença de um adulto de
          referência no começo, e avança no tempo de cada uma. Observamos os sinais, respeitamos o choro como uma forma
          legítima de comunicação, e construímos confiança dia após dia. Adaptação respeitosa não é a criança se render
          à escola — é a escola conquistar, com paciência, a confiança da criança.
        </P>
        <LandingImage src="/images/acolhimento/adaptacao-artes.jpg" alt="Bebê de avental pintando ao lado da professora, que acompanha de pertinho a atividade" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Um adulto de referência por perto: assim a confiança se constrói, um dia de cada vez.
        </p>
      </LandingSection>

      <LandingSection heading="Damos muito colo" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Colo não estraga criança. Colo não atrapalha a independência. É exatamente o contrário: a criança que tem suas
          necessidades acolhidas — que é pega no colo quando precisa, consolada quando chora, olhada quando chama —
          constrói uma segurança interna que vai carregar para a vida toda.
        </P>
        <P>
          E é dessa base segura que nasce a coragem de se separar, explorar e se tornar independente. Uma criança só se
          solta com confiança quando sabe que tem para onde voltar. Por isso, aqui, colo é levado a sério: é investimento
          direto na autonomia que o método Montessori tanto valoriza.
        </P>
        <Highlight>
          A independência não nasce da falta de colo. Nasce da certeza de que o colo está sempre disponível.
        </Highlight>
        <LandingImage src="/images/acolhimento/colo-patio.jpg" alt="Professora em pé no pátio com um bebê no colo, os dois se olhando, com as árvores ao fundo" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Colo de verdade, no meio do verde: a base segura de onde a criança parte para o mundo.
        </p>
      </LandingSection>

      <LandingSection heading="Acolhimento também para a família">
        <P>
          Confiar seu filho a outras mãos é um dos passos mais delicados que uma família dá. Nós sabemos — e acolhemos os
          pais com o mesmo cuidado que acolhemos as crianças.
        </P>
        <Bullets
          items={[
            <><strong>Frequência reduzida:</strong> opções de meio período e dias alternados, para famílias que querem uma transição mais suave ou uma rotina mais leve.</>,
            <><strong>Flexibilidade de horários:</strong> ajustamos o possível à realidade de cada família, em vez de encaixar todo mundo na mesma grade rígida.</>,
            <><strong>Comunicação aberta:</strong> você sabe como foi o dia do seu filho, com transparência e sem rodeios.</>,
            <><strong>Parceria, não substituição:</strong> a escola caminha ao lado da família, respeitando as escolhas e o momento de cada casa.</>,
          ]}
        />
        <P>
          Acolher a família é parte de acolher a criança: um filho relaxa quando sente que seus pais confiam no lugar
          onde ele está.
        </P>
      </LandingSection>

      <LandingSection id="alimentacao" heading="A alimentação também é acolhimento">
        <P>
          Cuidar do que entra no corpo da criança é cuidar do humor, do sono, da concentração e da saúde dela. Por isso
          levamos a comida tão a sério quanto o colo. Servimos <strong>comida de verdade</strong>, feita com cuidado:{' '}
          <strong>sem óleo vegetal, sem sal refinado e sem açúcar</strong>. No lugar deles, alimentos frescos e
          integrais, gorduras de verdade e temperos naturais.
        </P>
        <LandingImage src="/images/acolhimento/almoco-juntos.jpg" alt="Crianças pequenas almoçando juntas na mesa baixa da sala, cada uma com seu prato, com duas professoras acompanhando" />
        <P>
          E a refeição é, ela mesma, um momento de acolhimento e aprendizado. As crianças pequenas almoçam juntas, à
          mesa, no seu ritmo. Aprendem a comer sozinhas, a se servir, a experimentar sabores novos — com autonomia e
          prazer, sem pressão e sem chantagem. Comer bem, aqui, é também um jeito de conviver e de se cuidar.
        </P>
        <LandingImage src="/images/acolhimento/almoco-bebes.jpg" alt="Bebês comendo sozinhos com suas colheres na mesa baixa, acompanhados de perto pelas professoras" />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Desde bebês, cada um com seu prato e sua colher: comer sozinho também é conquista.
        </p>
      </LandingSection>

      <LandingCTA
        heading="Venha sentir o acolhimento de perto"
        text="O afeto de uma escola não cabe num texto — se sente no ar, no colo e no jeito de receber. Agende uma visita e veja seu filho ser acolhido."
      />
    </div>
  );
};
