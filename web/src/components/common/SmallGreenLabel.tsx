import React, { ReactElement } from 'react';
import styled from 'styled-components';

const SmallGreenLabelStyled = styled.label`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: ${(props) => props.theme.color.primary};
`;

function SmallGreenLabel({ label }: { label: string }): ReactElement {
  return <SmallGreenLabelStyled>{label}</SmallGreenLabelStyled>;
}

export default SmallGreenLabel;
