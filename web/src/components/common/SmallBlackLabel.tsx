import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface SmallBlackLabelProps {
  label: string;
  width?: string;
}

const SmallBlackLabelStyled = styled.label<{ width?: string }>`
  font-size: 14px;
  line-height: 1.5;
  ${(props) => props.width && `width: ${props.width};`}
`;

function SmallBlackLabel({
  label,
  width,
  ...rest
}: SmallBlackLabelProps): ReactElement {
  return (
    <SmallBlackLabelStyled width={width} {...rest}>
      {label}
    </SmallBlackLabelStyled>
  );
}

export default SmallBlackLabel;
