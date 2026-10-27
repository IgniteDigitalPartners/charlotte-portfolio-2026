import type { APIRoute } from "astro";
import { site } from "../../data/site";
import { vatFor, isEu, OUTSIDE_EU } from "../../data/vat";
import { checkVat } from "../../lib/vies";
import { mailReady } from "../../lib/mail";
import { cents, maltaVatRate, packMetadata, resolveCart, stripe, stripeReady, toLines } from "../../lib/stripe";

export const prerender = false;
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json" } });
const str = (v: unknown, max = 4000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Starts a Stripe Checkout session. The browser is redirected to Stripe; the webhook confirms payment.
export const POST: APIRoute = async ({ request, url }) => {
  if (!site.checkoutOpen || !stripeReady() || !mailReady()) return json({ error: "Checkout isn't available yet." }, 503);
  let body: any;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }

  try {
    const items = resolveCart(body?.items);
    const lines = toLines(items);
    const monthly = lines.some((l) => l.monthly);
    const c = body?.customer ?? {};
    const name = str(c.name, 120);
    const email = str(c.email, 200);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Please add your name and a valid email." }, 400);

    const country = typeof c.country === "string" && (isEu(c.country) || c.country === OUTSIDE_EU) ? c.country : "MT";
    const check = c.vatNumber && country !== "MT" && country !== OUTSIDE_EU ? await checkVat(country, str(c.vatNumber, 30)) : { valid: false, number: "" };
    const vat = vatFor(country, check.valid);
    const taxRates = vat.rate > 0 ? [await maltaVatRate()] : [];

    const s = stripe();
    const customer = await s.customers.create({
      name,
      email,
      phone: str(c.phone, 60) || undefined,
      metadata: { business: str(c.business, 200), country, vat_number: check.valid ? check.number : "" },
      ...(str(c.business, 200) ? { invoice_settings: { custom_fields: [{ name: "Business", value: str(c.business, 30) }] } } : {}),
    });

    // Everything the webhook needs to send the brief: package ids and VAT come from the server, answers from the form.
    const metadata = packMetadata(
      {
        items: lines.map((l) => l.id).join(","),
        country,
        vat_rate: String(vat.rate),
        vat_number: check.valid ? check.number : "",
        welcome_call: c.welcomeCall === "yes" ? "yes" : "",
      },
      JSON.stringify({ business: str(c.business, 200), phone: str(c.phone, 60), notes: str(c.notes), answers: body?.brief ?? {} }),
    );

    const origin = url.origin;
    const session = await s.checkout.sessions.create({
      mode: monthly ? "subscription" : "payment",
      customer: customer.id,
      client_reference_id: lines.map((l) => l.id).join(",").slice(0, 200),
      line_items: lines.map((l) => ({
        quantity: 1,
        tax_rates: taxRates,
        price_data: {
          currency: "eur",
          unit_amount: cents(l.amount),
          product_data: {
            name: l.balance > 0 ? `${l.name}: 50% deposit` : l.name,
            description: l.balance > 0 ? `Deposit on €${l.price}. The balance is invoiced when your work is delivered.` : l.delivery,
          },
          ...(l.monthly ? { recurring: { interval: "month" as const } } : {}),
        },
      })),
      metadata,
      ...(monthly
        ? { subscription_data: { metadata: { items: metadata.items, country } } }
        : { payment_intent_data: { description: `Charlotte Smith: ${lines.map((l) => l.name).join(", ")}`.slice(0, 1000), metadata: { items: metadata.items } } }),
      locale: "en",
      success_url: `${origin}/order-confirmed/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/?cancelled=1${monthly ? `&plan=${encodeURIComponent(lines[0].id)}` : ""}`,
    });
    return json({ url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Something went wrong.";
    if (e instanceof Error && "type" in e) {
      console.error("Stripe checkout failed", e);
      return json({ error: "Payment couldn't be started. Please try again." }, 502);
    }
    return json({ error: msg }, 400);
  }
};
