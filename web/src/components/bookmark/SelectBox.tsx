import CheckBox from 'components/common/CheckBox';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedBookmarksState } from 'recoil/atoms/bookmarkState';
import styled from 'styled-components';

interface SelectBoxProps {
  bookmarkList: bookmarks.IBookmark[];
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

function SelectBox({ bookmarkList }: SelectBoxProps): ReactElement {
  const [isChecked, setIsChecked] = useState(false);
  // const bookmarks = useRecoilValue(bookmarksState);
  const [selectedBookmarks, setSelectedBookmarks] = useRecoilState(
    selectedBookmarksState,
  );

  const onCheck = () => {
    setIsChecked(!isChecked);
    setSelectedBookmarks(
      selectedBookmarks.length === bookmarkList.length ? [] : bookmarkList,
    );
  };

  useEffect(() => {
    if (bookmarkList.length > 0) {
      setIsChecked(selectedBookmarks.length === bookmarkList.length);
    }
  }, [selectedBookmarks, bookmarkList]);

  return (
    <SelectBoxWrapper>
      <SelectForm>
        <SelectText>선택</SelectText>
        <SelectButton
          onClick={onCheck}
          variant="secondary"
          isChecked={isChecked}
        />
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
