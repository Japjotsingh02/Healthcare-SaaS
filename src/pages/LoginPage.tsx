import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { validateEmailOnly, validateLoginFields } from '../lib/authValidation';
import { authInputClass } from '../lib/authUi';
import { useRedirectWhenAuthed } from '../hooks/useRedirectWhenAuthed';
import AuthShell from '../components/auth/AuthShell';
import AuthCard from '../components/auth/AuthCard';
import AuthBrandHeader from '../components/auth/AuthBrandHeader';
import AuthLegalFooter from '../components/auth/AuthLegalFooter';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import AuthTextField from '../components/auth/AuthTextField';
import AlertBanner from '../components/common/AlertBanner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [resetNotice, setResetNotice] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  const { login, loginWithGoogle, sendPasswordReset, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  useRedirectWhenAuthed();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetNotice(null);
    const validation = validateLoginFields(email, password);
    if (validation) {
      setFieldError(validation);
      clearError();
      return;
    }
    setFieldError(null);
    const result = await login(email, password);
    if (result.ok) navigate('/dashboard', { replace: true });
  };

  const handleGoogle = async () => {
    setResetNotice(null);
    setFieldError(null);
    clearError();
    const result = await loginWithGoogle();
    if (result.ok) navigate('/dashboard', { replace: true });
  };

  const handleForgotPassword = async () => {
    setResetNotice(null);
    setFieldError(null);
    clearError();
    const emailErr = validateEmailOnly(email);
    if (emailErr) {
      setFieldError(emailErr);
      return;
    }
    const result = await sendPasswordReset(email);
    if (result.ok) {
      setResetNotice({ kind: 'success', text: 'Check your inbox for reset instructions.' });
    } else {
      setResetNotice({ kind: 'error', text: result.error ?? 'Request failed.' });
    }
  };

  const showError = fieldError ?? error;

  return (
    <AuthShell>
      <AuthCard>
        <AuthBrandHeader />

        <h1 className="font-primary text-[1.5rem] font-bold text-white mb-2 tracking-[-0.02em]">Sign in to your account</h1>
        <p className="font-primary text-[0.9375rem] mb-8 text-[#8e8e93]">Enter your clinical credentials to continue</p>

        <form onSubmit={handleSubmit} className="animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]">
          {showError && <AlertBanner variant="danger">{showError}</AlertBanner>}
          {resetNotice && (
            <AlertBanner variant={resetNotice.kind === 'success' ? 'success' : 'danger'}>{resetNotice.text}</AlertBanner>
          )}

          <AuthTextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldError(null);
              clearError();
              setResetNotice(null);
            }}
            placeholder="dr.smith@medicore.sys"
            autoComplete="email"
            className="text-[0.875rem] font-tech font-medium tabular-nums"
            required
          />

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="login-password" className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#8e8e93]">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] bg-transparent border-none cursor-pointer text-accent p-0 disabled:opacity-45 disabled:cursor-not-allowed"
              >
                Forgot password
              </button>
            </div>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldError(null);
                clearError();
              }}
              placeholder="••••••••"
              autoComplete="current-password"
              className={`${authInputClass} font-primary text-[0.9375rem]`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-md border-none cursor-pointer text-white font-primary font-semibold transition-all duration-150 hover:bg-accent-hover active:scale-98 disabled:opacity-45 disabled:cursor-not-allowed w-full h-12 justify-center gap-2.5 bg-[#7075ff] text-[0.875rem]"
          >
            {loading ? 'Authenticating…' : 'Access Terminal'}
            {!loading && <ArrowRight size={18} />}
          </button>

          <GoogleSignInButton label="Sign in with Google" onClick={handleGoogle} disabled={loading} />

          <div className="mt-4 text-center font-primary text-[0.8125rem]">
            <span className="text-tx-muted">Don't have an account? </span>
            <Link to="/signup" className="text-accent hover:text-accent-hover no-underline">
              Sign up
            </Link>
          </div>
        </form>

        <AuthLegalFooter />
      </AuthCard>
    </AuthShell>
  );
}
