import { ToggleOffIcon, ToggleOnIcon } from 'assets/icons';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

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

const RemindToggleButton = styled.button``;

function FilterBox(): ReactElement {
  const [isRemind, onRemindToggle] = useToggle(true);

  return (
    <FilterBoxWrapper>
      <RemindToggle>
        <RemindToggleText>리마인드 도토리</RemindToggleText>
        <RemindToggleButton onClick={onRemindToggle}>
          {isRemind ? <ToggleOnIcon /> : <ToggleOffIcon />}
        </RemindToggleButton>
      </RemindToggle>
    </FilterBoxWrapper>
  );
}

export default FilterBox;
