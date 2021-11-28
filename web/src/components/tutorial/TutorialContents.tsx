import { Symbol32Icon } from 'assets/icons';
import {
  Question124IMG,
  Question124IMG2x,
  Question124IMG3x,
  TutorialStep2IMG,
  TutorialStep2IMG2x,
  TutorialStep2IMG3x,
  TutorialStep3IMG,
  TutorialStep3IMG2x,
  TutorialStep3IMG3x,
  TutorialStep4IMG,
  TutorialStep4IMG2x,
  TutorialStep4IMG3x,
} from 'assets/images';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface TutorialContentsProps {
  children: React.ReactNode;
}

const Step1ContentStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  width: 100%;
  height: 100%;
`;

const Step1Linked = styled.a`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.color.primary};
  text-decoration: underline;
  text-underline-offset: 6px;
  font-family: Cafe24Ssurround;
`;

const StepImgContent = styled.img<{ margin: string }>`
  display: block;
  margin: ${(props) => props.margin};
`;

function TutorialContents({ children }: TutorialContentsProps): ReactElement {
  return <>{children}</>;
}

const Step1Content = (): ReactElement => {
  return (
    <Step1ContentStyled>
      <Symbol32Icon />
      <Step1Linked href="#">도토리함 설치하기</Step1Linked>
      <Symbol32Icon />
    </Step1ContentStyled>
  );
};

const Step2Content = (): ReactElement => {
  return (
    <StepImgContent
      width="329"
      margin="18px auto"
      src={TutorialStep2IMG}
      srcSet={`${TutorialStep2IMG} 1x, ${TutorialStep2IMG2x} 2x, ${TutorialStep2IMG3x} 3x`}
    />
  );
};

const Step3Content = (): ReactElement => {
  return (
    <StepImgContent
      width="288"
      margin="25px auto"
      src={TutorialStep3IMG}
      srcSet={`${TutorialStep3IMG} 1x, ${TutorialStep3IMG2x} 2x, ${TutorialStep3IMG3x} 3x`}
    />
  );
};

const Step4Content = (): ReactElement => {
  return (
    <StepImgContent
      width="466"
      margin="28px auto"
      src={TutorialStep4IMG}
      srcSet={`${TutorialStep4IMG} 1x, ${TutorialStep4IMG2x} 2x, ${TutorialStep4IMG3x} 3x`}
    />
  );
};

const Step5Content = (): ReactElement => {
  return (
    <StepImgContent
      width="124"
      margin="50px auto"
      src={Question124IMG}
      srcSet={`${Question124IMG} 1x, ${Question124IMG2x} 2x, ${Question124IMG3x} 3x`}
    />
  );
};

TutorialContents.Step1Content = Step1Content;
TutorialContents.Step2Content = Step2Content;
TutorialContents.Step3Content = Step3Content;
TutorialContents.Step4Content = Step4Content;
TutorialContents.Step5Content = Step5Content;

export default TutorialContents;
