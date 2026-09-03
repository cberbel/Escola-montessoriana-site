import React from 'react';
import { Quote } from 'lucide-react';
import { Section } from '../ui/Section';
import { trackWhatsAppClick } from '../../utils/tracking';
import { VideoYouTube } from '../ui/VideoYouTube';

interface VideoTestimonial {
  id: number;
  name: string;
  role: string;
  /** ID do vídeo no YouTube (canal da escola, não listado). */
  youtube: string;
  poster: string;
  vertical: boolean;
}

export const TestimonialsEn: React.FC = () => {
  const videoTestimonials: VideoTestimonial[] = [
    {
      id: 1,
      name: 'Fran',
      role: "Estephany's mother",
      youtube: 'LlA6vo7SE2w', // versão com legendas em inglês
      poster: '/images/thumb-depoimento-fran-en.jpg',
      vertical: true
    },
    {
      id: 2,
      name: 'Jean & Anastácia',
      role: "Nicolas's parents",
      youtube: 'nM9CHRizxVA', // versão com legendas em inglês
      poster: '/images/thumb-depoimento-jean-en.jpg',
      vertical: false
    },
    {
      id: 3,
      name: 'Manu',
      role: "Nina's mother",
      youtube: 'wJJn-oarv4w', // versão com legendas em inglês
      poster: '/images/thumb-depoimento-manu-en.jpg',
      vertical: true
    },
    {
      id: 4,
      name: "Madalena's father",
      role: '',
      youtube: '5K3a2ssRWRA', // versão com legendas em inglês
      poster: '/images/thumb-depoimento-madalena-en.jpg',
      vertical: true
    }
  ];


  return (
    <Section id="testimonials" className="bg-montessori-green text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 sm:p-16 md:p-24 opacity-5 pointer-events-none">
        <Quote className="w-48 h-48 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto min-w-0">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center mb-4 sm:mb-6 text-montessori-cream px-1">
          Chosen by families who value care and independence.
        </h2>
        <p className="text-center text-white/70 text-sm sm:text-base mb-10 sm:mb-14">
          Video testimonials from our parents (in Portuguese, with English subtitles).
        </p>

        <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 mb-12 sm:mb-16">
          {videoTestimonials.map((v) => (
            <div key={v.id} className={v.vertical ? 'w-[240px] sm:w-[260px] min-w-0' : 'w-full max-w-[560px] min-w-0'}>
              <div className={`${v.vertical ? 'aspect-[9/16]' : 'aspect-video'} bg-black/30 rounded-sm overflow-hidden border border-white/10`}>
                <VideoYouTube id={v.youtube} poster={v.poster} titulo={v.name} rotuloPlay="Watch the testimonial" />
              </div>
              <div className="mt-3 text-center">
                <h4 className="font-serif text-lg text-white leading-tight">{v.name}</h4>
                {v.role && <p className="text-white/70 text-sm">{v.role}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4 sm:mt-8">
          <p className="text-white/90 text-lg mb-4 font-medium">Join the families who already trust our school.</p>
          <a
            href="https://wa.me/5521992973454?text=Hello%2C%20I%20would%20like%20more%20information%20about%20Escola%20Montessoriana%20de%20Laranjeiras."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('depoimentos')}
            className="inline-flex items-center justify-center min-h-[52px] px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl"
          >
            Tell me more
          </a>
        </div>
      </div>
    </Section>
  );
};
