import type { APIRoute } from "astro";
import { leadsReady, redis, type Lead } from "../../lib/leads";

// One-click unsubscribe from the checklist follow-up emails.
export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const id = url.searchParams.get("id") ?? "";
  if (leadsReady() && /^[0-9a-f-]{36}$/i.test(id)) {
    try {
      const raw = await redis<string | null>("GET", `lead:${id}`);
      if (raw) {
        const lead = JSON.parse(raw) as Lead;
        lead.unsubscribed = true;
        await redis("SET", `lead:${id}`, JSON.stringify(lead));
      }
      await redis("SREM", "leads:active", id);
    } catch (e) {
      console.error("Unsubscribe failed", id, e);
    }
  }
  return redirect("/unsubscribed/", 303);
};
