import * as tf from '@tensorflow/tfjs-node';

/**
 * Hash perceptual (dHash) de uma imagem: 64 bits que mudam pouco quando a
 * foto é a mesma reenviada, recomprimida ou levemente editada.
 */
export function hashPerceptual(buffer) {
  return tf.tidy(() => {
    const imagem = tf.node.decodeImage(buffer, 3);
    // 8 linhas x 9 colunas em tons de cinza; compara colunas vizinhas
    const pequena = tf.image.resizeBilinear(imagem, [8, 9]).mean(2);
    const pixels = pequena.arraySync();
    let bits = '';
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        bits += pixels[y][x] < pixels[y][x + 1] ? '1' : '0';
      }
    }
    return bits;
  });
}

/** Quantos bits diferem entre dois hashes (0 = idênticas, 64 = totalmente diferentes). */
export function distanciaHamming(a, b) {
  let diferentes = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diferentes++;
  }
  return diferentes;
}
