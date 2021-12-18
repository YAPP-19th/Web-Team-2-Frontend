import { QuestionIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { tutorialModalState } from 'recoil/atoms/tutorialState';
import styled from 'styled-components';
import TutorialModal from './TutorialModal';

const QuestionButtonStyled = styled.button`
  margin-top: 50px;
`;

function QuestionButton(): ReactElement {
  const [isTutorialModal, setIsTutorialModal] =
    useRecoilState(tutorialModalState);

  const onToggleTutorialModal = () => {
    setIsTutorialModal(!isTutorialModal);
  };

  return (
    <>
      <QuestionButtonStyled onClick={onToggleTutorialModal}>
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
