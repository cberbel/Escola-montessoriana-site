import React from 'react';
import { LandingHero, LandingSection, LandingCTA, Highlight, Bullets, P, usePageMeta } from '../../components/landing/Landing';

export const InglesPrimeiraInfancia: React.FC = () => {
  usePageMeta(
    'Inglês na Primeira Infância | Escola Montessoriana de Laranjeiras',
    'Por que os primeiros anos são a melhor janela para aprender inglês: imersão diária com professoras nativas, benefícios cognitivos do bilinguismo e aquisição natural, sem esforço.'
  );

  return (
    <div className="bg-white">
      <LandingHero
        eyebrow="Bilinguismo"
        title="Inglês na primeira infância: a janela que não volta"
        subtitle="Nenhum adulto aprende um idioma com a facilidade de uma criança pequena. Não é talento — é biologia. E essa janela está aberta exatamente agora."
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
          para alcançar menos.
        </P>
        <Highlight>
          Para a criança pequena, o inglês não é uma matéria. É só mais uma forma natural de falar com pessoas de quem
          ela gosta.
        </Highlight>
      </LandingSection>

      <LandingSection heading="Os benefícios vão muito além do idioma">
        <P>Pesquisas sobre bilinguismo precoce associam o convívio com duas línguas a ganhos que aparecem em toda a vida:</P>
        <Bullets
          items={[
            <><strong>Função executiva:</strong> alternar entre dois idiomas exercita atenção, memória de trabalho e autocontrole — os músculos cerebrais do foco.</>,
            <><strong>Flexibilidade cognitiva:</strong> quem cresce entre duas línguas aprende cedo que existe mais de um jeito de nomear — e de pensar — o mundo.</>,
            <><strong>Consciência linguística:</strong> entender a estrutura de uma língua facilita aprender a terceira, a quarta...</>,
            <><strong>Abertura cultural:</strong> o idioma vem junto com músicas, histórias e formas diferentes de ver o mundo.</>,
          ]}
        />
      </LandingSection>

      <LandingSection heading="Imersão de verdade, com professoras nativas">
        <P>
          Aula de inglês uma ou duas vezes por semana não cria bilinguismo — cria vocabulário decorado. O que funciona é
          a imersão: o idioma presente na rotina, todos os dias, em situações reais.
        </P>
        <P>
          Na Escola Montessoriana, as crianças convivem diariamente com professoras nativas. O inglês aparece nas
          brincadeiras, nas músicas, nas refeições, no parquinho — exatamente como a língua materna apareceu na vida
          delas. Sem pressão, sem prova, sem "hora do inglês". A língua simplesmente faz parte da vida.
        </P>
      </LandingSection>

      <LandingSection heading="E não paramos no inglês">
        <P>
          Famílias que desejam podem escolher mais um idioma para o filho: francês, mandarim, espanhol, italiano ou
          alemão. A mesma lógica da imersão vale para a terceira língua — e a janela da primeira infância também.
        </P>
      </LandingSection>

      <LandingCTA
        heading="Venha ouvir as crianças vivendo em dois idiomas"
        text="Agende uma visita e veja a imersão acontecendo naturalmente, com professoras nativas, no meio da rotina."
      />
    </div>
  );
};
