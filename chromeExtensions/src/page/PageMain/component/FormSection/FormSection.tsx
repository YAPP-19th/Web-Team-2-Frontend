import React, { ReactElement, useEffect, useState } from 'react';

import { AlarmIcon, OgImage } from '..';
import { FolderListInModal } from '../../../../component';
import { IMetaData } from '../../../../contexts';
import { IDtoDotori, DtoFolderList, DtoFolder } from '../../../../domain';
import {
  AlarmArea,
  AlarmIconWrapper,
  AlarmIconText,
  AlarmText,
  Article,
  Button,
  HorizontalDivider,
  Input,
  InputArticle,
  ButtonArea,
  Wrapper,
} from './FormSection.styled';

interface IProps {
  saveDotori: (dotori: IDtoDotori) => Promise<void>;
  dotoriList: DtoFolderList;
  metaData: IMetaData;
}

export function FormSection({
  saveDotori: propSaveDotori,
  dotoriList,
  metaData,
}: IProps): ReactElement {
  const [url, setUrl] = useState<IDtoDotori['url']>('');
  const [title, setTitle] = useState<IDtoDotori['title']>('');
  const [remind, setRemind] = useState<IDtoDotori['remind']>(false);
  const [image, setImage] = useState<IDtoDotori['image']>('');
  const [folderId, setFolderId] = useState<IDtoDotori['folderId']>('40');
  useEffect(() => {
    const {
      ogImage: metaDataOgImage,
      url: metaDataUrl,
      title: metaDataTitle,
    } = metaData;
    setImage(metaDataOgImage || '');
    setUrl(metaDataUrl || '');
    setTitle(metaDataTitle || '');
  }, [metaData]);
  const saveDotori = async (): Promise<void> => {
    const dotori: IDtoDotori = {
      title,
      url,
      remind,
      image,
      folderId,
      description: metaData.description,
    };
    await propSaveDotori(dotori);
  };
  const clickFolder = (id: string) => {
    setFolderId(id);
  };
  return (
    <Wrapper>
      <InputArticle>
        <OgImage src={image} alt={title} />
        <Input
          value={title}
          type="text"
          placeholder="직접 입력"
          onChange={(e) => setTitle(e.target.value)}
        />
        <AlarmArea onClick={() => setRemind((prev) => !prev)}>
          <AlarmText>리마인드 on/off</AlarmText>
          <AlarmIconWrapper>
            <AlarmIcon active={remind} />
          </AlarmIconWrapper>
          <AlarmIconText active={remind}>{remind ? 'on' : 'off'}</AlarmIconText>
        </AlarmArea>
      </InputArticle>
      <HorizontalDivider />
      <Article>
        <FolderListInModal onClick={clickFolder} activeId={folderId} />
        <ButtonArea>
          <Button onClick={saveDotori}>저장하기</Button>
        </ButtonArea>
      </Article>
    </Wrapper>
  );
}
