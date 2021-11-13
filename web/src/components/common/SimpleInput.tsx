import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width: string;
  height: string;
  borderRadius?: string;
}

const SimpleInputStyled = styled.input<{ borderRadius: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${(props) => props.theme.color.grayLight};
  padding: 5.5px 12px 5.5px 10px;
  border-radius: ${(props) => props.borderRadius};
  outline: none;
`;

function SimpleInput({
  width,
  height,
  borderRadius = '4px',
  ...rest
}: SimpleInputProps): ReactElement {
  return (
    <SimpleInputStyled
      {...rest}
      borderRadius={borderRadius}
      width={width}
      height={height}
    />
  );
}

export default SimpleInput;
