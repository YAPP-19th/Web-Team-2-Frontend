import CheckBox from 'components/common/CheckBox';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface SubFolderListItemProps {
  name: string;
}

const FolderItem = styled.div`
  width: 174px;
  height: 36px;
  position: relative;
  border: 1px solid ${(props) => props.theme.color.grayLight};
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

function SubFolderListItem({ name }: SubFolderListItemProps): ReactElement {
  return (
    <FolderItem>
      <SelectButton
        // eslint-disable-next-line no-console
        onClick={() => console.log('기능 구현할 때 추가 예정')}
        variant="secondary"
        isChecked
      />
      {name}
    </FolderItem>
  );
}

export default SubFolderListItem;
