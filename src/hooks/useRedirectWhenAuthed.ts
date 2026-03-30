import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function useRedirectWhenAuthed(to = '/dashboard') {
  const navigate = useNavigate();
  const { user, initialized } = useAuthStore();

  useEffect(() => {
    if (initialized && user) {
      navigate(to, { replace: true });
    }
  }, [initialized, user, navigate, to]);
}
