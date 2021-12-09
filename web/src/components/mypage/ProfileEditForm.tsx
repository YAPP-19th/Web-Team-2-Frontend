import { X16BigIcon } from 'assets/icons';
import SimpleButton from 'components/common/SimpleButton';
import SmallBlackLabel from 'components/common/SmallBlackLabel';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ProfileEditFormWrapper = styled.div`
  padding-top: 24px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

const ImgFormRow = styled.div`
  margin-bottom: 45px;
  display: flex;
`;

const FormLabel = styled(SmallBlackLabel)`
  padding-top: 20px;
`;

const ProfileImageBox = styled.div`
  width: 72px;
  height: 72px;
  margin-right: 27px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  background-color: ${(props) => props.theme.color.grayLight};
`;

const UploadContent = styled.div``;

const UploadRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${(props) => props.theme.color.grayDark};
  font-weight: 300;
  &:first-child {
    margin-bottom: 8px;
    padding-top: 14px;
  }
  &:last-child {
    font-size: 12px;
  }
`;

const UploadButton = styled(SimpleButton)`
  margin-right: 16px;
`;

const UploadPath = styled.span`
  line-height: 1.5;
  margin-right: 4px;
`;

const NicknameFormRow = styled.div``;

function ProfileEditForm(): ReactElement {
  return (
    <ProfileEditFormWrapper>
      <ImgFormRow>
        <FormLabel width="297px" label="프로필 이미지" />
        <ProfileImageBox>
          <ProfileImage src="https://via.placeholder.com/72x72" />
        </ProfileImageBox>

        <UploadContent>
          <UploadRow>
            <UploadButton
              label="파일 선택"
              variant="secondary"
              width="75px"
              height="31px"
            />
            <UploadPath>선택된 파일 없음</UploadPath>
            <X16BigIcon />
          </UploadRow>
          <UploadRow>최대 10MB의 이미지 파일</UploadRow>
        </UploadContent>
      </ImgFormRow>

      <NicknameFormRow>
        <SmallBlackLabel width="297px" label="닉네임" />
      </NicknameFormRow>
    </ProfileEditFormWrapper>
  );
}

export default ProfileEditForm;
