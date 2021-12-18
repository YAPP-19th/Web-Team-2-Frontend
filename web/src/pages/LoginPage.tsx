import AuthForm from 'components/auth/AuthForm';
import AuthTemplate from 'components/auth/AuthTemplate';
import React, { ReactElement } from 'react';

function LoginPage(): ReactElement {
  const AuthType = 'login';

  return (
    <AuthTemplate AuthType={AuthType}>
      {/* <AuthForm AuthType={AuthType} /> */}
    </AuthTemplate>
  );
}

export default LoginPage;
