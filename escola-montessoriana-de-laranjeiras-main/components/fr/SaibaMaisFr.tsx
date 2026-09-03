import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { Foto } from '../ui/Foto';

const topics = [
  {
    image: '/images/turmas/agrupada-2.jpg',
    alt: "Petite fille concentrée construisant la tour rose dans l'ambiance Montessori",
    position: 'center 32%',
    title: 'La méthode Montessori',
    text: "Pourquoi la découverte de Maria Montessori traverse les siècles — et ce qu'elle change, concrètement, dans la vie de votre enfant.",
    to: '/fr/methode-montessori',
  },
  {
    image: '/images/turmas/agrupada-1.jpg',
    alt: "Bébé souriant sur la structure de motricité de l'école",
    position: 'center 40%',
    title: "L'accueil bienveillant",
    text: "La sécurité affective est le socle du développement : une adaptation en douceur, beaucoup de câlins et de la souplesse pour la famille. Pourquoi l'accueil passe avant les apprentissages.",
    to: '/fr/bienveillance',
  },
  {
    image: '/images/montessori/sensorial-encaixes.jpg',
    alt: 'Enfant travaillant avec les emboîtements sensoriels',
    position: 'center 45%',
    title: 'Les premières années et le cerveau',
    text: "Plus d'un million de nouvelles connexions par seconde : ce qui construit l'architecture cérébrale de votre enfant — et pourquoi le choix de l'école compte bien plus que les minutes de trajet.",
    to: '/fr/cerveau-de-votre-enfant',
  },
  {
    image: '/images/cerebro/leitura-bebes.jpg',
    alt: "Éducatrice lisant un livre à trois bébés assis autour d'elle",
    position: 'center 40%',
    title: "L'anglais dès la petite enfance",
    text: "Les premières années sont une fenêtre unique pour acquérir une autre langue sans effort — avec des bénéfices cognitifs qui durent toute la vie.",
    to: '/fr/immersion-anglais',
  },
  {
    image: '/images/natureza/horta-plantar.jpg',
    alt: "Enfant plantant dans le potager de l'école",
    position: 'center',
    title: 'Une alimentation saine',
    text: "Une cuisine maison, saine et naturelle — sans huiles raffinées, sans sel raffiné, sans sucre. Les enfants déjeunent ensemble et mangent seuls : le repas aussi fait partie de l'éducation.",
    to: '/fr/bienveillance#food',
  },
  {
    image: '/images/natureza/grupo-natureza.jpg',
    alt: "Groupe d'enfants portant des couronnes de feuilles dans l'espace vert de l'école",
    position: 'center 30%',
    title: "La nature et l'éducation cosmique",
    text: "Un terrain arboré et spacieux, des ateliers de permaculture avec potager et lombricomposteur : comment la nature façonne l'intelligence et le sentiment d'appartenir au monde.",
    to: '/fr/nature-education-cosmique',
  },
];

export const SaibaMaisFr: React.FC = () => (
  <Section id="learn-more" className="bg-montessori-green/5 border-t border-montessori-green/10">
    <div className="text-center mb-8 sm:mb-14 min-w-0">
      <div className="w-16 h-1.5 bg-montessori-gold rounded-full mx-auto mb-5 sm:mb-6" />
      <span className="text-montessori-gold uppercase tracking-[0.2em] font-bold text-xs sm:text-sm mb-3 block">
        Choisir en toute confiance
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-montessori-green px-1 break-words leading-tight">
        Ce que toute famille devrait savoir avant de choisir une école
      </h2>
      <p className="sm:hidden text-montessori-green/60 text-sm mt-4">Faites glisser pour tout voir →</p>
    </div>

    <div className="max-w-5xl mx-auto min-w-0">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
        {topics.map((topic) => (
          <Link
            key={topic.to}
            to={topic.to}
            className="group snap-center shrink-0 basis-[85%] sm:basis-auto bg-montessori-cream border border-montessori-green/10 rounded-sm overflow-hidden hover:shadow-lg hover:border-montessori-green/30 transition-all min-w-0 break-words flex flex-col"
          >
            <div className="overflow-hidden">
              <Foto
                src={topic.image}
                alt={topic.alt}
                loading="lazy"
                style={{ objectPosition: topic.position }}
                className="w-full h-[44vh] sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-montessori-green mb-2 sm:mb-3">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4 flex-grow">
                {topic.text}
              </p>
              <span className="inline-flex items-center gap-1.5 text-montessori-green font-semibold group-hover:gap-3 transition-all">
                En savoir plus
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </Section>
);
