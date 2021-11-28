import { ArrowBackBigIcon, ArrowBigIcon, X32Icon } from 'assets/icons';
import ModalTemplate from 'components/common/ModalTemplate';
import SmallGreenLabel from 'components/common/SmallGreenLabel';
import React, { ReactElement, useState } from 'react';
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
  font-size: 14px;
  color: ${(props) => props.theme.color.grayDarkest};
  display: flex;
  justify-content: center;
  center {
    display: flex;
    align-items: center;
  }
  circle {
    display: inline-block;
    text-align: center;
    line-height: 18px;
    width: 15px;
    height: 15px;
    background-color: ${(props) => props.theme.color.grayDarkest};
    color: ${(props) => props.theme.color.white};
    border-radius: 50%;
    font-size: 12px;
    font-family: Cafe24Ssurround;
    margin-right: 4px;
    &:last-child {
      margin-left: 4px;
    }
  }
`;

const StepLabel = styled(SmallGreenLabel)`
  margin-right: 12px;
  height: 42px;
  display: inline-block;
`;

const StepDescription = styled.span`
  line-height: 1.5;
  text-align: left;
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
  const tutorialSteps = [
    {
      label: 'STEP 1',
      description: '아래 설치하기를 클릭하여, 확장 프로그램을 설치해주세요!',
    },
    {
      label: 'STEP 2',
      description:
        '브라우저 상단에서 도토리함 아이콘의 핀 버튼을 눌러 고정해주세요!',
    },
    {
      label: 'STEP 3',
      description:
        '저장하고 싶은 페이지가 생겼나요? <br /> <center><circle>1</circle> 도토리함 아이콘을 클릭하고 <circle>2</circle> 원하는 위치에 저장해요!</center>',
    },
    {
      label: 'STEP 4',
      description:
        '보관함마다 맴버를 초대하여, 서로가 저장한 도토리를 공유할 수 있어요!',
    },
    {
      label: 'STEP 5',
      description:
        '도토리함을 사용하기 위한 모든 준비가 완료되었습니다! <br /> 사용법이 궁굼할 때는, 좌측 하단의 도움말 버튼을 클릭해주세요.',
    },
  ];

  const [currentStep, setCurrentStep] = useState(2);

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
          <StepLabel
            label={tutorialSteps[currentStep].label}
            fontWeight="bold"
          />
          <StepDescription
            dangerouslySetInnerHTML={{
              __html: tutorialSteps[currentStep].description,
            }}
          />
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
