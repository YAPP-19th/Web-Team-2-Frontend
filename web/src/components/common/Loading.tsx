import React, { ReactElement } from 'react';
import styled from 'styled-components';
import loadingGIF from 'assets/images/loading.gif';

const LoadingStyled = styled.div`
  position: fixed;
  z-index: 9998;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.4;
`;

const LoadingICON = styled.div`
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  margin: -75px 0 0 -75px;
  width: 150px;
  height: 150px;
  background: url(${loadingGIF}) no-repeat 50% 50%;
  background-size: 150px 150px;
`;

function Loading(): ReactElement {
  return (
    <>
      <LoadingStyled />
      <LoadingICON />
    </>
  );
}

export default Loading;
