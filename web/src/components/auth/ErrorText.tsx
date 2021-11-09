import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ErrorTextProps {
  text: string;
}

const Error = styled.p`
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 0;
  line-height: 1.42;
  padding-left: 2px;
  color: ${(props) => props.theme.color.error};
`;

function ErrorText({ text }: ErrorTextProps): ReactElement {
  return <Error>{text}</Error>;
}

export default ErrorText;
