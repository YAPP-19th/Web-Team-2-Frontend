import { LogoGreenIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/atoms/userState';
import Path from 'routes/path';
import styled from 'styled-components';

const HeaderLogo = styled.div`
  width: 170px;
  height: 100%;
  margin-right: 28px;
  display: flex;
  align-items: center;
`;

const LogoWithText = styled.a`
  display: flex;
  height: 100%;
  align-items: center;
`;

const LogoSpan = styled.span`
  font-family: Cafe24Ssurround;
  color: ${(props) => props.theme.color.link0};
  font-size: 16px;
  line-height: 51px;
  height: 100%;
  margin-left: 3.5px;
  transform: skew(-0.1deg);
`;

function Logo(): ReactElement {
  const user = useRecoilValue(userState);

  return (
    <HeaderLogo>
      <LogoWithText href={user.name ? Path.Home : 'https://dotoriham.kr/'}>
        <LogoGreenIcon />
        <LogoSpan>도토리함</LogoSpan>
      </LogoWithText>
    </HeaderLogo>
  );
}

export default Logo;
