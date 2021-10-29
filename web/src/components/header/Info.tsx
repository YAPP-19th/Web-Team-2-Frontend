import { BellIcon, BellNewIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { bellState } from 'recoil/atoms/bellState';
import styled from 'styled-components';

const HeaderInfo = styled.div`
  background-color: skyblue;
  width: 255px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BellIconBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const DefaultBellIcon = styled(BellIcon)``;

const NewBellIcon = styled(BellNewIcon)``;

function Info(): ReactElement {
  const [bellAlarm, setBellAlarm] = useRecoilState<boolean>(bellState);

  return (
    <HeaderInfo>
      <BellIconBox onClick={() => setBellAlarm(!bellAlarm)}>
        {bellAlarm ? <NewBellIcon /> : <DefaultBellIcon />}
      </BellIconBox>
    </HeaderInfo>
  );
}

export default Info;
