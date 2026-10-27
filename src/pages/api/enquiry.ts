import type { APIRoute } from "astro";
import { mailReady, notifyAddress, send } from "../../lib/mail";

export const prerender = false;
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json" } });
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const LABELS: Record<string, string> = {
  name: "Name", email: "Email", business: "Business", website: "Website", package: "Package",
  engagement: "How they'd like to work", service: "Area of interest", message: "Message",
  assets_ready: "Assets ready", start_date: "Ideal start date",
};

export const POST: APIRoute = async ({ request }) => {
  if (!mailReady()) return json({ error: "Not configured" }, 503);
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return json({ error: "Invalid request" }, 400); }
  if (data.botcheck) return json({ ok: true }); // quietly drop spam bots

  const v = (k: string, max = 5000) => (typeof data[k] === "string" ? (data[k] as string).trim().slice(0, max) : "");
  const name = v("name", 120), email = v("email", 200);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Please add your name and a valid email." }, 400);
  const isOrder = v("form_type") === "order";

  const rows = Object.keys(LABELS).map((k) => [LABELS[k], v(k)] as const).filter(([, x]) => x);
  const subject = isOrder ? `Order brief from ${name}${v("package") ? `: ${v("package")}` : ""}` : `New enquiry from ${name}`;
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#3B3A38;"><h2 style="font-family:Georgia,serif;font-weight:400;">${esc(subject)}</h2><table cellpadding="0" cellspacing="0">${rows
    .map(([k, x]) => `<tr><td style="padding:6px 14px 6px 0;color:#9B9590;vertical-align:top;white-space:nowrap;">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap;">${esc(x)}</td></tr>`)
    .join("")}</table></div>`;
  const text = rows.map(([k, x]) => `${k}: ${x}`).join("\n");

  try {
    await send(notifyAddress(), { subject, html, text }, email);
  } catch (e) {
    console.error("Enquiry email failed", e, text);
    return json({ error: "Send failed" }, 502);
  }
  // A short acknowledgement to the sender; failure here doesn't affect the enquiry.
  const first = name.split(/\s+/)[0];
  const ack = `Thank you, ${first}.\n\nYour ${isOrder ? "order brief" : "message"} has reached me and I'll reply personally within one business day.\n\nWarmly,\nCharlotte`;
  // Awaited so the serverless function doesn't exit before the email is sent.
  await send(email, { subject: "Thank you for getting in touch | Charlotte Smith", text: ack, html: `<div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#3B3A38;">${esc(ack).replace(/\n/g, "<br>")}</div>` }).catch((e) => console.error("Ack failed", e));
  return json({ ok: true });
};
