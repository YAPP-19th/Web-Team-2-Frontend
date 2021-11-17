import { QuestionIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const QuestionButtonStyled = styled.div`
  position: absolute;
  top: 802px;
  left: 0px;
`;

function QuestionButton(): ReactElement {
  return (
    <QuestionButtonStyled>
      <QuestionIcon />
    </QuestionButtonStyled>
  );
}

export default QuestionButton;
