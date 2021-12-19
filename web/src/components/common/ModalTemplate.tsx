import transitions from 'assets/styles/transitions';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface InnerProps {
  width: string;
  height: string;
  isModal: boolean;
}

interface ModalTemplateProps extends InnerProps {
  onToggleModal: () => void;
  children: React.ReactNode;
}

const ModalTemplateWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const Inner = styled.div<InnerProps>`
  position: absolute;
  z-index: 9999;
  background-color: ${(props) => props.theme.color.white};
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 12px;
  animation: ${transitions.fadeIn} 0.4s ease-in-out;
`;

const Background = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.4;
`;

function ModalTemplate({
  width,
  height,
  isModal,
  onToggleModal,
  children,
  ...rest
}: ModalTemplateProps): ReactElement {
  return (
    <ModalTemplateWrapper onMouseDown={onToggleModal} {...rest}>
      <Inner
        onMouseDown={(e) => e.stopPropagation()}
        width={width}
        height={height}
        isModal={isModal}
      >
        {children}
      </Inner>
      <Background />
    </ModalTemplateWrapper>
  );
}

export default ModalTemplate;
