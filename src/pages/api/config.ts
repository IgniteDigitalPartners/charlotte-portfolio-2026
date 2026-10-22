import type { APIRoute } from "astro";
import { paypalConfig, paypalReady } from "../../lib/paypal";
import { mailReady } from "../../lib/mail";

export const prerender = false;

// Checkout only opens when payments AND order emails are configured, so no brief can be lost.
export const GET: APIRoute = () => {
  const c = paypalConfig();
  const ready = paypalReady() && mailReady();
  return new Response(JSON.stringify({ ready, clientId: ready ? c.clientId : "", live: c.live }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
