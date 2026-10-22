// Server-only email: welcome email to the client, order + brief to Charlotte.
import nodemailer from "nodemailer";
import { site } from "../data/site";
import { euro, type Package } from "../data/packages";

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

export interface Customer { name: string; email: string; business?: string; phone?: string; notes?: string }
export type Brief = { section: string; answers: { label: string; value: string }[] }[];
export interface Receipt { orderId: string; captureId: string; date: string; total: number; payerEmail?: string }

const shell = (inner: string) => `<!doctype html><html><body style="margin:0;background:#F7F3EE;padding:32px 12px;font-family:Montserrat,Helvetica,Arial,sans-serif;color:#3B3A38;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FBFAF7;border:1px solid #E6D7B8;border-radius:6px;">
<tr><td style="background:#1D1B1A;padding:26px 36px;border-radius:6px 6px 0 0;"><span style="font-family:Georgia,'Playfair Display',serif;font-size:24px;color:#D9C49A;">Charlotte Smith</span><br><span style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#CFC6BC;">Marketing consultant</span></td></tr>
<tr><td style="padding:36px;font-size:15px;line-height:1.65;">${inner}</td></tr>
<tr><td style="padding:22px 36px;border-top:1px solid #EFE6DD;font-size:12px;color:#9B9590;">Charlotte Smith · ${esc(site.email)}</td></tr>
</table></td></tr></table></body></html>`;

const receiptTable = (items: Package[], r: Receipt) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 6px;font-size:14px;">
${items.map((p) => `<tr><td style="padding:10px 0;border-bottom:1px solid #EFE6DD;">${esc(p.name)}<br><span style="color:#9B9590;font-size:12px;">${esc(p.delivery)}</span></td><td align="right" style="padding:10px 0;border-bottom:1px solid #EFE6DD;white-space:nowrap;">${euro(p.price)}</td></tr>`).join("")}
<tr><td style="padding:12px 0;font-weight:600;">Total paid</td><td align="right" style="padding:12px 0;font-weight:600;">${euro(r.total)}</td></tr>
</table>
<p style="font-size:12px;color:#9B9590;margin:0 0 4px;">Order ${esc(r.orderId)} · PayPal transaction ${esc(r.captureId)} · ${esc(r.date)}</p>`;

export function welcomeEmail(c: Customer, items: Package[], r: Receipt) {
  const first = c.name.trim().split(/\s+/)[0] || "there";
  const html = shell(`
<h1 style="font-family:Georgia,'Playfair Display',serif;font-weight:400;font-size:30px;margin:0 0 16px;color:#3B3A38;">Thank you, ${esc(first)}.</h1>
<p style="margin:0 0 18px;">Your order is confirmed and I'm looking forward to working with you. Here is your receipt and what happens next.</p>
<h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8E4F58;margin:26px 0 6px;">Your receipt</h2>
${receiptTable(items, r)}
<h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8E4F58;margin:28px 0 8px;">What happens next</h2>
<ol style="margin:0 0 8px;padding-left:20px;">
<li style="margin-bottom:8px;">I'll review your brief within one business day and let you know if I need anything else.</li>
<li style="margin-bottom:8px;">Delivery times start once I have everything needed, as shown on your receipt.</li>
<li>Your finished work arrives by email, with your included revisions.</li>
</ol>
<p style="margin:26px 0 10px;">Would you like to talk it through first? Book a welcome call at a time that suits you.</p>
<p style="margin:0 0 26px;"><a href="${esc(site.bookingUrl)}" style="display:inline-block;background:#1D1B1A;color:#E8D3A2;text-decoration:none;padding:13px 24px;border-radius:2px;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Book your call</a></p>
<p style="margin:0;">Any questions, simply reply to this email.</p>
<p style="margin:18px 0 0;">Warmly,<br>Charlotte</p>`);
  const text = [
    `Thank you, ${first}.`,
    "",
    "Your order is confirmed. Your receipt:",
    ...items.map((p) => `- ${p.name}: ${euro(p.price)} (${p.delivery})`),
    `Total paid: ${euro(r.total)}`,
    `Order ${r.orderId} · PayPal transaction ${r.captureId} · ${r.date}`,
    "",
    "What happens next:",
    "1. I'll review your brief within one business day and let you know if I need anything else.",
    "2. Delivery times start once I have everything needed.",
    "3. Your finished work arrives by email, with your included revisions.",
    "",
    `Book a welcome call: ${site.bookingUrl}`,
    "",
    "Warmly,",
    "Charlotte",
  ].join("\n");
  return { subject: "Your order is confirmed | Charlotte Smith", html, text };
}

export function orderEmail(c: Customer, items: Package[], r: Receipt, brief: Brief) {
  const rows = (pairs: [string, string | undefined][]) =>
    pairs.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#9B9590;vertical-align:top;white-space:nowrap;">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap;">${esc(v!)}</td></tr>`).join("");
  const html = shell(`
<h1 style="font-family:Georgia,serif;font-weight:400;font-size:26px;margin:0 0 14px;">New order: ${euro(r.total)}</h1>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:10px;">${rows([["Name", c.name], ["Email", c.email], ["Business", c.business], ["Phone", c.phone], ["PayPal payer", r.payerEmail], ["Notes", c.notes]])}</table>
${receiptTable(items, r)}
${brief.map((s) => `<h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8E4F58;margin:26px 0 6px;">${esc(s.section)}</h2><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;">${rows(s.answers.map((a) => [a.label, a.value || "(not answered)"]))}</table>`).join("")}`);
  const text = [
    `New order: ${euro(r.total)}`,
    `${c.name} <${c.email}>${c.business ? `, ${c.business}` : ""}${c.phone ? `, ${c.phone}` : ""}`,
    c.notes ? `Notes: ${c.notes}` : "",
    ...items.map((p) => `- ${p.name}: ${euro(p.price)}`),
    `Order ${r.orderId} · capture ${r.captureId}`,
    ...brief.flatMap((s) => ["", s.section.toUpperCase(), ...s.answers.map((a) => `${a.label}: ${a.value || "(not answered)"}`)]),
  ].join("\n");
  return { subject: `New order from ${c.name}: ${items.map((p) => p.name).join(", ")}`, html, text };
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
