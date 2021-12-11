import { QuestionIcon } from 'assets/icons';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import TutorialModal from './TutorialModal';

const QuestionButtonStyled = styled.button`
  margin-top: 50px;
`;

function QuestionButton(): ReactElement {
  const [isModal, onToggleModal] = useToggle();

  return (
    <>
      <QuestionButtonStyled onClick={onToggleModal}>
        <QuestionIcon />
      </QuestionButtonStyled>

      {isModal && (
        <TutorialModal isModal={isModal} onToggleModal={onToggleModal} />
      )}
    </>
  );
}

export default QuestionButton;
