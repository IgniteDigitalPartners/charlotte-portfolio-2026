import type { APIRoute } from "astro";
import { authCheck, paypalConfig, paypalReady } from "../../lib/paypal";
import { mailReady } from "../../lib/mail";

export const prerender = false;

// Checkout only opens when payments AND order emails are configured, so no brief can be lost.
export const GET: APIRoute = async ({ url }) => {
  const c = paypalConfig();
  const ready = paypalReady() && mailReady();
  if (url.searchParams.has("check")) {
    const auth = paypalReady() ? await authCheck().catch((e) => ({ ok: false, status: 0, error: String(e) })) : null;
    return new Response(JSON.stringify({ paypalSet: paypalReady(), mailSet: mailReady(), live: c.live, clientIdStart: c.clientId.slice(0, 3), clientIdLength: c.clientId.length, auth }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
  return new Response(JSON.stringify({ ready, clientId: ready ? c.clientId : "", live: c.live }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
