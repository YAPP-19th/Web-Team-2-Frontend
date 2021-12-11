import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/atoms/userState';
import styled from 'styled-components';
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
  color: ${(props) => props.theme.color.black};
  display: flex;
  align-items: center;
`;

function Header(): ReactElement {
  const user = useRecoilValue(userState);

  return (
    <HeaderLayout>
      <HeaderInner>
        <Logo />
        {user.name && (
          <>
            <SearchBar />
            <Info />
          </>
        )}
      </HeaderInner>
    </HeaderLayout>
  );
}

export default Header;
