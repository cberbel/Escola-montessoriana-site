import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';
import { Referencias } from '../../components/blog/BlogLayout';

export const MONTESSORI_TRADICIONAL_URL = '/montessori-x-tradicional';
export const MONTESSORI_TRADICIONAL_TITLE = 'Por que Montessori é melhor que a escola tradicional';
export const MONTESSORI_TRADICIONAL_DESCRIPTION =
  'Doze diferenças entre a sala Montessori e a sala tradicional, explicadas sem pressa: o dia, o aprendizado e o que cada uma forma na criança.';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">
    {children}
  </Link>
);

interface Diferenca {
  n: number;
  titulo: string;
  tradicional: string;
  montessori: string;
}

/**
 * As doze diferenças, em três blocos: o dia, o aprendizado e o resultado.
 * Mesmo texto-base da série "Duas salas, dois caminhos" (reels e e-mails de outubro de 2026):
 * ao mudar um, conferir o outro (Documents/email-nutricao/serie-duas-salas/texto-base.md).
 */
const DIA: Diferenca[] = [
  {
    n: 1,
    titulo: 'Sentado ou em movimento',
    tradicional:
      'A criança passa a manhã sentada, de frente para o quadro, olhando a nuca do colega. Levantar precisa de permissão. Para uma criança pequena, que aprende com o corpo inteiro, é pedir muito. Muitos meninos sofrem especialmente com isso: a energia que não tem para onde ir acaba recebendo o nome de agitação.',
    montessori:
      'O movimento faz parte do trabalho. A criança busca o material na estante, escolhe a mesa ou o tapete, carrega, arruma e devolve. Ela se movimenta com propósito, e é por isso que depois consegue ficar tanto tempo concentrada: o corpo não está sendo contido, está sendo usado.',
  },
  {
    n: 2,
    titulo: 'Tempo fatiado ou três horas sem cortes',
    tradicional:
      'A manhã é dividida em aulas, e o horário marca a troca. A criança que acabou de engrenar é interrompida. A que ainda não entendeu segue adiante do mesmo jeito.',
    montessori:
      'O ciclo de trabalho da manhã tem 3 horas, sem cortes. Há tempo para escolher, começar, errar, repetir e terminar. A concentração profunda só aparece quando ninguém a interrompe.',
  },
  {
    n: 3,
    titulo: 'O mesmo material para todos ou um de cada',
    tradicional:
      'O material é repetido: trinta folhas iguais, trinta apostilas abertas na mesma página. A atividade é a mesma para a turma inteira.',
    montessori:
      'Há um exemplar de cada material, em muitas áreas: vida prática, sensorial, linguagem, matemática, geografia, ciências, arte. A criança explora todas essas áreas pelas próprias mãos. Por haver um só de cada, ela aprende também algo que nenhuma aula ensina: esperar a vez e respeitar o trabalho do colega.',
  },
  {
    n: 4,
    titulo: 'Mesma idade ou idades misturadas',
    tradicional:
      'As crianças são agrupadas pelo ano em que nasceram. Todas têm a mesma idade e são medidas pela mesma régua.',
    montessori:
      'As idades são misturadas, como na vida. Em casa, na família e mais tarde no trabalho, ninguém convive só com gente da mesma idade. A criança mais nova aprende olhando a mais velha. A mais velha consolida o que sabe quando ensina. Quem está adiantado tem para onde avançar, e quem precisa de mais tempo tem tempo, sem rótulo.',
  },
];

const APRENDIZADO: Diferenca[] = [
  {
    n: 5,
    titulo: 'Ver ou fazer',
    tradicional:
      'O conhecimento chega pelos olhos e pelos ouvidos. O número fica no quadro, a letra é copiada da lousa e a explicação é dada para a turma inteira.',
    montessori:
      'O conhecimento chega pelas mãos. Antes de escrever um número grande, a criança segura a quantidade em contas. Antes de pegar o lápis, sente a letra de lixa com o dedo e a traça na areia. O adulto apresenta o material, e depois a criança repete sozinha. O abstrato vem depois do concreto, e não no lugar do concreto.',
  },
  {
    n: 6,
    titulo: 'Ritmo único ou o ritmo de cada criança',
    tradicional:
      'O conteúdo corre no ritmo do calendário: tantas páginas por semana, para todos. Quem aprende rápido espera. Quem precisa de mais tempo fica com uma lacuna, e a turma segue. O conteúdo é visto, mas nem sempre é dominado.',
    montessori:
      'Cada criança segue o seu ritmo e repete quantas vezes quiser, até dominar. A repetição não é castigo, é escolha: é assim que a criança pequena aperfeiçoa o que acabou de conquistar. Só então ela passa ao passo seguinte.',
  },
  {
    n: 7,
    titulo: 'O adulto corrige ou o material mostra o erro',
    tradicional:
      'O erro é apontado de fora: a caneta vermelha, o "está errado", a nota. A criança aprende a esperar o veredito do adulto.',
    montessori:
      'Muitos materiais trazem o controle do erro embutido. Se um cilindro sobra, alguma peça ficou no lugar errado. Se a torre balança, um cubo saiu da ordem. A criança percebe, refaz e acerta, sem que ninguém precise dizer nada. O erro vira informação, e não vergonha.',
  },
];

const RESULTADO: Diferenca[] = [
  {
    n: 8,
    titulo: 'Conformidade ou iniciativa',
    tradicional:
      'A criança segue comandos o tempo todo: agora abre o caderno, agora copia, agora guarda. Quem passa anos esperando a próxima instrução aprende a se conformar.',
    montessori:
      'A criança exercita a escolha todos os dias: o que fazer, onde e por quanto tempo, entre os trabalhos que já conhece. Escolher se aprende escolhendo. O resultado é iniciativa: a criança que começa sozinha, sem esperar que alguém diga.',
  },
  {
    n: 9,
    titulo: 'Falta de confiança ou autoconfiança',
    tradicional:
      'O trabalho vale nota, e o valor do que a criança fez é dito por outra pessoa. Com o tempo, ela passa a perguntar "está certo?" antes de confiar no que vê, e a se medir pela comparação com os colegas.',
    montessori:
      'A recompensa é a satisfação de cumprir a tarefa a que a criança se propôs. A confiança nasce de dentro, de uma frase simples: "eu consegui".',
  },
  {
    n: 10,
    titulo: 'Atrasos ou domínio',
    tradicional:
      'A turma avança junta. O que não foi dominado fica para trás, e o conteúdo seguinte se apoia justamente nele. Pequenas lacunas viram atrasos que se acumulam em silêncio.',
    montessori: 'A criança só avança depois de dominar. A base fica sólida, e o passo seguinte chega como consequência.',
  },
  {
    n: 11,
    titulo: 'Fazer o que foi mandado ou poder colaborar',
    tradicional:
      'Cada criança trabalha na sua carteira, fazendo o que a professora escolheu, sem conversar. Mostrar o trabalho ao colega é cola. A criança aprende que o colega é distração ou concorrência.',
    montessori:
      'A criança pode escolher, pode colaborar e pode ensinar. Ensinar é uma das formas mais profundas de aprender, e conviver passa a fazer parte do que se aprende.',
  },
  {
    n: 12,
    titulo: 'Estudar por obrigação ou querer aprender',
    tradicional:
      'A turma segue a ordem do dia, e a pergunta que a criança trouxe de casa precisa esperar. A curiosidade vai sendo adiada, e aprender vira tarefa.',
    montessori:
      'A criança segue a própria curiosidade, dentro de um ambiente preparado para respondê-la. Aprender continua sendo o que era desde o berço: uma vontade.',
  },
];

/** Uma diferença: título e os dois lados empilhados, para ler no celular sem tabela nem rolagem lateral. */
const Cartao: React.FC<{ d: Diferenca }> = ({ d }) => (
  <div className="border border-montessori-green/10 rounded-sm shadow-sm overflow-hidden">
    <h3 className="font-serif text-xl sm:text-2xl text-montessori-green leading-snug px-4 sm:px-6 pt-5 pb-3 break-words">
      <span className="text-montessori-gold font-bold mr-2">{d.n}.</span>
      {d.titulo}
    </h3>
    <div className="px-4 sm:px-6 pb-4">
      <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">Na sala tradicional</p>
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{d.tradicional}</p>
    </div>
    <div className="px-4 sm:px-6 py-4 bg-montessori-green/5 border-t border-montessori-green/10">
      <p className="text-xs sm:text-sm uppercase tracking-widest text-montessori-gold font-bold mb-1">Na sala Montessori</p>
      <p className="text-gray-800 text-base sm:text-lg leading-relaxed">{d.montessori}</p>
    </div>
  </div>
);

const Lista: React.FC<{ itens: Diferenca[] }> = ({ itens }) => (
  <div className="space-y-5 sm:space-y-6">
    {itens.map((d) => (
      <Cartao key={d.n} d={d} />
    ))}
  </div>
);

/** O efeito na criança, nas palavras de Maria Montessori (citações literais dos textos dela que traduzimos). */
const EFEITOS: { titulo: string; citacao: string; fonte: string }[] = [
  {
    titulo: 'Concentração',
    citacao: 'a trabalhar, a trabalhar e a trabalhar sem descanso, numa concentração maravilhosa',
    fonte: 'ao contar o começo da primeira Casa das Crianças',
  },
  {
    titulo: 'Disciplina que vem de dentro',
    citacao: 'Como poderia obedecer à vontade alheia, se é incapaz de se submeter à sua própria?',
    fonte: 'O caráter da criança, 1924',
  },
  {
    titulo: 'Gosto por aprender',
    citacao: 'cresce e se fortalece trabalhando; não se consome trabalhando',
    fonte: 'Períodos sensíveis, 1927',
  },
  {
    titulo: 'Independência',
    citacao: 'Ajudar a criança a servir-se sozinha: da nossa parte é amor; para a criança é um renascimento.',
    fonte: "L'Idea Montessori, 1927",
  },
];

export const MontessoriETradicional: React.FC = () => {
  usePageMeta(MONTESSORI_TRADICIONAL_TITLE, MONTESSORI_TRADICIONAL_DESCRIPTION);

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Montessori e escola tradicional"
        title="Por que Montessori é melhor do que a escola tradicional"
        subtitle="Doze diferenças entre as duas salas, explicadas sem pressa: como a manhã acontece, como o conhecimento entra e o que cada sala forma na criança."
      />

      <LandingSection className="pt-10 sm:pt-14">
        <P>
          Quase todos nós estudamos na mesma sala: carteiras em fila, um professor na frente, um quadro e um horário
          que diz quando cada coisa começa e termina. Ela é tão familiar que parece a única forma possível de escola.
          Não é.
        </P>
        <P>
          Em 1907, em Roma, a médica Maria Montessori abriu a primeira Casa das Crianças e passou a observar, com olhar
          de cientista, o que as crianças faziam quando o ambiente era preparado para elas. Dessa observação nasceu
          outra sala, organizada por outra lógica.
        </P>
        <P>
          Esta página compara as duas em doze pontos. Os quatro primeiros falam do dia: como a manhã acontece. Os três
          seguintes, do aprendizado: como o conhecimento entra. Os cinco últimos, do resultado: o que cada sala forma
          na criança, ano após ano.
        </P>
        <Highlight>
          Não é uma crítica a quem ensina, porque há gente dedicada nos dois modelos. É uma comparação de desenho: o
          que cada sala pede da criança todos os dias, e no que isso se transforma.
        </Highlight>
        <LandingImage
          src="/images/montessori/vida-pratica-estante.jpg"
          alt="Criança pega seu trabalho sozinha na estante baixa de uma sala Montessori preparada"
          portrait
        />
      </LandingSection>

      <LandingSection heading="O dia: como a manhã acontece" id="o-dia">
        <Lista itens={DIA} />
      </LandingSection>

      <LandingSection heading="O aprendizado: como o conhecimento entra" id="o-aprendizado">
        <Lista itens={APRENDIZADO} />
        <LandingImage
          src="/images/montessori/sensorial-encaixes.jpg"
          alt="Criança concentrada trabalhando com os encaixes sólidos"
          portrait
        />
      </LandingSection>

      <LandingSection heading="O resultado: o que cada sala forma" id="o-resultado">
        <P>
          Nenhuma dessas diferenças é detalhe. Repetidas todos os dias, por anos, elas formam hábitos, e os hábitos
          formam a pessoa. Os cinco pontos abaixo são o que sobra depois que a aula acaba.
        </P>
        <Lista itens={RESULTADO} />
      </LandingSection>

      <LandingSection heading="O efeito na criança, nas palavras de Maria Montessori" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Montessori não partiu de uma teoria. Ela descreveu o que viu acontecer com as crianças quando o ambiente
          mudou, e voltou a esses efeitos em artigos e conferências por décadas. No <L to="/blog">blog</L>, publicamos
          esses textos traduzidos, cada um com uma apresentação nossa.
        </P>
        <div className="space-y-6 mt-6">
          {EFEITOS.map((e) => (
            <div key={e.titulo}>
              <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-2">{e.titulo}</h3>
              <blockquote className="border-l-4 border-montessori-gold pl-4 text-gray-700 text-base sm:text-lg leading-relaxed italic">
                “{e.citacao}”
                <span className="block not-italic text-sm text-gray-500 mt-1">Maria Montessori, {e.fonte}</span>
              </blockquote>
            </div>
          ))}
        </div>
      </LandingSection>

      <LandingSection heading="O que a pesquisa encontrou">
        <P>
          Esses resultados não são só impressão. Comparar escolas é difícil, porque as famílias que escolhem uma
          escola Montessori podem ser diferentes das outras. Por isso os estudos mais citados usam sorteio.
        </P>
        <P>
          A psicóloga Angeline Lillard, da Universidade da Virgínia, acompanhou crianças sorteadas para escolas
          Montessori públicas nos Estados Unidos e as comparou com crianças que participaram do mesmo sorteio e não
          foram chamadas. Nos estudos publicados em 2006, na revista Science, e em 2017, na Frontiers in Psychology, as
          crianças das salas Montessori se saíram melhor em leitura e matemática e em compreensão social. No de 2017,
          que acompanhou 141 crianças por três anos, elas também mostraram mais disposição para enfrentar tarefas
          difíceis.
        </P>
        <P>
          Em 2023, uma revisão sistemática coordenada por Justus Randolph reuniu dezenas de estudos e encontrou efeito
          positivo tanto nos resultados acadêmicos quanto nos não acadêmicos, como função executiva e criatividade.
        </P>
      </LandingSection>

      <LandingSection heading="O que observar ao visitar uma escola">
        <P>
          Muito do que descrevemos como tradicional não é culpa de quem ensina. É o desenho de uma sala pensada para
          ensinar a mesma coisa, ao mesmo tempo, a muitas crianças. A sala Montessori parte de outra pergunta: o que
          esta criança precisa agora?
        </P>
        <P>
          Nenhuma das doze diferenças aparece no folheto. Elas aparecem na rotina. Por isso, ao escolher a escola, o
          mais importante é ver como o dia acontece:
        </P>
        <Bullets
          items={[
            'As crianças se movimentam ou esperam?',
            'Escolhem ou recebem?',
            'Trabalham por quanto tempo sem interrupção?',
            'O que acontece quando alguém erra?',
            'Há crianças de idades diferentes juntas?',
          ]}
        />
        <P>Alguns minutos observando uma manhã comum dizem mais do que uma hora de conversa na secretaria.</P>
      </LandingSection>

      <LandingSection heading="A infância acontece uma vez">
        <P>
          A sala onde ela acontece ensina muito além do conteúdo: ensina à criança quem ela é. Alguém que espera ou
          alguém que começa. Alguém que teme o erro ou alguém que aprende com ele. Alguém que estuda por obrigação ou
          alguém que quer saber.
        </P>
        <P>
          Na Escola Montessoriana, em Laranjeiras, essa sala existe e pode ser vista. A manhã é um bloco de três horas
          de trabalho sem cortes, as estantes são abertas e baixas, e as turmas reúnem idades diferentes. A página
          sobre o <L to="/metodo-montessori">método Montessori</L> mostra as áreas da sala, e a de{' '}
          <L to="/turmas">turmas</L> explica os agrupamentos.
        </P>
        <LandingImage
          src="/images/turmas/agrupada-2.jpg"
          alt="Menina trabalha com a torre rosa enquanto a sala segue em atividade ao redor"
          portrait
        />
        <Referencias
          itens={[
            {
              texto: 'Lillard, A. & Else-Quest, N. (2006). Evaluating Montessori education. Science, 313(5795), 1893–1894.',
              url: 'https://doi.org/10.1126/science.1132362',
            },
            {
              texto:
                'Lillard, A. S., Heise, M. J., Richey, E. M., Tong, X., Hart, A. & Bray, P. M. (2017). Montessori preschool elevates and equalizes child outcomes: a longitudinal study. Frontiers in Psychology, 8, 1783.',
              url: 'https://doi.org/10.3389/fpsyg.2017.01783',
            },
            {
              texto:
                "Randolph, J. J., Bryson, A., Menon, L., Henderson, D. K., Kureethara Manuel, A., Michaels, S., Rosenstein, D. L. W., McPherson, W., O'Grady, R. & Lillard, A. S. (2023). Montessori education's impact on academic and nonacademic outcomes: a systematic review. Campbell Systematic Reviews, 19(3), e1330.",
              url: 'https://doi.org/10.1002/cl2.1330',
            },
          ]}
        />
      </LandingSection>

      <LandingCTA
        heading="Venha ver a diferença de perto"
        text="A melhor forma de entender é acompanhar uma manhã de trabalho. Agende uma visita e conheça nosso espaço, nossa equipe e nossa proposta."
      />
    </div>
  );
};
