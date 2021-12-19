import Toasts from 'components/common/Toasts';
import AccountSetting from 'components/mypage/AccountSetting';
import Configuration from 'components/mypage/Configuration';
import MyPageTemplate from 'components/mypage/MyPageTemplate';
import Profile from 'components/mypage/Profile';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { profileEditToastState } from 'recoil/atoms/toastState';
import { userState } from 'recoil/atoms/userState';

function MyPage(): ReactElement {
  const user = useRecoilValue(userState);
  const profileEditToast = useRecoilValue(profileEditToastState);

  return (
    <MyPageTemplate>
      <Profile user={user} />
      <Configuration />
      <AccountSetting email={user.email} />
      <Toasts isOpen={profileEditToast} type="editProfile" />
    </MyPageTemplate>
  );
}

export default MyPage;
