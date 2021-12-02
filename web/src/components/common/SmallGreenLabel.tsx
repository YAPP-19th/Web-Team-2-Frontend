import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface SmallGreenLabelProps {
  label: string;
  fontWeight?: string;
}

const SmallGreenLabelStyled = styled.label<{ fontWeight?: string }>`
  font-size: 14px;
  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`}
  line-height: 1.5;
  color: ${(props) => props.theme.color.primary};
`;

function SmallGreenLabel({
  label,
  fontWeight,
  ...rest
}: SmallGreenLabelProps): ReactElement {
  return (
    <SmallGreenLabelStyled fontWeight={fontWeight} {...rest}>
      {label}
    </SmallGreenLabelStyled>
  );
}

export default SmallGreenLabel;
