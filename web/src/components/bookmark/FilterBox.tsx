import { DropDownIcon, ToggleOffIcon, ToggleOnIcon } from 'assets/icons';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import FilterMenu from './FilterMenu';

const FilterBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RemindToggle = styled.div`
  display: flex;
  align-items: center;
`;

const RemindToggleText = styled.span`
  margin-right: 12px;
`;

const RemindToggleButton = styled.button`
  margin-right: 41px;
`;

const FilterMenuButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const FilterMenuText = styled.span``;

function FilterBox(): ReactElement {
  const [isRemind, onRemindToggle] = useToggle(true);
  const [isOpenFilterMenu, onToggleFilterMenu] = useToggle(false);
  const [menuText, setMenuText] = useState<string>('최신순');

  const onChangeMenuText = (text: string) => {
    setMenuText(text);
  };

  return (
    <>
      <FilterBoxWrapper>
        <RemindToggle>
          <RemindToggleText>리마인드 도토리</RemindToggleText>
          <RemindToggleButton onClick={onRemindToggle}>
            {isRemind ? <ToggleOnIcon /> : <ToggleOffIcon />}
          </RemindToggleButton>
        </RemindToggle>

        <FilterMenuButton onClick={onToggleFilterMenu}>
          <FilterMenuText>{menuText}</FilterMenuText>
          <DropDownIcon />
          {isOpenFilterMenu && (
            <FilterMenu
              isOpenFilterMenu={isOpenFilterMenu}
              onToggleFilterMenu={onToggleFilterMenu}
              menuText={menuText}
              onChangeMenuText={onChangeMenuText}
            />
          )}
        </FilterMenuButton>
      </FilterBoxWrapper>
    </>
  );
}

export default FilterBox;
