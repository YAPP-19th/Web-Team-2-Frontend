import { auth } from 'models/auth';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthLinkedWrapper = styled.div`
  margin-top: 24px;
  font-size: 14px;
  line-height: 1.5;
`;

const LinkedItem = styled.div`
  &:first-child {
    margin-bottom: 12px;
  }
`;

const LinkedInfo = styled.span`
  margin-right: 16px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

const Linked = styled(Link)`
  color: ${(props) => props.theme.color.link0};
  text-decoration: underline;
`;

function AuthLinked({ AuthType }: auth.IAuthType): ReactElement {
  const loginlinked = [
    {
      info: '비밀번호를 잊으셨나요?',
      label: '비밀번호 재설정',
      link: '/', // @TODO(dohyun) 비밀번호 재설정 라우팅 설정후 추가
    },
    {
      info: '처음 방문하셨나요?',
      label: '회원가입',
      link: '/register',
    },
  ];

  const registerlinked = [
    {
      info: '이미 회원이신가요?',
      label: '로그인',
      link: '/login',
    },
  ];

  const linked = AuthType === 'login' ? loginlinked : registerlinked;
  return (
    <AuthLinkedWrapper>
      {linked.map((item) => {
        const { info, label, link } = item;
        return (
          <LinkedItem key={label}>
            <LinkedInfo>{info}</LinkedInfo>
            <Linked to={link}>{label}</Linked>
          </LinkedItem>
        );
      })}
    </AuthLinkedWrapper>
  );
}

export default AuthLinked;
