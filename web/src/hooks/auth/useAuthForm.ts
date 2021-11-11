import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from 'recoil/atoms/authState';
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
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => boolean;
}

export default function useAuthForm(): AuthFormTypes {
  const [auth, setAuth] = useRecoilState(authState);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const {
    authError,
    emailError,
    onChangeAuthError,
    onEmptyValidateEmail,
    onCheckEmailExist,
    onCheckEmailValid,
    onEmptyValidatePassword,
    onCheckPasswordValid,
    passwordError,
    onEmptyValidate,
  } = useAuthentication();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeAuthState = (name: string, value: boolean) => {
    setAuth({
      ...auth,
      [name]: value,
    });
    return value;
  };

  // 이메일 유효성 체크
  const onEmailValidation = () => {
    return (
      onEmptyValidateEmail(email) &&
      onCheckEmailExist(email) &&
      onCheckEmailValid(email)
    );
  };

  // 비밀번호 유효성 체크
  const onPasswordValidation = () => {
    return onEmptyValidatePassword(password) && onCheckPasswordValid(password);
  };

  // 유효성 체크 (이메일이면 : 이메일 유효성 체크함수 비밀번호면: 비밀번호 유효성 체크함수)
  const onFormValidation = (name: string) => {
    return name === 'email' ? onEmailValidation() : onPasswordValidation();
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    return onChangeAuthState(name, onFormValidation(name));
  };

  const onLogin = () => {
    if (!onEmptyValidate(email, password)) return false;
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
    onBlur,
  };
}
