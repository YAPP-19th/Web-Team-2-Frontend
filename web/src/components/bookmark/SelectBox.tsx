import { CheckBoxIcon, CheckBoxSelectedIcon } from 'assets/icons';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedBookmarksState,
  bookmarksState,
} from 'recoil/atoms/bookmarkState';
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
  const bookmarks = useRecoilValue(bookmarksState);
  const setSelectedBookmarks = useSetRecoilState(selectedBookmarksState);

  const onCheck = () => {
    onCheckedToggle();
    setSelectedBookmarks(bookmarks);
  };

  return (
    <SelectBoxWrapper>
      <SelectForm>
        <SelectText>선택</SelectText>
        <SelectButton onClick={onCheck}>
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
