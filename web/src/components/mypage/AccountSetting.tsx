import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MyPageHead from './MyPageHead';

const AccountSettingWrapper = styled.div``;

function AccountSetting(): ReactElement {
  return (
    <AccountSettingWrapper>
      <MyPageHead />
    </AccountSettingWrapper>
  );
}

export default AccountSetting;
