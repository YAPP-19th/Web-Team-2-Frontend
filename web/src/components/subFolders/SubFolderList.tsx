import React, { ReactElement } from 'react';
import styled from 'styled-components';
import useChildFoldersEffect from 'hooks/folder/useChildFoldersQueries';
import { useParams } from 'react-router-dom';
import { checkFolderPage } from 'utils/checkFolderPage';
import MainFolderListItem from './SubFolderListItem';

interface FolderIdParams {
  folderId: string;
}
const FolderListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function SubFolderList(): ReactElement | null {
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams;

  if (!checkFolderPage(folderId)) return null;

  const { data } = useChildFoldersEffect(folderId);

  return (
    <FolderListWrapper>
      {data?.map((folder) => (
        <MainFolderListItem key={folder.folderId} name={folder.name} />
      ))}
    </FolderListWrapper>
  );
}

export default SubFolderList;
