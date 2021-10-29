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

function Info(): ReactElement {
  const [bellAlarm, setBellAlarm] = useRecoilState(bellState);

  return (
    <HeaderInfo>
      <BellIconBox onClick={() => setBellAlarm(!bellAlarm)}>
        {bellAlarm ? <BellNewIcon /> : <BellIcon />}
      </BellIconBox>
    </HeaderInfo>
  );
}

export default Info;
