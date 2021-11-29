import { ArrowBackBigIcon, ArrowBigIcon } from 'assets/icons';
import ModalTemplate from 'components/common/ModalTemplate';
import SmallGreenLabel from 'components/common/SmallGreenLabel';
import React, { ReactElement, useState } from 'react';
import styled, { css } from 'styled-components';
import TutorialCloseButton from './TutorialCloseButton';
import TutorialContents from './TutorialContents';

interface TutorialModalProps {
  isModal: boolean;
  onToggleModal: () => void;
}

const ModalInnerStyled = styled.div`
  padding: 20px 20px 56px;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
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

const TutorialContent = styled.div`
  flex: 1 auto;
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

const TutorialOrder = styled.div`
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 92px;
  height: 12px;
  display: flex;
  justify-content: space-between;
`;

const StepCircle = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  background-color: ${(props) =>
    props.active ? props.theme.color.primary : props.theme.color.grayLightest};
  border-radius: 50%;
`;

function TutorialModal({
  isModal,
  onToggleModal,
}: TutorialModalProps): ReactElement {
  const {
    Step1Content,
    Step2Content,
    Step3Content,
    Step4Content,
    Step5Content,
  } = TutorialContents;

  const tutorialSteps = [
    {
      label: 'STEP 1',
      description: '아래 설치하기를 클릭하여, 확장 프로그램을 설치해주세요!',
      content: <Step1Content />,
    },
    {
      label: 'STEP 2',
      description:
        '브라우저 상단에서 도토리함 아이콘의 핀 버튼을 눌러 고정해주세요!',
      content: <Step2Content />,
    },
    {
      label: 'STEP 3',
      description:
        '저장하고 싶은 페이지가 생겼나요? <br /> <center><circle>1</circle> 도토리함 아이콘을 클릭하고 <circle>2</circle> 원하는 위치에 저장해요!</center>',
      content: <Step3Content />,
    },
    {
      label: 'STEP 4',
      description:
        '보관함마다 맴버를 초대하여, 서로가 저장한 도토리를 공유할 수 있어요!',
      content: <Step4Content />,
    },
    {
      label: 'STEP 5',
      description:
        '도토리함을 사용하기 위한 모든 준비가 완료되었습니다! <br /> 사용법이 궁굼할 때는, 좌측 하단의 도움말 버튼을 클릭해주세요.',
      content: <Step5Content />,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const { label, description, content } = tutorialSteps[currentStep];

  const onNextStep = () => {
    if (currentStep + 1 <= tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrevStep = () => {
    if (currentStep - 1 >= 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="714px"
      height="471px"
    >
      <ModalInnerStyled>
        <TutorialCloseButton
          visible={currentStep === tutorialSteps.length - 1}
          onClick={onToggleModal}
        />

        <TutorialTitle>도토리함, 어떻게 사용하나요?</TutorialTitle>

        <TutorialDescription>
          <StepLabel label={label} fontWeight="bold" />
          <StepDescription dangerouslySetInnerHTML={{ __html: description }} />
        </TutorialDescription>

        <TutorialContent>{content}</TutorialContent>

        <PrevButton onClick={onPrevStep}>
          <ArrowBackBigIcon />
        </PrevButton>

        <NextButton onClick={onNextStep}>
          <ArrowBigIcon />
        </NextButton>

        <TutorialOrder>
          {tutorialSteps.map((_, index) => (
            <StepCircle key={index} active={index === currentStep} />
          ))}
        </TutorialOrder>
      </ModalInnerStyled>
    </ModalTemplate>
  );
}

export default TutorialModal;
