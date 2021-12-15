import usePagePathEffect from 'hooks/common/usePagePathEffect';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PathText from './PathText';

const GlobalPathWrapper = styled.div`
  margin-bottom: 28px;
`;

function GlobalPath(): ReactElement {
  const location = useLocation();
  const { getPath } = usePagePathEffect();
  const pathName = getPath(location.pathname);
  return (
    <GlobalPathWrapper>
      <PathText pathType="global">{pathName}</PathText>
    </GlobalPathWrapper>
  );
}

export default GlobalPath;
