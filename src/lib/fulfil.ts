// Turns a paid Stripe Checkout session into emails (and a draft balance invoice for deposits).
// Runs from the webhook; safe to call more than once for the same session.
import type Stripe from "stripe";
import { site } from "../data/site";
import { briefSections, earnsWelcomeCall } from "../data/packages";
import { euCountries, OUTSIDE_EU, vatFor } from "../data/vat";
import { mailReady, notifyAddress, orderEmail, send, welcomeEmail, type Brief, type Customer } from "./mail";
import { cents, maltaVatRate, resolveCart, stripe, stripeConfig, toLines, totals, unpackBrief } from "./stripe";

const str = (v: unknown) => (typeof v === "string" ? v : "");

export const isPaid = (s: Stripe.Checkout.Session) => s.status === "complete" && (s.payment_status === "paid" || s.payment_status === "no_payment_required");

export function bookingsFor(itemIds: string, welcomeCall: boolean) {
  const items = resolveCart(itemIds.split(","));
  const bookings: { label: string; url: string }[] = [];
  if (welcomeCall && earnsWelcomeCall(items)) bookings.push({ label: "Book your free welcome call", url: site.booking.welcome });
  return bookings;
}

/** A summary that is safe to show on the confirmation page. */
export function summarise(session: Stripe.Checkout.Session) {
  const m = session.metadata ?? {};
  const items = resolveCart(str(m.items).split(","));
  const lines = toLines(items);
  const rate = Number(m.vat_rate) || 0;
  const t = totals(lines, rate);
  const vat = vatFor(m.country || "MT", Boolean(m.vat_number));
  const monthly = lines.some((l) => l.monthly);
  return {
    lines,
    t,
    vat,
    monthly,
    receipt: {
      orderId: session.id.slice(-10).toUpperCase(),
      captureId: str(typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id) || str(typeof session.subscription === "string" ? session.subscription : session.subscription?.id),
      date: new Date((session.created ?? Date.now() / 1000) * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      subtotal: t.subtotal,
      vat: t.vat,
      vatLabel: vat.label,
      vatNote: vat.note,
      customerVat: m.vat_number || undefined,
      country: m.country === OUTSIDE_EU ? "Outside the EU" : euCountries.find((c) => c.code === m.country)?.name ?? m.country,
      total: t.total,
      balance: t.balance,
      balanceVat: t.balanceVat,
      monthly,
      payerEmail: session.customer_details?.email ?? undefined,
    },
    bookings: bookingsFor(str(m.items), m.welcome_call === "yes"),
  };
}

async function draftBalanceInvoice(customerId: string, session: Stripe.Checkout.Session, lines: ReturnType<typeof toLines>, rate: number) {
  const s = stripe();
  const due = lines.filter((l) => l.balance > 0);
  if (!due.length) return null;
  const vat = vatFor(session.metadata?.country || "MT", Boolean(session.metadata?.vat_number));
  const invoice = await s.invoices.create({
    customer: customerId,
    collection_method: "send_invoice",
    days_until_due: 7,
    auto_advance: false, // stays a draft until Charlotte sends it on delivery
    description: "Balance due on delivery of your work. Thank you!",
    footer: vat.reverseCharge ? `Reverse charge: VAT to be accounted for by the recipient. Customer VAT number ${session.metadata?.vat_number}.` : undefined,
    metadata: { checkout_session: session.id, kind: "balance" },
  });
  const taxRates = rate > 0 ? [await maltaVatRate()] : [];
  for (const l of due) {
    await s.invoiceItems.create({
      customer: customerId,
      invoice: invoice.id,
      currency: "eur",
      amount: cents(l.balance),
      description: `${l.name}: balance (50%)`,
      tax_rates: taxRates,
    });
  }
  return invoice.id;
}

export async function fulfil(sessionId: string): Promise<"done" | "already" | "unpaid"> {
  const s = stripe();
  const session = await s.checkout.sessions.retrieve(sessionId, { expand: ["payment_intent", "subscription"] });
  if (!isPaid(session)) return "unpaid";

  // Remember fulfilment on the payment (or subscription) so retries don't send twice.
  const target = session.mode === "subscription" ? (session.subscription as Stripe.Subscription | null) : (session.payment_intent as Stripe.PaymentIntent | null);
  if (target?.metadata?.fulfilled === "yes") return "already";

  const m = session.metadata ?? {};
  const sum = summarise(session);
  if (session.amount_total !== null && session.amount_total !== cents(sum.t.total)) {
    console.error("Amount mismatch", session.id, session.amount_total, cents(sum.t.total));
  }

  let extra: { business?: string; phone?: string; notes?: string; answers?: Record<string, Record<string, unknown>> } = {};
  try { extra = JSON.parse(unpackBrief(m) || "{}"); } catch { /* keep empty */ }
  const items = resolveCart(str(m.items).split(","));
  const brief: Brief = items.flatMap((p) =>
    briefSections(p).map((sec) => ({
      section: sec.name,
      answers: sec.fields.map((f) => ({ label: f.label, value: str(extra.answers?.[sec.id]?.[f.name]).trim() })),
    })),
  );
  const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id ?? "";
  const customer: Customer = {
    name: session.customer_details?.name || "Client",
    email: session.customer_details?.email || "",
    business: extra.business,
    phone: extra.phone,
    notes: [extra.notes, m.welcome_call === "yes" && earnsWelcomeCall(items) ? "Requested the free 30-minute welcome call." : ""].filter(Boolean).join("\n"),
    country: sum.receipt.country,
  };

  let balanceInvoice: string | null = target?.metadata?.balance_invoice || null;
  if (!balanceInvoice && session.mode === "payment" && customerId && target) {
    try {
      balanceInvoice = await draftBalanceInvoice(customerId, session, sum.lines, Number(m.vat_rate) || 0);
      if (balanceInvoice) await s.paymentIntents.update(target.id, { metadata: { balance_invoice: balanceInvoice } });
    } catch (e) { console.error("Balance invoice draft failed", session.id, e); }
  }
  const dash = `https://dashboard.stripe.com/${stripeConfig().test ? "test/" : ""}`;
  const links = {
    payment: `${dash}${session.mode === "subscription" ? `subscriptions/${sum.receipt.captureId}` : `payments/${sum.receipt.captureId}`}`,
    balanceInvoice: balanceInvoice ? `${dash}invoices/${balanceInvoice}` : undefined,
    portal: stripeConfig().portalUrl || undefined,
  };

  if (!mailReady()) {
    console.error("Mail not configured; order details:", JSON.stringify({ session: session.id, customer, brief }));
  } else {
    const [toClient, toMe] = await Promise.allSettled([
      customer.email ? send(customer.email, welcomeEmail(customer, sum.lines, sum.receipt, sum.bookings, links)) : Promise.reject(new Error("no email")),
      send(notifyAddress(), orderEmail(customer, sum.lines, sum.receipt, brief, links), customer.email || undefined),
    ]);
    if (toClient.status === "rejected") console.error("Welcome email failed", toClient.reason);
    if (toMe.status === "rejected") {
      console.error("Order email failed", toMe.reason, JSON.stringify({ session: session.id, customer, brief }));
      throw new Error("Order email failed"); // let Stripe retry the webhook
    }
  }

  if (target) {
    const meta = { fulfilled: "yes", ...(balanceInvoice ? { balance_invoice: balanceInvoice } : {}) };
    if (session.mode === "subscription") await s.subscriptions.update(target.id, { metadata: meta });
    else await s.paymentIntents.update(target.id, { metadata: meta });
  }
  return "done";
}
