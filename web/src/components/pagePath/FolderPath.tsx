import { ArrowSide16Icon } from 'assets/icons';
import FolderEmoji from 'components/common/FolderEmoji';
import usePagePathQueries from 'hooks/common/usePagePathQueries';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FolderPathEllipsis from './FolderPathEllipsis';
import PathText from './PathText';

const FolderPathList = styled.div`
  display: flex;
`;

const SubFolderName = styled(Link)`
  margin-right: 4px;
  font-size: 12px;
  height: 16px;
  line-height: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  max-width: 135px;
  &:hover {
    text-decoration: underline;
  }
`;

function FolderPath({
  folderIdParams,
}: {
  folderIdParams: string;
}): ReactElement | null {
  const { data } = usePagePathQueries(folderIdParams);

  if (!data) return null;

  return (
    <FolderPathList>
      {data.length <= 2 ? (
        <>
          {data.map((item, index) => {
            const { name, folderId, emoji } = item;
            return (
              <PathText pathType="folder" key={folderId}>
                <FolderEmoji emoji={emoji} />
                <SubFolderName to={`/${folderId}`}>{name}</SubFolderName>
                {data.length - 1 !== index && <ArrowSide16Icon />}
              </PathText>
            );
          })}
        </>
      ) : (
        <>
          <PathText pathType="folder">
            <FolderEmoji emoji={data[0].emoji} />
            <SubFolderName to={`/${data[0].folderId}`}>
              {data[0].name}
            </SubFolderName>
          </PathText>
          <ArrowSide16Icon />

          <FolderPathEllipsis folderPathList={data} />

          <ArrowSide16Icon />
          <PathText pathType="folder">
            <FolderEmoji emoji={data[data.length - 1].emoji} />
            <SubFolderName to={`/${data[data.length - 1].folderId}`}>
              {data[data.length - 1].name}
            </SubFolderName>
          </PathText>
        </>
      )}
    </FolderPathList>
  );
}

export default FolderPath;
