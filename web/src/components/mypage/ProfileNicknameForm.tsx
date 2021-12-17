import SimpleInput from 'components/common/SimpleInput';
import SmallBlackLabel from 'components/common/SmallBlackLabel';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ProfileNicknameFormProps {
  nickname: string;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusOutNickname: () => void;
  errorMessage?: string;
}

const NicknameFormWrapper = styled.div`
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

function ProfileNicknameForm({
  nickname,
  onChangeNickname,
  onFocusOutNickname,
  errorMessage,
}: ProfileNicknameFormProps): ReactElement {
  return (
    <NicknameFormWrapper>
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
        {errorMessage && (
          <NicknameCheckError>{errorMessage}</NicknameCheckError>
        )}
      </NicknameInput>
    </NicknameFormWrapper>
  );
}

export default ProfileNicknameForm;
