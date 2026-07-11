export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  pin: string; // 4 dígitos, identifica o funcionário no relógio de ponto
  ativo: boolean;
  criadoEm: string;
}

export interface RegistroPonto {
  id: string;
  funcionarioId: string;
  timestamp: string; // ISO 8601
  manual?: boolean; // true quando lançado/ajustado pelo administrador
}

export const LIMITE_FUNCIONARIOS = 25;
