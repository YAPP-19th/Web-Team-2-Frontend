import React, { ReactElement } from 'react';
import styled from 'styled-components';
import DefaultLoadingGIT from 'assets/images/defaultLoading.webp';

const DefaultLoadingStyled = styled.div``;

const DefaultLoadingICON = styled.div`
  width: 15px;
  height: 15px;
  background: url(${DefaultLoadingGIT}) no-repeat 50% 50%;
  background-size: 15px 15px;
`;

function DefaultLoading(): ReactElement {
  return (
    <DefaultLoadingStyled>
      <DefaultLoadingICON />
    </DefaultLoadingStyled>
  );
}

export default DefaultLoading;
