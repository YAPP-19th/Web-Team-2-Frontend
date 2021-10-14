import React, { ReactElement } from 'react';
import styled from 'styled-components';

const FolderMenuWrapper = styled.div`
  //position:fixed로 하고 현재 위치 구해서 그 top , left 위치로 이동시키도록 해야함
  position: absolute;
  top: 0;
  right: -85px;
  z-index: 100;
`;

const MenuInner = styled.div`
  background-color: red;
  width: 80px;
  height: 116px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

function FolderMenu(): ReactElement {
  return (
    <FolderMenuWrapper>
      <MenuInner>FolderMenu</MenuInner>
    </FolderMenuWrapper>
  );
}

export default FolderMenu;
