// Cart kept in this browser only. Storage can be unavailable (private mode), so every access is guarded.
import { packages } from "../data/packages";

const KEY = "cs-cart-v1";
// Calls are booked and paid on Calendly, so they're dropped from any cart saved before that change.
const calendly = new Set(packages.filter((p) => p.calendly).map((p) => p.id));
let memory: string[] = [];

export function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v.filter((x) => typeof x === "string" && !calendly.has(x)) : [];
  } catch {
    return memory.filter((x) => !calendly.has(x));
  }
}

function write(items: string[]) {
  memory = items;
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* memory only */ }
  window.dispatchEvent(new CustomEvent("cart:change"));
}

export const count = () => read().length;
export const has = (id: string) => read().includes(id);
export function add(id: string) { if (calendly.has(id)) return; const c = read(); if (!c.includes(id)) write([...c, id]); }
export function remove(id: string) { write(read().filter((x) => x !== id)); }
export function clear() { write([]); }
