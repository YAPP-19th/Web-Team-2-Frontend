import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface AuthTemplateProps {
  children: React.ReactNode;
  AuthType: 'login' | 'register';
}

const AuthTemplateWrapper = styled.div`
  width: 321px;
  margin: 0 auto;
  margin-top: 36px;
`;

function AuthTemplate({ children, AuthType }: AuthTemplateProps): ReactElement {
  const AuthTitle =
    AuthType === 'login'
      ? '다시 찾아와주셔서 감사해요!'
      : '편리한 북마크 생활을 시작해 보세요!';

  return <AuthTemplateWrapper>{children}</AuthTemplateWrapper>;
}

export default AuthTemplate;
