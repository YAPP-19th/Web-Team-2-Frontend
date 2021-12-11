import SimpleButton from 'components/common/SimpleButton';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserInfo } from 'recoil/atoms/userState';
import Path from 'routes/path';
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
  background-color: ${(props) => props.theme.color.grayLight};
`;

const ProfileNickname = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.color.black};
`;

const ProfileRightBlock = styled.div``;

function Profile({ user }: { user: IUserInfo }): ReactElement {
  const { image, name } = user;
  const navigate = useNavigate();

  return (
    <>
      <MyPageHead headText="프로필" />
      <ProfileWrapper>
        <ProfileLeftBlock>
          <ProfileImageBox>
            <ProfileImage src={image} />
          </ProfileImageBox>
          <ProfileNickname>{name}</ProfileNickname>
        </ProfileLeftBlock>

        <ProfileRightBlock>
          <SimpleButton
            label="프로필 편집"
            variant="secondary"
            width="174px"
            height="36px"
            onClick={() => navigate(Path.ProfileEditPage)}
          />
        </ProfileRightBlock>
      </ProfileWrapper>
    </>
  );
}
export default Profile;
