import { ArrowBackBigIcon, ArrowBigIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface TutorialSideButtonsProps {
  onPrev: () => void;
  onNext: () => void;
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
}: TutorialSideButtonsProps): ReactElement {
  return (
    <>
      <PrevButton onClick={onPrev}>
        <ArrowBackBigIcon />
      </PrevButton>

      <NextButton onClick={onNext}>
        <ArrowBigIcon />
      </NextButton>
    </>
  );
}

export default TutorialSideButtons;
