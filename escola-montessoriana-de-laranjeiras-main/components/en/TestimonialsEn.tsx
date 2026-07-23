import React from 'react';
import { Quote } from 'lucide-react';
import { Section } from '../ui/Section';
import { trackWhatsAppClick } from '../../utils/tracking';

interface VideoTestimonial {
  id: number;
  name: string;
  role: string;
  src: string;
  poster: string;
  vertical: boolean;
}

export const TestimonialsEn: React.FC = () => {
  const videoTestimonials: VideoTestimonial[] = [
    {
      id: 1,
      name: 'Jean & Anastácia',
      role: "Nicolas's parents",
      src: '/videos/depoimento-jean.mp4',
      poster: '/images/thumb-depoimento-jean.jpg',
      vertical: false
    },
    {
      id: 2,
      name: 'Manu',
      role: "Nina's mother",
      src: '/videos/depoimento-manu.mp4',
      poster: '/images/thumb-depoimento-manu.jpg',
      vertical: true
    },
    {
      id: 3,
      name: "Madalena's father",
      role: '',
      src: '/videos/depoimento-madalena.mp4',
      poster: '/images/thumb-depoimento-madalena.jpg',
      vertical: true
    }
  ];

  const pauseOthers = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    document.querySelectorAll('video').forEach((v) => {
      if (v !== e.currentTarget) v.pause();
    });
  };

  return (
    <Section id="testimonials" className="bg-montessori-green text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 sm:p-16 md:p-24 opacity-5 pointer-events-none">
        <Quote className="w-48 h-48 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto min-w-0">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center mb-4 sm:mb-6 text-montessori-cream px-1">
          The choice of families who value care and independence.
        </h2>
        <p className="text-center text-white/70 text-sm sm:text-base mb-10 sm:mb-14">
          Video testimonials from our parents (in Portuguese, with subtitles).
        </p>

        <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 mb-12 sm:mb-16">
          {videoTestimonials.map((v) => (
            <div key={v.id} className={v.vertical ? 'w-[240px] sm:w-[260px] min-w-0' : 'w-full max-w-[560px] min-w-0'}>
              <div className={`${v.vertical ? 'aspect-[9/16]' : 'aspect-video'} bg-black/30 rounded-sm overflow-hidden border border-white/10`}>
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="none"
                  onPlay={pauseOthers}
                  className="w-full h-full object-cover"
                >
                  Your browser does not support video.
                </video>
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
            href="https://wa.me/5521993311000?text=Hello!%20I%20would%20like%20to%20schedule%20a%20visit%20to%20Escola%20Montessoriana."
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="inline-flex items-center justify-center min-h-[52px] px-8 py-4 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-lg hover:shadow-xl"
          >
            Book my visit
          </a>
        </div>
      </div>
    </Section>
  );
};
