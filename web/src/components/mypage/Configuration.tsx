import ToggleIconButton from 'components/common/ToggleIconButton';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import MyPageHead from './MyPageHead';

const ConfigurationWrapper = styled.div`
  padding: 16px 0 104px;
  width: 100%;
  color: ${(props) => props.theme.color.black1};
`;

const LeftBlockText = styled.span`
  font-size: 14px;
  width: 297px;
  line-height: 1.5;
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

const RemindSettingButton = styled.button<{ isSelected: boolean }>`
  width: 75px;
  height: 32px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 20px;
  color: ${(props) =>
    props.isSelected ? props.theme.color.white0 : props.theme.color.gray0};
  border: 1.5px solid
    ${(props) =>
      props.isSelected
        ? props.theme.color.primary
        : props.theme.color.lightGray2};
  background-color: ${(props) =>
    props.isSelected ? props.theme.color.primary : 'transparent'};
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
          <LeftBlockText>리마인드 알람 받기</LeftBlockText>
          <ToggleIconButton isToggled={isRemind} onClick={onToggleRemind} />
        </RemindToggleBlock>

        <RemindSettingBlock>
          <LeftBlockText>리마인드 주기 설정하기</LeftBlockText>

          <RemindSettingButtonGroup>
            {remindCycle.map((cycle) => (
              <RemindSettingButton
                isSelected={cycle === selectedCycle}
                onClick={() => onChangeSelectedCycle(cycle)}
                key={cycle}
              >
                {cycle}
              </RemindSettingButton>
            ))}
          </RemindSettingButtonGroup>
        </RemindSettingBlock>
      </ConfigurationWrapper>
    </>
  );
}

export default Configuration;
