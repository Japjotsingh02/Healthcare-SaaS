import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AuthBrandHeader from "./AuthBrandHeader";
import AuthLegalFooter from "./AuthLegalFooter";
import GoogleSignInButton from "./GoogleSignInButton";
import AuthTextField from "./AuthTextField";
import AlertBanner from "../common/AlertBanner";
import { MIN_PASSWORD_LENGTH } from "../../constants/validation";
import { autocompleteFor } from "../../lib/authForms";
import type { AuthFieldConfig, AuthFieldName, AuthFormController } from "../../types";
import { useAuthStore } from "../../store/authStore";

export type AuthCardProps = AuthFormController;

export default function AuthCard(props: AuthCardProps) {
  const {
    config,
    mode,
    formIdPrefix,
    values,
    setField,
    displayAlert,
    handleSubmit,
    handleGoogle,
    handleForgotPassword,
  } = props;

  const loading = useAuthStore((state) => state.loading);

  const valueFor = (name: AuthFieldName) => values[name] ?? "";

  const patchField = (field: AuthFieldConfig, value: string) => {
    setField(field.name, value);
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
        <div className="bg-[#121214] border border-border-default rounded-[12px] py-8 px-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.55)] animate-[fade-in_0.22s_ease-out_both]">
          <AuthBrandHeader />

          <h1 className="font-primary text-[1.5rem] font-bold text-white mb-2 tracking-[-0.02em]">
            {config.title}
          </h1>
          <p className="font-primary text-[0.9375rem] mb-8 text-[#8e8e93]">
            {config.subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="animate-[slide-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]"
          >
            {displayAlert && (
              <AlertBanner
                variant={displayAlert.kind === "success" ? "success" : "danger"}
              >
                {displayAlert.text}
              </AlertBanner>
            )}

            {config.fields.map((field) => {
              const isForgotPassword =
                mode === "login" &&
                field.type === "password" &&
                field.hint?.kind === "forgot-password";

              const isSignupPassword =
                mode === "signup" && field.name === "password";

              return (
                <AuthTextField
                  key={field.name}
                  id={`${formIdPrefix}-${field.name}`}
                  label={field.label}
                  type={field.type}
                  value={valueFor(field.name)}
                  onChange={(e) => patchField(field, e.target.value)}
                  placeholder={field.placeholder}
                  autoComplete={autocompleteFor(field.name, mode)}
                  minLength={field.rules.minLength}
                  className="text-[0.875rem] font-tech font-medium tabular-nums"
                  required={field.rules.required}
                  wrapClassName="mb-6"
                  showToggle={field.type === "password"}
                  labelRight={
                    isForgotPassword &&
                    field.hint?.kind === "forgot-password" ? (
                      <button
                        type="button"
                        onClick={() => handleForgotPassword?.()}
                        disabled={loading}
                        className="font-tech text-[0.6875rem] font-medium uppercase tracking-[0.12em] bg-transparent border-none cursor-pointer text-accent p-0 disabled:opacity-45 disabled:cursor-not-allowed"
                      >
                        {field.hint.label}
                      </button>
                    ) : undefined
                  }
                  helperText={
                    isSignupPassword ? (
                      <p className="mt-2 font-primary text-[0.75rem] text-tx-muted">
                        At least {MIN_PASSWORD_LENGTH} characters.
                      </p>
                    ) : undefined
                  }
                />
              );
            })}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-md border-none cursor-pointer text-white font-primary font-semibold transition-all duration-150 hover:bg-accent-hover active:scale-98 disabled:opacity-45 disabled:cursor-not-allowed w-full h-12 justify-center gap-2.5 bg-[#7075ff] text-[0.875rem]"
            >
              {loading ? config.submitLoading : config.submit}
              {!loading && <ArrowRight size={18} />}
            </button>

            <GoogleSignInButton
              label={config.googleButtonLabel}
              onClick={() => void handleGoogle()}
              disabled={loading}
            />

            <div className="mt-4 text-center font-primary text-[0.8125rem]">
              <span className="text-tx-muted">{config.footer.text} </span>
              <Link
                to={config.footer.linkHref}
                className="text-accent hover:text-accent-hover no-underline"
              >
                {config.footer.linkLabel}
              </Link>
            </div>
          </form>

          <AuthLegalFooter />
        </div>
      </div>
    </div>
  );
}
