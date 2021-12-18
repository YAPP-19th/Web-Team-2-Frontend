/* eslint-disable no-console */
import { BASE_URL } from 'api/http';
import axios from 'axios';
import CheckBox from 'components/common/CheckBox';
import ModalTemplate from 'components/common/ModalTemplate';
import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
import React, { ReactElement, useState } from 'react';
import { useQueryClient } from 'react-query';
import { getTokens } from 'utils/auth';
import { QueryKey } from 'utils/const';

interface Props {
  isModal: boolean;
  onToggleModal: () => void;
}

function TestModal({ isModal, onToggleModal }: Props): ReactElement {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [folderId, setFolderId] = useState('');
  const [remind, setRemind] = useState(true);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value);
  };

  const onChangeFolderId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFolderId(e.target.value);
  };

  const onToggleRemind = (): void => {
    setRemind(!remind);
  };

  const queryClient = useQueryClient();

  const onAdd = async () => {
    const { accessToken, refreshToken } = getTokens();
    const header = {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
    const encodeUrl = encodeURIComponent(url);
    const API_KEY = 'eed71a48-4db8-4e02-b05f-7012173e619f';
    try {
      const oginfo = await axios.get(
        `https://opengraph.io/api/1.1/site/${encodeUrl}?app_id=${API_KEY}`,
      );

      await axios.post(
        `${BASE_URL}/api/v1/bookmark/${folderId}`,
        {
          url,
          title,
          remind,
          image: oginfo.data.openGraph.image.url,
          description: oginfo.data.openGraph.description,
        },
        {
          headers: header,
        },
      );
      onToggleModal();
      queryClient.invalidateQueries(QueryKey.BOOKMARK_CONTENTS);
      queryClient.invalidateQueries(QueryKey.REMIND_CONTENTS);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="300px"
      height="270px"
    >
      <div
        style={{
          padding: '10px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
        <div
          style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}
        >
          <span>리마인드</span>
          <CheckBox
            isChecked={remind}
            variant="secondary"
            onClick={onToggleRemind}
          />
        </div>

        <SimpleButton
          width="80%"
          height="30px"
          style={{ marginTop: '10px' }}
          label="추가"
          variant="primary"
          onClick={onAdd}
        />
      </div>
    </ModalTemplate>
  );
}

export default TestModal;
