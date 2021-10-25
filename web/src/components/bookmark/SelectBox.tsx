import { CheckBoxIcon, CheckBoxSelectedIcon } from 'assets/icons';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

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

const SelectButton = styled.button`
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

function SelectBox(): ReactElement {
  const [isChecked, onCheckedToggle] = useToggle();
  return (
    <SelectBoxWrapper>
      <SelectForm>
        <SelectText>선택</SelectText>
        <SelectButton onClick={onCheckedToggle}>
          {isChecked ? <CheckBoxSelectedIcon /> : <CheckBoxIcon />}
        </SelectButton>
      </SelectForm>
      {isChecked && (
        <SelectOption>
          <Option>삭제</Option>
          <Option>이동</Option>
        </SelectOption>
      )}
    </SelectBoxWrapper>
  );
}

export default SelectBox;
