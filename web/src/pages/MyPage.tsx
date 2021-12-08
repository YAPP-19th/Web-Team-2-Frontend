import AccountSetting from 'components/mypage/AccountSetting';
import Configuration from 'components/mypage/Configuration';
import Profile from 'components/mypage/Profile';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/atoms/userState';
import styled from 'styled-components';

const MyPageWrapper = styled.div`
  width: 667px;
  margin: 0 auto;
`;

const MyPageInner = styled.div`
  padding-top: 48px;
`;

function MyPage(): ReactElement {
  const user = useRecoilValue(userState);

  return (
    <MyPageWrapper>
      <MyPageInner>
        <Profile user={user} />
        <Configuration />
        <AccountSetting email={user.email} />
      </MyPageInner>
    </MyPageWrapper>
  );
}

export default MyPage;
