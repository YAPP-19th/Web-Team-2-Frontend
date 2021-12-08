import React, { ReactElement } from 'react';

import { DotoriLogo } from '..';
import {
  Button,
  ButtonArea,
  IconWrapper,
  LinedButton,
  Title,
  Wrapper,
} from './LoginSection.styled';

interface IProps {
  login: () => void;
  signUp: () => void;
}

export function LoginSection({ login, signUp }: IProps): ReactElement {
  return (
    <Wrapper>
      <IconWrapper>
        <DotoriLogo />
      </IconWrapper>
      <Title style={{ marginBottom: '32px' }}>
        로그인 후 사용하실 수 있어요!
      </Title>
      <ButtonArea>
        <Button onClick={login}>로그인</Button>
        <LinedButton onClick={signUp}>회원가입</LinedButton>
      </ButtonArea>
    </Wrapper>
  );
}
