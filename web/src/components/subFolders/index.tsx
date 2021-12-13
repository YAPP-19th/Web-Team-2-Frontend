import useChildFoldersEffect from 'hooks/folder/useChildFoldersQueries';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SubFolderList from './SubFolderList';
import SubFolderSelectBox from './SubFolderSelectBox';

export interface FolderIdParams {
  folderId: string;
}

const SubFoldersWrapper = styled.div`
  margin-bottom: 19px;
`;

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
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams;
  const { data } = useChildFoldersEffect(folderId);
  return (
    <SubFoldersWrapper>
      <SubFoldersNav>
        <SubFolderSelectBox />
      </SubFoldersNav>
      {data && <SubFolderList subFolders={data} />}
    </SubFoldersWrapper>
  );
}

export default SubFolders;
