import MyPageHead from 'components/mypage/MyPageHead';
import MyPageTemplate from 'components/mypage/MyPageTemplate';
import ProfileEditForm from 'components/mypage/ProfileEditForm';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ProfileEditPageWrapper = styled(MyPageTemplate)`
  width: 768px;
`;

function ProfileEditPage(): ReactElement {
  return (
    <ProfileEditPageWrapper>
      <MyPageHead headText="프로필" />
      <ProfileEditForm />
    </ProfileEditPageWrapper>
  );
}

export default ProfileEditPage;
