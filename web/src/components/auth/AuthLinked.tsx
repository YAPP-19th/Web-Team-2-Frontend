import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface AuthLinkedProps {
  AuthType: 'login' | 'register';
}

const AuthLinkedWrapper = styled.div`
  margin-top: 24px;
  font-size: 14px;
  line-height: 1.5;
`;

const LinkedInfo = styled.span`
  margin-right: 16px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

const Linked = styled(Link)`
  color: ${(props) => props.theme.color.link0};
  text-decoration: underline;
`;

function AuthLinked({ AuthType }: AuthLinkedProps): ReactElement {
  const loginlinked = {
    info: '비밀번호를 잊으셨나요?',
    label: '비밀번호 재설정',
    link: '/', // @TODO(dohyun) 비밀번호 재설정 라우팅 설정후 추가
  };

  const registerlinked = {
    info: '이미 회원이신가요?',
    label: '로그인',
    link: '/login',
  };

  const linked = AuthType === 'login' ? loginlinked : registerlinked;
  const { info, label, link } = linked;
  return (
    <AuthLinkedWrapper>
      <LinkedInfo>{info}</LinkedInfo>
      <Linked to={link}>{label}</Linked>
    </AuthLinkedWrapper>
  );
}

export default AuthLinked;
