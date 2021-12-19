import { BellIcon, BellNewIcon } from 'assets/icons';
import { LogoGreenIMG } from 'assets/images';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bellState } from 'recoil/atoms/bellState';
import { userState } from 'recoil/atoms/userState';
import Path from 'routes/path';
import styled from 'styled-components';
import RemindHistory from './RemindHistory';

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

// @TODO(jekoo): get remind web push
const tempData = [
  { time: 1, title: '제목' },
  { time: 2, title: '북북마마크크' },
  { time: 10, title: '북마크제목' },
  { time: 10, title: '북마크제목' },
  { time: 10, title: '북마크제목' },
  { time: 10, title: '북마크제목' },
  { time: 10, title: '북마크제목' },
  { time: 10, title: '북마크제목' },
  { time: 10, title: '북마크제목' },
];

function Info(): ReactElement {
  const [bellAlarm, setBellAlarm] = useRecoilState(bellState);
  const userInfo = useRecoilValue(userState);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <HeaderInfo>
      <BellIconBox
        onClick={() => {
          setBellAlarm(!bellAlarm);
          setHistoryOpen(!historyOpen);
        }}
      >
        {bellAlarm ? <BellNewIcon /> : <BellIcon />}
      </BellIconBox>
      {historyOpen && <RemindHistory historyItem={tempData} />}
      <Link to={Path.MyPage}>
        <ProfileImg
          src={userInfo.image}
          alt={userInfo.image}
          // @TODO(jekoo) get user error default profile other Img or Element
          // eslint-disable-next-line no-return-assign
          onError={(e) => (e.currentTarget.src = LogoGreenIMG)}
        />
      </Link>
    </HeaderInfo>
  );
}

export default Info;
