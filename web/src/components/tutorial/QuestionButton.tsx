import { QuestionIcon } from 'assets/icons';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { tutorialModalState } from 'recoil/atoms/tutorialState';
import styled, { css } from 'styled-components';
import TutorialModal from './TutorialModal';

interface ITutorialMenuStyled {
  variant: 'primary' | 'secondary';
  top: number;
  left: number;
}

const QuestionButtonStyled = styled.button`
  margin-top: 80px;
  position: relative;
`;

const TutorialMenuBox = styled.div<ITutorialMenuStyled>`
  width: 118px;
  height: 42px;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 8px 0px;
  cursor: pointer;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  ${(props) =>
    props.variant === 'primary'
      ? css`
          background-color: ${props.theme.color.primary};
          color: ${props.theme.color.white};
          border: none;
        `
      : css`
          background-color: ${props.theme.color.white};
          color: ${props.theme.color.primary};
          border: 1px solid ${props.theme.color.primary};
        `}
`;

function QuestionButton(): ReactElement {
  const [isTutorialMenu, onToggleTutorialMenu] = useToggle();
  const [isTutorialModal, setIsTutorialModal] =
    useRecoilState(tutorialModalState);

  const onToggleTutorialModal = () => {
    setIsTutorialModal(!isTutorialModal);
  };

  return (
    <>
      <QuestionButtonStyled onClick={onToggleTutorialModal}>
        <TutorialMenuBox variant="secondary" top={-12} left={40}>
          알림이 안 와요!
        </TutorialMenuBox>
        <TutorialMenuBox variant="primary" top={-60} left={40}>
          도토리함 가이드
        </TutorialMenuBox>
        <QuestionIcon />
      </QuestionButtonStyled>

      {isTutorialModal && (
        <TutorialModal
          isModal={isTutorialModal}
          onToggleModal={onToggleTutorialModal}
        />
      )}
    </>
  );
}

export default QuestionButton;
