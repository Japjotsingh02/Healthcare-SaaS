import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import {
  MIN_PASSWORD_LENGTH,
  validateSignupFields,
} from "../lib/authValidation";
import { useRedirectWhenAuthed } from "../hooks/useRedirectWhenAuthed";
import AuthShell from "../components/auth/AuthShell";
import AuthCard from "../components/auth/AuthCard";
import AuthBrandHeader from "../components/auth/AuthBrandHeader";
import AuthLegalFooter from "../components/auth/AuthLegalFooter";
import GoogleSignInButton from "../components/auth/GoogleSignInButton";
import AuthTextField from "../components/auth/AuthTextField";
import AlertBanner from "../components/common/AlertBanner";
import { authInputClass, authLabelClass } from "../lib/authUi";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  const { signup, loginWithGoogle, loading, error, clearError } =
    useAuthStore();
  const navigate = useNavigate();
  useRedirectWhenAuthed();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSignupFields(fullName, email, password);
    if (validation) {
      setFieldError(validation);
      clearError();
      return;
    }
    setFieldError(null);
    const result = await signup(email, password, fullName);
    if (result.ok) navigate("/dashboard", { replace: true });
  };

  const handleGoogle = async () => {
    setFieldError(null);
    clearError();
    const result = await loginWithGoogle();
    if (result.ok) navigate("/dashboard", { replace: true });
  };

  const showError = fieldError ?? error;

  return (
    <AuthShell>
      <AuthCard>
        <AuthBrandHeader />

        <h1 className="font-primary text-[1.5rem] font-bold text-white mb-2 tracking-[-0.02em]">
          Create your account
        </h1>
        <p className="font-primary text-[0.9375rem] mb-8 text-[#8e8e93]">
          Start managing clinical operations with digital surgical precision.
        </p>

        <form
          onSubmit={handleSubmit}
          className="animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          {showError && <AlertBanner variant="danger">{showError}</AlertBanner>}

          <AuthTextField
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setFieldError(null);
              clearError();
            }}
            placeholder="Dr. Smith"
            autoComplete="name"
            className="text-[0.875rem] font-tech font-medium tabular-nums"
            required
          />

          <AuthTextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldError(null);
              clearError();
            }}
            placeholder="dr.smith@medicore.sys"
            autoComplete="email"
            className="text-[0.875rem] font-tech font-medium tabular-nums"
            required
          />

          <div className="mb-6">
            <label htmlFor="signup-password" className={authLabelClass}>
              Secure Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldError(null);
                clearError();
              }}
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
              className={`${authInputClass} font-primary text-[0.9375rem]`}
              required
            />
            <p className="mt-2 font-primary text-[0.75rem] text-tx-muted">
              At least {MIN_PASSWORD_LENGTH} characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-md border-none cursor-pointer text-white font-primary font-semibold transition-all duration-150 hover:bg-accent-hover active:scale-98 disabled:opacity-45 disabled:cursor-not-allowed w-full h-12 justify-center gap-2.5 bg-[#7075ff] text-[0.875rem]"
          >
            {loading ? "Creating…" : "Create Account"}
            {!loading && <ArrowRight size={18} />}
          </button>

          <GoogleSignInButton
            label="Sign up with Google"
            onClick={handleGoogle}
            disabled={loading}
          />

          <div className="mt-4 text-center font-primary text-[0.8125rem]">
            <span className="text-tx-muted">Already have an account? </span>
            <Link
              to="/login"
              className="text-accent hover:text-accent-hover no-underline"
            >
              Sign in
            </Link>
          </div>
        </form>

        <AuthLegalFooter />
      </AuthCard>
    </AuthShell>
  );
}
