import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HeaderFolder = styled.div`
  background-color: pink;
  width: 290px;
  margin-right: 7px;
  height: 100%;
`;

function Folder(): ReactElement {
  return <HeaderFolder />;
}

export default Folder;
