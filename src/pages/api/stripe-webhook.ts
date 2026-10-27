import type { APIRoute } from "astro";
import { stripe, stripeConfig } from "../../lib/stripe";
import { fulfil } from "../../lib/fulfil";

export const prerender = false;

// Stripe → site. Listens for: checkout.session.completed, checkout.session.async_payment_succeeded.
export const POST: APIRoute = async ({ request }) => {
  const { webhookSecret } = stripeConfig();
  const sig = request.headers.get("stripe-signature");
  if (!webhookSecret || !sig) return new Response("Not configured", { status: 400 });

  let event;
  try {
    event = await stripe().webhooks.constructEventAsync(await request.text(), sig, webhookSecret);
  } catch (e) {
    console.error("Webhook signature check failed", e);
    return new Response("Bad signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    try {
      const result = await fulfil(event.data.object.id);
      console.log("Checkout", event.data.object.id, result);
    } catch (e) {
      console.error("Fulfilment failed", event.data.object.id, e);
      return new Response("Fulfilment failed", { status: 500 }); // Stripe retries
    }
  }
  return new Response("ok");
};
