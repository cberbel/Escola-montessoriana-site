import React from 'react';
import { Quote } from 'lucide-react';
import { Section } from './ui/Section';
import { trackWhatsAppClick } from '../utils/tracking';

interface VideoTestimonial {
  id: number;
  name: string;
  role: string;
  src: string;
  poster: string;
  vertical: boolean;
}

interface ImageTestimonial {
  name: string;
  image: string;
  quote: string;
}

export const Testimonials: React.FC = () => {
  const videoTestimonials: VideoTestimonial[] = [
    {
      id: 1,
      name: "Jean e Anastácia",
      role: "pais do Nicolas",
      src: "/videos/depoimento-jean.mp4",
      poster: "/images/thumb-depoimento-jean.jpg",
      vertical: false
    },
    {
      id: 2,
      name: "Manu",
      role: "mãe da Nina",
      src: "/videos/depoimento-manu.mp4",
      poster: "/images/thumb-depoimento-manu.jpg",
      vertical: true
    },
    {
      id: 3,
      name: "Pai da Madalena",
      role: "",
      src: "/videos/depoimento-madalena.mp4",
      poster: "/images/thumb-depoimento-madalena.jpg",
      vertical: true
    }
  ];

  const pauseOthers = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    document.querySelectorAll('video').forEach((v) => {
      if (v !== e.currentTarget) v.pause();
    });
  };

  const imageTestimonials: ImageTestimonial[] = [
    {
      name: "Flávio Azevedo",
      image: "/images/depoimentos/flavio.jpg",
      quote: "Local maravilhoso, crianças felizes, o responsável é super simpático, gentil com as crianças. Os professores maravilhosos, me sinto seguro de deixar meu filho com pessoas que sempre estão estimulando o desenvolvimento dele.",
    },
    {
      name: "Luana Chedid",
      image: "/images/depoimentos/luana.jpg",
      quote: "Nossa experiência com a escola foi simplesmente única. Maravilhosa, o Cláudio e todos os professores sempre muito atenciosos. Aurora Yris evoluiu muito nessa escola, só tenho agradecimento a todos.",
    },
    {
      name: "Renata Faria",
      image: "/images/depoimentos/renata.jpg",
      quote: "Estamos muito satisfeitos e agradecidos com a Escola Montessoriana. Ela se tornou uma grande rede de apoio, onde encontramos um local respeitoso e acolhedor. O maior acerto é ver a alegria do nosso filho ao chegar na escola e o quanto ele se desenvolve bem a cada dia, mostrando-se sempre confortável, carinhoso e querido por todos! Nosso muito obrigada!",
    },
    {
      name: "Francisca Sobral",
      image: "/images/depoimentos/francisca.jpg",
      quote: "A escola tem excelente estrutura. Professores qualificados e uma administração visionária quanto ao ensino de qualidade. Como mãe, fico muito tranquila em saber que minha filha está aos cuidados de pessoas amorosas e responsáveis. Parabéns a todos da Escola Montessoriana.",
    },
    {
      name: "Bárbara Araújo",
      image: "/images/depoimentos/barbara.jpg",
      quote: "Como mãe estou muito surpresa com o desenvolvimento do meu filho. Local acolhedor, ambiente preparado, pensado nos mínimos detalhes.",
    },
    {
      name: "Ana Petiz",
      image: "/images/depoimentos/ana.jpg",
      quote: "Escola acolhedora e proposta educacional sensacional. Matriculei minha filha com 1 ano e meio e já vi rápidos avanços no desenvolvimento dela. Espaço amplo, limpo e profissionais excelentes. Recomendo!",
    },
  ];

  return (
    <Section id="testimonials" className="bg-montessori-green text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 p-8 sm:p-16 md:p-24 opacity-5 pointer-events-none">
        <Quote className="w-48 h-48 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto min-w-0">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center mb-10 sm:mb-16 text-montessori-cream px-1">
          A escolha de famílias que valorizam o cuidado e a autonomia.
        </h2>

        {/* Depoimentos em vídeo */}
        <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 mb-12 sm:mb-16">
          {videoTestimonials.map((v) => (
            <div key={v.id} className={v.vertical ? "w-[240px] sm:w-[260px] min-w-0" : "w-full max-w-[560px] min-w-0"}>
              <div className={`${v.vertical ? "aspect-[9/16]" : "aspect-video"} bg-black/30 rounded-sm overflow-hidden border border-white/10`}>
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="none"
                  onPlay={pauseOthers}
                  className="w-full h-full object-cover"
                >
                  Seu navegador não suporta vídeo.
                </video>
              </div>
              <div className="mt-3 text-center">
                <h4 className="font-serif text-lg text-white leading-tight">{v.name}</h4>
                {v.role && <p className="text-white/70 text-sm">{v.role}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Depoimentos em card com foto das crianças */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {imageTestimonials.map((t) => (
            <div key={t.name} className="rounded-sm overflow-hidden shadow-lg border border-white/10 bg-white/5">
              <img
                src={t.image}
                alt={`Depoimento de ${t.name}: ${t.quote}`}
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-white/90 text-lg mb-4 font-medium">Junte-se às famílias que já confiam na nossa escola.</p>
          <a
            href="https://wa.me/5521993311000?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20%C3%A0%20Escola%20Montessoriana."
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="inline-flex items-center justify-center min-h-[52px] px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl"
          >
            Agendar minha visita
          </a>
        </div>
      </div>
    </Section>
  );
};