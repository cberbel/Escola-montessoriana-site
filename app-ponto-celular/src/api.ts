export interface AppConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

let config: AppConfig = { supabaseUrl: '', supabaseAnonKey: '' };

export function definirConfig(c: AppConfig): void {
  config = c;
}

export function temConfig(): boolean {
  return Boolean(config.supabaseUrl && config.supabaseAnonKey);
}

/** Chama uma função RPC do Supabase (PostgREST). */
export async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  let resposta: Response;
  try {
    resposta = await fetch(`${config.supabaseUrl}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: config.supabaseAnonKey,
        Authorization: `Bearer ${config.supabaseAnonKey}`,
      },
      body: JSON.stringify(args),
    });
  } catch {
    throw new Error('Sem conexão. Verifique sua internet e tente novamente.');
  }
  if (!resposta.ok) {
    throw new Error(`Falha de comunicação com o servidor (${resposta.status}).`);
  }
  return resposta.json() as Promise<T>;
}

/** Obtém a posição GPS do aparelho; resolve com valores nulos se indisponível/negado. */
export function obterPosicao(): Promise<{ lat: number | null; lng: number | null; precisao: number | null }> {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) {
      resolve({ lat: null, lng: null, precisao: null });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, precisao: p.coords.accuracy }),
      () => resolve({ lat: null, lng: null, precisao: null }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  });
}
