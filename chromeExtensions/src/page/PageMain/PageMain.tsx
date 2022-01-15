import React, { ReactElement } from 'react';

import { createDotori } from '../../apies';
import { useMetaData } from '../../contexts';
import { IDtoDotori } from '../../domain';
import { ViewPageMain } from './ViewPageMain';

export interface PageMainProps {
  isLogin: boolean;
}

export function PageMain({ isLogin }: PageMainProps): ReactElement {
  const { metaData } = useMetaData();
  const saveDotori = async (dotori: IDtoDotori): Promise<void> => {
    try {
      await createDotori(dotori);
    } catch (e) {
      console.error(e);
    }
  };
  const login = (): void => {
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({
        cmd: 'openTab',
        url: 'https://dotoriham.netlify.app/login',
      });
    }
  };
  const signUp = (): void => {
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({
        cmd: 'openTab',
        url: 'https://dotoriham.netlify.app/register',
      });
    }
  };
  const goHome = (): void => {
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({
        cmd: 'openTab',
        url: 'https://dotoriham.netlify.app',
      });
    }
  };

  return (
    <ViewPageMain
      isLogin={isLogin}
      metaData={metaData}
      saveDotori={saveDotori}
      login={login}
      signUp={signUp}
      goHome={goHome}
    />
  );
}
