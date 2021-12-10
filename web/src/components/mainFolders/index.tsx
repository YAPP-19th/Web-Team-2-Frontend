import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MainFolderList from './MainFolderList';
import MainFolderSelectBox from './MainFolderSelectBox';

const MainFoldersNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 16px;
  font-size: 12px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

function MainFolders(): ReactElement {
  return (
    <>
      <MainFoldersNav>
        <MainFolderSelectBox />
      </MainFoldersNav>
      <MainFolderList />
    </>
  );
}

export default MainFolders;
