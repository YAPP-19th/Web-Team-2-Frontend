import useLayerClose from 'hooks/common/useLayerClose';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface FilterMenuProps {
  isOpenFilterMenu: boolean;
  onToggleFilterMenu: () => void;
  menuText: string;
  onChangeMenuText: (text: string) => void;
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
  background-color: ${(props) => props.theme.color.white0};
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
    background-color: ${(props) => props.theme.color.lightGray0};
    cursor: pointer;
  }
  background-color: ${(props) =>
    props.isSelected && props.theme.color.lightGray0};
`;

const MenuItemText = styled.span``;

function FilterMenu({
  isOpenFilterMenu,
  onToggleFilterMenu,
  menuText,
  onChangeMenuText,
}: FilterMenuProps): ReactElement {
  // @TODO(dohyun) 필터 기능 구현시 수정 예정
  const filterMenuItems = [
    '최신순',
    '오래된 순',
    '자주 방문한 순',
    '적게 방문한 순',
  ];

  const { targetEl } = useLayerClose(isOpenFilterMenu, onToggleFilterMenu);

  return (
    <FilterMenuWrapper ref={targetEl}>
      <FilterMenuInner>
        {filterMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            isSelected={menuText === item}
            onClick={() => onChangeMenuText(item)}
          >
            <MenuItemText>{item}</MenuItemText>
          </MenuItem>
        ))}
      </FilterMenuInner>
    </FilterMenuWrapper>
  );
}

export default FilterMenu;
