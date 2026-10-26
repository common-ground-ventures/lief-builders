// Lead intake for liefbuilders.com. The form used to post to a LeadConnector (GHL) webhook
// that nobody reads anymore (Jimmy 10/26). Until the CRM Robby is building exists, each lead
// is logged and emailed to the owner. Only POST /api/lead reaches this Worker
// (assets.run_worker_first), every other path is served straight from the static assets.
//
// Secrets and vars (Worker > Settings > Variables and Secrets):
//   RESEND_API_KEY  send-only Resend key (secret, same account as the other CG sites)
//   LEAD_EMAIL_TO   optional, defaults to jesse@jfowler.io
// No key set: the lead is still logged (Workers Logs, LIEF_LEAD) and the visitor gets a 503,
// so the form shows its error state instead of claiming success.

export interface Env {
  RESEND_API_KEY?: string;
  LEAD_EMAIL_TO?: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const DEFAULT_TO = "jesse@jfowler.io";
const FROM = "Lief Builders website <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ORIGINS = new Set([
  "https://www.liefbuilders.com",
  "https://liefbuilders.com",
  "http://localhost:8788",
  "http://localhost:5173",
]);
const PREVIEW_ORIGIN = /^https:\/\/([a-z0-9-]+-)?lief-builders\.common-ground-ventures\.workers\.dev$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function handleLead(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  const origin = request.headers.get("origin") || "";
  if (origin && !ORIGINS.has(origin) && !PREVIEW_ORIGIN.test(origin)) {
    return json({ ok: false, error: "Forbidden" }, 403);
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }

  // Honeypot: humans never see this field. Pretend success, send nothing.
  if (clean(raw.website, 200)) return json({ ok: true });

  const lead = {
    first_name: clean(raw.first_name, 80),
    last_name: clean(raw.last_name, 80),
    email: clean(raw.email, 254),
    message: clean(raw.message, 4000),
    page: clean(raw.page, 200),
    at: new Date().toISOString(),
  };
  if (!lead.first_name || !EMAIL_RE.test(lead.email)) {
    return json({ ok: false, error: "Please give a name and a valid email." }, 400);
  }

  // Log first, so a delivery failure never loses a lead.
  console.log("LIEF_LEAD", JSON.stringify(lead));

  if (!env.RESEND_API_KEY) return json({ ok: false, error: "Delivery not configured" }, 503);

  const name = `${lead.first_name} ${lead.last_name}`.trim();
  const text = [
    `New lead from liefbuilders.com`,
    ``,
    `Name: ${name}`,
    `Email: ${lead.email}`,
    lead.page ? `Page: ${lead.page}` : "",
    `Received: ${lead.at}`,
    ``,
    lead.message || "(no message)",
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");
  const html =
    `<p><b>New lead from liefbuilders.com</b></p>` +
    `<p>Name: ${esc(name)}<br>Email: ${esc(lead.email)}<br>` +
    (lead.page ? `Page: ${esc(lead.page)}<br>` : "") +
    `Received: ${esc(lead.at)}</p>` +
    `<p style="white-space:pre-wrap">${esc(lead.message || "(no message)")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [env.LEAD_EMAIL_TO || DEFAULT_TO],
      reply_to: lead.email,
      subject: `Lief Builders website lead: ${name}`,
      text,
      html,
    }),
  });
  if (!res.ok) {
    console.log("LIEF_LEAD_DELIVERY_FAILED", res.status, (await res.text()).slice(0, 300));
    return json({ ok: false, error: "Delivery failed" }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/lead") return handleLead(request, env);
    return env.ASSETS.fetch(request);
  },
};
