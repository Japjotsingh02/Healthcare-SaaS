import { SIGNUP_FORM } from "../constants/authForms";
import { useAuthForm } from "../hooks/useAuthForm";
import { useRedirectWhenAuthed } from "../hooks/useRedirectWhenAuthed";
import AuthCard from "../components/auth/AuthCard";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  useRedirectWhenAuthed();

  const { signup, loginWithGoogle } = useAuthStore();
  const navigate = useNavigate();

  const auth = useAuthForm({
    mode: "signup",
    config: SIGNUP_FORM,
    formIdPrefix: "signup",
    onSubmit: handleSubmit,
    onGoogle: handleGoogle,
  });

  async function handleSubmit(values: Record<string, string>) {
    const result = await signup(values.email, values.password, values.fullName);
    if (result.ok) navigate("/dashboard", { replace: true });
  }

  async function handleGoogle() {
    const result = await loginWithGoogle();
    if (result.ok) navigate("/dashboard", { replace: true });
  }

  return <AuthCard {...auth} />;
}
