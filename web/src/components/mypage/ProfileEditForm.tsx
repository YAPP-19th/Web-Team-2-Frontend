import { changeProfileImage, nicknameCheck } from 'api/userAPI';
import { ColorizeIcon, X16BigIcon } from 'assets/icons';
import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
import SmallBlackLabel from 'components/common/SmallBlackLabel';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/atoms/userState';
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
  const [user, setUser] = useRecoilState(userState);
  const [form, setForm] = useState({
    profileImage: user.imageUrl,
    nickname: user.name,
  });
  const { profileImage, nickname } = form;

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, nickname: e.target.value });
  };

  const onChangeProfileImage = (newImg: string) => {
    setForm({ ...form, profileImage: newImg });
  };

  const onFocusOutNickname = async () => {
    // eslint-disable-next-line no-console
    await nicknameCheck(nickname).catch((err) => console.log(err)); // 여기다 에러처리
  };

  const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const fd = new FormData();
      fd.append('image', e.target.files[0]);
      console.log(e.target.files[0]);

      try {
        const image = await changeProfileImage(fd);
        console.log(image);
      } catch (err) {
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  return (
    <ProfileEditFormWrapper>
      <ImgFormRow>
        <FormLabel width="297px" label="프로필 이미지" />
        <ProfileImageBox>
          <ProfileImage src={profileImage} />
          <ProfileColorsButton onClick={onTogglePaletteOpen} />
          {isPaletteOpen && (
            <ProfileColorPalette
              isOpen={isPaletteOpen}
              onToggleOpen={onTogglePaletteOpen}
              onChangeProfileImage={onChangeProfileImage}
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
              onChange={onImageUpload}
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
            value={nickname}
            onChange={onChangeNickname}
            onBlur={onFocusOutNickname}
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
