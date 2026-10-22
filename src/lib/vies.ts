// Server-only: check an EU VAT number with the European Commission's VIES service.
import { euCountries, isEu } from "../data/vat";

export const cleanVat = (s: unknown) => (typeof s === "string" ? s.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16) : "");

export async function checkVat(country: string, raw: string): Promise<{ valid: boolean; unavailable?: boolean; number: string }> {
  const number = cleanVat(raw);
  if (!number || !isEu(country) || country === "MT") return { valid: false, number };
  const prefix = euCountries.find((c) => c.code === country)!.vatPrefix;
  const digits = number.startsWith(prefix) ? number.slice(prefix.length) : number;
  try {
    const res = await fetch("https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ countryCode: prefix, vatNumber: digits }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return { valid: false, unavailable: true, number: prefix + digits };
    const body = await res.json();
    return { valid: body.valid === true, unavailable: body.valid !== true && Boolean(body.userError && body.userError !== "VALID" && body.userError !== "INVALID"), number: prefix + digits };
  } catch {
    return { valid: false, unavailable: true, number: prefix + digits };
  }
}
