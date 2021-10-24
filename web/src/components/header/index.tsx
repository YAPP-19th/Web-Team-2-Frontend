import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HeaderLayout = styled.header`
  width: 100%;
  height: 48px;
  background-color: ${(props) => props.theme.color.test1};
  color: ${(props) => props.theme.color.black0};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Header(): ReactElement {
  return <HeaderLayout />;
}

export default Header;
