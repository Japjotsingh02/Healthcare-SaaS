import { MIN_PASSWORD_LENGTH } from '../constants/validation';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function validateEmailOnly(email: string): string | null {
  if (!email.trim()) return "Email is required.";
  if (!EMAIL_RE.test(normalizeEmail(email)))
    return "Enter a valid email address.";
  return null;
}

function validateLoginFields(
  email: string,
  password: string,
): string | null {
  const emailErr = validateEmailOnly(email);
  if (emailErr) return emailErr;
  if (!password) return "Password is required.";
  return null;
}

function validateSignupFields(
  fullName: string,
  email: string,
  password: string,
  confirmPassword?: string,
): string | null {
  if (!fullName.trim()) return "Full name is required.";
  const emailErr = validateEmailOnly(email);
  if (emailErr) return emailErr;
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (confirmPassword !== undefined && password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null;
}

export function validateFields(mode: 'login' | 'signup', values: Record<string, string>): string | null {
  if (mode === "login") {
    const {email, password} = values;
    return validateLoginFields(email, password);
  } else {
    const {fullName, email, password, confirm} = values;
    return validateSignupFields(fullName, email, password, confirm);
  }
}
