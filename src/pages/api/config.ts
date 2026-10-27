import type { APIRoute } from "astro";
import { stripeConfig, stripeReady } from "../../lib/stripe";
import { mailReady } from "../../lib/mail";
import { site } from "../../data/site";

export const prerender = false;

// Checkout only opens when payments, the webhook AND order emails are configured, so no brief can be lost.
export const GET: APIRoute = async () => {
  const ready = site.checkoutOpen && stripeReady() && mailReady();
  return new Response(JSON.stringify({ ready, test: ready && stripeConfig().test }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
