/* eslint-disable no-alert */
/* eslint-disable no-console */
import { uploadProfileImage, nicknameCheck, changeProfile } from 'api/userAPI';
import Toasts from 'components/common/Toasts';
import useToasts from 'hooks/common/useToasts';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/atoms/userState';
import styled from 'styled-components';
import { DEFAULT_IMAGE_FILE_NAME, LOCAL_STORAGE_KEY } from 'utils/const';
import ProfileEditButtonGroup from './ProfileEditButtonGroup';
import ProfileImageForm from './ProfileImageForm';
import ProfileNicknameForm from './ProfileNicknameForm';

const ProfileEditFormWrapper = styled.div`
  padding-top: 24px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

function ProfileEditForm(): ReactElement {
  const [user, setUser] = useRecoilState(userState);
  const [isOpenProfileEditToast, onProfileEditToast] = useToasts();
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    profileImage: user.image,
    imageFileName: DEFAULT_IMAGE_FILE_NAME,
    nickname: user.name,
  });
  const { nickname, profileImage } = form;
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
    try {
      await nicknameCheck(nickname);
      setErrorMessage('');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
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
        const { data } = await uploadProfileImage(fd);
        onChangeProfileImage(data.imageUrl, e.target.files[0].name);
        console.log(data);
      } catch (err) {
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  // 업로드 한 프로필 이미지 제거
  const onDeleteImage = async () => {
    onChangeProfileImage(user.image); // 초기 값으로 변경
  };

  // 변경 내용 저장
  const onEditSubmit = async () => {
    try {
      await changeProfile(profileImage, nickname);
      setUser({ ...user, image: profileImage, name: nickname });
      const localStorageItem = localStorage.getItem(
        LOCAL_STORAGE_KEY.USER_BASE_INFO,
      );
      if (localStorageItem) {
        const localStorageUser = JSON.parse(localStorageItem);
        localStorage.setItem(
          LOCAL_STORAGE_KEY.USER_BASE_INFO,
          JSON.stringify({
            ...localStorageUser,
            image: profileImage,
            name: nickname,
          }),
        );
      }
      onProfileEditToast();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ProfileEditFormWrapper>
        <ProfileImageForm
          form={form}
          onChangeProfileImage={onChangeProfileImage}
          onDeleteImage={onDeleteImage}
          onImageUpload={onImageUpload}
        />

        <ProfileNicknameForm
          nickname={nickname}
          errorMessage={errorMessage}
          onChangeNickname={onChangeNickname}
          onFocusOutNickname={onFocusOutNickname}
        />

        <ProfileEditButtonGroup onEditSubmit={onEditSubmit} />
      </ProfileEditFormWrapper>
      <Toasts isOpen={isOpenProfileEditToast} type="editProfile" />
    </>
  );
}

export default ProfileEditForm;
