import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import Path from 'routes/path';
import PathText from './PathText';

type GlobalPathTypes = '모든 도토리' | '휴지통' | undefined;

const getGlobalPagePath = (path: string): GlobalPathTypes => {
  switch (path) {
    case Path.Home:
      return '모든 도토리';
    case Path.TrashPage:
      return '휴지통';
    default:
      return undefined;
  }
};

function GlobalPath(): ReactElement {
  const location = useLocation();
  const pathName = getGlobalPagePath(location.pathname);

  return <PathText pathType="global">{pathName}</PathText>;
}

export default GlobalPath;
