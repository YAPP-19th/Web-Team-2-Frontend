import { useState } from 'react';

interface AuthenticationTypes {
  emailError: string | null;
  passwordError: string | null;
  authError: string | null;
  onCheckEmailEmpty: (email: string) => void;
  onCheckPasswordEmpty: (password: string) => void;
  onCheckEmailExist: (email: string) => void;
  onCheckEmailValid: (email: string) => void;
  onCheckPasswordValid: (password: string) => void;
}

export default function useAuthentication(): AuthenticationTypes {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [validCount, setValidCount] = useState<number>(0);

  const onCheckEmailEmpty = (email: string) => {
    return setEmailError(email === '' ? '이메일을 입력해주세요' : null);
  };

  const onCheckPasswordEmpty = (password: string) => {
    return setPasswordError(password === '' ? '비밀번호를 입력해주세요' : null);
  };

  const onCheckEmailExist = (email: string) => {
    // @TODO(dohyun) 이미 가입한 이메일인지 아닌지 백앤드에 요청후 결과를 받아온다.
    // 만약 존재하는 이메일일 경우 setEmailError("이미 가입한 이메일 주소입니다") 같은 멘트 넣어주면 됌
    // eslint-disable-next-line no-console
    console.log(email);
  };

  const onCheckEmailValid = (email: string) => {
    setEmailError(
      email.includes('@') && email.includes('.')
        ? null
        : '이메일 주소가 올바르지 않습니다',
    );
  };

  const onCheckPasswordValid = (password: string) => {
    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const special = /[~!@#$%^&*()_+|<>?:{}]/;
    setValidCount(0);
    if (num.test(password)) setValidCount((prev) => prev + 1);
    if (eng.test(password)) setValidCount((prev) => prev + 1);
    if (special.test(password)) setValidCount((prev) => prev + 1);

    setPasswordError(
      password.length < 8 || password.length > 16 || validCount < 2
        ? '영문 대소문자, 숫자, 특수문자 중 2종류 이상을 조합하여 8~16자의 비밀번호를 생성해주세요.'
        : null,
    );
  };

  return {
    emailError,
    passwordError,
    authError,
    onCheckEmailEmpty,
    onCheckPasswordEmpty,
    onCheckEmailExist,
    onCheckEmailValid,
    onCheckPasswordValid,
  };
}
