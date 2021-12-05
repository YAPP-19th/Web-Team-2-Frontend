import { BellIcon, BellNewIcon } from 'assets/icons';
import { LogoGreenIMG } from 'assets/images';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bellState } from 'recoil/atoms/bellState';
import { userState } from 'recoil/atoms/userState';
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

const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  &:hover {
    cursor: pointer;
  }
`;

function Info(): ReactElement {
  const [bellAlarm, setBellAlarm] = useRecoilState(bellState);
  const userInfo = useRecoilValue(userState);

  return (
    <HeaderInfo>
      <BellIconBox onClick={() => setBellAlarm(!bellAlarm)}>
        {bellAlarm ? <BellNewIcon /> : <BellIcon />}
      </BellIconBox>
      <Link to={Path.MyPage}>
        <ProfileImg
          src={userInfo.imageUrl}
          alt={userInfo.imageUrl}
          // @TODO(jekoo) get user error default profile other Img or Element
          // eslint-disable-next-line no-return-assign
          onError={(e) => (e.currentTarget.src = LogoGreenIMG)}
        />
      </Link>
    </HeaderInfo>
  );
}

export default Info;
