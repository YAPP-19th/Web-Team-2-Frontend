import AuthForm from 'components/auth/AuthForm';
import AuthTemplate from 'components/auth/AuthTemplate';
import React, { ReactElement } from 'react';

function LoginPage(): ReactElement {
  return (
    <AuthTemplate AuthType="login">
      <AuthForm AuthType="login" />
    </AuthTemplate>
  );
}

export default LoginPage;
