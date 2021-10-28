import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MyPageHead from './MyPageHead';

const ProfileWrapper = styled.div``;

function Profile(): ReactElement {
  return (
    <ProfileWrapper>
      <MyPageHead headText="프로필" />
    </ProfileWrapper>
  );
}
export default Profile;
