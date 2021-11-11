import { useState } from 'react';
import useAuthentication from './useAuthentication';

interface AuthFormTypes {
  form: {
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => boolean;
  onRegister: () => void;
  emailError: string | null;
  passwordError: string | null;
  authError: string | null;
}

export default function useAuthForm(): AuthFormTypes {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const {
    authError,
    emailError,
    onChangeAuthError,
    onCheckEmailEmpty,
    onCheckPasswordEmpty,
    passwordError,
  } = useAuthentication();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = () => {
    if (!onCheckEmailEmpty(email) || !onCheckPasswordEmpty(password))
      return false;
    // @TODO(dohyun): API 생기면 작성
    // 만약 실패했으면 onChangeAuthError("계정을 찾을 수 없습니다. 이메일 또는 비밀번호를 다시 확인해주세요") 호출
    // 아래는 테스트용
    onChangeAuthError(
      '계정을 찾을 수 없습니다. 이메일 또는 비밀번호를 다시 확인해주세요.',
    );
    // eslint-disable-next-line no-console
    console.log(form, 'login');
    return true;
  };

  const onRegister = () => {
    // eslint-disable-next-line no-console
    console.log(form, 'register');
    // @TODO(dohyun): API 생기면 작성
  };

  return {
    form,
    onChange,
    onLogin,
    onRegister,
    emailError,
    passwordError,
    authError,
  };
}
