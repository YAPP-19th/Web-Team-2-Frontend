import { useRef, useState } from 'react';

interface AuthenticationTypes {
  emailError: string | null;
  passwordError: string | null;
  authError: string | null;
  onEmptyValidateEmail: (email: string) => boolean;
  onEmptyValidatePassword: (password: string) => boolean;
  onCheckEmailExist: (email: string) => boolean;
  onCheckEmailValid: (email: string) => boolean;
  onCheckPasswordValid: (password: string) => boolean;
  onChangeAuthError: (error: string) => void;
  onEmptyValidate: (email: string, password: string) => boolean;
}

export default function useAuthentication(): AuthenticationTypes {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const validCount = useRef(0);

  const onEmptyValidateEmail = (email: string) => {
    if (email === '') {
      setEmailError('이메일을 입력해주세요.');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const onEmptyValidatePassword = (password: string) => {
    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const onCheckEmailExist = (email: string) => {
    // @TODO(dohyun) 이미 가입한 이메일인지 아닌지 백앤드에 요청후 결과를 받아온다.
    // 만약 존재하는 이메일일 경우 setEmailError("이미 가입한 이메일 주소입니다") 같은 멘트 넣어주면 됌
    if (email) {
      return true;
    }
    return false;
  };

  const onCheckEmailValid = (email: string) => {
    if (email.includes('@') && email.includes('.')) {
      setEmailError(null);
      return true;
    }
    setEmailError('이메일 형식이 올바르지 않습니다');
    return false;
  };

  const onCheckPasswordValid = (password: string) => {
    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const special = /[~!@#$%^&*()_+|<>?:{}=-]/;
    validCount.current = 0;
    if (num.test(password)) validCount.current += 1;
    if (eng.test(password)) validCount.current += 1;
    if (special.test(password)) validCount.current += 1;

    if (password.length < 8 || password.length > 16 || validCount.current < 2) {
      setPasswordError(
        '영문 대소문자, 숫자, 특수문자 중 2종류 이상을 조합하여 8~16자의 비밀번호를 생성해주세요.',
      );
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const onChangeAuthError = (error: string) => {
    setAuthError(error);
  };

  const onEmptyValidate = (email: string, password: string) => {
    return onEmptyValidateEmail(email) && onEmptyValidatePassword(password);
  };

  return {
    emailError,
    passwordError,
    authError,
    onEmptyValidateEmail,
    onEmptyValidatePassword,
    onCheckEmailExist,
    onCheckEmailValid,
    onCheckPasswordValid,
    onChangeAuthError,
    onEmptyValidate,
  };
}
