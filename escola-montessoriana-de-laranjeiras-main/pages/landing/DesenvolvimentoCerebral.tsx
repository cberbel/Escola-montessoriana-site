import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, LandingImagePair, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { SynapseDiagram } from '../../components/landing/SynapseDiagram';
import { SensitivePeriodsChart } from '../../components/landing/SensitivePeriodsChart';

export const DesenvolvimentoCerebral: React.FC = () => {
  usePageMeta(
    'Os Primeiros Anos e o Cérebro | Escola Montessoriana de Laranjeiras',
    'A ciência da primeira infância: arquitetura cerebral, a pesquisa de Fernald, Kuhl e Charles Nelson sobre linguagem, movimento e afeto — e por que a escolha da escola pesa mais do que a distância de casa.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Primeiros anos"
        title="A janela que não volta"
        subtitle="O que acontece no cérebro do seu filho agora constrói a base de tudo o que vem depois. Nos primeiros anos de vida, ele forma até 1 milhão de novas conexões neurais por segundo — nenhuma outra fase da vida chega perto."
      />

      <LandingSection heading="A arquitetura se constrói uma vez" className="pt-10 sm:pt-14">
        <P>
          O cérebro do recém-nascido pesa cerca de 350–400g — em torno de 25% do peso que terá na vida adulta (por
          volta de 1,3 a 1,4 kg) — mas já traz praticamente todos os neurônios que essa pessoa vai ter, cerca de 86
          bilhões. O crescimento que vem depois não é sobre criar mais neurônios: é sobre conectá-los.
        </P>
        <P>
          Esse crescimento é vertiginoso. Ao 1 ano de idade, o cérebro já alcançou cerca de 70% do peso adulto; aos 3
          anos, por volta de 80%; aos 5, cerca de 90%. Boa parte da arquitetura cerebral que uma pessoa vai usar a
          vida inteira está, literalmente, montada antes da alfabetização.
        </P>
        <SynapseDiagram />
        <P>
          Como numa casa, dá para reformar depois. Mas a fundação se faz uma vez. É por isso que o Center on the
          Developing Child, de Harvard — referência mundial em ciência do desenvolvimento infantil — descreve esse
          processo como "arquitetura cerebral": um edifício que se constrói de baixo para cima, e cuja qualidade
          estrutural depende diretamente da qualidade das experiências vividas nesses primeiros anos.
        </P>
        <LandingImage src="/images/cerebro/bebe-material.jpg" alt="Bebê de 1 ano concentrado encaixando discos coloridos em pinos de madeira, na sala da escola" portrait />
        <p className="-mt-2 text-center text-sm text-gray-500">
          Cada encaixe, uma conexão: é assim, pela mão, que a arquitetura se constrói.
        </p>
      </LandingSection>

      <LandingSection heading='"Skills beget skills": por que o atraso se acumula' className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Uma das descobertas mais importantes da economia da educação — do prêmio Nobel James Heckman — é que
          habilidade gera habilidade, e motivação gera motivação. Capacidades fundamentais como atenção,
          autorregulação e comunicação, construídas nos primeiros anos, são os alicerces sobre os quais habilidades
          mais complexas se apoiam mais tarde: raciocínio, leitura, relações sociais.
        </P>
        <P>
          O inverso também é verdadeiro, e é aí que mora a urgência: um cérebro que não recebeu estímulo suficiente
          cedo não parte do zero depois — parte atrás, tentando construir o segundo andar sem o primeiro pronto.
          Cada ano de atraso fica mais caro e mais difícil de recuperar do que o anterior.
        </P>
        <LandingImage src="/images/cerebro/bebe-encaixes.jpg" alt="Bebê encaixando blocos geométricos coloridos na base de madeira, com concentração" portrait />
        <Highlight>
          Não é sobre "adiantar" a infância. É sobre não perder a janela em que construir essas bases custa
          naturalmente pouco — porque é exatamente para isso que o cérebro dessa idade está preparado.
        </Highlight>
      </LandingSection>

      <LandingSection heading="O papel da linguagem">
        <P>
          A pesquisadora Anne Fernald, de Stanford, mostrou algo notável: bebês que ouvem mais linguagem dirigida a
          eles — não apenas ao redor, mas diretamente, em conversa real — processam palavras com mais velocidade e
          eficiência já aos 18 meses. Essa velocidade de processamento, medida em laboratório, prediz o tamanho do
          vocabulário anos depois. A diferença não é sobre inteligência inata: é sobre quantidade e qualidade de
          conversa vivida.
        </P>
        <P>
          Patricia Kuhl, da Universidade de Washington, descobriu algo igualmente importante sobre o "quando". Bebês
          nascem como o que ela chama de "cidadãos do mundo", capazes de distinguir os sons de qualquer idioma
          humano. Por volta dos 10–12 meses, essa capacidade se especializa nos sons da língua que ouvem — uma
          janela que se fecha progressivamente. E, em um experimento célebre, Kuhl mostrou que bebês expostos a um
          idioma novo por uma pessoa ao vivo aprenderam os sons dessa língua — enquanto bebês expostos ao mesmo
          conteúdo em vídeo, sozinhos, não aprenderam nada. A tela não substitui a interação social real.
        </P>
        <P>
          É por essa janela — a mesma que a Kuhl mediu — que a imersão em inglês faz tanta diferença quando começa
          cedo, com uma pessoa real, e não com um aplicativo.{' '}
          <Link to="/ingles-primeira-infancia" className="text-montessori-green font-semibold underline hover:no-underline">
            Entenda por que o inglês na primeira infância é tão poderoso
          </Link>.
        </P>
        <P>
          E a linguagem não é a única com hora marcada. Cada grande função do cérebro — os sentidos, a linguagem, as
          funções cognitivas mais complexas — tem sua própria janela de maior facilidade, e todas se concentram nos
          primeiros anos de vida:
        </P>
        <SensitivePeriodsChart />
        <LandingImage src="/images/cerebro/leitura-bebes.jpg" alt="Professora lendo um livro ilustrado para três bebês sentados ao seu redor na sala" />
        <p className="-mt-2 mb-6 text-center text-sm text-gray-500">
          Linguagem de verdade: uma pessoa real, um livro e bebês respondendo — o "servir e devolver" em ação.
        </p>
        <Highlight>
          Ouvir não basta: o cérebro do bebê aprende linguagem na relação com outra pessoa, ao vivo, respondendo e
          sendo respondido — é por isso que chamamos de "servir e devolver".
        </Highlight>
      </LandingSection>

      <LandingSection heading="O papel do movimento">
        <P>
          Maria Montessori afirmou, um século atrás, que movimento e inteligência estão profundamente ligados — e a
          neurociência confirmou. Engatinhar, subir, equilibrar e manusear objetos com as próprias mãos não é apenas
          desenvolvimento físico: é construção cognitiva. O cerebelo, tradicionalmente associado só à coordenação
          motora, também participa ativamente de funções como linguagem, atenção e planejamento.
        </P>
        <P>
          Por isso um ambiente que restringe o movimento — mais tempo sentado, mais tela, menos exploração livre —
          não poupa energia da criança para "coisas mais importantes". Ele tira do cérebro justamente um dos
          combustíveis de que mais precisa nessa fase.
        </P>
        <LandingImagePair
          images={[
            { src: '/images/cerebro/bebes-escada.jpg', alt: 'Três bebês sorrindo no alto da escada Montessori de madeira, dentro da sala' },
            { src: '/images/cerebro/patio-musica.jpg', alt: 'Aula de movimento e música no pátio coberto, com bebês e professores e as árvores ao fundo' },
          ]}
          caption="Subir, dançar, equilibrar: movimento é combustível do cérebro — na sala e no pátio."
        />
      </LandingSection>

      <LandingSection heading="O papel do afeto" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          A evidência mais contundente sobre a importância do vínculo afetivo vem do trabalho do pesquisador Charles
          Nelson, de Harvard, no Bucharest Early Intervention Project. O estudo acompanhou crianças romenas criadas
          em orfanatos — instituições que ofereciam comida, higiene e abrigo, mas pouquíssima atenção individualizada
          e vínculo afetivo responsivo. O resultado: essas crianças apresentaram volume cerebral reduzido e
          alterações mensuráveis na atividade elétrica do cérebro, em comparação a crianças criadas em famílias.
        </P>
        <P>
          O achado mais importante para uma família decidindo hoje: crianças transferidas para um lar afetivo e
          responsivo antes dos 2 anos de idade recuperaram boa parte do desenvolvimento perdido. As que foram
          transferidas depois, não. Não foi a falta de comida ou de teto que prejudicou o desenvolvimento cerebral —
          foi a ausência de um adulto que respondesse, de forma consistente e individual, a cada uma delas.
        </P>
        <Highlight>
          "Cuidar bem" não é o mesmo que nutrir o desenvolvimento. A pergunta que importa não é se seu filho está
          seguro e alimentado — é se alguém está genuinamente presente, respondendo a ele, todos os dias.
        </Highlight>
      </LandingSection>

      <LandingSection heading={'"Mas tem uma creche do lado de casa..."'}>
        <P>
          É a dúvida mais honesta que ouvimos — e merece uma resposta honesta. Conveniência importa, especialmente na
          rotina puxada de quem tem filho pequeno. Mas, à luz do que a ciência mostra sobre arquitetura cerebral,
          janelas únicas e o papel do vínculo, vale colocar as duas coisas na balança:
        </P>
        <Bullets
          items={[
            <><strong>Faça a conta das horas.</strong> São 10 ou 15 minutos a mais no trajeto — contra 8, 9, 10 horas por dia que seu filho vive dentro da escola. O que pesa mais na vida dele: os poucos minutos no carro, ou as milhares de horas de experiências que constroem o cérebro dele?</>,
            <><strong>Essa janela não volta.</strong> Como mostrou o trabalho de Charles Nelson, quanto mais cedo o ambiente certo chega, maior a recuperação possível — e o inverso também é verdadeiro. Skills beget skills: o que não se constrói agora fica mais difícil de construir depois.</>,
            <><strong>"Cuidar bem" não é o mesmo que desenvolver.</strong> Um lugar limpo e carinhoso é o mínimo. A pergunta certa é: o que acontece com a linguagem, o movimento e o vínculo do meu filho nas 8 horas por dia que ele passa lá?</>,
          ]}
        />
        <P>
          E a logística tem solução: funcionamos das 7h30 às 19h, com horários flexíveis que se adaptam à rotina da
          família — em Laranjeiras, a poucos minutos de Cosme Velho, Flamengo, Botafogo e Catete.
        </P>
      </LandingSection>

      <LandingSection heading="O que fazemos com essa janela">
        <Bullets
          items={[
            'Uma professora para cada 3 bebês menores de 18 meses: cada balbucio, cada tentativa, encontra um adulto que observa e responde.',
            'Imersão diária em inglês com professoras nativas e bilíngues, no auge da janela da linguagem — pelo caminho do "servir e devolver", não da tela.',
            'Ambiente preparado Montessori: movimento livre, materiais concretos e manuseáveis — zero telas.',
            'Observação individual: cada criança é acompanhada no seu ritmo, com registros reais do seu desenvolvimento.',
          ]}
        />
      </LandingSection>

      <LandingCTA
        heading="Decida com os próprios olhos"
        text="Visite a escola, observe as salas em funcionamento e compare. Seu filho tem uma primeira infância — escolha o que ela vai construir."
      />
    </div>
  );
};
