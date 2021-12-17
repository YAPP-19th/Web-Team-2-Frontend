import { ArrowSide16Icon } from 'assets/icons';
import usePagePathQueries from 'hooks/common/usePagePathQueries';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import FolderEmojiAndName from './FolderEmojiAndName';
import FolderPathEllipsis from './FolderPathEllipsis';

const FolderPathList = styled.div`
  display: flex;
`;

function FolderPath({
  folderIdParams,
}: {
  folderIdParams: string;
}): ReactElement | null {
  const { data } = usePagePathQueries(folderIdParams);

  if (!data) return null;

  const FIRST_FOLDER_INFO = data[0];
  const LAST_FOLDER_INFO = data[data.length - 1];
  const NUMBER_OF_FOLDERS = data.length - 1;

  return (
    <FolderPathList>
      {data.length <= 2 ? (
        <>
          {data.map((item, index) => (
            <React.Fragment key={item.folderId}>
              <FolderEmojiAndName folderInfo={item} />
              {NUMBER_OF_FOLDERS !== index && <ArrowSide16Icon />}
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          <FolderEmojiAndName folderInfo={FIRST_FOLDER_INFO} />
          <ArrowSide16Icon />

          <FolderPathEllipsis folderPathList={data} />

          <ArrowSide16Icon />
          <FolderEmojiAndName folderInfo={LAST_FOLDER_INFO} />
        </>
      )}
    </FolderPathList>
  );
}

export default FolderPath;
