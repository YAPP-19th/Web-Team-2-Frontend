import { LogoGreenIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
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
  align-items: end;
`;

const LogoSpan = styled.span`
  font-family: Cafe24Ssurround;
  color: ${(props) => props.theme.color.link0};
  font-size: 17px;
  margin-left: 3.5px;
`;

function Logo(): ReactElement {
  return (
    <HeaderLogo>
      <LogoWithText href={Path.Home}>
        <LogoGreenIcon />
        <LogoSpan>도토리함</LogoSpan>
      </LogoWithText>
    </HeaderLogo>
  );
}

export default Logo;
