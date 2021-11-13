import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 9999999;
`;

const Reset = styled.button`
  width: 200px;
  height: 200px;
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.color.purple};
`;

function ErrorFallback({ error }: { error: Error }): ReactElement {
  return (
    <ErrorContainer>
      <ErrorMessage>{error.message}</ErrorMessage>
      <Reset onClick={() => window.location.replace('/')}>Reset</Reset>
    </ErrorContainer>
  );
}

export default ErrorFallback;
