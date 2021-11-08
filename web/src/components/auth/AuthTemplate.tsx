import { Logo32Icon } from 'assets/icons';
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

const AuthTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
`;

const Logo = styled(Logo32Icon)`
  margin-right: 13.3px;
`;

const AuthTitleTxt = styled.span`
  font-size: 20px;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
`;

function AuthTemplate({ children, AuthType }: AuthTemplateProps): ReactElement {
  const title =
    AuthType === 'login'
      ? '다시 찾아와주셔서 감사해요!'
      : '편리한 북마크 생활을 시작해 보세요!';

  return (
    <AuthTemplateWrapper>
      <AuthTitle>
        <Logo />
        <AuthTitleTxt>{title}</AuthTitleTxt>
      </AuthTitle>
      {children}
    </AuthTemplateWrapper>
  );
}

export default AuthTemplate;
