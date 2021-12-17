import React, { ReactElement, useState } from 'react';

import { IMetaData } from '../../contexts';
import { DtoFolderList, IDtoDotori } from '../../domain';
import {
  LoginSection,
  FormSection,
  CompletionSection,
  HomeIcon,
} from './component';
import {
  Navigator,
  HomeArea,
  HomeIconWrapper,
  HomeTitle,
  Wrapper,
} from './ViewPageMain.styled';

interface IProps {
  isLogin: boolean;
  dotoriList: DtoFolderList;
  metaData: IMetaData;
  saveDotori: (dotori: IDtoDotori) => Promise<void>;
  login: () => void;
  signUp: () => void;
  goHome: () => void;
}

export function ViewPageMain({
  isLogin,
  dotoriList,
  metaData,
  saveDotori: propSaveDotori,
  login,
  signUp,
  goHome,
}: IProps): ReactElement {
  const [step, setStep] = useState<0 | 1>(0);
  const saveDotori = async (dotori: IDtoDotori): Promise<void> => {
    await propSaveDotori(dotori);
    setStep(1);
  };
  return (
    <Wrapper>
      <Navigator>
        <HomeArea onClick={() => goHome()}>
          <HomeIconWrapper>
            <HomeIcon />
          </HomeIconWrapper>
          <HomeTitle>도토리함 가기</HomeTitle>
        </HomeArea>
      </Navigator>
      {!isLogin ? (
        <LoginSection login={login} signUp={signUp} />
      ) : (
        [
          <FormSection
            saveDotori={saveDotori}
            dotoriList={dotoriList}
            metaData={metaData}
          />,
          <CompletionSection />,
        ].map((component, index) => {
          if (step === index) {
            return component;
          }
          return null;
        })
      )}
    </Wrapper>
  );
}
