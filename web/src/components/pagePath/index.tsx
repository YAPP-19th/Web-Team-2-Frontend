import { FolderIdParams } from 'components/subFolders';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { checkFolderPage } from 'utils/checkFolderPage';
import FolderPath from './FolderPath';
import GlobalPath from './GlobalPath';

const PagePathWrapper = styled.div`
  margin-bottom: 28px;
`;

function PagePath(): ReactElement | null {
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams;

  return (
    <PagePathWrapper>
      {checkFolderPage(folderId) ? (
        <FolderPath folderIdParams={folderId} />
      ) : (
        <GlobalPath />
      )}
    </PagePathWrapper>
  );
}

export default PagePath;
