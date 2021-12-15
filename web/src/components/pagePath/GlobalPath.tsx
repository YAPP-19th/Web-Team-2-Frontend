import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { getGlobalPagePath } from 'utils/pagePath';
import PathText from './PathText';

function GlobalPath(): ReactElement {
  const location = useLocation();
  const pathName = getGlobalPagePath(location.pathname);

  return <PathText pathType="global">{pathName}</PathText>;
}

export default GlobalPath;
