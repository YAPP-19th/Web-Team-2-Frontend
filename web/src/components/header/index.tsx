import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Folder from './Folder';
import Info from './Info';
import Logo from './Logo';
import SearchBar from './SearchBar';

const HeaderLayout = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.grayLight};
`;

const HeaderInner = styled.div`
  width: ${(props) => props.theme.basicWidth};
  height: 48px;
  margin: 0 auto;
  color: ${(props) => props.theme.color.black0};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Header(): ReactElement {
  return (
    <HeaderLayout>
      <HeaderInner>
        <Logo />
        <Folder />
        <SearchBar />
        <Info />
      </HeaderInner>
    </HeaderLayout>
  );
}

export default Header;
