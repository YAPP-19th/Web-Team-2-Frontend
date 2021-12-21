import { DropDownIcon } from 'assets/icons';
import { UnionIMG } from 'assets/images';
import transitions from 'assets/styles/transitions';
import ToggleIconButton from 'components/common/ToggleIconButton';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import FilterMenu from './FilterMenu';

interface FilterBoxProps {
  onRemindToggle: () => void;
  isRemind: boolean;
  onFiltering: (filterType: bookmarks.BookmarkFilterType) => void;
  isOpenFilterMenu: boolean;
  onToggleFilterMenu: () => void;
  menuText: string;
  onChangeMenuText: (text: string) => void;
}

const FilterBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 277px;
`;

const RemindToggle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const RemindTextBallon = styled.div`
  position: absolute;
  left: 18px;
  bottom: 36px;
  display: none;
  animation: ${transitions.fadeIn} 0.4s ease-in-out;
`;

const RemindToggleText = styled.span`
  margin-right: 12px;
`;

const BallonStandard = styled.div`
  &:hover ${RemindTextBallon} {
    display: block;
  }
`;

const RemindToggleButton = styled(ToggleIconButton)`
  margin-right: 41px;
`;

const BallonImage = styled.img``;

const BallonText = styled.span`
  position: absolute;
  top: 9px;
  left: 13px;
  color: ${(props) => props.theme.color.grayDarkest};
  font-size: 10px;
  line-height: normal;
`;

const FilterMenuButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const FilterMenuText = styled.span``;

function FilterBox({
  isRemind,
  onRemindToggle,
  onFiltering,
  isOpenFilterMenu,
  menuText,
  onChangeMenuText,
  onToggleFilterMenu,
}: FilterBoxProps): ReactElement {
  return (
    <>
      <FilterBoxWrapper>
        <RemindToggle>
          <RemindToggleText>리마인드 도토리</RemindToggleText>
          <BallonStandard>
            <RemindToggleButton isToggled={isRemind} onClick={onRemindToggle} />
            <RemindTextBallon>
              <BallonImage src={UnionIMG} />
              <BallonText>
                깜빡하면 안 되는 도토리 &nbsp; 한눈에 보기!
              </BallonText>
            </RemindTextBallon>
          </BallonStandard>
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
              onFiltering={onFiltering}
            />
          )}
        </FilterMenuButton>
      </FilterBoxWrapper>
    </>
  );
}

export default FilterBox;
