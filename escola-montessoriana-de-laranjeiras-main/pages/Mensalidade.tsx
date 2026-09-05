import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta, LandingSection, P, Highlight, FAQ, LandingCTA } from '../components/landing/Landing';
import { faqMensalidade } from './landing/faqs';
import { trackWhatsAppClick } from '../utils/tracking';

const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-montessori-green font-semibold underline hover:no-underline">
    {children}
  </Link>
);

const WHATSAPP_MENSALIDADE =
  'https://wa.me/5521992973454?text=' +
  encodeURIComponent('Olá! Gostaria de saber o valor da mensalidade para uma criança de ___ (idade), no horário ___.');

/**
 * /mensalidade — valor de partida, períodos, consulta pelo WhatsApp e o
 * ponto que importa: o custo de oportunidade dos primeiros anos.
 * O FAQ vem de pages/landing/faqs.ts e alimenta também o schema FAQPage.
 */
export const Mensalidade: React.FC = () => {
  usePageMeta(
    'Mensalidade a partir de R$ 2.000 | Escola Montessoriana',
    'Mensalidade a partir de R$ 2.000. O valor acompanha o horário, montado com a família: meio período, integral, estendido ou um formato próprio. Consulte pelo WhatsApp.'
  );

  return (
    <div className="bg-white">
      <div className="bg-montessori-green text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-x-hidden">
        <div className="max-w-3xl mx-auto min-w-0">
          <span className="block text-montessori-gold uppercase tracking-widest font-bold text-xs sm:text-sm mb-3">
            Mensalidade
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-5 break-words">
            A partir de R$ 2.000
          </h1>
          <p className="font-sans text-lg sm:text-xl text-montessori-cream/90 leading-relaxed mb-6">
            O valor acompanha o horário, e o horário é montado com a família.
          </p>
          <a
            href={WHATSAPP_MENSALIDADE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('mensalidade-hero')}
            className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-montessori-gold text-montessori-dark font-semibold rounded-sm hover:bg-yellow-300 transition-colors"
          >
            Consultar o valor
          </a>
        </div>
      </div>

      <LandingSection heading="Horários">
        <P>
          O horário é montado com a família. Há formatos de referência — meio período (8h–12h ou 13h–17h),
          semi-integral (8h–15h ou 10h–17h), integral (8h–17h) e estendido (7h30–19h) — mas eles não esgotam as
          possibilidades: dá para ficar 6 horas, entrar mais cedo e sair mais cedo, ou vir menos dias na semana. O
          valor acompanha o tempo que a criança passa na escola. Para saber o valor do horário que a sua família
          precisa, mande a idade da criança e a rotina de vocês — a resposta vem em minutos.
        </P>
      </LandingSection>

      <LandingSection heading="A conta que importa" className="bg-montessori-cream/40">
        <P>
          Os primeiros anos são a fase em que o <L to="/desenvolvimento-cerebral">cérebro</L> mais se constrói — até
          um milhão de conexões por segundo — e a única em que a concentração, a linguagem, a autonomia e uma segunda
          língua se formam quase sem esforço. Tudo isso continua possível depois. Só fica mais lento, mais caro e mais
          difícil.
        </P>
        <Highlight>
          O maior custo de uma escola não está no boleto. Está no que a criança deixa de construir na única fase da
          vida em que construir custa pouco.
        </Highlight>
        <P>
          É nesses anos que a escola trabalha. O ambiente <L to="/metodo-montessori">Montessori</L>, em que a criança
          escolhe o próprio trabalho e a professora apresenta o material certo na hora certa. O{' '}
          <L to="/ingles-primeira-infancia">inglês por imersão</L>, com professoras nativas, na idade em que a língua
          entra sem sotaque e sem estudo. O <L to="/acolhimento">acolhimento</L> de quem chega inseguro, pelo tempo que
          precisar. A comida feita na escola, a capoeira, a música, o circo, a horta. Tudo no ritmo da criança, sem
          pressão — a criança pressionada aprende a evitar; a criança respeitada aprende a querer.
        </P>
        <a
          href={WHATSAPP_MENSALIDADE}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mensalidade-conta')}
          className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-md"
        >
          Consultar pelo WhatsApp
        </a>
      </LandingSection>

      <LandingSection heading="Perguntas frequentes">
        <FAQ itens={faqMensalidade} />
      </LandingSection>

      <LandingCTA
        heading="O melhor jeito de decidir é ver a escola funcionando"
        text="Agende uma visita, veja as salas com as crianças trabalhando e saia com o valor exato para a sua rotina."
      />
    </div>
  );
};
