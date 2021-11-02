import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  borderColor?: string;
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
  ${(props) =>
    props.variant === 'primary'
      ? css`
          background-color: ${props.theme.color.primary};
          color: ${props.theme.color.white0};
          font-weight: 500;
          border: none;
        `
      : css`
          background-color: ${props.theme.color.white0};
          color: ${props.theme.color.black1};
          border: 1px solid ${props.borderColor};
        `}
  &:disabled {
    background-color: ${(props) => props.theme.color.border0};
    color: ${(props) => props.theme.color.white0};
    line-height: 1.42;
    border: none;
  }
`;

function SimpleButton({
  label,
  variant,
  borderColor,
  width,
  height,
  ...rest
}: SimpleButtonProps): ReactElement {
  return (
    <SimpleButtonStyled
      variant={variant}
      borderColor={borderColor}
      width={width}
      height={height}
      {...rest}
    >
      {label}
    </SimpleButtonStyled>
  );
}

export default SimpleButton;
