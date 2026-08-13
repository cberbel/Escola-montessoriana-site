import React from 'react';
import { Focus, Sun, Heart, Hand, BookOpen, Compass, Globe } from 'lucide-react';
import { Section } from '../ui/Section';
import { trackWhatsAppClick } from '../../utils/tracking';

export const PhilosophyFr: React.FC = () => {
  const traits = [
    {
      icon: <Globe size={32} />,
      title: "Parlant couramment l'anglais",
      text: "Il baigne chaque jour dans l'anglais, par immersion, à l'âge où le cerveau absorbe les langues sans effort. Ce qui passe aujourd'hui par le jeu deviendra une aisance naturelle, pour toute la vie — sans accent et sans années de cours plus tard."
    },
    {
      icon: <Focus size={32} />,
      title: 'Qui se concentre',
      text: "Il plonge dans ce qu'il fait et va au bout de son activité. La concentration profonde est le socle de tous les apprentissages — et elle se construit chaque jour, dans une ambiance pensée pour cela."
    },
    {
      icon: <Sun size={32} />,
      title: 'Confiant',
      text: "Il croit en ses capacités parce qu'il réussit par lui-même. Chaque défi surmonté à son rythme — sans hâte ni comparaison — renforce la confiance pour affronter le suivant."
    },
    {
      icon: <Heart size={32} />,
      title: 'Attentionné',
      text: "Il traite ses camarades, les adultes et son environnement avec soin et respect. La politesse ne se décrète pas : elle naît de la vie en groupe, où l'enfant reçoit le même respect que celui qu'on lui apprend à témoigner."
    },
    {
      icon: <Hand size={32} />,
      title: 'Autonome au quotidien',
      text: "Il s'habille, mange seul, range ses affaires et prend soin de l'espace qui l'entoure. L'autonomie du quotidien donne à l'enfant la fierté de savoir se débrouiller — et d'être utile aux autres."
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Qui aime apprendre',
      text: "Il apprend parce qu'il en a envie, porté par la curiosité naturelle de tout enfant. Quand l'apprentissage naît de l'intérêt, il n'a besoin ni de récompenses ni de pression — et il dure toute la vie."
    },
    {
      icon: <Compass size={32} />,
      title: 'Discipliné, de lui-même',
      text: "Il choisit, commence et termine ce qu'il entreprend. La discipline ne vient pas de l'obéissance : elle vient de l'intérieur, de l'habitude d'agir librement, avec intention, dans un cadre clair."
    }
  ];

  return (
    <Section id="method" className="bg-montessori-cream">
      <div className="text-center mb-10 sm:mb-14 min-w-0">
        <span className="text-montessori-green tracking-widest font-bold text-sm sm:text-base mb-2 block">
          La philosophie Montessori
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-montessori-green mb-4 sm:mb-6">
          Une éducation pour la vie, au rythme de chaque enfant
        </h2>
        <p className="font-sans text-lg md:text-xl text-montessori-dark font-semibold max-w-2xl mx-auto px-1 leading-relaxed">
          Dans une école Montessori, l'enfant apprend en suivant ses centres d'intérêt, dans une ambiance pensée pour son développement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center max-w-5xl mx-auto mb-12 sm:mb-16 min-w-0">
        <div className="relative overflow-hidden rounded-sm shadow-lg border-l-4 border-montessori-gold min-w-0">
          <img
            src="/images/Crianca-brincando.jpg"
            alt="Enfants les bras levés, émerveillés, chassant des bulles de savon dans la cour de l'école"
            loading="lazy"
            style={{ objectPosition: 'center 30%' }}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>
        <div className="min-w-0 px-1 text-left">
          <h3 className="font-serif text-2xl sm:text-3xl text-montessori-green mb-3 sm:mb-4">
            Comment votre enfant s'épanouit-il dans une école Montessori trilingue ?
          </h3>
          <p className="font-sans text-lg md:text-xl text-montessori-dark leading-relaxed">
            Maria Montessori a découvert que, dans le bon environnement, chaque enfant révèle le meilleur de lui-même.
            Chez nous, cette transformation se vit au quotidien — et les parents retrouvent à la maison un enfant :
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto min-w-0">
        {traits.map((trait, index) => (
          <div key={index} className="flex flex-col items-center text-center group min-w-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center text-montessori-green mb-4 sm:mb-6 shadow-sm group-hover:bg-montessori-green group-hover:text-yellow-400 transition-colors duration-300 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-[32px] sm:[&>svg]:h-[32px]">
              {trait.icon}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-montessori-green mb-3 sm:mb-4">
              {trait.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-base break-words">
              {trait.text}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 sm:mt-16">
        <a
          href="https://wa.me/5521992973454?text=Bonjour%2C%20je%20souhaiterais%20plus%20d%27informations%20sur%20l%27Escola%20Montessoriana%20de%20Laranjeiras."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('filosofia')}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-md hover:shadow-lg"
        >
          Je veux visiter l'école
        </a>
      </div>
    </Section>
  );
};
