import type { APIRoute } from "astro";
import { captureOrder, getOrder, paypalReady, resolveCart, total } from "../../lib/paypal";
import { briefSections } from "../../data/packages";
import { mailReady, notifyAddress, orderEmail, send, welcomeEmail, type Brief, type Customer } from "../../lib/mail";

export const prerender = false;
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json" } });
const str = (v: unknown, max = 4000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const POST: APIRoute = async ({ request }) => {
  if (!paypalReady()) return json({ error: "Checkout isn't available yet." }, 503);
  let body: any;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }

  const orderId = str(body?.orderId, 64);
  if (!/^[A-Z0-9]+$/.test(orderId)) return json({ error: "Invalid order." }, 400);

  // The packages come from the order PayPal holds (set by our server), not from the browser.
  const existing = await getOrder(orderId);
  if (!existing.ok) return json({ error: "Order not found." }, 404);
  const unit = existing.body.purchase_units?.[0];
  let items;
  try { items = resolveCart(String(unit?.custom_id ?? "").split(",").filter(Boolean)); } catch { return json({ error: "Order details don't match." }, 400); }
  const expected = total(items);
  if (Number(unit?.amount?.value) !== expected || unit?.amount?.currency_code !== "EUR") return json({ error: "Order total doesn't match." }, 400);

  const cap = await captureOrder(orderId);
  const capture = cap.body?.purchase_units?.[0]?.payments?.captures?.[0];
  const issue = cap.body?.details?.[0]?.issue;
  if (issue === "INSTRUMENT_DECLINED") return json({ retry: true, error: "Your payment method was declined. Please try another." }, 402);
  if (!cap.ok || cap.body?.status !== "COMPLETED" || !capture) {
    console.error("PayPal capture failed", cap.status, JSON.stringify(cap.body));
    return json({ error: "The payment couldn't be completed. You have not been charged." }, 502);
  }

  const customer: Customer = {
    name: str(body?.customer?.name, 120) || cap.body?.payer?.name?.given_name || "Client",
    email: str(body?.customer?.email, 200) || cap.body?.payer?.email_address || "",
    business: str(body?.customer?.business, 200),
    phone: str(body?.customer?.phone, 60),
    notes: str(body?.customer?.notes),
  };
  const answers = (body?.brief ?? {}) as Record<string, Record<string, unknown>>;
  const brief: Brief = items.flatMap((p) =>
    briefSections(p).map((s) => ({
      section: s.name,
      answers: s.fields.map((f) => ({ label: f.label, value: str(answers?.[s.id]?.[f.name]) })),
    })),
  );
  const receipt = {
    orderId,
    captureId: String(capture.id),
    date: new Date(capture.create_time ?? Date.now()).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    total: expected,
    payerEmail: cap.body?.payer?.email_address,
  };

  // Payment is complete at this point; email problems must not hide that from the client.
  let emailed = false;
  let briefSent = false;
  if (mailReady()) {
    const [toClient, toMe] = await Promise.allSettled([
      customer.email ? send(customer.email, welcomeEmail(customer, items, receipt)) : Promise.reject(new Error("no email")),
      send(notifyAddress(), orderEmail(customer, items, receipt, brief), customer.email || undefined),
    ]);
    if (toClient.status === "rejected") console.error("Welcome email failed", toClient.reason);
    if (toMe.status === "rejected") console.error("Order email failed", toMe.reason, JSON.stringify({ receipt, customer, brief }));
    emailed = toClient.status === "fulfilled";
    briefSent = toMe.status === "fulfilled";
  } else {
    console.error("Mail not configured; order details:", JSON.stringify({ receipt, customer, brief }));
  }

  return json({
    ok: true,
    emailed,
    briefSent,
    receipt: { ...receipt, items: items.map((p) => ({ name: p.name, price: p.price, delivery: p.delivery })) },
  });
};
