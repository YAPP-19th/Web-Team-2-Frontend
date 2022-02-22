import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Path from 'routes/path';
import { isLogin } from 'utils/auth';

export default function useLoggedInUserReplace(): void {
  const { pathname } = useLocation();
  const { LoginPage, RegisterPage, SendPasswordPage, ResetPasswordPage } = Path;
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin()) {
      if (
        pathname === LoginPage ||
        pathname === RegisterPage ||
        pathname === SendPasswordPage ||
        pathname === ResetPasswordPage
      ) {
        navigate('/');
      }
    }
  }, []);
}
