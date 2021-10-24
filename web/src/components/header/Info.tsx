import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HeaderInfo = styled.div`
  background-color: skyblue;
  width: 255px;
  height: 100%;
`;

function Info(): ReactElement {
  return <HeaderInfo />;
}

export default Info;
