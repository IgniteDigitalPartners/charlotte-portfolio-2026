import type { APIRoute } from "astro";
import { createOrder, paypalReady, resolveCart } from "../../lib/paypal";
import { site } from "../../data/site";
import { vatFor, isEu, OUTSIDE_EU } from "../../data/vat";
import { checkVat } from "../../lib/vies";

export const prerender = false;
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json" } });

export const POST: APIRoute = async ({ request }) => {
  if (!site.checkoutOpen || !paypalReady()) return json({ error: "Checkout isn't available yet." }, 503);
  try {
    const { items, country: c, vatNumber } = await request.json();
    const cart = resolveCart(items);
    const country = typeof c === "string" && (isEu(c) || c === OUTSIDE_EU) ? c : "MT";
    const check = vatNumber ? await checkVat(country, vatNumber) : { valid: false, number: "" };
    const vat = vatFor(country, check.valid);
    const res = await createOrder(cart, vat.rate, country, check.valid ? check.number : "");
    if (!res.ok || !res.body.id) {
      console.error("PayPal create failed", res.status, JSON.stringify(res.body));
      return json({ error: "PayPal couldn't start the payment. Please try again." }, 502);
    }
    return json({ id: res.body.id });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Something went wrong." }, 400);
  }
};
