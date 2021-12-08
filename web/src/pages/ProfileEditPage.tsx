import MyPageHead from 'components/mypage/MyPageHead';
import MyPageTemplate from 'components/mypage/MyPageTemplate';
import ProfileEditForm from 'components/mypage/ProfileEditForm';
import React, { ReactElement } from 'react';

function ProfileEditPage(): ReactElement {
  return (
    <MyPageTemplate>
      <MyPageHead headText="프로필" />
      <ProfileEditForm />
    </MyPageTemplate>
  );
}

export default ProfileEditPage;
