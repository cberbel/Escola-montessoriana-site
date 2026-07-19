import React from 'react';
import { LandingHero, LandingSection, LandingCTA, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

export const DesenvolvimentoCerebral: React.FC = () => {
  usePageMeta(
    'Os Primeiros Anos e o Cérebro | Escola Montessoriana de Laranjeiras',
    'Mais de 1 milhão de conexões neurais por segundo: o que acontece no cérebro do seu filho nos primeiros anos, o papel da linguagem — e por que a escolha da escola pesa mais do que a distância de casa.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Primeiros anos"
        title="O que está acontecendo no cérebro do seu filho — agora"
        subtitle="Nos primeiros anos de vida, o cérebro forma mais de 1 milhão de novas conexões por segundo. Nenhuma outra fase da vida chega perto. O que acontece nesse período constrói a base de tudo o que vem depois."
      />

      <LandingSection heading="A arquitetura se constrói uma vez" className="pt-10 sm:pt-14">
        <P>
          O cérebro não nasce pronto — ele se constrói, e a construção mais intensa acontece antes dos 6 anos. Aos 5,
          o cérebro já atingiu cerca de 90% do tamanho adulto. As conexões formadas nesse período — e as experiências
          que as formaram — viram o alicerce sobre o qual toda aprendizagem futura se apoia.
        </P>
        <P>
          Como numa casa, dá para reformar depois. Mas a fundação se faz uma vez. É por isso que cientistas do
          desenvolvimento infantil são unânimes: não existe investimento com retorno maior do que a qualidade das
          experiências nos primeiros anos.
        </P>
      </LandingSection>

      <LandingSection heading="A linguagem é o tijolo dessa construção">
        <P>
          Entre todas as experiências, a linguagem tem papel central. Cada conversa, história, música e nomeação do
          mundo dispara o que os pesquisadores chamam de "servir e devolver": a criança balbucia, aponta, pergunta — e
          o adulto atento responde. Cada uma dessas trocas fortalece circuitos cerebrais de linguagem, raciocínio e
          vínculo.
        </P>
        <P>
          A quantidade e a qualidade da linguagem que a criança vive nos primeiros anos estão entre os melhores
          previsores de vocabulário, leitura e desempenho escolar mais tarde. Não é sobre ensinar letras cedo — é
          sobre viver imersa em conversa de qualidade, em uma ou mais línguas.
        </P>
        <Highlight>
          Um ambiente rico em linguagem, com adultos que observam e respondem cada criança individualmente, não é um
          luxo pedagógico. É literalmente construção de arquitetura cerebral.
        </Highlight>
      </LandingSection>

      <LandingSection heading={'"Mas tem uma creche do lado de casa..."'} className="bg-montessori-cream/60 py-10 sm:py-14 rounded-sm">
        <P>
          É a dúvida mais honesta que ouvimos — e merece uma resposta honesta. Conveniência importa, especialmente na
          rotina puxada de quem tem filho pequeno. Mas vale colocar as duas coisas na balança:
        </P>
        <Bullets
          items={[
            <><strong>O trajeto é temporário.</strong> Alguns minutos a mais no caminho duram o semestre. A arquitetura cerebral construída nesses anos dura a vida inteira.</>,
            <><strong>Esses anos não voltam.</strong> Escola dá para trocar depois — mas a janela dos primeiros anos passa uma única vez. O que não foi vivido nela não se recupera com a mesma facilidade.</>,
            <><strong>"Cuidar bem" não é o mesmo que desenvolver.</strong> Um lugar limpo e carinhoso é o mínimo. A pergunta certa é: o que acontece com o cérebro do meu filho nas 8 horas por dia que ele passa lá?</>,
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
            'Uma professora para cada 3 bebês menores de 18 meses: cada balbucio encontra um adulto que responde.',
            'Imersão diária em inglês com professoras nativas, no auge da janela da linguagem.',
            'Ambiente preparado Montessori: concentração, movimento livre e experiências concretas — zero telas.',
            'Observação individual: cada criança é acompanhada no seu ritmo, com registros do seu desenvolvimento.',
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
