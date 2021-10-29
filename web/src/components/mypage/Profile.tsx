import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MyPageHead from './MyPageHead';

const ProfileWrapper = styled.div`
  padding: 24px 0 104px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProfileLeftBlock = styled.div`
  width: 297px;
  display: flex;
  align-items: center;
`;

const ProfileImageBox = styled.div`
  width: 72px;
  height: 72px;
  margin-right: 28px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  background-color: ${(props) => props.theme.color.lightGray2};
`;

const ProfileNickname = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.color.black0};
`;

const ProfileRightBlock = styled.div``;

const ProfileEditButton = styled.button`
  font-size: 14px;
  width: 174px;
  height: 36px;
  color: ${(props) => props.theme.color.black1};
  border-radius: 6px;
  border: solid 1px ${(props) => props.theme.color.lightGray3};
`;

function Profile(): ReactElement {
  return (
    <>
      <MyPageHead headText="프로필" />
      <ProfileWrapper>
        <ProfileLeftBlock>
          <ProfileImageBox>
            <ProfileImage />
          </ProfileImageBox>
          <ProfileNickname>닉네임</ProfileNickname>
        </ProfileLeftBlock>

        <ProfileRightBlock>
          <ProfileEditButton>프로필 편집</ProfileEditButton>
        </ProfileRightBlock>
      </ProfileWrapper>
    </>
  );
}
export default Profile;
