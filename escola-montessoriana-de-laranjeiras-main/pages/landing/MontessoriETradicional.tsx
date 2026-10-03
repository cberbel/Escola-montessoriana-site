import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHero, LandingSection, LandingCTA, LandingImage, Highlight, P, usePageMeta } from '../../components/landing/Landing';
import { Referencias } from '../../components/blog/BlogLayout';

export const MONTESSORI_TRADICIONAL_TITLE = 'Montessori e escola tradicional: as diferenças | Escola Montessoriana';
export const MONTESSORI_TRADICIONAL_DESCRIPTION =
  'Montessori e escola tradicional: as diferenças no dia a dia da sala e o efeito na criança, da concentração à disciplina que vem de dentro.';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">
    {children}
  </Link>
);

/** As diferenças, lado a lado. No celular cada linha vira um cartão com os dois blocos empilhados. */
const DIFERENCAS: { tema: string; tradicional: string; montessori: string }[] = [
  {
    tema: 'Quem escolhe a atividade',
    tradicional: 'A professora define a atividade, e a turma inteira costuma fazer a mesma coisa ao mesmo tempo.',
    montessori: 'A criança escolhe o trabalho, entre os que já lhe foram apresentados, e fica nele enquanto o interesse durar.',
  },
  {
    tema: 'O tempo',
    tradicional: 'O dia é dividido em aulas e atividades curtas, e o relógio marca a hora de trocar.',
    montessori: 'Um ciclo de três horas de trabalho sem interrupção, para a escolha virar concentração.',
  },
  {
    tema: 'O papel do adulto',
    tradicional: 'Ensina à frente da turma: explica, pergunta e corrige.',
    montessori: 'Prepara o ambiente, apresenta cada material a uma criança ou a um pequeno grupo, e observa.',
  },
  {
    tema: 'O material',
    tradicional: 'Livros, cadernos e folhas de exercício, iguais para todos.',
    montessori: 'Materiais concretos, um exemplar de cada, em estantes baixas e abertas, ao alcance da criança.',
  },
  {
    tema: 'O erro',
    tradicional: 'Quem aponta o erro é o adulto, com a correção e a nota.',
    montessori: 'O próprio material mostra o erro. A criança percebe sozinha e tenta de novo.',
  },
  {
    tema: 'As idades',
    tradicional: 'Turmas formadas por ano de nascimento.',
    montessori: 'Idades misturadas: os menores veem os maiores trabalhando, e os maiores consolidam o que sabem ao ajudar.',
  },
  {
    tema: 'O movimento',
    tradicional: 'A criança passa a maior parte do tempo sentada, e o movimento fica para o recreio.',
    montessori: 'A criança circula, carrega, serve, limpa. O movimento faz parte do trabalho.',
  },
  {
    tema: 'Prêmios e castigos',
    tradicional: 'Estrelas, notas e castigos costumam sustentar o esforço e a disciplina.',
    montessori: 'Nem prêmio nem castigo. A disciplina vem do interesse e da concentração.',
  },
];

/** O efeito na criança, com as palavras de Maria Montessori e o texto de onde elas saem. */
const EFEITOS: { titulo: string; texto: string; citacao: string; fonte: string }[] = [
  {
    titulo: 'Concentração',
    texto: 'Foi a primeira surpresa da Casa das Crianças: crianças pequenas absorvidas por muito tempo no mesmo trabalho.',
    citacao: 'a trabalhar, a trabalhar e a trabalhar sem descanso, numa concentração maravilhosa',
    fonte: 'Encontrei ouro em vez de trigo',
  },
  {
    titulo: 'Independência',
    texto: 'Vestir-se, servir-se, guardar o que usou. A criança que pode fazer sozinha passa a querer fazer sozinha.',
    citacao: 'Ajudar a criança a servir-se sozinha: da nossa parte é amor; para a criança é um renascimento.',
    fonte: "Epígrafes em L'Idea Montessori",
  },
  {
    titulo: 'Disciplina que vem de dentro',
    texto: 'A obediência deixa de depender de quem vigia. Ela aparece depois que a criança aprende a seguir a própria vontade num trabalho.',
    citacao: 'Como poderia obedecer à vontade alheia, se é incapaz de se submeter à sua própria?',
    fonte: 'O caráter da criança',
  },
  {
    titulo: 'Gosto por aprender',
    texto: 'Quando o exercício chega na idade certa, a criança não se cansa. Ela pede mais.',
    citacao: 'cresce e se fortalece trabalhando; não se consome trabalhando',
    fonte: 'Períodos sensíveis',
  },
  {
    titulo: 'Calma',
    texto: 'Capricho, medo, briga por brinquedo: em vez de serem corrigidos um por um, esses traços vão sumindo juntos.',
    citacao: 'como o sol, quando nasce, torna invisíveis todas as estrelas do céu',
    fonte: 'Segunda Conferência (1934)',
  },
  {
    titulo: 'Convivência',
    texto: 'Há um exemplar de cada material, e por isso esperar a vez faz parte do dia. A criança aprende a conviver trabalhando ao lado das outras.',
    citacao: 'a paciência quando é preciso esperar',
    fonte: 'Perguntas e respostas',
  },
];

export const MontessoriETradicional: React.FC = () => {
  usePageMeta(MONTESSORI_TRADICIONAL_TITLE, MONTESSORI_TRADICIONAL_DESCRIPTION);

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Montessori e escola tradicional"
        title="Montessori e escola tradicional: o que muda para a criança"
        subtitle="As diferenças no dia a dia da sala e o efeito que elas têm: concentração, independência, disciplina que vem de dentro e gosto por aprender."
      />

      <LandingSection heading="A diferença começa em quem decide" className="pt-10 sm:pt-14">
        <P>
          Na escola tradicional, o dia chega pronto. O que fazer, em que ordem e por quanto tempo foi decidido pelo
          adulto antes de a criança passar pela porta. Na sala Montessori, o adulto prepara o ambiente e apresenta os
          materiais, e é a criança que escolhe o trabalho e decide quanto tempo fica nele.
        </P>
        <P>
          Parece um detalhe de organização. Na prática, muda o que a criança faz com a própria atenção durante as horas
          em que está na escola, e é daí que vêm os efeitos que as famílias percebem em casa.
        </P>
        <LandingImage
          src="/images/montessori/vida-pratica-estante.jpg"
          alt="Criança pega seu trabalho sozinha na estante baixa de uma sala Montessori preparada"
          portrait
        />
      </LandingSection>

      <LandingSection heading="Oito diferenças no dia a dia">
        <div className="space-y-4">
          {DIFERENCAS.map((d) => (
            <div key={d.tema} className="border border-montessori-green/10 rounded-sm shadow-sm overflow-hidden">
              <h3 className="font-serif text-lg sm:text-xl text-montessori-green px-4 sm:px-5 pt-4">{d.tema}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="px-4 sm:px-5 py-3">
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Na escola tradicional</p>
                  <p className="text-gray-700 text-base leading-relaxed">{d.tradicional}</p>
                </div>
                <div className="px-4 sm:px-5 py-3 bg-montessori-green/5 border-t sm:border-t-0 sm:border-l border-montessori-green/10">
                  <p className="text-xs uppercase tracking-widest text-montessori-gold font-bold mb-1">Na sala Montessori</p>
                  <p className="text-gray-800 text-base leading-relaxed">{d.montessori}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LandingSection>

      <LandingSection heading="O efeito na criança" className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          Maria Montessori não partiu de uma teoria. Ela descreveu o que viu acontecer com as crianças quando o
          ambiente mudou, e voltou a esses efeitos em artigos e conferências por décadas. Abaixo, seis deles,
          com as palavras dela e o texto de onde saem. No <L to="/blog">blog</L>, publicamos esses textos traduzidos, cada um
          com uma apresentação nossa.
        </P>
        <div className="space-y-6 mt-6">
          {EFEITOS.map((e) => (
            <div key={e.titulo}>
              <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-1">{e.titulo}</h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-2">{e.texto}</p>
              <blockquote className="border-l-4 border-montessori-gold pl-4 text-gray-700 text-base sm:text-lg leading-relaxed italic">
                “{e.citacao}”
                <span className="block not-italic text-sm text-gray-500 mt-1">
                  Maria Montessori, {e.fonte}
                </span>
              </blockquote>
            </div>
          ))}
        </div>
      </LandingSection>

      <LandingSection heading="O que as pesquisas encontraram">
        <P>
          Comparar escolas é difícil, porque as famílias que escolhem uma escola Montessori podem ser diferentes das
          outras. Por isso os estudos mais citados usam sorteio: comparam crianças sorteadas para uma vaga numa escola
          Montessori pública com crianças que se inscreveram no mesmo sorteio e não foram sorteadas.
        </P>
        <P>
          Angeline Lillard e Nicole Else-Quest, da Universidade da Virgínia e da Universidade de Wisconsin, publicaram
          na revista Science, em 2006, um estudo desse tipo. Aos cinco anos, as crianças da escola Montessori se saíram
          melhor em leitura e matemática, em função executiva e em medidas de convivência. Aos doze, escreveram
          redações mais criativas e relataram mais sentimento de comunidade na escola.
        </P>
        <P>
          Em 2017, Lillard e colegas acompanharam por três anos crianças de pré-escolas Montessori públicas, também
          com sorteio. As crianças da Montessori avançaram mais em desempenho acadêmico, compreensão social e gosto por
          desafios, e a distância entre as de renda mais baixa e as demais diminuiu. Em 2023, uma revisão sistemática
          coordenada por Justus Randolph reuniu dezenas de estudos e encontrou efeito positivo tanto nos resultados
          acadêmicos quanto nos não acadêmicos, como função executiva e criatividade.
        </P>
        <Highlight>
          As pesquisas de hoje medem o que Montessori descreveu ao contar o começo da primeira Casa das Crianças, em
          1907: crianças que se concentram, trabalham por conta própria e convivem bem.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Como isso acontece aqui na escola">
        <P>
          A manhã é um bloco de três horas de trabalho sem cortes. As estantes são abertas e baixas, com tudo à vista e
          ao alcance da criança. As turmas são agrupadas por idade, e os menores escolhem inspirados pelo que veem os
          maiores fazendo. A página sobre o <L to="/metodo-montessori">método Montessori</L> mostra as áreas da sala, e
          a de <L to="/turmas">turmas</L> explica os agrupamentos.
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
        text="A melhor forma de entender é passar uma manhã olhando as crianças trabalharem. Agende uma visita e conheça nosso espaço, nossa equipe e nossa proposta."
      />
    </div>
  );
};
