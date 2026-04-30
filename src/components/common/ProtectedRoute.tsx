import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Loader from './Loader';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, initialized } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, initialized, navigate]);

  if (!initialized) {
    return <Loader />;
  }

  if (!user) return null;

  return <>{children}</>;
}
