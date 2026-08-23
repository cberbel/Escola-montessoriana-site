import React from 'react';
import { ArrowDown, BookOpen } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/tracking';

const WhatsAppIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Toque exploratório em elemento que antes era morto: registra o alvo no dataLayer
// (mesmo padrão do trackWhatsAppClick — o GTM é o dono do dataLayer; para o evento
// aparecer no GA4 é preciso criar a tag no painel do GTM, como a de whatsapp_click).
// O Clarity mede a queda dos cliques mortos sem depender disso.
function trackCuriosidade(alvo: string): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'curiosidade_click', page_path: window.location.pathname, alvo });
}

export const Hero: React.FC = () => {
  const bgImageUrl = '/images/hero-criancas.webp';

  // Altura: no celular o hero para em 82vh para que a próxima seção apareça na
  // borda da tela e convide a rolar. Metade dos visitantes não passava de 5% da
  // página — a tela cheia era o teto. No desktop segue tela cheia.
  return (
    <div className="relative min-h-[82vh] md:min-h-screen w-full flex items-center justify-center md:items-start md:pt-[8.5rem] md:justify-center md:pb-16">
      {/* Background: foto da escola com fallback em azul profundo */}
      <div
        className="absolute inset-0 z-0 overflow-hidden bg-montessori-green"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        role="img"
        aria-label="Crianças em atividade na Escola Montessoriana de Laranjeiras"
      />

      {/* Overlay bem suave, só para dar contraste no topo */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-montessori-dark/55 via-montessori-dark/20 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Transição suave para a próxima seção (evita corte brusco) */}
      <div
        className="hero-transition-gradient absolute bottom-0 left-0 right-0 h-32 sm:h-40 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content - mt reserva espaço para a navbar; no md+ o container já tem pt, então mt menor */}
      <div className="relative z-20 px-4 sm:px-6 max-w-4xl mx-auto min-w-0 w-full mt-[7.5rem] sm:mt-[8rem] md:mt-0 pt-4 sm:pt-0 pb-8 sm:pb-10 text-center">
        <div className="inline-block text-left px-4 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-[28px] bg-gradient-to-b from-montessori-dark/40 via-montessori-dark/25 to-montessori-dark/5 shadow-[0_18px_45px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:backdrop-blur-md border border-white/5 sm:border-white/10">
          {/* O nome da escola é o ponto mais tocado da home no celular (135 toques em
              7 dias) e não levava a lugar nenhum — entrava na conta de "cliques mortos"
              do Clarity. Agora o toque rola para o conteúdo, que é justamente o que
              quase ninguém alcança. Vai para a próxima seção, não para o WhatsApp:
              toque exploratório não deve abrir conversa. */}
          <a href="#method" className="block mb-4 sm:mb-5 text-center rounded-lg focus:outline focus:ring-2 focus:ring-montessori-gold focus:ring-offset-2 focus:ring-offset-montessori-green/60">
            <h2 className="font-logo text-montessori-gold font-bold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
              Escola Montessoriana
            </h2>
            <p className="font-logo text-montessori-gold font-bold text-lg sm:text-xl md:text-2xl mt-1 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_6px_rgba(0,0,0,0.6)]">
              Educação Infantil Trilíngue
            </p>
          </a>
          {/* Os textos do hero seguem no topo do ranking de toques do Clarity
              (h1 + subtítulo + badges ≈ 130 toques/7d) e não levavam a nada.
              Decisão de 23/08: todo toque morto vira um passo de "saber mais" —
              cada texto leva à página que aprofunda a promessa que ele faz. */}
          <a
            href="/acolhimento"
            onClick={() => trackCuriosidade('hero-titulo-acolhimento')}
            className="block rounded-lg focus:outline focus:ring-2 focus:ring-montessori-gold focus:ring-offset-2 focus:ring-offset-montessori-green/60"
          >
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-4 sm:mb-5 drop-shadow-[0_10px_25px_rgba(15,23,42,0.8)] break-words text-center">
              Acolhimento e Autonomia para seu Filho
            </h1>
          </a>
          <a
            href="/lp/creche.html"
            onClick={() => trackCuriosidade('hero-subtitulo-creche')}
            className="block rounded-lg focus:outline focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-montessori-green/60"
          >
            <p className="font-sans text-base sm:text-lg md:text-xl text-gray-50 mb-5 sm:mb-6 max-w-2xl mx-auto font-normal leading-relaxed break-words">
              Creche e escola Montessori em Laranjeiras — formando jovens curiosos, confiantes e capazes, prontos para explorar o mundo.
            </p>
          </a>

          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-7 sm:mb-8">
            <a
              href="/turmas"
              onClick={() => trackCuriosidade('hero-badge-idades')}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-sm sm:text-base font-medium backdrop-blur-sm hover:bg-white/25 transition-colors"
            >
              De 9 meses a 11 anos
            </a>
            <a
              href="/turmas"
              onClick={() => trackCuriosidade('hero-badge-turmas')}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-sm sm:text-base font-medium backdrop-blur-sm hover:bg-white/25 transition-colors"
            >
              Berçário · Pré-escola · Fundamental
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center">
            <a
              href="https://wa.me/5521992973454?text=Ol%C3%A1%2C%20eu%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20Escola%20Montessoriana%20de%20Laranjeiras."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('hero')}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 sm:px-10 py-4 text-lg font-serif tracking-wide transition-all duration-300 rounded-sm touch-manipulation bg-[#25D366] text-white hover:bg-[#20bd5a] border-2 border-[#25D366] hover:border-[#20bd5a] focus:outline focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-montessori-green/60 shadow-lg hover:shadow-xl font-semibold"
            >
              <WhatsAppIcon size={24} />
              Quero mais informações
            </a>
            {/* "Diferenciais" era rótulo de menu, não convite — trocado por pergunta
                que induz curiosidade (pedido de 23/08). */}
            <a
              href="#method"
              onClick={() => trackCuriosidade('hero-pergunta-diferente')}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 sm:px-8 py-3 sm:py-4 text-base font-serif tracking-wide transition-all duration-300 rounded-sm touch-manipulation border-2 border-white/90 text-white hover:bg-white/15 hover:border-white focus:outline focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-montessori-green/60 shadow-md hover:shadow-lg font-medium"
            >
              <BookOpen size={20} strokeWidth={2} />
              O que fazemos de diferente? ↓
            </a>
          </div>
        </div>

        {/* Seta de scroll sempre abaixo do botão, sem sobrepor */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <a
            href="#method"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] w-12 h-12 rounded-full text-white/90 hover:text-white focus:outline focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-montessori-green/60 transition-colors touch-manipulation"
            aria-label="Rolar para a próxima seção"
          >
            <ArrowDown size={28} className="sm:w-8 sm:h-8 animate-bounce drop-shadow-md" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>
  );
};