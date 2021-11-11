import { useRef, useState } from 'react';

interface AuthenticationTypes {
  emailError: string | null;
  passwordError: string | null;
  authError: string | null;
  onChangeAuthError: (error: string) => void;
  onEmptyValidate: (email: string, password: string) => boolean;
  onEmailValidation: (email: string) => boolean;
  onPasswordValidation: (password: string) => boolean;
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
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
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

  // 이메일, 비밀번호 둘중 하나라도 비어있으면 false 반환
  const onEmptyValidate = (email: string, password: string) => {
    return onEmptyValidateEmail(email) && onEmptyValidatePassword(password);
  };

  // 이메일 유효성 체크
  const onEmailValidation = (email: string) => {
    return (
      onEmptyValidateEmail(email) &&
      onCheckEmailExist(email) &&
      onCheckEmailValid(email)
    );
  };

  // 비밀번호 유효성 체크
  const onPasswordValidation = (password: string) => {
    return onEmptyValidatePassword(password) && onCheckPasswordValid(password);
  };

  return {
    emailError,
    passwordError,
    authError,
    onChangeAuthError,
    onEmptyValidate,
    onEmailValidation,
    onPasswordValidation,
  };
}
