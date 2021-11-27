import { ArrowBackBigIcon, ArrowBigIcon, X32Icon } from 'assets/icons';
import ModalTemplate from 'components/common/ModalTemplate';
import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface TutorialModalProps {
  isModal: boolean;
  onToggleModal: () => void;
}

const ModalInnerStyled = styled.div`
  padding: 20px 20px 44px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const CloseBlock = styled.div`
  overflow: hidden;
`;

const CloseButton = styled.button`
  float: right;
`;

const TutorialTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${(props) => props.theme.color.black};
  text-align: center;
`;

const AbsoluteButtonStyled = css`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
`;

const PrevButton = styled.button`
  ${AbsoluteButtonStyled}
  left: -177px;
`;

const NextButton = styled.button`
  ${AbsoluteButtonStyled}
  right: -174px;
`;

function TutorialModal({
  isModal,
  onToggleModal,
}: TutorialModalProps): ReactElement {
  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="714px"
      height="471px"
    >
      <ModalInnerStyled>
        <CloseBlock>
          <CloseButton onClick={onToggleModal}>
            <X32Icon />
          </CloseButton>
        </CloseBlock>

        <TutorialTitle>도토리함, 어떻게 사용하나요?</TutorialTitle>

        <PrevButton>
          <ArrowBackBigIcon />
        </PrevButton>

        <NextButton>
          <ArrowBigIcon />
        </NextButton>
      </ModalInnerStyled>
    </ModalTemplate>
  );
}

export default TutorialModal;
