import type { AuthFormConfig } from '../types/authForms';

export const LOGIN_FORM: AuthFormConfig = {
  title: 'Sign in to your account',
  subtitle: 'Enter your clinical credentials to continue',
  submit: 'Access Terminal',
  submitLoading: 'Authenticating…',
  googleButtonLabel: 'Sign in with Google',
  fields: [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'dr.smith@medicore.sys',
      rules: { required: true, pattern: 'email' },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      rules: { required: true, minLength: 8 },
      hint: { kind: 'forgot-password', label: 'Forgot password?' },
    },
  ],
  footer: {
    text: "Don't have an account?",
    linkLabel: 'Sign up',
    linkHref: '/signup',
  },
};

export const SIGNUP_FORM: AuthFormConfig = {
  title: 'Create your account',
  subtitle: 'Join MediCore Clinical Platform',
  submit: 'Create Account',
  submitLoading: 'Creating…',
  googleButtonLabel: 'Sign up with Google',
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Dr. Jane Smith',
      rules: { required: true },
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'dr.smith@medicore.sys',
      rules: { required: true, pattern: 'email' },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      rules: { required: true, minLength: 8 },
    },
    {
      name: 'confirm',
      label: 'Confirm Password',
      type: 'password',
      placeholder: '••••••••',
      rules: { required: true, match: 'password' },
    },
  ],
  footer: {
    text: 'Already have an account?',
    linkLabel: 'Sign in',
    linkHref: '/login',
  },
};
