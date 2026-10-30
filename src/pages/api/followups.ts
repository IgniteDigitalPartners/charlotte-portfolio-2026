import type { APIRoute } from "astro";
import { mailReady, send } from "../../lib/mail";
import { leadsReady, redis, followUp, STEPS, type Lead } from "../../lib/leads";

// Daily Vercel Cron: sends the next due follow-up email to each checklist lead.
export const prerender = false;
const DAY = 86_400_000;

export const GET: APIRoute = async ({ request }) => {
  const secret = process.env.CRON_SECRET ?? import.meta.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  if (!leadsReady() || !mailReady()) return new Response("Not configured", { status: 503 });

  const ids = await redis<string[]>("SMEMBERS", "leads:active");
  let sent = 0;
  for (const id of ids) {
    try {
      const raw = await redis<string | null>("GET", `lead:${id}`);
      if (!raw) { await redis("SREM", "leads:active", id); continue; }
      const lead = JSON.parse(raw) as Lead;
      if (lead.unsubscribed || lead.sent >= STEPS.length) { await redis("SREM", "leads:active", id); continue; }
      const days = Math.floor((Date.now() - lead.created) / DAY);
      if (days < STEPS[lead.sent]) continue;
      await send(lead.email, followUp(lead.sent, lead));
      lead.sent += 1;
      await redis("SET", `lead:${id}`, JSON.stringify(lead));
      if (lead.sent >= STEPS.length) await redis("SREM", "leads:active", id);
      sent++;
    } catch (e) {
      console.error("Follow-up failed", id, e);
    }
  }
  return new Response(JSON.stringify({ ok: true, active: ids.length, sent }), { headers: { "Content-Type": "application/json" } });
};
