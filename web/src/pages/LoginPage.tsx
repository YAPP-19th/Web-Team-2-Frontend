import AuthTemplate from 'components/auth/AuthTemplate';
import React, { ReactElement } from 'react';

function LoginPage(): ReactElement {
  return (
    <AuthTemplate AuthType="login">
      <h1>Login</h1>
    </AuthTemplate>
  );
}

export default LoginPage;
