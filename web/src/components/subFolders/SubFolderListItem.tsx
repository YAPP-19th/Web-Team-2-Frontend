import { ItemId } from '@atlaskit/tree';
import { ellipsis } from 'assets/styles/utilStyles';
import CheckBox from 'components/common/CheckBox';
import FolderEmoji from 'components/common/FolderEmoji';
import { folder } from 'models/folder';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface SubFolderListItemProps {
  subFolder: folder.ICheckedChildFolderItem;
  onSingleToggle: (subFolderId: ItemId) => void;
  IsActiveSubFolder: boolean;
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
  padding-right: 8px;
  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const SelectButton = styled(CheckBox)<{ active: boolean }>`
  ${(props) => !props.active && `display:none;`}
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

const SubFolderName = styled(Link)`
  ${ellipsis}
  display: inline-block;
  max-width: 85px;
  &:hover {
    text-decoration: underline;
  }
`;

function SubFolderListItem({
  subFolder,
  onSingleToggle,
  IsActiveSubFolder,
}: SubFolderListItemProps): ReactElement {
  const { name, checked, folderId, emoji } = subFolder;
  return (
    <FolderItem isChecked={checked}>
      <SelectButton
        active={IsActiveSubFolder}
        onClick={() => onSingleToggle(folderId)}
        variant="secondary"
        isChecked={checked}
      />

      <FolderEmoji emoji={emoji} />

      <SubFolderName to={`/${folderId}`}>{name}</SubFolderName>
      {checked && <SelectedStyled />}
    </FolderItem>
  );
}

export default SubFolderListItem;
