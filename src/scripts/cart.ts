// Cart kept in this browser only. Storage can be unavailable (private mode), so every access is guarded.
const KEY = "cs-cart-v1";
let memory: string[] = [];

export function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return memory;
  }
}

function write(items: string[]) {
  memory = items;
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* memory only */ }
  window.dispatchEvent(new CustomEvent("cart:change"));
}

export const count = () => read().length;
export const has = (id: string) => read().includes(id);
export function add(id: string) { const c = read(); if (!c.includes(id)) write([...c, id]); }
export function remove(id: string) { write(read().filter((x) => x !== id)); }
export function clear() { write([]); }
