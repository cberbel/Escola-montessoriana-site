export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  pin?: string;
  ativo?: boolean;
  hora_entrada?: string | null; // "HH:MM:SS"
  hora_saida?: string | null;
  dias_semana?: number[]; // 0=domingo .. 6=sábado
  data_admissao?: string | null; // "AAAA-MM-DD"
}

export interface MetricaHoras {
  funcionario_id: string;
  nome: string;
  dias_esperados: number;
  faltas: number;
  atrasos: number;
  minutos_atraso_total: number;
  minutos_trabalhados: number;
  minutos_esperados: number;
  saldo_min: number;
}

export interface Batida {
  id: string;
  ts: string; // timestamptz do servidor, ISO 8601
  lat: number | null;
  lng: number | null;
}

export interface RegistroAdmin {
  id: string;
  funcionario_id: string;
  nome: string;
  ts: string;
  manual: boolean;
  lat: number | null;
  lng: number | null;
  precisao_m: number | null;
}

export interface LocalEscola {
  lat: number;
  lng: number;
  raio_m: number;
}

export interface Posicao {
  lat: number | null;
  lng: number | null;
  precisao: number | null;
}

export const LIMITE_FUNCIONARIOS = 25;
