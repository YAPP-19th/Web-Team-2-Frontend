/* eslint-disable no-alert */
/* eslint-disable no-console */
import { changeProfileImage, nicknameCheck } from 'api/userAPI';
import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
import SmallBlackLabel from 'components/common/SmallBlackLabel';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/atoms/userState';
import styled from 'styled-components';
import { DEFAULT_IMAGE_FILE_NAME } from 'utils/const';
import ProfileImageForm from './ProfileImageForm';

const ProfileEditFormWrapper = styled.div`
  padding-top: 24px;
  color: ${(props) => props.theme.color.grayDarkest};
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
  const [user, setUser] = useRecoilState(userState);
  const [form, setForm] = useState({
    profileImage: user.imageUrl,
    imageFileName: DEFAULT_IMAGE_FILE_NAME,
    nickname: user.name,
  });
  const { profileImage, imageFileName, nickname } = form;

  // 닉네임 인풋 상태 변경
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, nickname: e.target.value });
  };

  // 프로필 이미지, 이름 상태 변경
  const onChangeProfileImage = (
    newImg: string,
    newFileName: string | undefined = DEFAULT_IMAGE_FILE_NAME,
  ) => {
    setForm({ ...form, profileImage: newImg, imageFileName: newFileName });
  };

  // 닉네임 인풋에서 초점을 벗어났을 시에 액션
  const onFocusOutNickname = async () => {
    await nicknameCheck(nickname).catch((err) => console.log(err)); // TODO(dohyun) 여기다 에러처리
  };

  // 프로필 이미지 업로드
  const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      if (e.target.files[0].size > 10000000) {
        alert('파일 용량이 10MB를 초과하였습니다.');
        return;
      }

      const fd = new FormData();
      fd.append('image', e.target.files[0]);
      console.log(e.target.files[0]);

      try {
        const { data } = await changeProfileImage(fd);
        onChangeProfileImage(data, e.target.files[0].name);
        console.log(data);
      } catch (err) {
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  // 업로드 한 프로필 이미지 제거
  const onDeleteImage = async () => {
    onChangeProfileImage(user.imageUrl); // 초기 값으로 변경
  };

  return (
    <ProfileEditFormWrapper>
      <ProfileImageForm
        form={form}
        onChangeProfileImage={onChangeProfileImage}
        onDeleteImage={onDeleteImage}
        onImageUpload={onImageUpload}
      />

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
