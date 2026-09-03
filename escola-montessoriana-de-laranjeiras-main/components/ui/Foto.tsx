import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  /**
   * Largura máxima em que a foto é exibida (CSS). Define o `sizes`: o navegador
   * baixa a variante de 800 px em telas pequenas e a de 1400 px só quando precisa.
   */
  larguraMax?: number;
};

/**
 * <picture> com as variantes WebP geradas por scripts/otimizar-imagens.py
 * (foto-800.webp e foto-1400.webp ao lado do original). Cai no JPEG/PNG original
 * quando o navegador não aceita WebP ou quando a foto não tem variante (ex.: fotos
 * fora de /images). Mesma API do <img>: src, alt, className, loading, style...
 * Ganho medido: 60–75% dos bytes por foto (uma foto de 350 KB vira ~90–135 KB).
 */
export const Foto: React.FC<Props> = ({ src, alt, larguraMax = 768, loading = 'lazy', decoding = 'async', ...rest }) => {
  const m = /^(\/images\/.+)\.(jpe?g|png|webp)$/i.exec(src);
  if (!m) {
    return <img src={src} alt={alt} loading={loading} decoding={decoding} {...rest} />;
  }
  const base = m[1];
  const sizes = `(max-width: ${larguraMax}px) 100vw, ${larguraMax}px`;
  return (
    <picture>
      <source type="image/webp" srcSet={`${base}-800.webp 800w, ${base}-1400.webp 1400w`} sizes={sizes} />
      <img src={src} alt={alt} loading={loading} decoding={decoding} {...rest} />
    </picture>
  );
};
