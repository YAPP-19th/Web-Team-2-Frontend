import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ModalProps {
  width: number;
  height: number;
  isModal: boolean;
  onToggleModal: () => void;
  children: React.ReactNode;
}

const ModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const Inner = styled.div<{ width: number; height: number; isModal: boolean }>`
  position: absolute;
  z-index: 9999;
  background-color: ${(props) => props.theme.color.white0};
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const Background = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.6;
`;

function Modal({
  width,
  height,
  isModal,
  onToggleModal,
  children,
}: ModalProps): ReactElement {
  return (
    <ModalWrapper onMouseDown={onToggleModal}>
      <Inner
        onMouseDown={(e) => e.stopPropagation()}
        width={width}
        height={height}
        isModal={isModal}
      >
        {children}
      </Inner>
      <Background />
    </ModalWrapper>
  );
}

export default Modal;
