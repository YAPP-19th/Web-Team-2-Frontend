import SmallBlackLabel from 'components/common/SmallBlackLabel';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ProfileEditFormWrapper = styled.div`
  padding-top: 24px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

const ImgFormRow = styled.div`
  margin-bottom: 45px;
`;

const NicknameFormRow = styled.div``;

function ProfileEditForm(): ReactElement {
  return (
    <ProfileEditFormWrapper>
      <ImgFormRow>
        <SmallBlackLabel width="297px" label="프로필 이미지" />
      </ImgFormRow>

      <NicknameFormRow>
        <SmallBlackLabel width="297px" label="닉네임" />
      </NicknameFormRow>
    </ProfileEditFormWrapper>
  );
}

export default ProfileEditForm;
