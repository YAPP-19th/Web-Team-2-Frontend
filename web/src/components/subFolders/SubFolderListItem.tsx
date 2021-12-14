import { ItemId } from '@atlaskit/tree';
import CheckBox from 'components/common/CheckBox';
import { folder } from 'models/folder';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface SubFolderListItemProps {
  subFolder: folder.ICheckedChildFolderItem;
  onToggleChecked: (subFolderId: ItemId) => void;
}

const FolderItem = styled.div<{ isChecked: boolean }>`
  width: 174px;
  height: 36px;
  position: relative;
  ${(props) =>
    !props.isChecked && ` border: 1px solid ${props.theme.color.grayLight};`}
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${(props) => props.theme.color.grayDarker};
  margin-right: 24px;
  margin-bottom: 12px;
  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const SelectButton = styled(CheckBox)`
  position: absolute;
  top: 5px;
  left: 4px;
  z-index: 50;
`;

const SelectedStyled = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px ${(props) => props.theme.color.primary};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.color.shadow1};
  border-radius: 6px;
`;

function SubFolderListItem({
  subFolder,
  onToggleChecked,
}: SubFolderListItemProps): ReactElement {
  const { name, checked, folderId } = subFolder;
  return (
    <FolderItem isChecked={checked}>
      <SelectButton
        onClick={() => onToggleChecked(folderId)}
        variant="secondary"
        isChecked={checked}
      />
      {name}
      {checked && <SelectedStyled />}
    </FolderItem>
  );
}

export default SubFolderListItem;
