const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function validateEmailOnly(email: string): string | null {
  if (!email.trim()) return 'Email is required.';
  if (!EMAIL_RE.test(normalizeEmail(email))) return 'Enter a valid email address.';
  return null;
}

export function validateLoginFields(email: string, password: string): string | null {
  const emailErr = validateEmailOnly(email);
  if (emailErr) return emailErr;
  if (!password) return 'Password is required.';
  return null;
}

export function validateSignupFields(
  fullName: string,
  email: string,
  password: string
): string | null {
  if (!fullName.trim()) return 'Full name is required.';
  const emailErr = validateEmailOnly(email);
  if (emailErr) return emailErr;
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  return null;
}
