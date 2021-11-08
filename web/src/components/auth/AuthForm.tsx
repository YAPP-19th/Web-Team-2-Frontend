import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
import useAuthForm from 'hooks/auth/useAuthForm';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface AuthFormProps {
  AuthType: 'login' | 'register';
}

const AuthFormWrapper = styled.form``;

const AuthInput = styled(SimpleInput)`
  padding: 15px 0 18px 24px;
  font-size: 16px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.color.grayDarkest};
  &::placeholder {
    color: ${(props) => props.theme.color.grayDark};
  }
`;

const AuthButton = styled(SimpleButton)`
  font-size: 16px;
`;

function AuthForm({ AuthType }: AuthFormProps): ReactElement {
  const { form, onChange, onLogin, onRegister } = useAuthForm();
  const { email, password } = form;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return AuthType === 'login' ? onLogin() : onRegister();
  };

  return (
    <AuthFormWrapper onSubmit={onSubmit}>
      <AuthInput
        width="100%"
        height="56px"
        borderRadius="8px"
        placeholder="이메일"
        required
        type="email"
        name="email"
        onChange={onChange}
        value={email}
      />
      <AuthInput
        width="100%"
        height="56px"
        borderRadius="8px"
        placeholder="비밀번호"
        required
        type="password"
        name="password"
        onChange={onChange}
        value={password}
      />

      <AuthButton
        label={AuthType === 'login' ? '로그인' : '회원가입'}
        variant="primary"
        width="100%"
        height="56px"
        borderRadius="8px"
      />
    </AuthFormWrapper>
  );
}

export default AuthForm;
