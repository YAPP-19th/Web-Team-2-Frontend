import React, { ReactElement } from 'react';
import styled from 'styled-components';
import SubFolderList from './SubFolderList';
import SubFolderSelectBox from './SubFolderSelectBox';

const SubFoldersNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 16px;
  font-size: 12px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

function SubFolders(): ReactElement {
  return (
    <>
      <SubFoldersNav>
        <SubFolderSelectBox />
      </SubFoldersNav>
      <SubFolderList />
    </>
  );
}

export default SubFolders;
