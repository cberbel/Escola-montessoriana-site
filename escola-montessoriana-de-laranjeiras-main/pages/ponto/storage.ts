import { Funcionario, RegistroPonto } from './types';

const CHAVE_FUNCIONARIOS = 'ponto.funcionarios';
const CHAVE_REGISTROS = 'ponto.registros';
const CHAVE_PIN_ADMIN = 'ponto.pinAdmin';

export const PIN_ADMIN_PADRAO = '1234';

function ler<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : padrao;
  } catch {
    return padrao;
  }
}

function gravar(chave: string, valor: unknown): void {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function gerarId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ---- Funcionários ----

export function listarFuncionarios(): Funcionario[] {
  return ler<Funcionario[]>(CHAVE_FUNCIONARIOS, []);
}

export function salvarFuncionarios(funcionarios: Funcionario[]): void {
  gravar(CHAVE_FUNCIONARIOS, funcionarios);
}

export function buscarPorPin(pin: string): Funcionario | undefined {
  return listarFuncionarios().find((f) => f.ativo && f.pin === pin);
}

// ---- Registros ----

export function listarRegistros(): RegistroPonto[] {
  return ler<RegistroPonto[]>(CHAVE_REGISTROS, []);
}

export function salvarRegistros(registros: RegistroPonto[]): void {
  gravar(CHAVE_REGISTROS, registros);
}

export function adicionarRegistro(registro: RegistroPonto): void {
  const registros = listarRegistros();
  registros.push(registro);
  salvarRegistros(registros);
}

// ---- PIN do administrador ----

export function obterPinAdmin(): string {
  return ler<string>(CHAVE_PIN_ADMIN, PIN_ADMIN_PADRAO);
}

export function definirPinAdmin(pin: string): void {
  gravar(CHAVE_PIN_ADMIN, pin);
}

// ---- Utilidades de data e cálculo ----

/** Chave local AAAA-MM-DD do dia do registro (fuso do dispositivo). */
export function chaveDia(timestamp: string): string {
  const d = new Date(timestamp);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const dia = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${dia}`;
}

export function chaveMes(timestamp: string): string {
  return chaveDia(timestamp).slice(0, 7);
}

export function formatarHora(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatarData(chaveDoDia: string): string {
  const [ano, mes, dia] = chaveDoDia.split('-').map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}

/** Registros de um funcionário em um dia, em ordem cronológica. */
export function registrosDoDia(
  registros: RegistroPonto[],
  funcionarioId: string,
  dia: string
): RegistroPonto[] {
  return registros
    .filter((r) => r.funcionarioId === funcionarioId && chaveDia(r.timestamp) === dia)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

/**
 * Total trabalhado no dia em minutos, pareando as batidas em sequência
 * (1ª = entrada, 2ª = saída, 3ª = entrada, ...). Batida ímpar final fica
 * em aberto e não conta.
 */
export function minutosTrabalhados(batidasDoDia: RegistroPonto[]): number {
  let total = 0;
  for (let i = 0; i + 1 < batidasDoDia.length; i += 2) {
    const entrada = new Date(batidasDoDia[i].timestamp).getTime();
    const saida = new Date(batidasDoDia[i + 1].timestamp).getTime();
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
