import { auth } from 'models/auth';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AuthDivider from './AuthDivider';
import AuthLinked from './AuthLinked';
import AuthTitle from './AuthTitle';
import GoogleLoginButton from './GoogleLoginButton';

interface AuthTemplateProps extends auth.IAuthType {
  children: React.ReactNode;
}

const AuthInner = styled.div`
  width: 321px;
  margin: 0 auto;
`;

function AuthTemplate({ children, AuthType }: AuthTemplateProps): ReactElement {
  return (
    <>
      <AuthTitle AuthType={AuthType} />

      <AuthInner>
        <GoogleLoginButton />
        <AuthDivider />
        {children}
        <AuthLinked AuthType={AuthType} />
      </AuthInner>
    </>
  );
}

export default AuthTemplate;
