import AuthForm from 'components/auth/AuthForm';
import AuthTemplate from 'components/auth/AuthTemplate';
import React, { ReactElement } from 'react';

function RegisterPage(): ReactElement {
  const AuthType = 'register';

  return (
    <AuthTemplate AuthType={AuthType}>
      <AuthForm AuthType={AuthType} />
    </AuthTemplate>
  );
}

export default RegisterPage;
