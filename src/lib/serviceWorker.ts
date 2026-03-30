const BASE = import.meta.env.BASE_URL || '/';

export function serviceWorkerScriptUrl(): string {
  return BASE.endsWith('/') ? `${BASE}sw.js` : `${BASE}/sw.js`;
}

export function serviceWorkerScope(): string {
  return BASE;
}
