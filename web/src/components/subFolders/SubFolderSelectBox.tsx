import CheckBox from 'components/common/CheckBox';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface SubFolderSelectBoxProps {
  onToggleAllChecked: () => void;
  isAllChecked: boolean;
  IsActiveSubFolder: boolean;
}

const SelectBoxWrapper = styled.div`
  display: flex;
`;

const SelectForm = styled.div`
  display: flex;
  align-items: center;
`;

const SelectText = styled.span`
  height: 17px;
  margin-right: 4px;
`;

const SelectButton = styled(CheckBox)`
  display: flex;
  align-items: center;
`;

const SelectOption = styled.div`
  display: flex;
  align-items: center;
`;

const Option = styled.div`
  height: 17px;
  margin-left: 16px;
  cursor: pointer;
`;

function MainFolderSelectBox({
  onToggleAllChecked,
  isAllChecked,
  IsActiveSubFolder,
}: SubFolderSelectBoxProps): ReactElement {
  return (
    <SelectBoxWrapper>
      <SelectForm>
        <SelectText>선택</SelectText>
        <SelectButton
          variant="secondary"
          isChecked={isAllChecked}
          onClick={onToggleAllChecked}
        />
      </SelectForm>

      {IsActiveSubFolder && (
        <SelectOption>
          <Option>삭제</Option>
        </SelectOption>
      )}
    </SelectBoxWrapper>
  );
}

export default MainFolderSelectBox;
