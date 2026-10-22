import type { APIRoute } from "astro";
import { createOrder, paypalReady, resolveCart } from "../../lib/paypal";

export const prerender = false;
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json" } });

export const POST: APIRoute = async ({ request }) => {
  if (!paypalReady()) return json({ error: "Checkout isn't available yet." }, 503);
  try {
    const { items } = await request.json();
    const cart = resolveCart(items);
    const res = await createOrder(cart);
    if (!res.ok || !res.body.id) {
      console.error("PayPal create failed", res.status, JSON.stringify(res.body));
      return json({ error: "PayPal couldn't start the payment. Please try again." }, 502);
    }
    return json({ id: res.body.id });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Something went wrong." }, 400);
  }
};
