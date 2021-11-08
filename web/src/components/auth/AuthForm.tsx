import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AuthDivider from './AuthDivider';
import GoogleLoginButton from './GoogleLoginButton';

interface AuthFormProps {
  AuthType: 'login' | 'register';
}

const AuthFormWrapper = styled.div``;

function AuthForm({ AuthType }: AuthFormProps): ReactElement {
  return (
    <AuthFormWrapper>
      <GoogleLoginButton />
      <AuthDivider />
    </AuthFormWrapper>
  );
}

export default AuthForm;
