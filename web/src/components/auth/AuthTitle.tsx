import { Logo32Icon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface AuthTitleProps {
  AuthType: 'login' | 'register';
}

const AuthTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
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

function AuthTitle({ AuthType }: AuthTitleProps): ReactElement {
  const title =
    AuthType === 'login'
      ? '다시 찾아와주셔서 감사해요!'
      : '편리한 북마크 생활을 시작해 보세요!';
  return (
    <AuthTitleWrapper>
      <Logo />
      <AuthTitleTxt>{title}</AuthTitleTxt>
    </AuthTitleWrapper>
  );
}

export default AuthTitle;
