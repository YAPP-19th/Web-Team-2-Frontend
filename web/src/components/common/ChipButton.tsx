import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'secondary';
}

interface ChipButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  label: string;
}

const ChipButtonStyled = styled.button<ButtonProps>`
  width: 75px;
  height: 32px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 20px;
  ${(props) =>
    props.variant === 'primary'
      ? css`
          color: ${props.theme.color.white};
          border: 1px solid ${props.theme.color.primary};
          background-color: ${props.theme.color.primary};
          &:disabled {
            background-color: ${props.theme.color.grayLightest};
            border: none;
            color: ${props.theme.color.gray};
            cursor: not-allowed;
          }
        `
      : css`
          color: ${props.theme.color.grayDark};
          border: 1px solid ${props.theme.color.grayLight};
          &:disabled {
            cursor: not-allowed;
          }
        `}
`;

function ChipButton({
  variant,
  label,
  ...rest
}: ChipButtonProps): ReactElement {
  return (
    <ChipButtonStyled variant={variant} {...rest}>
      {label}
    </ChipButtonStyled>
  );
}

export default ChipButton;
