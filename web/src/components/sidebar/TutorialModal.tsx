import { ArrowBackBigIcon, ArrowBigIcon, X32Icon } from 'assets/icons';
import ModalTemplate from 'components/common/ModalTemplate';
import SmallGreenLabel from 'components/common/SmallGreenLabel';
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
  margin-bottom: 28px;
`;

const TutorialDescription = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

const StepLabel = styled(SmallGreenLabel)`
  margin-right: 12px;
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

        <TutorialDescription>
          <StepLabel label="STEP 1" fontWeight="bold" />
          아래 설치하기를 클릭하여, 확장 프로그램을 설치해주세요!
        </TutorialDescription>

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
