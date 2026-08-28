// Aviso de ponto: quem ja passou 1h do horario de entrada e nao bateu recebe
// uma notificacao no proprio celular. Web Push, sem custo por mensagem.
//
// Push sem payload de proposito: o texto vive no service worker do app. Isso
// evita a criptografia aes128gcm e deixa o envio com uma dependencia so (VAPID).
//
// Chamada pelo pg_cron de 30 em 30 min nos dias uteis.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const URL_SUPA = Deno.env.get("SUPABASE_URL")!;
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PUBLICA = (Deno.env.get("VAPID_PUBLICA") ??
  "BPjBaN_xLhCscA492iT0HTc_xjR2J-tWX6KGL2h5z2_ezB4r2cbVv5hpznnDAObFrJzmtpa7870yGBKlyh1r3og").trim();
const CONTATO = Deno.env.get("VAPID_CONTATO") ?? "mailto:contato@escolamontessoriana.com.br";

// O que e segredo mora no Vault do proprio banco (a chave privada VAPID e a
// senha do cron). Variavel de ambiente, se existir, tem preferencia.
async function segredo(
  db: ReturnType<typeof createClient>,
  nome: string,
  env: string,
): Promise<string> {
  const doAmbiente = (Deno.env.get(env) ?? "").trim();
  if (doAmbiente) return doAmbiente;
  const { data } = await db.rpc("_segredo", { p_nome: nome });
  return (data ?? "").trim();
}

const b64url = (b: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(b as ArrayBuffer)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const doB64url = (s: string) =>
  Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));

// A chave privada VAPID vira JWK juntando o d com o X/Y que ja estao na chave publica.
async function chaveParaAssinar(privada: string): Promise<CryptoKey> {
  const ponto = doB64url(PUBLICA); // 0x04 || X(32) || Y(32)
  if (ponto.length !== 65) throw new Error("VAPID_PUBLICA fora do formato (esperado 65 bytes)");
  return await crypto.subtle.importKey(
    "jwk",
    {
      kty: "EC", crv: "P-256", ext: true,
      d: privada,
      x: b64url(ponto.slice(1, 33)),
      y: b64url(ponto.slice(33, 65)),
    },
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"],
  );
}

async function cabecalhoVapid(endpoint: string, chave: CryptoKey): Promise<string> {
  const aud = new URL(endpoint).origin;
  const cab = b64url(new TextEncoder().encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const corpo = b64url(new TextEncoder().encode(JSON.stringify({
    aud,
    exp: Math.floor(Date.now() / 1000) + 12 * 3600,
    sub: CONTATO,
  })));
  const assinatura = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    chave,
    new TextEncoder().encode(`${cab}.${corpo}`),
  );
  return `vapid t=${cab}.${corpo}.${b64url(assinatura)}, k=${PUBLICA}`;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const db = createClient(URL_SUPA, SERVICE);

  const chaveCron = await segredo(db, "aviso_ponto_key", "AVISO_KEY");
  if (chaveCron && url.searchParams.get("key") !== chaveCron) {
    return new Response("nao autorizado", { status: 401 });
  }

  const privada = await segredo(db, "vapid_privada", "VAPID_PRIVADA");
  if (!PUBLICA || !privada) {
    return new Response(JSON.stringify({ erro: "faltam as chaves VAPID" }), { status: 500 });
  }
  const seco = url.searchParams.get("seco") === "1"; // simula, nao envia nem grava

  const { data: pendentes, error } = await db.rpc("_ponto_pendentes_agora", {
    p_atraso: "01:00:00",
    p_limite: "04:00:00",
  });
  if (error) return new Response(JSON.stringify({ erro: error.message }), { status: 500 });

  const lista = (pendentes ?? []) as Array<
    { funcionario_id: string; nome: string; hora_entrada: string; minutos_atraso: number }
  >;
  if (!lista.length) return Response.json({ pendentes: 0, enviados: 0 });

  const hoje = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  ).toISOString().slice(0, 10);

  // Ja avisados hoje saem da lista antes de qualquer envio.
  const { data: jaAvisados } = await db
    .from("avisos_ponto").select("funcionario_id")
    .eq("dia", hoje).eq("tipo", "entrada");
  const avisados = new Set((jaAvisados ?? []).map((a: { funcionario_id: string }) => a.funcionario_id));
  const alvos = lista.filter((p) => !avisados.has(p.funcionario_id));
  if (!alvos.length) return Response.json({ pendentes: lista.length, enviados: 0, nota: "todos ja avisados hoje" });

  if (seco) {
    return Response.json({
      seco: true,
      pendentes: lista.length,
      avisaria: alvos.map((a) => ({ nome: a.nome, entrada: a.hora_entrada, atraso_min: a.minutos_atraso })),
    });
  }

  const chave = await chaveParaAssinar(privada);
  const resultado: Array<Record<string, unknown>> = [];

  for (const alvo of alvos) {
    const { data: inscricoes } = await db
      .from("push_inscricoes").select("id, endpoint")
      .eq("funcionario_id", alvo.funcionario_id).is("desativada_em", null);

    let entregues = 0;
    for (const ins of (inscricoes ?? []) as Array<{ id: string; endpoint: string }>) {
      try {
        const resp = await fetch(ins.endpoint, {
          method: "POST",
          headers: {
            Authorization: await cabecalhoVapid(ins.endpoint, chave),
            TTL: "10800", // 3h: depois disso o aviso perdeu a graca
            "Content-Length": "0",
          },
        });
        if (resp.ok) {
          entregues++;
          await db.from("push_inscricoes")
            .update({ ultimo_ok_em: new Date().toISOString(), ultimo_erro: null }).eq("id", ins.id);
        } else if (resp.status === 404 || resp.status === 410) {
          // Aparelho desinstalou ou revogou: para de tentar.
          await db.from("push_inscricoes")
            .update({ desativada_em: new Date().toISOString(), ultimo_erro: `${resp.status}` }).eq("id", ins.id);
        } else {
          await db.from("push_inscricoes")
            .update({ ultimo_erro: `${resp.status} ${(await resp.text()).slice(0, 200)}` }).eq("id", ins.id);
        }
      } catch (e) {
        await db.from("push_inscricoes")
          .update({ ultimo_erro: String(e).slice(0, 200) }).eq("id", ins.id);
      }
    }

    // Grava mesmo com 0 entregues: sem aparelho inscrito nao adianta insistir
    // de meia em meia hora, e a direcao ve a pendencia na tela.
    await db.from("avisos_ponto").insert({
      funcionario_id: alvo.funcionario_id,
      dia: hoje,
      tipo: "entrada",
      canal: entregues ? "push" : "sem_aparelho",
      detalhe: `entrada ${alvo.hora_entrada}, ${alvo.minutos_atraso} min de atraso`,
    });

    resultado.push({ nome: alvo.nome, entregues });
  }

  return Response.json({ pendentes: lista.length, enviados: resultado.length, detalhe: resultado });
});
