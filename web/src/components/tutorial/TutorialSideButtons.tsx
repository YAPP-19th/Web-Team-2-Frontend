import { ArrowBackBigIcon, ArrowBigIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface TutorialSideButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  currentStep: number;
  stepLength: number;
}

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

function TutorialSideButtons({
  onNext,
  onPrev,
  currentStep,
  stepLength,
}: TutorialSideButtonsProps): ReactElement {
  return (
    <>
      {currentStep !== 0 && (
        <PrevButton onClick={onPrev}>
          <ArrowBackBigIcon />
        </PrevButton>
      )}
      {currentStep !== stepLength && (
        <NextButton onClick={onNext}>
          <ArrowBigIcon />
        </NextButton>
      )}
    </>
  );
}

export default TutorialSideButtons;
