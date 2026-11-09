import { ArtigoMontessoriPage } from '../ArtigoMontessoriPage';
import type { ArtigoMontessori } from '../tipos';

// GERADO por gera.py (Documents/Montessori - Obras gratuitas/07 - Artigos comentados (blog)). Não editar à mão.
const artigo: ArtigoMontessori = {
 "slug": "montessori-o-renascimento",
 "title": "O renascimento: por que ajudar a criança a fazer sozinha é amor",
 "excerpt": "Nascer, desmamar, andar, falar: para Montessori, crescer é um caminho de independência. Um texto de poucas linhas, de 1927, sobre a ajuda inútil.",
 "date": "2026-11-09",
 "dateDisplay": "9 de novembro de 2026",
 "readingTime": "2 min",
 "image": "/images/cerebro/bebe-material.jpg",
 "imageAlt": "Bebê concentrado encaixando discos coloridos em pinos de madeira",
 "intro": [
  "Chega um dia em que a criança afasta a mão do adulto que ia calçar o seu sapato e avisa que quer fazer sozinha. Demora mais, sai torto, e a vontade de terminar por ela é grande. Maria Montessori escreveu sobre o que está em jogo nessa hora um texto de poucas linhas, O renascimento, que ocupa uma página inteira do primeiro número da revista italiana L'Idea Montessori, de 31 de maio de 1927. Partindo do nascimento, do desmame, do andar e da fala, ela pergunta onde fica o amor do adulto num crescimento que é, do começo ao fim, conquista de independência."
 ],
 "analise": [
  "A frase que mais incomoda à primeira leitura, a de que crescer é “um caminho de independência, e não um caminho de amor”, não tira o amor da história: muda o lugar dele. O amor fica do lado do adulto, e a prova dele é a independência que a criança vai ganhando. A outra palavra que pede atenção é “inútil”. Montessori não manda retirar toda ajuda, manda retirar a que já não serve, o que obriga o adulto a olhar a criança de novo a cada fase. O texto foi composto à máquina, ocupando a página inteira, com a assinatura dela reproduzida ao pé, e quase a mesma frase final aparece, com a letra dela, na capa do fascículo."
 ],
 "tituloSecao": "O texto de Maria Montessori, na íntegra",
 "relacionados": [],
 "ponte": [
  {
   "to": "/montessori-x-tradicional",
   "label": "Por que Montessori é melhor do que a escola tradicional"
  },
  {
   "to": "/creche-laranjeiras",
   "label": "Creche e berçário a partir de 9 meses"
  },
  {
   "to": "/acolhimento",
   "label": "Acolhimento e adaptação"
  }
 ],
 "textos": [
  {
   "titulo": "O renascimento",
   "tituloOriginal": "La Rinascita",
   "fonte": "L'Idea Montessori, 1927, Anno I, n. 1, 31 de maio de 1927, p. 4",
   "idioma": "italiano",
   "credito": "Tradução integral feita com apoio de inteligência artificial a partir de fac-símile digital (Atlante Montessori / Opera Nazionale Montessori).",
   "blocos": [
    {
     "t": "h3",
     "h": "O renascimento"
    },
    {
     "t": "p",
     "h": "O que é nascer? É tornar-se independente do corpo materno e realizar por si mesmo as próprias funções. O que é o desmame? É poder nutrir-se independentemente de uma pessoa que compunha, para o indivíduo novo, um alimento especial. O que é andar? É avançar com as próprias forças e com o próprio equilíbrio, sem mais precisar dos braços alheios. O que é falar? É exprimir os próprios desejos, que antes tinham de ser adivinhados pelos outros."
    },
    {
     "t": "p",
     "h": "Nascer e crescer é, portanto, um caminho de independência, e não um caminho de amor. A individualidade que se afirma é uma consequência do amor e representa a sua finalidade última. Obra de amor é a dos velhos que ajudam a estabelecer a independência dos novos."
    },
    {
     "t": "p",
     "h": "Por que, então, não haveria de ser assim no espírito? Ajudar a criança a servir-se sozinha, torná-la, em todas as suas ações, independente da nossa ajuda, retirar, da nossa parte, toda ajuda inútil: eis o caminho para a formação da individualidade."
    },
    {
     "t": "p",
     "h": "Da nossa parte é amor; para a criança é RENASCIMENTO."
    },
    {
     "t": "p",
     "h": "Maria Montessori"
    }
   ]
  }
 ]
};

export default function Artigo() {
  return <ArtigoMontessoriPage artigo={artigo} />;
}
