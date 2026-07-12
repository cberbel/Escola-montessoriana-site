/** Chave local AAAA-MM-DD do dia do registro (fuso do dispositivo). */
export function chaveDia(ts: string): string {
  const d = new Date(ts);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const dia = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${dia}`;
}

export function chaveMesAtual(): string {
  return chaveDia(new Date().toISOString()).slice(0, 7);
}

/** Limites do mês local (AAAA-MM) como ISO, para filtrar no servidor. */
export function limitesDoMes(mes: string): { de: string; ate: string } {
  const [ano, m] = mes.split('-').map(Number);
  return {
    de: new Date(ano, m - 1, 1).toISOString(),
    ate: new Date(ano, m, 1).toISOString(),
  };
}

export function formatarHora(ts: string): string {
  return new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function formatarData(chaveDoDia: string): string {
  const [ano, mes, dia] = chaveDoDia.split('-').map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}

/**
 * Total trabalhado no dia em minutos, pareando as batidas em sequência
 * (1ª = entrada, 2ª = saída, ...). Batida ímpar final fica em aberto e não conta.
 */
export function minutosTrabalhados(batidas: { ts: string }[]): number {
  let total = 0;
  for (let i = 0; i + 1 < batidas.length; i += 2) {
    const entrada = new Date(batidas[i].ts).getTime();
    const saida = new Date(batidas[i + 1].ts).getTime();
    total += Math.max(0, Math.round((saida - entrada) / 60000));
  }
  return total;
}

export function formatarMinutos(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${h}h${`${m}`.padStart(2, '0')}`;
}

/** Rótulo da batida pela posição na sequência do dia. */
export function rotuloBatida(indice: number): string {
  return indice % 2 === 0 ? 'Entrada' : 'Saída';
}

/** Distância em metros entre duas coordenadas (fórmula de Haversine). */
export function distanciaMetros(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const rad = (g: number) => (g * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}

export function formatarDistancia(metros: number): string {
  if (metros < 1000) return `${metros} m`;
  return `${(metros / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km`;
}
