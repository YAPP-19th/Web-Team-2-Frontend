import AccountSetting from 'components/mypage/AccountSetting';
import Configuration from 'components/mypage/Configuration';
import Profile from 'components/mypage/Profile';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const MyPageWrapper = styled.div`
  width: 667px;
  margin: 0 auto;
`;

const MyPageInner = styled.div`
  padding-top: 48px;
`;

function MyPage(): ReactElement {
  return (
    <MyPageWrapper>
      <MyPageInner>
        <Profile />
        <Configuration />
        <AccountSetting />
      </MyPageInner>
    </MyPageWrapper>
  );
}

export default MyPage;
