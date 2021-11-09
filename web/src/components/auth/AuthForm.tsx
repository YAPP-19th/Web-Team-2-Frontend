import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
import useAuthForm from 'hooks/auth/useAuthForm';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import ErrorText from './ErrorText';

interface AuthFormProps {
  AuthType: 'login' | 'register';
}

const AuthFormWrapper = styled.form``;

const AuthFormRow = styled.div`
  position: relative;
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

function AuthForm({ AuthType }: AuthFormProps): ReactElement {
  const {
    form,
    onChange,
    onLogin,
    onRegister,
    authError,
    emailError,
    passwordError,
  } = useAuthForm();
  const { email, password } = form;

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
        />
        {passwordError && <ErrorText text={passwordError} />}
        {authError && <ErrorText text={authError} />}
      </AuthFormRow>
      <AuthFormRow>
        <AuthButton
          label={AuthType === 'login' ? '로그인' : '회원가입'}
          variant="primary"
          width="100%"
          height="56px"
          borderRadius="8px"
        />
      </AuthFormRow>
    </AuthFormWrapper>
  );
}

export default AuthForm;
