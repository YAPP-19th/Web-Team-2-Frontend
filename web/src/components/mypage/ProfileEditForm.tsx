import { ColorizeIcon, X16BigIcon } from 'assets/icons';
import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
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
  font-weight: 400;
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

const NicknameFormRow = styled.div`
  display: flex;
  font-size: 14px;
  height: 57px;
  margin-bottom: 88px;
`;

const NicknameFormLabel = styled(SmallBlackLabel)`
  padding-top: 8px;
`;

const NicknameInput = styled.div``;

const NicknameCheckError = styled.p`
  margin: 4px 0 0 0;
  color: ${(props) => props.theme.color.error};
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveButton = styled(SimpleButton)`
  font-weight: 300;
  margin-left: 24px;
`;

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
        <NicknameFormLabel width="297px" label="닉네임" />
        <NicknameInput>
          <SimpleInput
            width="273px"
            height="36px"
            placeholder="닉네임을 입력해주세요"
          />
          <NicknameCheckError>이미 사용 중인 닉네임입니다.</NicknameCheckError>
        </NicknameInput>
      </NicknameFormRow>

      <ButtonGroup>
        <SimpleButton
          label="뒤로 가기"
          width="174px"
          height="40px"
          variant="secondary"
        />

        <SaveButton
          label="변경 내용 저장"
          width="174px"
          height="40px"
          variant="primary"
        />
      </ButtonGroup>
    </ProfileEditFormWrapper>
  );
}

export default ProfileEditForm;
