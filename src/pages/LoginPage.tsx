import { LOGIN_FORM } from "../constants/authForms";
import { useAuthForm } from "../hooks/useAuthForm";
import type { AuthAlert } from "../types";
import { useRedirectWhenAuthed } from "../hooks/useRedirectWhenAuthed";
import AuthCard from "../components/auth/AuthCard";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  useRedirectWhenAuthed();

  const { login, loginWithGoogle, sendPasswordReset } = useAuthStore();
  const { sendLocalNotification } = useNotificationStore();
  const navigate = useNavigate();

  const auth = useAuthForm({
    mode: "login",
    config: LOGIN_FORM,
    formIdPrefix: "login",
    onSubmit: handleSubmit,
    onGoogle: handleGoogle,
    onForgotPassword: handleForgotPassword,
  });

  async function handleSubmit(values: Record<string, string>) {
    const result = await login(values.email, values.password);
    if (result.ok) {
      sendLocalNotification(
        'Signed in successfully',
        'Welcome back to MediCore Clinical OS.',
        'login-success',
        'success'
      );
      navigate("/dashboard", { replace: true });
    }
  }

  async function handleGoogle() {
    const result = await loginWithGoogle();
    if (result.ok) {
      sendLocalNotification(
        'Signed in with Google',
        'Welcome back to MediCore Clinical OS.',
        'login-google-success',
        'success'
      );
      navigate("/dashboard", { replace: true });
    }
  }

  async function handleForgotPassword(values: Record<string, string>):Promise<AuthAlert> {
    const result = await sendPasswordReset(values.email);
    if (result.ok) {
      return {
        kind: "success",
        text: "Check your inbox for reset instructions.",
      };
    } else {
      return {
        kind: "error",
        text: result.error ?? "Request failed.",
      };
    }
  }

  return <AuthCard {...auth} />;
}
