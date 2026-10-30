import type { APIRoute } from "astro";
import { mailReady, notifyAddress, send, shell, signatureText } from "../../lib/mail";

// Lead capture for the free Social Media Audit Checklist (/free-audit/).
export const prerender = false;
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json" } });
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const CHECKLIST = "https://www.bycharlottesmith.com/free-audit/checklist/";

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return json({ error: "Invalid request" }, 400); }
  if (data.botcheck) return json({ ok: true });

  const v = (k: string, max = 300) => (typeof data[k] === "string" ? (data[k] as string).trim().slice(0, max) : "");
  const name = v("name", 120), email = v("email", 200), business = v("business", 200);
  const tips = data.tips === "on" || data.tips === true;
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Please add your name and a valid email." }, 400);

  // The visitor always gets the checklist; email is best-effort.
  if (!mailReady()) { console.warn("Audit lead (mail not configured)", { name, email, business, tips }); return json({ ok: true }); }

  const rows: [string, string][] = [["Name", name], ["Email", email], ["Business", business], ["Marketing tips", tips ? "Yes, opted in" : "No"]];
  const subject = `New checklist download: ${name}`;
  const html = shell(`<h1 style="font-family:Georgia,serif;font-weight:400;font-size:26px;margin:0 0 14px;">${esc(subject)}</h1><p style="margin:0 0 14px;">Someone downloaded the Social Media Audit Checklist. A good time to follow up is in 2–3 days.</p><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;">${rows
    .filter(([, x]) => x)
    .map(([k, x]) => `<tr><td style="padding:6px 14px 6px 0;color:#9B9590;white-space:nowrap;">${esc(k)}</td><td style="padding:6px 0;">${esc(x)}</td></tr>`)
    .join("")}</table>`);
  const text = rows.filter(([, x]) => x).map(([k, x]) => `${k}: ${x}`).join("\n") + "\n" + signatureText;
  await send(notifyAddress(), { subject, html, text }, email).catch((e) => console.error("Audit lead email failed", e, text));

  const first = name.split(/\s+/)[0];
  const leadHtml = shell(`<h1 style="font-family:Georgia,'Playfair Display',serif;font-weight:400;font-size:30px;margin:0 0 16px;color:#3B3A38;">Here's your checklist, ${esc(first)}.</h1>
<p style="margin:0 0 18px;">Thank you for downloading the 15-Point Social Media Audit Checklist. Open your Instagram and Facebook side by side and work through it in about 20 minutes.</p>
<p style="margin:0 0 22px;"><a href="${CHECKLIST}" style="display:inline-block;background:#1D1B1A;color:#E8D3A2;text-decoration:none;padding:13px 24px;border-radius:2px;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Open your checklist</a></p>
<p style="margin:0 0 18px;">If your score turns up a few gaps and you'd like a second pair of eyes, reply to this email or book a free 20-minute discovery call and we'll look at it together.</p>
<p style="margin:18px 0 0;">Warmly,<br>Charlotte</p>`);
  const leadText = `Here's your checklist, ${first}.\n\nThank you for downloading the 15-Point Social Media Audit Checklist: ${CHECKLIST}\n\nIf your score turns up a few gaps, reply to this email or book a free discovery call and we'll look at it together.\n\nWarmly,\nCharlotte\n${signatureText}`;
  await send(email, { subject: "Your Social Media Audit Checklist | Charlotte Smith", html: leadHtml, text: leadText }).catch((e) => console.error("Audit lead ack failed", e));
  return json({ ok: true });
};
