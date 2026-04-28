import type { AuthFieldName, AuthFormConfig } from './authForms';

/** `ok: false` without `error` means the user cancelled (e.g. closed OAuth popup). */
export type AuthActionResult = { ok: true } | { ok: false; error?: string };

export type AuthAlert = {
  kind: 'success' | 'error';
  text: string | null;
};

export interface UseAuthFormOptions {
  config: AuthFormConfig;
  mode: 'login' | 'signup';
  formIdPrefix: string;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  onGoogle: () => Promise<void>;
  onForgotPassword?: (values: Record<string, string>) => Promise<AuthAlert>;
}

export interface AuthFormController {
  config: AuthFormConfig;
  mode: 'login' | 'signup';
  formIdPrefix: string;
  values: Record<AuthFieldName, string>;
  setField: (name: AuthFieldName, value: string) => void;
  displayAlert: AuthAlert | null;
  handleSubmit: (e: React.FormEvent) => void;
  handleGoogle: () => Promise<void>;
  handleForgotPassword?: () => Promise<void>;
}
