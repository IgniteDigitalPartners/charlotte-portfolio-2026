import type { APIRoute } from "astro";
import { vatFor, isEu, OUTSIDE_EU } from "../../data/vat";
import { checkVat } from "../../lib/vies";

export const prerender = false;

// Works out the VAT treatment for the checkout summary (verifies EU VAT numbers).
export const POST: APIRoute = async ({ request }) => {
  let body: any = {};
  try { body = await request.json(); } catch { /* defaults */ }
  const country = typeof body.country === "string" && (isEu(body.country) || body.country === OUTSIDE_EU) ? body.country : "MT";
  const check = body.vatNumber ? await checkVat(country, body.vatNumber) : { valid: false, number: "" };
  const vat = vatFor(country, check.valid);
  const warn = body.vatNumber && country !== "MT" && country !== OUTSIDE_EU && !check.valid
    ? check.unavailable
      ? "The EU VAT checking service isn't responding right now, so VAT is included. Contact me after ordering and I'll refund it once your number is verified."
      : "This VAT number couldn't be verified, so VAT is included. Please check the number."
    : undefined;
  return new Response(JSON.stringify({ ...vat, vatValid: check.valid, vatNumber: check.number, warn }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
