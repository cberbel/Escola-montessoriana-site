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

export const NOMES_DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/** Resume os dias da semana trabalhados (ex.: "Seg-Sex", "Seg-Sáb", ou lista). */
export function formatarDiasSemana(dias: number[]): string {
  const ordenados = [...dias].sort((a, b) => a - b);
  if (ordenados.length === 5 && ordenados.every((d, i) => d === i + 1)) return 'Seg-Sex';
  if (ordenados.length === 6 && ordenados.every((d, i) => d === i + 1)) return 'Seg-Sáb';
  if (ordenados.length === 7) return 'Todos os dias';
  return ordenados.map((d) => NOMES_DIAS_SEMANA[d]).join(', ');
}

/** "HH:MM:SS" (do banco) para "HH:MM". */
export function formatarHoraSimples(hora: string): string {
  return hora.slice(0, 5);
}

/** Saldo de banco de horas com sinal, ex.: "+3h20", "-1h05", "0h00". */
export function formatarSaldo(minutos: number): string {
  const sinal = minutos < 0 ? '-' : '+';
  const abs = Math.abs(minutos);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sinal}${h}h${`${m}`.padStart(2, '0')}`;
}
