import { CheckBoxSelectedIcon } from 'assets/icons';
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
  font-size: 12px;
  height: 17px;
  margin-right: 4px;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
`;

const SelectedIcon = styled(CheckBoxSelectedIcon)``;

function SelectBox(): ReactElement {
  return (
    <SelectBoxWrapper>
      <SelectForm>
        <SelectText>선택</SelectText>
        <SelectButton>
          <SelectedIcon />
        </SelectButton>
      </SelectForm>
    </SelectBoxWrapper>
  );
}

export default SelectBox;
