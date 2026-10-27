// Server-only Stripe helpers. Prices always come from src/data/packages.ts, never from the browser.
import Stripe from "stripe";
import { getPackage, type Package } from "../data/packages";
import { MT_RATE, vatOn } from "../data/vat";

const env = (k: string) => (process.env[k] ?? import.meta.env[k] ?? "") as string;

/** Every one-off package takes a 50% deposit; the balance is invoiced on delivery. Monthly plans are paid in full. */
export const DEPOSIT_FROM = 0;
export const DEPOSIT_SHARE = 0.5;

export const stripeConfig = () => {
  const secret = env("STRIPE_SECRET_KEY");
  return {
    secret,
    publishable: env("STRIPE_PUBLISHABLE_KEY"),
    webhookSecret: env("STRIPE_WEBHOOK_SECRET"),
    portalUrl: env("STRIPE_PORTAL_URL"),
    test: secret.startsWith("sk_test_") || secret.startsWith("rk_test_"),
  };
};
export const stripeReady = () => Boolean(stripeConfig().secret && stripeConfig().webhookSecret);

let client: Stripe | null = null;
export const stripe = () => (client ??= new Stripe(stripeConfig().secret, { appInfo: { name: "bycharlottesmith.com" } }));

const cents = (n: number) => Math.round(n * 100);
const round2 = (n: number) => Math.round(n * 100) / 100;

export interface Line {
  id: string;
  name: string;
  delivery: string;
  price: number; // full package price, excl. VAT
  amount: number; // charged now, excl. VAT
  balance: number; // invoiced on delivery, excl. VAT
  monthly: boolean;
}

export const isDeposit = (p: Package) => !p.monthly && p.price >= DEPOSIT_FROM;

export function toLines(items: Package[]): Line[] {
  return items.map((p) => {
    const amount = isDeposit(p) ? round2(p.price * DEPOSIT_SHARE) : p.price;
    return { id: p.id, name: p.name, delivery: p.delivery, price: p.price, amount, balance: round2(p.price - amount), monthly: Boolean(p.monthly) };
  });
}

/** Validate a list of package ids from the browser: known, no duplicates, and a monthly plan checks out on its own. */
export function resolveCart(ids: unknown): Package[] {
  if (!Array.isArray(ids) || ids.length === 0 || ids.length > 20) throw new Error("Your cart is empty.");
  const items = [...new Set(ids.map(String))].map((id) => {
    const p = getPackage(id);
    if (!p) throw new Error(`"${id}" isn't available.`);
    return p;
  });
  if (items.some((p) => p.monthly) && items.length > 1) throw new Error("Monthly plans check out on their own. Please buy packages separately.");
  return items;
}

export function totals(lines: Line[], rate: number) {
  const subtotal = round2(lines.reduce((n, l) => n + l.amount, 0));
  const vat = round2(lines.reduce((n, l) => n + vatOn(l.amount, rate), 0));
  const balance = round2(lines.reduce((n, l) => n + l.balance, 0));
  return { subtotal, vat, total: round2(subtotal + vat), balance, balanceVat: round2(lines.reduce((n, l) => n + vatOn(l.balance, rate), 0)) };
}

/** The Malta VAT rate as a Stripe tax rate, created once and reused. */
let vatRateId = "";
export async function maltaVatRate(): Promise<string> {
  if (vatRateId) return vatRateId;
  const s = stripe();
  for await (const r of s.taxRates.list({ active: true, limit: 100 })) {
    if (r.metadata?.key === "mt-vat-18" && !r.inclusive) return (vatRateId = r.id);
  }
  const r = await s.taxRates.create({
    display_name: "VAT",
    description: "Malta VAT 18%",
    jurisdiction: "Malta",
    country: "MT",
    percentage: MT_RATE * 100,
    inclusive: false,
    metadata: { key: "mt-vat-18" },
  });
  return (vatRateId = r.id);
}

// Stripe metadata values are capped at 500 characters, so the brief is split across numbered keys.
const CHUNK = 490;
export function packMetadata(base: Record<string, string>, brief: string): Record<string, string> {
  const room = 50 - Object.keys(base).length;
  const chunks = brief.match(new RegExp(`[\\s\\S]{1,${CHUNK}}`, "g")) ?? [];
  if (chunks.length > room) throw new Error("Your brief is too long to send with the order. Please shorten it, or email the extra details after paying.");
  return { ...base, ...Object.fromEntries(chunks.map((c, i) => [`b${i}`, c])) };
}
export const unpackBrief = (m: Record<string, string>) =>
  Object.keys(m).filter((k) => /^b\d+$/.test(k)).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1))).map((k) => m[k]).join("");

export { cents };
