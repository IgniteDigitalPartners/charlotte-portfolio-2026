// VAT rules for checkout. Charlotte is VAT registered in Malta; prices on the site exclude VAT.
// Confirm these rules with an accountant.
export const MT_RATE = 0.18;

export const euCountries: { code: string; name: string; vatPrefix: string }[] = [
  ["MT", "Malta"], ["AT", "Austria"], ["BE", "Belgium"], ["BG", "Bulgaria"], ["HR", "Croatia"], ["CY", "Cyprus"],
  ["CZ", "Czechia"], ["DK", "Denmark"], ["EE", "Estonia"], ["FI", "Finland"], ["FR", "France"], ["DE", "Germany"],
  ["GR", "Greece"], ["HU", "Hungary"], ["IE", "Ireland"], ["IT", "Italy"], ["LV", "Latvia"], ["LT", "Lithuania"],
  ["LU", "Luxembourg"], ["NL", "Netherlands"], ["PL", "Poland"], ["PT", "Portugal"], ["RO", "Romania"], ["SK", "Slovakia"],
  ["SI", "Slovenia"], ["ES", "Spain"], ["SE", "Sweden"],
].map(([code, name]) => ({ code, name, vatPrefix: code === "GR" ? "EL" : code }));

export const OUTSIDE_EU = "XX";
export const isEu = (c: string) => euCountries.some((x) => x.code === c);

export interface VatResult {
  rate: number; // 0.18 or 0
  label: string; // shown on the summary line
  note?: string; // shown under the total
  reverseCharge: boolean;
}

/** vatValid: the customer's VAT number was confirmed by the EU VIES service. */
export function vatFor(country: string, vatValid: boolean): VatResult {
  if (country === OUTSIDE_EU) return { rate: 0, label: "VAT", note: "No VAT is charged for clients outside the EU.", reverseCharge: false };
  if (country !== "MT" && isEu(country) && vatValid)
    return { rate: 0, label: "VAT (reverse charge)", note: "Your VAT number is verified, so VAT is reverse charged: you account for it in your own country.", reverseCharge: true };
  return { rate: MT_RATE, label: "VAT 18%", reverseCharge: false };
}

export const vatOn = (price: number, rate: number) => Math.round(price * rate * 100) / 100;
export const fmt = (n: number) => `€${Number.isInteger(n) ? n : n.toFixed(2)}`;
