import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface SimpleInputProps extends React.HTMLAttributes<HTMLInputElement> {
  width: string;
  height: string;
}

const SimpleInputStyled = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${(props) => props.theme.color.grayLight};
  padding: 5.5px 12px 5.5px 10px;
  border-radius: 4px;
  outline: none;
`;

function SimpleInput({
  width,
  height,
  ...rest
}: SimpleInputProps): ReactElement {
  return <SimpleInputStyled {...rest} width={width} height={height} />;
}

export default SimpleInput;
