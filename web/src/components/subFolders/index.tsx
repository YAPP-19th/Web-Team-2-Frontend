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

function SubFolders(): ReactElement | null {
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams; // Note(dohyun) react-router v6 부터는 useParams의 타입 지정이 불가능 해서 이런식으로 하라고 함 -> https://stackoverflow.com/questions/69992370/why-react-router-v6-useparams-returns-object-with-properties-possibly-undefined
  const { data } = useChildFoldersEffect(folderId);

  if (!data || data.length === 0) return null;

  return (
    <SubFoldersWrapper>
      <SubFoldersNav>
        <SubFolderSelectBox />
      </SubFoldersNav>
      <SubFolderList subFolders={data} />
    </SubFoldersWrapper>
  );
}

export default SubFolders;
