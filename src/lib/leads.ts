// Checklist leads + follow-up emails, stored in Upstash Redis (Vercel Marketplace) via its REST API.
import { shell, signatureText } from "./mail";
import { site } from "../data/site";

const env = (k: string) => (process.env[k] ?? import.meta.env[k] ?? "") as string;
const url = () => env("KV_REST_API_URL") || env("UPSTASH_REDIS_REST_URL");
const token = () => env("KV_REST_API_TOKEN") || env("UPSTASH_REDIS_REST_TOKEN");
export const leadsReady = () => Boolean(url() && token());

export async function redis<T = unknown>(...cmd: (string | number)[]): Promise<T> {
  const res = await fetch(url(), { method: "POST", headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" }, body: JSON.stringify(cmd) });
  const j = (await res.json()) as { result?: T; error?: string };
  if (!res.ok || j.error) throw new Error(j.error || `Redis HTTP ${res.status}`);
  return j.result as T;
}

export interface Lead { id: string; name: string; email: string; business?: string; created: number; sent: number; unsubscribed?: boolean }

export async function saveLead(l: Omit<Lead, "id" | "created" | "sent">) {
  const lead: Lead = { ...l, id: crypto.randomUUID(), created: Date.now(), sent: 0 };
  await redis("SET", `lead:${lead.id}`, JSON.stringify(lead));
  await redis("SADD", "leads:active", lead.id);
  return lead;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const BASE = "https://www.bycharlottesmith.com";
const btn = (href: string, label: string) => `<p style="margin:0 0 22px;"><a href="${href}" style="display:inline-block;background:#1D1B1A;color:#E8D3A2;text-decoration:none;padding:13px 24px;border-radius:2px;font-size:12px;letter-spacing:2px;text-transform:uppercase;">${label}</a></p>`;
const h1 = (t: string) => `<h1 style="font-family:Georgia,'Playfair Display',serif;font-weight:400;font-size:28px;margin:0 0 16px;color:#3B3A38;">${t}</h1>`;
const p = (t: string) => `<p style="margin:0 0 16px;">${t}</p>`;

// Day after sign-up on which each email goes out.
export const STEPS = [2, 5, 8];

export function followUp(step: number, lead: Lead) {
  const first = esc(lead.name.split(/\s+/)[0] || "there");
  const unsub = `${BASE}/api/unsubscribe/?id=${lead.id}`;
  const checklist = `${BASE}/free-audit/checklist/`;
  const call = site.booking.discovery;
  const foot = `<p style="margin:24px 0 0;font-size:12px;color:#9B9590;">You're getting this because you asked for follow-up tips with the Social Media Audit Checklist. <a href="${unsub}" style="color:#9B9590;">Unsubscribe</a></p>`;
  const footText = `\n\nYou're getting this because you asked for follow-up tips with the Social Media Audit Checklist. Unsubscribe: ${unsub}`;
  const emails = [
    {
      subject: "How did you score?",
      html: h1(`How did you score, ${first}?`) +
        p("A couple of days ago you grabbed my 15-point Social Media Audit Checklist. If you haven't had a chance to go through it yet, it takes about 20 minutes with your Instagram and Facebook open side by side.") +
        btn(checklist, "Open your checklist") +
        p("If you've already done it, here's where I'd start: <strong>section 1 (first impressions)</strong> and <strong>section 4 (engagement)</strong>. They're the quickest fixes and they make the biggest difference to how many people actually get in touch.") +
        p("Hit reply and tell me your score. I read every reply.") +
        p("Warmly,<br>Charlotte"),
      text: `How did you score, ${first}?\n\nA couple of days ago you grabbed my Social Media Audit Checklist. If you haven't been through it yet, it takes about 20 minutes: ${checklist}\n\nIf you have, start with section 1 (first impressions) and section 4 (engagement). They're the quickest fixes and make the biggest difference to enquiries.\n\nHit reply and tell me your score. I read every reply.\n\nWarmly,\nCharlotte`,
    },
    {
      subject: "The 10-minute fix that brings in more enquiries",
      html: h1("The 10-minute fix most businesses skip") +
        p(`${first}, the single change I see make the fastest difference is the bio. Most bios describe the business. The ones that bring in enquiries tell a visitor three things in one glance:`) +
        `<ol style="margin:0 0 16px;padding-left:20px;"><li style="margin-bottom:6px;"><strong>Who you help</strong> (be specific: "busy mums in Malta", not "everyone")</li><li style="margin-bottom:6px;"><strong>The result you give them</strong> (what changes for them)</li><li><strong>What to do next</strong> ("Book below", "DM 'HELLO'", "Tap the link")</li></ol>` +
        p("Then make sure your link goes straight to booking or enquiring, and switch on your action button. That's it: about 10 minutes, and it works for you every time someone lands on your profile.") +
        p("Want me to look at yours? Just reply with your Instagram handle.") +
        p("Warmly,<br>Charlotte"),
      text: `The 10-minute fix most businesses skip\n\n${first}, the change that makes the fastest difference is your bio. The ones that bring in enquiries say three things at a glance:\n1. Who you help (be specific)\n2. The result you give them\n3. What to do next ("Book below", "DM 'HELLO'")\n\nThen make sure your link goes straight to booking or enquiring, and switch on your action button.\n\nWant me to look at yours? Reply with your Instagram handle.\n\nWarmly,\nCharlotte`,
    },
    {
      subject: "Want a second pair of eyes?",
      html: h1(`Want a second pair of eyes, ${first}?`) +
        p("Doing your own audit is a great start, but it's hard to be objective about your own business. If your checklist turned up a few gaps, I'd be happy to look at your profiles with you.") +
        p("Book a free, no-obligation 20-minute discovery call. We'll talk through your score, your goals and the few changes that would make the biggest difference. You'll leave with clear next steps, whether or not we work together.") +
        btn(call, "Book a free discovery call") +
        p("Or simply reply to this email if you'd rather chat that way.") +
        p("Warmly,<br>Charlotte"),
      text: `Want a second pair of eyes, ${first}?\n\nIf your checklist turned up a few gaps, I'd be happy to look at your profiles with you. Book a free, no-obligation 20-minute discovery call and you'll leave with clear next steps: ${call}\n\nOr just reply to this email.\n\nWarmly,\nCharlotte`,
    },
  ];
  const e = emails[step];
  return { subject: `${e.subject} | Charlotte Smith`, html: shell(e.html + foot), text: e.text + footText + "\n" + signatureText };
}
