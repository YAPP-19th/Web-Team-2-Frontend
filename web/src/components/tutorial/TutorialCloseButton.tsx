import { X32Icon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface TutorialCloseButtonProps {
  onClick: () => void;
  visible: boolean;
}

const CloseButtonWrapper = styled.div<{ visible: boolean }>`
  overflow: hidden;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

const CloaseButton = styled.button`
  float: right;
`;

function TutorialCloseButton({
  onClick,
  visible,
}: TutorialCloseButtonProps): ReactElement {
  return (
    <CloseButtonWrapper visible={visible}>
      <CloaseButton onClick={onClick}>
        <X32Icon />
      </CloaseButton>
    </CloseButtonWrapper>
  );
}

export default TutorialCloseButton;
