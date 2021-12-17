import React, { ReactElement, useEffect, useState } from 'react';

import { getDotoriList, createDotori } from '../../apies';
import { useMetaData } from '../../contexts';
import { DtoFolderList, IDtoDotori } from '../../domain';
import { getStorageTokens } from '../../helper';
import { ViewPageMain } from './ViewPageMain';

export function PageMain(): ReactElement {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [dotoriList, setDotoriList] = useState<DtoFolderList>({
    rootId: 'root',
    items: {},
  });
  const { metaData } = useMetaData();
  useEffect(() => {
    const fetch = async () => {
      const { accessToken } = getStorageTokens();
      const checkIsLogin = !!accessToken;
      setIsLogin(checkIsLogin);
      if (checkIsLogin) {
        try {
          const fetchedDotoriList = await getDotoriList();
          setDotoriList(fetchedDotoriList);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetch();
  }, []);
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
      dotoriList={dotoriList}
      metaData={metaData}
      saveDotori={saveDotori}
      login={login}
      signUp={signUp}
      goHome={goHome}
    />
  );
}
