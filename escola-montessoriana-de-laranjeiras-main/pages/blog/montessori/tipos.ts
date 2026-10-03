/**
 * Textos de Maria Montessori publicados em revistas (1915–2003), traduzidos, cada um
 * precedido de um texto de apresentação da escola. São posts COMUNS do blog: entram
 * na lista e nas rotas de /blog pela data, sem seção própria no site.
 * Os dados são GERADOS por gera.py (Documents/Montessori - Obras gratuitas/
 * 07 - Artigos comentados (blog)); aqui ficam só os tipos e a tela do artigo.
 */

/** Bloco do texto dela. `h` é HTML já escapado pelo gerador (só <em>, <strong>, <br>). */
export interface BlocoTexto {
  t: 'p' | 'h3' | 'h4' | 'quote' | 'sep' | 'nota';
  h: string;
}

export interface TextoIntegra {
  titulo: string;
  tituloOriginal: string;
  fonte: string;
  idioma: string;
  credito: string;
  blocos: BlocoTexto[];
}

export interface ArtigoMontessori {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateDisplay: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  /** O nosso texto: 6 a 8 parágrafos. */
  intro: string[];
  /** Título da parte dela: "na íntegra" ou, quando há corte, "com um trecho omitido". */
  tituloSecao: string;
  /** Outros textos dela, já publicados no blog, ligados a este. */
  relacionados: { slug: string; titulo: string; ano: string }[];
  /** Páginas da escola ligadas ao assunto do texto (a ponte do artigo para a visita). */
  ponte: { to: string; label: string }[];
  textos: TextoIntegra[];
}
