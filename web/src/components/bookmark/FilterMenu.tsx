import useLayerClose from 'hooks/common/useLayerClose';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { BookmarkFilterTypes } from 'utils/const';

interface FilterMenuProps {
  isOpenFilterMenu: boolean;
  onToggleFilterMenu: () => void;
  menuText: string;
  onChangeMenuText: (text: string) => void;
  onFiltering: (filterType: bookmarks.BookmarkFilterType) => void;
}

const FilterMenuWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 5px;
  z-index: 101;
`;

const FilterMenuInner = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.color.white};
  z-index: 9999;
`;

const MenuItem = styled.div<{ isSelected: boolean }>`
  width: 88px;
  height: 34px;
  padding: 7px 2px 9px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.color.grayLightest};
    cursor: pointer;
  }
  background-color: ${(props) =>
    props.isSelected && props.theme.color.grayLightest};
`;

const MenuItemText = styled.span``;

function FilterMenu({
  isOpenFilterMenu,
  onToggleFilterMenu,
  menuText,
  onChangeMenuText,
  onFiltering,
}: FilterMenuProps): ReactElement {
  const filterMenuItems = [
    {
      text: '최신순',
      label: BookmarkFilterTypes.LATEST_ORDER,
    },
    {
      text: '오래된 순',
      label: BookmarkFilterTypes.OLDEST_ORDER,
    },
    {
      text: '자주 방문한 순',
      label: BookmarkFilterTypes.FREQUENTLY_VISITED,
    },
    {
      text: '적게 방문한 순',
      label: BookmarkFilterTypes.LESS_VISITED,
    },
  ];

  const { targetEl } = useLayerClose(isOpenFilterMenu, onToggleFilterMenu);

  return (
    <FilterMenuWrapper ref={targetEl}>
      <FilterMenuInner>
        {filterMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            isSelected={menuText === item.text}
            onClick={() => {
              onChangeMenuText(item.text);
              onFiltering(item.label);
            }}
          >
            <MenuItemText>{item.text}</MenuItemText>
          </MenuItem>
        ))}
      </FilterMenuInner>
    </FilterMenuWrapper>
  );
}

export default FilterMenu;
