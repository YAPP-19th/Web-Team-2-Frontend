import { DropDownIcon } from 'assets/icons';
import { UnionIMG } from 'assets/images';
import ToggleIconButton from 'components/common/ToggleIconButton';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import FilterMenu from './FilterMenu';

interface FilterBoxProps {
  onRemindToggle: () => void;
  isRemind: boolean;
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
`;

const RemindToggleText = styled.span`
  margin-right: 12px;
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
  color: ${(props) => props.theme.color.primary};
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
`;

const FilterMenuButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const FilterMenuText = styled.span``;

function FilterBox({ isRemind, onRemindToggle }: FilterBoxProps): ReactElement {
  const [isOpenFilterMenu, onToggleFilterMenu] = useToggle(false);
  const [menuText, setMenuText] = useState<string>('최신순');

  const onChangeMenuText = (text: string) => {
    setMenuText(text);
  };

  return (
    <>
      <FilterBoxWrapper>
        <RemindToggle>
          <RemindToggleText>
            리마인드 도토리
            <RemindTextBallon>
              <BallonImage src={UnionIMG} />
              <BallonText>
                깜빡하면 안 되는 도토리 &nbsp; 한눈에 보기!
              </BallonText>
            </RemindTextBallon>
          </RemindToggleText>
          <RemindToggleButton isToggled={isRemind} onClick={onRemindToggle} />
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
