import CheckBox from 'components/common/CheckBox';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface SelectBoxProps {
  IsActiveSelectBox: boolean;
  onToggleAllChecked: () => void;
  isAllChecked: boolean;
  onToggleDeleteModal: () => void;
  onToggleMoveModal: () => void;
  onActiveSelectFolder: () => void;
  onToggleRestoreModal: () => void;
  onToggleTruncateModal: () => void;
  IsRestore?: boolean;
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

function SelectBox({
  IsActiveSelectBox,
  onToggleAllChecked,
  isAllChecked,
  onToggleDeleteModal,
  onToggleMoveModal,
  onActiveSelectFolder,
  onToggleRestoreModal,
  onToggleTruncateModal,
  IsRestore,
}: SelectBoxProps): ReactElement {
  return (
    <SelectBoxWrapper>
      <SelectForm>
        <SelectText>선택</SelectText>
        <SelectButton
          onClick={onToggleAllChecked}
          variant="secondary"
          isChecked={isAllChecked}
        />
      </SelectForm>
      {IsActiveSelectBox && (
        <SelectOption>
          {IsRestore ? (
            <Option onClick={onToggleRestoreModal}>복원</Option>
          ) : (
            <Option
              onClick={() => {
                onActiveSelectFolder();
                onToggleMoveModal();
              }}
            >
              이동
            </Option>
          )}

          <Option
            onClick={IsRestore ? onToggleTruncateModal : onToggleDeleteModal}
          >
            삭제
          </Option>
        </SelectOption>
      )}
    </SelectBoxWrapper>
  );
}

export default SelectBox;
