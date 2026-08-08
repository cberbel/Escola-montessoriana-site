import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, Highlight, Bullets, P, LandingImage, usePageMeta } from '../../components/landing/Landing';

export const InglesPrimeiraInfancia: React.FC = () => {
  usePageMeta(
    'Inglês na Primeira Infância | Escola Montessoriana de Laranjeiras',
    'Por que os primeiros anos são a melhor janela para o inglês: aquisição natural pela imersão diária com professoras nativas e bilíngues, função executiva do cérebro bilíngue, o custo de oportunidade e o acesso ao conhecimento do mundo.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Bilinguismo"
        title="Inglês na primeira infância: o momento ideal"
        subtitle="Nenhum adulto aprende um idioma com a facilidade de uma criança pequena. Não é talento — é biologia. E esse é exatamente o período ideal para começar."
      />

      <LandingSection heading="Por que tão cedo?" className="pt-10 sm:pt-14">
        <P>
          Nos primeiros anos de vida, o cérebro da criança está construindo os circuitos da linguagem. Nessa fase, ela
          não "estuda" um idioma — ela o absorve, do mesmo jeito que absorve a língua materna: ouvindo, brincando,
          vivendo. É o que Maria Montessori chamou de mente absorvente.
        </P>
        <P>
          A capacidade de distinguir e reproduzir os sons de qualquer idioma é máxima na primeira infância e diminui com
          os anos. É por isso que quem começa cedo fala sem sotaque e sem esforço — e quem começa tarde estuda anos
          para alcançar menos.{' '}
          <Link to="/desenvolvimento-cerebral" className="text-montessori-green font-semibold underline hover:no-underline">
            Veja a ciência dos períodos sensíveis
          </Link>.
        </P>
        <LandingImage
          src="/images/ingles/safira-patio.jpg"
          alt="Bebê da Escola Montessoriana brincando no pátio, no auge da fase de absorção da linguagem"
          portrait
        />
        <Highlight>
          Para a criança pequena, o inglês não é uma matéria. É só mais uma forma natural de falar com pessoas de quem
          ela gosta.
        </Highlight>
      </LandingSection>

      <LandingSection heading="O custo de oportunidade: agora é de graça, depois é caro" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Aqui está o argumento que quase ninguém faz — e talvez seja o mais importante. Na primeira infância, o inglês
          entra <strong>embutido na vida</strong>: na música da roda, no lanche, na brincadeira do parquinho. Não toma
          uma única hora a mais na rotina da criança. O custo, em tempo e esforço, é praticamente <strong>zero</strong>.
        </P>
        <P>
          Alguns anos depois, tudo muda. A agenda da criança maior fica cheia — esporte, música, dever de casa,
          amigos, vida social. O inglês deixa de ser algo que se vive e vira <strong>mais uma atividade</strong> a
          encaixar na semana: uma aula extra, um curso à parte, um horário disputado com tudo o que a criança também
          quer fazer. Custa dinheiro, custa horas, custa força de vontade — e ainda entrega um resultado inferior, com
          mais esforço e quase sempre com sotaque.
        </P>
        <LandingImage
          src="/images/ingles/bebe-atividade.jpg"
          alt="Bebê da Escola Montessoriana sorrindo durante uma atividade — nessa fase o inglês entra embutido na brincadeira, sem custar tempo extra"
          portrait
        />
        <Highlight>
          O idioma que hoje entra brincando, amanhã vira mais uma tarefa na agenda. Aprender inglês cedo não é adiantar
          uma matéria — é aproveitar a única fase em que ele custa quase nada.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Um cérebro bilíngue é um cérebro mais forte">
        <P>
          Os ganhos do bilinguismo precoce vão muito além de falar duas línguas. A pesquisadora Ellen Bialystok, uma
          das maiores autoridades mundiais no tema, mostrou que o cérebro bilíngue vive resolvendo uma pergunta
          invisível — "qual língua eu uso agora?" — e que esse exercício constante fortalece a{' '}
          <strong>função executiva</strong>: o conjunto de habilidades que comanda o foco, o autocontrole e a
          organização do pensamento.
        </P>
        <Bullets
          items={[
            <><strong>Controle inibitório:</strong> para falar uma língua, o cérebro precisa "segurar" a outra. É o mesmo músculo mental que ajuda a criança a se concentrar e resistir à distração.</>,
            <><strong>Memória de trabalho:</strong> manter dois sistemas ativos ao mesmo tempo treina a capacidade de reter e manipular informação — base do raciocínio e da matemática.</>,
            <><strong>Flexibilidade cognitiva:</strong> alternar entre línguas é alternar entre formas de ver o mundo. Quem faz isso desde cedo pensa com mais jogo de cintura.</>,
            <><strong>Consciência da linguagem:</strong> entender que a mesma coisa tem dois nomes desperta cedo a percepção de como as línguas funcionam — e facilita aprender a terceira, a quarta.</>,
          ]}
        />
        <P>
          A função executiva prevê o sucesso escolar e profissional melhor do que o próprio QI — e, como toda
          habilidade fundamental, ela se constrói mais facilmente nos primeiros anos.{' '}
          <Link to="/desenvolvimento-cerebral" className="text-montessori-green font-semibold underline hover:no-underline">
            É o princípio do "skills beget skills"
          </Link>: quanto antes essa base é construída, mais tudo o que vem depois se apoia nela.
        </P>
      </LandingSection>

      <LandingSection heading="O conhecimento do mundo está em inglês" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Há uma razão prática, e enorme, que costuma ser esquecida: o inglês é a língua em que o mundo pensa e
          compartilha o que sabe. A ciência mais avançada, a medicina, a tecnologia, a aviação, os negócios
          internacionais, o melhor da internet — tudo isso acontece, primeiro, em inglês.
        </P>
        <P>
          Uma criança que cresce fluente não vai depender de traduções de segunda mão nem de legendas. Ela terá acesso
          <strong> direto à fonte</strong>: poderá estudar nas melhores universidades do mundo, ler o artigo original,
          assistir à aula do especialista, trabalhar com pessoas de qualquer país. O inglês deixa de ser uma matéria a
          vencer e vira uma <strong>chave</strong> — a que abre a sala onde o conhecimento de verdade circula.
        </P>
        <Highlight>
          Dar inglês fluente a um filho não é dar uma habilidade a mais. É ampliar o tamanho do mundo ao qual ele terá
          acesso pela vida inteira.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Imersão de verdade, com professoras nativas e bilíngues">
        <P>
          Aula de inglês uma ou duas vezes por semana não cria bilinguismo — cria vocabulário decorado, que some nas
          férias. O que funciona é a imersão: o idioma presente na rotina, todos os dias, em situações reais.
        </P>
        <P>
          Na Escola Montessoriana, as crianças convivem diariamente com o inglês na voz de professoras fluentes —
          nativas e brasileiras bilíngues. O idioma aparece nas brincadeiras, nas músicas, nas refeições, no
          parquinho — exatamente como a língua materna apareceu na vida delas. Sem pressão, sem prova, sem "hora do
          inglês". A língua simplesmente faz parte da vida.
        </P>
        <P>
          E precisa ser gente de verdade: a pesquisa de Patricia Kuhl mostrou que o bebê aprende os sons de um novo
          idioma com uma pessoa presente e interagindo — e não aprende nada assistindo ao mesmo conteúdo em uma tela,
          sozinho. Por isso a imersão viva, com pessoas reais interagindo todos os dias, faz toda a diferença — e
          nenhum aplicativo substitui.
        </P>
      </LandingSection>

      <LandingSection heading="E não paramos no inglês">
        <P>
          Famílias que desejam podem escolher mais um idioma para o filho: francês, mandarim, espanhol, italiano ou
          alemão. A mesma lógica da imersão vale para a terceira língua — e a mesma janela da primeira infância
          também. Quanto mais cedo, mais natural, mais barato e mais duradouro.
        </P>
      </LandingSection>

      <LandingCTA
        heading="Venha ouvir as crianças vivendo em dois idiomas"
        text="Agende uma visita e veja a imersão acontecendo naturalmente, com professoras nativas e brasileiras, no meio da rotina."
      />
    </div>
  );
};
