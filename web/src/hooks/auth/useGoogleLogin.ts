import { useCallback } from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { GOOGLE_CLIENT_ID } from 'utils/config';

interface GoogleLoginTypes {
  onGoogleLogin: (
    response: GoogleLoginResponseOffline | GoogleLoginResponse,
  ) => Promise<void>;
  clientId: string;
}

export default function useGoogleLogin(): GoogleLoginTypes {
  const onGoogleLogin = useCallback(async (response) => {
    const { accessToken } = response;
    // eslint-disable-next-line no-console
    console.log('구글 로그인 성공 !', accessToken); // API 나오면 구현
  }, []);

  return {
    onGoogleLogin,
    clientId: GOOGLE_CLIENT_ID,
  };
}
