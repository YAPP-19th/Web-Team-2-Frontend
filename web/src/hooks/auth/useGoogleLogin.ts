import { login } from 'api/userAPI';
import { auth } from 'models/auth';
import { useCallback } from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import Path from 'routes/path';
import { GOOGLE_CLIENT_ID } from 'utils/config';

interface GoogleLoginTypes {
  onGoogleLogin: (
    response: GoogleLoginResponseOffline | GoogleLoginResponse,
  ) => Promise<void>;
  clientId: string;
}

export default function useGoogleLogin(): GoogleLoginTypes {
  const navigate = useNavigate();

  const onGoogleLogin = useCallback(async (response) => {
    const {
      profileObj: { email, imageUrl, name },
    } = response;

    const request: auth.ILoginRequest = {
      email,
      imageUrl,
      name,
      socialType: 'google',
    };

    try {
      const {
        data: { accessToken, refreshToken },
      } = await login(request);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      localStorage.setItem('userProfile', imageUrl);

      navigate(Path.Home, { replace: true });
    } catch (error) {
      // @TODO(jekoo): oauth login 실패 에러처리
      // eslint-disable-next-line no-alert
      alert(`${error} \n로그인에 실패 하였습니다.`);
      navigate(Path.LoginPage, { replace: true });
    }
  }, []);

  return {
    onGoogleLogin,
    clientId: GOOGLE_CLIENT_ID,
  };
}
