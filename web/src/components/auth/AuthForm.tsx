import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
import useAuthForm from 'hooks/auth/useAuthForm';
<<<<<<< HEAD
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atoms/authState';
=======
import { auth } from 'models/auth';
import React, { ReactElement } from 'react';
>>>>>>> 685050604823a060180d55be53dc55285d3b0a91
import styled from 'styled-components';
import Agreement from './Agreement';
import ErrorText from './ErrorText';

const AuthFormWrapper = styled.form``;

const AuthFormRow = styled.div`
  margin-bottom: 20px;
`;

const AuthInput = styled(SimpleInput)`
  padding: 15px 0 18px 24px;
  font-size: 16px;
  color: ${(props) => props.theme.color.grayDarkest};
  &::placeholder {
    color: ${(props) => props.theme.color.grayDark};
  }
`;

const AuthButton = styled(SimpleButton)`
  font-size: 16px;
`;

<<<<<<< HEAD
function AuthForm({ AuthType }: AuthFormProps): ReactElement {
  const [disabled, setDisabled] = useState(true);
  const auth = useRecoilValue(authState);

=======
function AuthForm({ AuthType }: auth.IAuthType): ReactElement {
>>>>>>> 685050604823a060180d55be53dc55285d3b0a91
  const {
    form,
    onChange,
    onLogin,
    onRegister,
    authError,
    emailError,
    passwordError,
    onBlur,
  } = useAuthForm();
  const { email, password } = form;

  useEffect(() => {
    const isDisabled = auth.email && auth.isAgree && auth.password;
    setDisabled(!isDisabled);
  }, [auth]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return AuthType === 'login' ? onLogin() : onRegister();
  };

  return (
    <AuthFormWrapper onSubmit={onSubmit}>
      <AuthFormRow>
        <AuthInput
          width="100%"
          height="56px"
          borderRadius="8px"
          placeholder="이메일"
          type="email"
          name="email"
          onChange={onChange}
          value={email}
          onBlur={AuthType === 'register' ? onBlur : undefined}
        />
        {emailError && <ErrorText text={emailError} />}
      </AuthFormRow>
      <AuthFormRow>
        <AuthInput
          width="100%"
          height="56px"
          borderRadius="8px"
          placeholder="비밀번호"
          type="password"
          name="password"
          onChange={onChange}
          value={password}
          onBlur={AuthType === 'register' ? onBlur : undefined}
        />
        {passwordError && <ErrorText text={passwordError} />}
        {authError && <ErrorText text={authError} />}
      </AuthFormRow>

      {AuthType === 'register' && <Agreement />}

      <AuthFormRow>
        <AuthButton
          label={AuthType === 'login' ? '로그인' : '회원가입'}
          variant="primary"
          width="100%"
          height="56px"
          borderRadius="8px"
          disabled={AuthType === 'register' ? disabled : false}
        />
      </AuthFormRow>
    </AuthFormWrapper>
  );
}

export default AuthForm;
