import type { APIRoute } from "astro";
import { stripe, stripeReady } from "../../lib/stripe";
import { isPaid, summarise } from "../../lib/fulfil";

export const prerender = false;
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

// Receipt for the confirmation page. Booking links are only returned for a paid session.
export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id") ?? "";
  if (!stripeReady() || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) return json({ error: "Not found" }, 404);
  try {
    const session = await stripe().checkout.sessions.retrieve(id);
    if (!isPaid(session)) return json({ paid: false, pending: session.status === "complete" });
    const sum = summarise(session);
    return json({
      paid: true,
      first: (session.customer_details?.name ?? "").trim().split(/\s+/)[0],
      email: session.customer_details?.email,
      bookings: sum.bookings,
      receipt: { ...sum.receipt, items: sum.lines.map((l) => ({ name: l.name, amount: l.amount, price: l.price, balance: l.balance, delivery: l.delivery, monthly: l.monthly })) },
    });
  } catch {
    return json({ error: "Not found" }, 404);
  }
};
