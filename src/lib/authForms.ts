import type { AuthFieldName } from '../types/authForms';

export function autocompleteFor(fieldName: AuthFieldName, mode: 'login' | 'signup'): string {
  switch (fieldName) {
    case 'email':
      return 'email';
    case 'password':
      return mode === 'login' ? 'current-password' : 'new-password';
    case 'fullName':
      return 'name';
    case 'confirm':
      return 'new-password';
    default:
      return 'off';
  }
}
