import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/atoms/userState';
import Path from 'routes/path';

export default function useLoggedInUserReplace(): void {
  const user = useRecoilValue(userState);
  const { pathname } = useLocation();
  const { LoginPage, RegisterPage, SendPasswordPage, ResetPasswordPage } = Path;
  const navigate = useNavigate();
  useEffect(() => {
    if (user.name) {
      if (
        pathname === LoginPage ||
        pathname === RegisterPage ||
        pathname === SendPasswordPage ||
        pathname === ResetPasswordPage
      ) {
        navigate(-1);
      }
    }
  }, []);
}
