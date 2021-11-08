import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AuthDivider from './AuthDivider';
import GoogleLoginButton from './GoogleLoginButton';

interface AuthFormProps {
  AuthType: 'login' | 'register';
}

const AuthFormWrapper = styled.div``;

const Form = styled.form``;

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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    AuthType === 'login' ? console.log('login') : console.log('register');
  };

  return (
    <AuthFormWrapper>
      <GoogleLoginButton />
      <AuthDivider />

      <Form onSubmit={onSubmit}>
        <AuthInput
          width="100%"
          height="56px"
          borderRadius="8px"
          placeholder="이메일"
          type="email"
        />
        <AuthInput
          width="100%"
          height="56px"
          borderRadius="8px"
          placeholder="비밀번호"
          type="password"
        />

        <AuthButton
          label={AuthType === 'login' ? '로그인' : '회원가입'}
          variant="primary"
          width="100%"
          height="56px"
          borderRadius="8px"
        />
      </Form>
    </AuthFormWrapper>
  );
}

export default AuthForm;
