import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HeaderLogo = styled.div`
  background-color: yellow;
  width: 389px;
  height: 100%;
`;

function Logo(): ReactElement {
  return <HeaderLogo />;
}

export default Logo;
