import { patchRemindToggle, setRemindCycle } from 'api/remindAPI';
import ChipButton from 'components/common/ChipButton';
import SmallBlackLabel from 'components/common/SmallBlackLabel';
import ToggleIconButton from 'components/common/ToggleIconButton';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/atoms/userState';
import styled from 'styled-components';
import {
  changeRemindCycleLocalInfo,
  changeRemindToggleLocalInfo,
} from 'utils/remind';
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
  const userInfo = useRecoilValue(userState);
  const remindCycle = ['3', '7', '14', '30'];
  const [isRemind, onToggleRemind] = useToggle(userInfo.remindToggle);
  const [selectedCycle, setSelectedCycle] = useState(userInfo.remindCycle);

  const onChangeSelectedCycle = (cycle: string) => {
    setSelectedCycle(cycle);
  };

  const { mutate: mutateRemindToggleChange } = useMutation(
    () => patchRemindToggle({ remindToggle: !isRemind }),
    {
      onSuccess: () => {
        changeRemindToggleLocalInfo(!isRemind);
        onToggleRemind();
      },
    },
  );

  const { mutate: mutateRemindCycleChange } = useMutation(
    (cycle: string) => setRemindCycle({ remindCycle: cycle }),
    {
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log('success');
      },
    },
  );

  return (
    <>
      <MyPageHead headText="환경 설정" />

      <ConfigurationWrapper>
        <RemindToggleBlock>
          <SmallBlackLabel width="297px" label="리마인드 알람 받기" />
          <ToggleIconButton
            isToggled={isRemind}
            onClick={() => mutateRemindToggleChange()}
          />
        </RemindToggleBlock>

        <RemindSettingBlock>
          <SmallBlackLabel width="297px" label="리마인드 주기 설정하기" />

          <RemindSettingButtonGroup>
            {remindCycle.map((cycle) => (
              <ChipButton
                label={`${cycle}일`}
                variant={cycle === selectedCycle ? 'primary' : 'secondary'}
                key={cycle}
                onClick={() => {
                  mutateRemindCycleChange(cycle);
                  changeRemindCycleLocalInfo(cycle);
                  onChangeSelectedCycle(cycle);
                }}
              />
            ))}
          </RemindSettingButtonGroup>
        </RemindSettingBlock>
      </ConfigurationWrapper>
    </>
  );
}

export default Configuration;
