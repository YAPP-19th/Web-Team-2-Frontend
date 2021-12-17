import useChildFoldersLoad from 'hooks/folder/useChildFoldersLoad';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { subFolderState } from 'recoil/atoms/folderState';
import { useSubFoldersToggle } from 'recoil/selectors/folderSelector';
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
  const [isAllChecked, setIsAllChecked] = useState(false);
  const subFolderList = useRecoilValue(subFolderState);
  const { onSingleToggle, onAllToggle } = useSubFoldersToggle();
  useChildFoldersLoad();

  useEffect(() => {
    if (subFolderList.length === 0) return;
    setIsAllChecked(subFolderList.every((subFolder) => subFolder.checked));
  }, [subFolderList]);

  const onToggleAllChecked = () => {
    onAllToggle(!isAllChecked);
  };

  const IsActiveSubFolder = useMemo(() => {
    return subFolderList.some((subFolder) => subFolder.checked);
  }, [subFolderList]);

  if (subFolderList.length === 0) return null;

  return (
    <SubFoldersWrapper>
      <SubFoldersNav>
        <SubFolderSelectBox
          onToggleAllChecked={onToggleAllChecked}
          isAllChecked={isAllChecked}
          IsActiveSubFolder={IsActiveSubFolder}
        />
      </SubFoldersNav>
      <SubFolderList
        subFolders={subFolderList}
        onSingleToggle={onSingleToggle}
        IsActiveSubFolder={IsActiveSubFolder}
      />
    </SubFoldersWrapper>
  );
}

export default SubFolders;
