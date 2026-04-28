import { useCallback, useState } from "react";
import type { AuthFieldName, AuthFormConfig, AuthAlert, UseAuthFormOptions, AuthFormController } from "../types";
import { validateEmailOnly, validateFields } from "../lib/authValidation";
import { useAuthStore } from "../store/authStore";


function initialValues(
  fields: AuthFormConfig["fields"],
): Record<AuthFieldName, string> {
  const v = {} as Record<AuthFieldName, string>;
  for (const f of fields) v[f.name] = "";
  return v;
}

export function useAuthForm(options: UseAuthFormOptions): AuthFormController {
  const { config, mode, formIdPrefix, onSubmit, onGoogle, onForgotPassword } = options;
  const [values, setValues] = useState(() => initialValues(config.fields));
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [resetNotice, setResetNotice] = useState<AuthAlert | null>(null);

  const { error, clearError } = useAuthStore();

  const setField = useCallback(
    (name: AuthFieldName, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      setFieldError(null);
      clearError();
      if (mode === "login" && name === "email") setResetNotice(null);
    },
    [clearError, mode],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setResetNotice(null);

      const validation = validateFields(mode, values);
      if (validation) {
        setFieldError(validation);
        clearError();
        return;
      }
      setFieldError(null);
      onSubmit(values);
    },
    [clearError, mode, onSubmit, values],
  );

  const handleGoogle = useCallback(async () => {
    setResetNotice(null);
    setFieldError(null);
    clearError();
    onGoogle();
  }, [clearError, onGoogle]);

  const handleForgotPassword = useCallback(async () => {
    if (mode !== "login") return;
    setResetNotice(null);
    setFieldError(null);
    clearError();
    const emailErr = validateEmailOnly(values.email ?? "");
    if (emailErr) {
      setFieldError(emailErr);
      return;
    }
    const alert = await onForgotPassword?.(values);
    setResetNotice(alert ?? null);
  }, [clearError, mode, onForgotPassword, values]);

  const displayAlert: AuthAlert | null =
    fieldError || error
      ? { kind: "error", text: fieldError ?? error }
      : resetNotice;

  return {
    config,
    mode,
    formIdPrefix,
    values,
    setField,
    displayAlert,
    handleSubmit,
    handleGoogle,
    handleForgotPassword,
  };
}
