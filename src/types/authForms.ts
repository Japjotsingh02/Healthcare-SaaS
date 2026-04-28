export type AuthFieldName = 'email' | 'password' | 'fullName' | 'confirm';

export interface AuthFieldRules {
  required?: boolean;
  pattern?: 'email';
  minLength?: number;
  /** Confirm field must equal the named field */
  match?: 'password';
}

export type AuthPasswordHint = {
  kind: 'forgot-password';
  label: string;
};

export interface AuthFieldConfig {
  name: AuthFieldName;
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  rules: AuthFieldRules;
  hint?: AuthPasswordHint;
}

export interface AuthFormFooterConfig {
  text: string;
  linkLabel: string;
  linkHref: string;
}

export interface AuthFormConfig {
  title: string;
  subtitle: string;
  submit: string;
  submitLoading: string;
  googleButtonLabel: string;
  fields: AuthFieldConfig[];
  footer: AuthFormFooterConfig;
}
