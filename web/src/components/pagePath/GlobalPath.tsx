import usePagePathEffect from 'hooks/common/usePagePathEffect';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import PathText from './PathText';

function GlobalPath(): ReactElement {
  const location = useLocation();
  const { getPath } = usePagePathEffect();
  const pathName = getPath(location.pathname);

  return <PathText pathType="global">{pathName}</PathText>;
}

export default GlobalPath;
