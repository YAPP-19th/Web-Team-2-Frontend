import { login } from 'api/authAPI';
import { getMessaging, getToken } from 'firebase/messaging';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { auth } from 'models/auth';
import { useCallback } from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { tutorialModalState } from 'recoil/atoms/tutorialState';
import { userState } from 'recoil/atoms/userState';
import Path from 'routes/path';
import { setLoginData } from 'utils/auth';
import { firebaseVapidKey, GOOGLE_CLIENT_ID } from 'utils/config';

interface GoogleLoginTypes {
  onGoogleLogin: (
    response: GoogleLoginResponseOffline | GoogleLoginResponse,
  ) => Promise<void>;
  clientId: string;
}

export default function useGoogleLogin(): GoogleLoginTypes {
  const navigate = useNavigate();
  const setTutorialModal = useSetRecoilState(tutorialModalState);
  const setUser = useSetRecoilState(userState);

  const onGoogleLogin = useCallback(async (response) => {
    const { profileObj } = response;

    const messaging = getMessaging();
    const firebaseToken = await getToken(messaging, {
      vapidKey: firebaseVapidKey,
    }).then((currentToken) => {
      if (currentToken) {
        return currentToken;
      }
      return '';
    });

    const request: auth.ILoginRequest = {
      email: profileObj.email,
      image: profileObj.imageUrl,
      name: profileObj.name,
      socialType: 'google',
      fcmToken: firebaseToken,
    };

    try {
      const { data } = await login(request);
      setLoginData(data);

      setUser({
        name: data.name,
        email: data.email,
        image: data.image,
        remindCycle: data.remindCycle,
        remindToggle: data.remindToggle,
      });

      navigate(Path.Home);
      if (!data.isRegistered) {
        setTutorialModal(true);
      }
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
