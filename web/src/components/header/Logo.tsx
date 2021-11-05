import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HeaderLogo = styled.div`
  background-color: yellow;
  width: 170px;
  height: 100%;
  margin-right: 28px;
`;

function Logo(): ReactElement {
  return <HeaderLogo />;
}

export default Logo;
