import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MyPageHead from './MyPageHead';

const ProfileWrapper = styled.div``;

function Profile(): ReactElement {
  return (
    <ProfileWrapper>
      <MyPageHead />
    </ProfileWrapper>
  );
}
export default Profile;
