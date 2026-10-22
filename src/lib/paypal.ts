// Server-only PayPal Orders v2 helpers. Prices always come from src/data/packages.ts, never from the browser.
import { getPackage, buyable, type Package } from "../data/packages";
import { vatOn } from "../data/vat";

const env = (k: string) => (process.env[k] ?? import.meta.env[k] ?? "") as string;

export const paypalConfig = () => {
  const live = env("PAYPAL_ENV").toLowerCase() === "live";
  return {
    clientId: env("PAYPAL_CLIENT_ID"),
    secret: env("PAYPAL_CLIENT_SECRET"),
    live,
    // PAYPAL_API_BASE is only for local testing against a mock server.
    base: env("PAYPAL_API_BASE") || (live ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"),
  };
};

export const paypalReady = () => {
  const c = paypalConfig();
  return Boolean(c.clientId && c.secret);
};

async function token(): Promise<string> {
  const c = paypalConfig();
  const res = await fetch(`${c.base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${c.clientId}:${c.secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`PayPal auth failed (${res.status})`);
  return (await res.json()).access_token;
}

/** Checks the credentials work, without exposing them. */
export async function authCheck(): Promise<{ ok: boolean; status: number; error?: string }> {
  const c = paypalConfig();
  const res = await fetch(`${c.base}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${c.clientId}:${c.secret}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, error: res.ok ? undefined : String(body.error ?? "") };
}

async function call(path: string, init: RequestInit = {}) {
  const c = paypalConfig();
  const res = await fetch(`${c.base}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json", Prefer: "return=representation", ...(init.headers ?? {}) },
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body };
}

/** Validate a list of package ids from the browser: known, buyable, no duplicates. */
export function resolveCart(ids: unknown): Package[] {
  if (!Array.isArray(ids) || ids.length === 0 || ids.length > 20) throw new Error("Your cart is empty.");
  const unique = [...new Set(ids.map(String))];
  return unique.map((id) => {
    const p = getPackage(id);
    if (!p || !buyable(p)) throw new Error(`"${id}" can't be bought online.`);
    return p;
  });
}

export const total = (items: Package[]) => items.reduce((n, p) => n + p.price, 0);
const money = (n: number) => ({ currency_code: "EUR", value: n.toFixed(2) });

export interface Totals { subtotal: number; vat: number; total: number }
export function totals(items: Package[], rate: number): Totals {
  const subtotal = total(items);
  const vat = Math.round(items.reduce((n, p) => n + vatOn(p.price, rate), 0) * 100) / 100;
  return { subtotal, vat, total: Math.round((subtotal + vat) * 100) / 100 };
}

/** Tax details travel with the order so capture can re-check the amount: "vat|<rate>|<country>|<vat number>" */
export const encodeTax = (rate: number, country: string, vatNumber: string) => `vat|${rate}|${country}|${vatNumber}`.slice(0, 127);
export function decodeTax(s: unknown) {
  const [tag, rate, country = "", vatNumber = ""] = String(s ?? "").split("|");
  if (tag !== "vat" || (rate !== "0" && rate !== "0.18")) return null;
  return { rate: Number(rate), country, vatNumber };
}

export async function createOrder(items: Package[], rate: number, country: string, vatNumber: string) {
  const t = totals(items, rate);
  return call("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: "charlotte-smith",
          description: "Charlotte Smith marketing packages",
          custom_id: encodeTax(rate, country, vatNumber),
          amount: { ...money(t.total), breakdown: { item_total: money(t.subtotal), tax_total: money(t.vat) } },
          items: items.map((p) => ({ name: p.name.slice(0, 127), sku: p.id, unit_amount: money(p.price), tax: money(vatOn(p.price, rate)), quantity: "1", category: "DIGITAL_GOODS" })),
        },
      ],
      // Works for both the PayPal and the card buttons.
      application_context: { brand_name: "Charlotte Smith", shipping_preference: "NO_SHIPPING", user_action: "PAY_NOW" },
    }),
  });
}

export const getOrder = (id: string) => call(`/v2/checkout/orders/${encodeURIComponent(id)}`, { method: "GET" });
export const captureOrder = (id: string) => call(`/v2/checkout/orders/${encodeURIComponent(id)}/capture`, { method: "POST", body: "{}" });
