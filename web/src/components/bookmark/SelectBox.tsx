import { CheckBoxIcon, CheckBoxSelectedIcon } from 'assets/icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  const [isChecked, setIsChecked] = useState(false);
  const bookmarks = useRecoilValue(bookmarksState);
  const [selectedBookmarks, setSelectedBookmarks] = useRecoilState(
    selectedBookmarksState,
  );

  const onCheck = () => {
    setIsChecked(!isChecked);
    setSelectedBookmarks(
      selectedBookmarks.length === bookmarks.length ? [] : bookmarks,
    );
  };

  useEffect(() => {
    if (bookmarks.length > 0) {
      setIsChecked(selectedBookmarks.length === bookmarks.length);
    }
  }, [selectedBookmarks, bookmarks]);

  return (
    <SelectBoxWrapper>
      <SelectForm>
        <SelectText>선택</SelectText>
        <SelectButton onClick={onCheck}>
          {isChecked ? <CheckBoxSelectedIcon /> : <CheckBoxIcon />}
        </SelectButton>
      </SelectForm>
      {selectedBookmarks.length > 0 && (
        <SelectOption>
          <Option>삭제</Option>
          <Option>이동</Option>
        </SelectOption>
      )}
    </SelectBoxWrapper>
  );
}

export default SelectBox;
