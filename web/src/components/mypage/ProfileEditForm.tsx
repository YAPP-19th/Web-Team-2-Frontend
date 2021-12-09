import { ColorizeIcon, X16BigIcon } from 'assets/icons';
import SmallBlackLabel from 'components/common/SmallBlackLabel';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import ProfileColorPalette from './ProfileColorPalette';

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
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  background-color: ${(props) => props.theme.color.grayLight};
`;

const ProfileColorsButton = styled(ColorizeIcon)`
  position: absolute;
  bottom: -2px;
  right: -11px;
  cursor: pointer;
`;

const UploadContent = styled.div`
  margin-left: 27px;
`;

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

const UploadButton = styled.label`
  width: 75px;
  height: 31px;
  border-radius: 6px;
  line-height: 1.5;
  font-size: 14px;
  background-color: #ffffff;
  color: #323232;
  border: 1px solid #aaaaaa;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const FileInputStyled = styled.input`
  display: none; ;
`;

const UploadPath = styled.span`
  line-height: 1.5;
  margin-right: 4px;
`;

const NicknameFormRow = styled.div``;

function ProfileEditForm(): ReactElement {
  const [isPaletteOpen, onTogglePaletteOpen] = useToggle();

  return (
    <ProfileEditFormWrapper>
      <ImgFormRow>
        <FormLabel width="297px" label="프로필 이미지" />
        <ProfileImageBox>
          <ProfileImage src="https://via.placeholder.com/72x72" />
          <ProfileColorsButton onClick={onTogglePaletteOpen} />
          {isPaletteOpen && (
            <ProfileColorPalette
              isOpen={isPaletteOpen}
              onToggleOpen={onTogglePaletteOpen}
            />
          )}
        </ProfileImageBox>

        <UploadContent>
          <UploadRow>
            <UploadButton htmlFor="profile-image-upload">
              파일 선택
            </UploadButton>
            <FileInputStyled
              type="file"
              id="profile-image-upload"
              // eslint-disable-next-line no-console
              onChange={() => console.log('여기다 썸네일 업로드 함수 작성')}
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
