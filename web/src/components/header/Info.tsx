import { BellIcon, BellNewIcon } from 'assets/icons';
import { GoogleIMG } from 'assets/images';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { bellState } from 'recoil/atoms/bellState';
import Path from 'routes/path';
import styled from 'styled-components';

const HeaderInfo = styled.div`
  width: 72px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BellIconBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

// @TODO(jekoo) get user profile
const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  border: 0.5px solid black;
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
      <Link to={Path.MyPage}>
        <ProfileImg src={GoogleIMG} alt="profile" />
      </Link>
    </HeaderInfo>
  );
}

export default Info;
