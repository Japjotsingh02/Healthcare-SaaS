/** `ok: false` without `error` means the user cancelled (e.g. closed OAuth popup). */
export type AuthActionResult = { ok: true } | { ok: false; error?: string };
