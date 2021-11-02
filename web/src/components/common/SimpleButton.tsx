import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  width: string;
  height: string;
}

type SimpleButtonProps = {
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps;

const SimpleButtonStyled = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 8px;
  line-height: 1.5;
  font-size: 14px;

  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return css`
          background-color: ${props.theme.color.primary};
          color: ${props.theme.color.white0};
          font-weight: 500;
          border: none;
        `;
      case 'secondary':
        return css`
          background-color: ${props.theme.color.white0};
          color: ${props.theme.color.black1};
          border: 1px solid ${props.theme.color.border1};
        `;
      case 'tertiary':
        return css`
          background-color: ${props.theme.color.white0};
          color: ${props.theme.color.black1};
          border: 1px solid ${props.theme.color.border0};
        `;
      default:
        return css``;
    }
  }}

  &:disabled {
    background-color: ${(props) => props.theme.color.lightGray0};
    color: ${(props) => props.theme.color.border1};
    line-height: 1.42;
    border: none;
    cursor: not-allowed;
  }
`;

function SimpleButton({
  label,
  variant,
  width,
  height,
  ...rest
}: SimpleButtonProps): ReactElement {
  return (
    <SimpleButtonStyled
      variant={variant}
      width={width}
      height={height}
      {...rest}
    >
      {label}
    </SimpleButtonStyled>
  );
}

export default SimpleButton;
