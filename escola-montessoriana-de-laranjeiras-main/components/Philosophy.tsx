import React from 'react';
import { Focus, Sun, Heart, Hand, BookOpen, Compass } from 'lucide-react';
import { Section } from './ui/Section';
import { trackWhatsAppClick } from '../utils/tracking';

export const Philosophy: React.FC = () => {
  const traits = [
    {
      icon: <Focus size={32} />,
      title: "Que se concentra",
      text: "Mergulha no que está fazendo e permanece na atividade até terminar. A concentração profunda é a base de todo aprendizado — e ela se constrói todos os dias, em um ambiente preparado para isso."
    },
    {
      icon: <Sun size={32} />,
      title: "Confiante",
      text: "Acredita na própria capacidade porque conquista as coisas por si mesma. Cada desafio vencido no seu ritmo — sem pressa e sem comparações — fortalece a segurança para enfrentar o próximo."
    },
    {
      icon: <Heart size={32} />,
      title: "Gentil",
      text: "Trata colegas, adultos e o ambiente com cuidado e respeito. A cortesia não é imposta: nasce da convivência em uma comunidade onde a criança é tratada com o mesmo respeito que aprende a oferecer."
    },
    {
      icon: <Hand size={32} />,
      title: "Apta a fazer suas tarefas",
      text: "Veste-se, alimenta-se, organiza seus pertences e cuida do espaço ao seu redor. A independência prática dá à criança o orgulho legítimo de quem sabe cuidar de si e contribuir com os outros."
    },
    {
      icon: <BookOpen size={32} />,
      title: "Que ama aprender",
      text: "Aprende porque quer, seguindo a curiosidade que é natural de toda criança. Quando o aprendizado nasce do interesse, ele não precisa de prêmios nem cobranças — e dura para a vida inteira."
    },
    {
      icon: <Compass size={32} />,
      title: "Com disciplina interior",
      text: "Escolhe, começa e termina o que se propôs a fazer. A verdadeira disciplina não vem de fora, da obediência: vem de dentro, do hábito de agir com propósito e liberdade com limites."
    }
  ];

  return (
    <Section id="method" className="bg-montessori-cream">
      <div className="text-center mb-10 sm:mb-14 min-w-0">
        <span className="text-montessori-green tracking-widest font-bold text-sm sm:text-base mb-2 block">
          A Filosofia Montessori
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-montessori-green mb-4 sm:mb-6">
          Educação para a vida real, respeitando o próprio ritmo
        </h2>
        <p className="font-sans text-lg md:text-xl text-montessori-dark font-semibold max-w-2xl mx-auto px-1 leading-relaxed">
          No Montessori a criança aprende seguindo seus interesses, em um ambiente preparado para o desenvolvimento infantil.
        </p>
      </div>

      {/* A criança transformada: foto de concentração + introdução */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center max-w-5xl mx-auto mb-12 sm:mb-16 min-w-0">
        <div className="relative overflow-hidden rounded-sm shadow-lg border-l-4 border-montessori-gold min-w-0">
          <img
            src="/images/acolhimento/almoco-bebes.jpg"
            alt="Bebês almoçando juntos na mesa baixa, cada um comendo sozinho com sua colher, acompanhados pelas professoras"
            loading="lazy"
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>
        <div className="min-w-0 px-1 text-left">
          <h3 className="font-serif text-2xl sm:text-3xl text-montessori-green mb-3 sm:mb-4">
            Quem seu filho se torna na nossa escola
          </h3>
          <p className="font-sans text-lg md:text-xl text-montessori-dark leading-relaxed">
            Maria Montessori descobriu que, no ambiente certo, toda criança revela o seu melhor.
            Na nossa escola, essa transformação acontece no dia a dia — e os pais reconhecem em
            casa uma criança...
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
          href="https://wa.me/5521993311000?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20a%20escola%20e%20agendar%20uma%20visita."
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-colors shadow-md hover:shadow-lg"
        >
          Quero agendar uma visita
        </a>
      </div>
    </Section>
  );
};
