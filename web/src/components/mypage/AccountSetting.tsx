import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MyPageHead from './MyPageHead';

const AccountSettingWrapper = styled.div``;

function AccountSetting(): ReactElement {
  return (
    <AccountSettingWrapper>
      <MyPageHead headText="계정 설정" />
    </AccountSettingWrapper>
  );
}

export default AccountSetting;
