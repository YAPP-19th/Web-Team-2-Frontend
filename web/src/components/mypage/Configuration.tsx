import ChipButton from 'components/common/ChipButton';
import SmallBlackLabel from 'components/common/SmallBlackLabel';
import ToggleIconButton from 'components/common/ToggleIconButton';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import MyPageHead from './MyPageHead';

const ConfigurationWrapper = styled.div`
  padding: 16px 0 104px;
  width: 100%;
  color: ${(props) => props.theme.color.grayDarkest};
`;

const RemindToggleBlock = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

const RemindSettingBlock = styled.div`
  display: flex;
  align-items: center;
`;

const RemindSettingButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

function Configuration(): ReactElement {
  const remindCycle = ['3일', '7일', '14일', '30일'];
  const [isRemind, onToggleRemind] = useToggle(true);
  const [selectedCycle, setSelectedCycle] = useState('7일'); // @TODO(dohyun) 나중에 유저데이터에서 유저가 설정한 리마인드 주기를 기본값으로 설정

  const onChangeSelectedCycle = (cycle: string) => {
    setSelectedCycle(cycle);
  };

  return (
    <>
      <MyPageHead headText="환경 설정" />

      <ConfigurationWrapper>
        <RemindToggleBlock>
          <SmallBlackLabel width="297px" label="리마인드 알람 받기" />
          <ToggleIconButton isToggled={isRemind} onClick={onToggleRemind} />
        </RemindToggleBlock>

        <RemindSettingBlock>
          <SmallBlackLabel width="297px" label="리마인드 주기 설정하기" />

          <RemindSettingButtonGroup>
            {remindCycle.map((cycle) => (
              <ChipButton
                label={cycle}
                variant={cycle === selectedCycle ? 'primary' : 'secondary'}
                key={cycle}
                onClick={() => onChangeSelectedCycle(cycle)}
              />
            ))}
          </RemindSettingButtonGroup>
        </RemindSettingBlock>
      </ConfigurationWrapper>
    </>
  );
}

export default Configuration;
