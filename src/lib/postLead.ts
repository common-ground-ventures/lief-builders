// Posts a lead to the intake Worker (worker/index.ts). Same-origin first: once the site is
// served by the Worker, /api/lead is right here. While www is still on Vercel that path is a
// 404 (Vercel has no /api/lead), so fall back to the Worker's own address. Replaced the dead
// LeadConnector webhook 10/26.
const SAME_ORIGIN = "/api/lead";
const WORKER = "https://lief-builders.common-ground-ventures.workers.dev/api/lead";

const send = (url: string, body: string) =>
  fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body });

export async function postLead(payload: Record<string, unknown>): Promise<void> {
  const body = JSON.stringify(payload);
  let res: Response | null = null;
  try {
    res = await send(SAME_ORIGIN, body);
  } catch {
    res = null;
  }
  // 404/405 = this host has no intake route. A 400/5xx from the Worker itself is a real answer.
  if (!res || res.status === 404 || res.status === 405) res = await send(WORKER, body);
  if (!res.ok) throw new Error("lead " + res.status);
}
