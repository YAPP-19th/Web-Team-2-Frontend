import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AuthDivider from './AuthDivider';
import AuthLinked from './AuthLinked';
import AuthTitle from './AuthTitle';
import GoogleLoginButton from './GoogleLoginButton';

interface AuthTemplateProps {
  children: React.ReactNode;
  AuthType: 'login' | 'register';
}

const AuthTemplateWrapper = styled.div``;

const AuthInner = styled.div`
  width: 321px;
  margin: 0 auto;
`;

function AuthTemplate({ children, AuthType }: AuthTemplateProps): ReactElement {
  return (
    <AuthTemplateWrapper>
      <AuthTitle AuthType={AuthType} />

      <AuthInner>
        <GoogleLoginButton />
        <AuthDivider />
        {children}
        <AuthLinked AuthType={AuthType} />
      </AuthInner>
    </AuthTemplateWrapper>
  );
}

export default AuthTemplate;
