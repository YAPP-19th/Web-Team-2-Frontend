import { postReadRemindAlarmList } from 'api/remindAPI';
import { BellIcon, BellNewIcon } from 'assets/icons';
import { LogoGreenIMG } from 'assets/images';
import { useNewRemindAlarmQuery } from 'hooks/reminder/useRemindQueries';
import React, { ReactElement, useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
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
  position: relative;
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
  const userInfo = useRecoilValue(userState);
  const [historyOpen, setHistoryOpen] = useState(false);
  const { data } = useNewRemindAlarmQuery();

  const newRemindId = data?.contents.map((value) => value.id) || [];

  const { mutate: readMutation } = useMutation(
    () => postReadRemindAlarmList({ bookmarkIdList: newRemindId }),
    {
      onSuccess: () => {
        setHistoryOpen(false);
      },
    },
  );

  return (
    <HeaderInfo>
      <BellIconBox
        onClick={() => (historyOpen ? readMutation() : setHistoryOpen(true))}
      >
        {data?.contents.length ? <BellNewIcon /> : <BellIcon />}
        {historyOpen && data && <RemindHistory historyItem={data} />}
      </BellIconBox>
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
