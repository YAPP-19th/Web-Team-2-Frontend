import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { isFolderPage } from 'utils/checkFolderPage';
import FolderPath from './FolderPath';
import GlobalPath from './GlobalPath';

interface PagePathProps {
  folderId: string;
}

const PagePathWrapper = styled.div``;

function PagePath({ folderId }: PagePathProps): ReactElement | null {
  console.log('여기', folderId);
  return (
    <PagePathWrapper>
      {isFolderPage(folderId) ? (
        <FolderPath folderIdParams={folderId} />
      ) : (
        <GlobalPath />
      )}
    </PagePathWrapper>
  );
}

export default PagePath;
