// Server-only email: welcome email to the client, order + brief to Charlotte.
import nodemailer from "nodemailer";
import { site } from "../data/site";
import type { Line } from "./stripe";
import { fmt } from "../data/vat";

const env = (k: string) => (process.env[k] ?? import.meta.env[k] ?? "") as string;

export const mailReady = () => Boolean(env("SMTP_USER") && env("SMTP_PASS"));

const transport = () =>
  nodemailer.createTransport({
    host: env("SMTP_HOST") || "smtp.gmail.com",
    port: Number(env("SMTP_PORT") || 465),
    secure: Number(env("SMTP_PORT") || 465) === 465,
    auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
  });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export interface Customer { name: string; email: string; business?: string; phone?: string; notes?: string; country?: string }
export type Brief = { section: string; answers: { label: string; value: string }[] }[];
export interface Receipt { orderId: string; captureId: string; date: string; subtotal: number; vat: number; vatLabel: string; vatNote?: string; customerVat?: string; country?: string; total: number; balance?: number; balanceVat?: number; monthly?: boolean; payerEmail?: string }
export interface Links { payment?: string; balanceInvoice?: string; portal?: string }
const lineName = (l: Line) => (l.balance > 0 ? `${l.name}: 50% deposit` : l.name);
const lineNote = (l: Line) => (l.balance > 0 ? `Deposit on ${fmt(l.price)}. Balance of ${fmt(l.balance)} + VAT invoiced on delivery.` : l.monthly ? "Billed monthly. Cancel anytime." : l.delivery);

// Branded email signature (matches public/email/signature.html). Images load from the live site.
const SEP = `<span style="color:#C8A96A;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>`;
const sigLink = (href: string, label: string) => `<a href="${href}" style="color:#A88566;text-decoration:none;">${label}</a>`;
export const signatureHtml = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;margin-top:28px;">
<tr><td style="padding:0;"><a href="https://www.bycharlottesmith.com/" style="text-decoration:none;"><img src="https://www.bycharlottesmith.com/email/signature-card.jpg" width="480" height="132" alt="Charlotte Smith, Brand &amp; Marketing Consultant" style="display:block;width:480px;max-width:100%;height:auto;border:0;"></a></td></tr>
<tr><td style="padding:12px 0 0 2px;font-size:12px;line-height:18px;color:#6B6560;"><a href="mailto:${site.email}" style="color:#6B6560;text-decoration:none;">${site.email}</a>${SEP}<a href="https://www.bycharlottesmith.com/" style="color:#6B6560;text-decoration:none;">bycharlottesmith.com</a></td></tr>
<tr><td style="padding:6px 0 0 2px;font-size:10px;line-height:14px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">${sigLink(site.sameAs[0], "LinkedIn")}${SEP}${sigLink(site.sameAs[3], "Facebook")}${SEP}${sigLink(site.sameAs[2], "Upwork")}${SEP}${sigLink("https://www.bycharlottesmith.com/packages/", "Packages")}</td></tr>
</table>`;
export const signatureText = [
  "",
  "--",
  "Charlotte Smith",
  "Brand & Marketing Consultant",
  `${site.email} | bycharlottesmith.com`,
  `LinkedIn: ${site.sameAs[0]}`,
  `Facebook: ${site.sameAs[3]}`,
].join("\n");

export const shell = (inner: string) => `<!doctype html><html><body style="margin:0;background:#F7F3EE;padding:32px 12px;font-family:Montserrat,Helvetica,Arial,sans-serif;color:#3B3A38;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FBFAF7;border:1px solid #E6D7B8;border-radius:6px;">
<tr><td style="padding:36px;font-size:15px;line-height:1.65;">${inner}${signatureHtml}</td></tr>
<tr><td style="padding:22px 36px;border-top:1px solid #EFE6DD;font-size:12px;color:#9B9590;">${esc(site.legal.tradingName)}${site.legal.vatNumber ? ` · VAT ${esc(site.legal.vatNumber)}` : ""} · ${esc(site.email)}</td></tr>
</table></td></tr></table></body></html>`;

const receiptTable = (items: Line[], r: Receipt) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 6px;font-size:14px;">
${items.map((p) => `<tr><td style="padding:10px 0;border-bottom:1px solid #EFE6DD;">${esc(lineName(p))}<br><span style="color:#9B9590;font-size:12px;">${esc(lineNote(p))}</span></td><td align="right" style="padding:10px 0;border-bottom:1px solid #EFE6DD;white-space:nowrap;">${fmt(p.amount)}${p.monthly ? " / month" : ""}</td></tr>`).join("")}
<tr><td style="padding:10px 0 4px;">Subtotal</td><td align="right" style="padding:10px 0 4px;">${fmt(r.subtotal)}</td></tr>
<tr><td style="padding:4px 0 10px;border-bottom:1px solid #EFE6DD;">${esc(r.vatLabel)}</td><td align="right" style="padding:4px 0 10px;border-bottom:1px solid #EFE6DD;">${fmt(r.vat)}</td></tr>
<tr><td style="padding:12px 0;font-weight:600;">Total paid</td><td align="right" style="padding:12px 0;font-weight:600;">${fmt(r.total)}</td></tr>
</table>
${r.vatNote ? `<p style="font-size:12px;color:#9B9590;margin:0 0 4px;">${esc(r.vatNote)}${r.customerVat ? ` Your VAT number: ${esc(r.customerVat)}.` : ""}</p>` : ""}
<p style="font-size:12px;color:#9B9590;margin:0 0 4px;">Your VAT invoice will follow by email.</p>
<p style="font-size:12px;color:#9B9590;margin:0 0 4px;">Order ${esc(r.orderId)} · Payment ${esc(r.captureId)} · ${esc(r.date)}</p>`;

export function welcomeEmail(c: Customer, items: Line[], r: Receipt, bookings: { label: string; url: string }[] = [], links: Links = {}) {
  const first = c.name.trim().split(/\s+/)[0] || "there";
  const html = shell(`
<h1 style="font-family:Georgia,'Playfair Display',serif;font-weight:400;font-size:30px;margin:0 0 16px;color:#3B3A38;">Thank you, ${esc(first)}.</h1>
<p style="margin:0 0 18px;">Your order is confirmed and I'm looking forward to working with you. Here is your receipt and what happens next.</p>
<h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8E4F58;margin:26px 0 6px;">Your receipt</h2>
${receiptTable(items, r)}
${r.balance ? `<p style="margin:14px 0 0;padding:12px 14px;background:#F7F3EE;border-radius:4px;font-size:14px;">Today's payment is a 50% deposit. The balance of ${fmt(r.balance + (r.balanceVat ?? 0))} (including VAT) is invoiced when your work is delivered.</p>` : ""}
${r.monthly ? `<p style="margin:14px 0 0;padding:12px 14px;background:#F7F3EE;border-radius:4px;font-size:14px;">Your plan renews monthly and you can cancel anytime${links.portal ? `: <a href="${esc(links.portal)}" style="color:#8E4F58;">manage your subscription</a>` : " by replying to this email"}.</p>` : ""}
<h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8E4F58;margin:28px 0 8px;">What happens next</h2>
<ol style="margin:0 0 8px;padding-left:20px;">
<li style="margin-bottom:8px;">I'll review your brief within one business day and let you know if I need anything else.</li>
<li style="margin-bottom:8px;">Delivery times start once I have everything needed, as shown on your receipt.</li>
<li>Your finished work arrives by email, with your included revisions.</li>
</ol>
${bookings.length ? `<h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8E4F58;margin:28px 0 8px;">Book your call</h2>
<p style="margin:0 0 14px;">Choose a time that suits you from my calendar.</p>
${bookings.map((b) => `<p style="margin:0 0 12px;"><a href="${esc(b.url)}" style="display:inline-block;background:#1D1B1A;color:#E8D3A2;text-decoration:none;padding:13px 24px;border-radius:2px;font-size:12px;letter-spacing:2px;text-transform:uppercase;">${esc(b.label)}</a></p>`).join("")}` : ""}
<div style="height:14px;"></div>
<p style="margin:0;">Any questions, simply reply to this email.</p>
<p style="margin:18px 0 0;">Warmly,<br>Charlotte</p>`);
  const text = [
    `Thank you, ${first}.`,
    "",
    "Your order is confirmed. Your receipt:",
    ...items.map((p) => `- ${lineName(p)}: ${fmt(p.amount)}${p.monthly ? " / month" : ""} (${lineNote(p)})`),
    `Subtotal: ${fmt(r.subtotal)}`,
    `${r.vatLabel}: ${fmt(r.vat)}`,
    `Total paid: ${fmt(r.total)}`,
    ...(r.vatNote ? [r.vatNote] : []),
    "Your VAT invoice will follow by email.",
    `Order ${r.orderId} · Payment ${r.captureId} · ${r.date}`,
    ...(r.balance ? ["", `Today's payment is a 50% deposit. The balance of ${fmt(r.balance + (r.balanceVat ?? 0))} (including VAT) is invoiced when your work is delivered.`] : []),
    ...(r.monthly ? ["", `Your plan renews monthly and you can cancel anytime${links.portal ? `: ${links.portal}` : " by replying to this email"}.`] : []),
    "",
    "What happens next:",
    "1. I'll review your brief within one business day and let you know if I need anything else.",
    "2. Delivery times start once I have everything needed.",
    "3. Your finished work arrives by email, with your included revisions.",
    "",
    ...bookings.flatMap((b) => [`${b.label}: ${b.url}`, ""]),
    "Warmly,",
    "Charlotte",
  ].join("\n") + "\n" + signatureText;
  return { subject: "Your order is confirmed | Charlotte Smith", html, text };
}

export function orderEmail(c: Customer, items: Line[], r: Receipt, brief: Brief, links: Links = {}) {
  const rows = (pairs: [string, string | undefined][]) =>
    pairs.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#9B9590;vertical-align:top;white-space:nowrap;">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap;">${esc(v!)}</td></tr>`).join("");
  const html = shell(`
<h1 style="font-family:Georgia,serif;font-weight:400;font-size:26px;margin:0 0 14px;">New order: ${fmt(r.total)}</h1>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:10px;">${rows([["Name", c.name], ["Email", c.email], ["Business", c.business], ["Country", c.country], ["VAT number", r.customerVat ? `${r.customerVat} (verified, reverse charge)` : undefined], ["Phone", c.phone], ["Notes", c.notes]])}</table>
${receiptTable(items, r)}
${links.balanceInvoice ? `<p style="margin:14px 0 0;padding:12px 14px;background:#F7F3EE;border-radius:4px;font-size:14px;"><strong>Balance invoice drafted:</strong> ${fmt(r.balance ?? 0)} + VAT. <a href="${esc(links.balanceInvoice)}" style="color:#8E4F58;">Open it in Stripe</a> and press Send when the work is delivered.</p>` : ""}
${links.payment ? `<p style="margin:10px 0 0;font-size:13px;"><a href="${esc(links.payment)}" style="color:#8E4F58;">View this ${r.monthly ? "subscription" : "payment"} in Stripe</a></p>` : ""}
${brief.map((s) => `<h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8E4F58;margin:26px 0 6px;">${esc(s.section)}</h2><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;">${rows(s.answers.map((a) => [a.label, a.value || "(not answered)"]))}</table>`).join("")}`);
  const text = [
    `New order: ${fmt(r.total)} (subtotal ${fmt(r.subtotal)}, ${r.vatLabel} ${fmt(r.vat)})`,
    `Country: ${c.country ?? ""}${r.customerVat ? ` · VAT number ${r.customerVat} (verified, reverse charge)` : ""}`,
    `${c.name} <${c.email}>${c.business ? `, ${c.business}` : ""}${c.phone ? `, ${c.phone}` : ""}`,
    c.notes ? `Notes: ${c.notes}` : "",
    ...items.map((p) => `- ${lineName(p)}: ${fmt(p.amount)}${p.monthly ? " / month" : ""}`),
    `Order ${r.orderId} · payment ${r.captureId}`,
    ...(links.balanceInvoice ? [`Balance invoice drafted (${fmt(r.balance ?? 0)} + VAT). Send it on delivery: ${links.balanceInvoice}`] : []),
    ...(links.payment ? [`Stripe: ${links.payment}`] : []),
    ...brief.flatMap((s) => ["", s.section.toUpperCase(), ...s.answers.map((a) => `${a.label}: ${a.value || "(not answered)"}`)]),
  ].join("\n") + "\n" + signatureText;
  return { subject: `New ${r.monthly ? "subscription" : "order"} from ${c.name}: ${items.map((p) => p.name).join(", ")}`, html, text };
}

export async function send(to: string, msg: { subject: string; html: string; text: string }, replyTo?: string) {
  await transport().sendMail({
    from: { name: "Charlotte Smith", address: env("SMTP_USER") },
    to,
    replyTo: replyTo ?? site.email,
    ...msg,
  });
}

export const notifyAddress = () => env("NOTIFY_EMAIL") || site.email;
