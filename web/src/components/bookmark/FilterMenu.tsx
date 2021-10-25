import React, { ReactElement, useEffect, useRef } from 'react';
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
    background-color: #f3f2ef;
    cursor: pointer;
  }
  ${(props) => props.isSelected && `background-color: #f3f2ef;`}
`;

const MenuItemText = styled.span``;

function FilterMenu({
  isOpenFilterMenu,
  onToggleFilterMenu,
  menuText,
  onChangeMenuText,
}: FilterMenuProps): ReactElement {
  const filterMenuItems = [
    '최신순',
    '오래된 순',
    '자주 방문한 순',
    '적게 방문한 순',
  ];

  const FilterMenuEl = useRef<HTMLDivElement>(null);

  const onClickOutSide = (e: MouseEvent) => {
    const { target } = e;
    if (isOpenFilterMenu && !FilterMenuEl.current?.contains(target as Node)) {
      onToggleFilterMenu();
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutSide);
    return () => {
      window.removeEventListener('click', onClickOutSide);
    };
  }, []);

  return (
    <FilterMenuWrapper ref={FilterMenuEl}>
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
