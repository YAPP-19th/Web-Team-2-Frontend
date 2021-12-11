/* eslint-disable no-console */
import { BASE_URL } from 'api/http';
import axios from 'axios';
import ModalTemplate from 'components/common/ModalTemplate';
import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
import React, { ReactElement, useState } from 'react';
import { getTokens } from 'utils/auth';

interface Props {
  isModal: boolean;
  onToggleModal: () => void;
}

function TestModal({ isModal, onToggleModal }: Props): ReactElement {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [folderId, setFolderId] = useState('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value);
  };

  const onChangeFolderId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFolderId(e.target.value);
  };

  const onAdd = async () => {
    const { accessToken, refreshToken } = getTokens();
    const header = {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
    try {
      const test = await axios.post(
        `${BASE_URL}/api/v1/bookmark/${folderId}`,
        {
          url,
          title,
          remind: true,
          image:
            'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
          description: 'd',
        },
        {
          headers: header,
        },
      );

      console.log(test);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="300px"
      height="200px"
    >
      <SimpleInput
        width="80%"
        height="30px"
        style={{ marginTop: '30px' }}
        placeholder="제목입력"
        value={title}
        onChange={onChangeTitle}
      />

      <SimpleInput
        width="80%"
        height="30px"
        style={{ marginTop: '10px' }}
        placeholder="url 입력"
        value={url}
        onChange={onChangeUrl}
      />

      <SimpleInput
        width="80%"
        height="30px"
        style={{ marginTop: '10px' }}
        placeholder="폴더 id 입력"
        value={folderId}
        onChange={onChangeFolderId}
      />

      <SimpleButton
        width="80%"
        height="30px"
        style={{ marginTop: '10px' }}
        label="추가"
        variant="primary"
        onClick={onAdd}
      />
    </ModalTemplate>
  );
}

export default TestModal;
