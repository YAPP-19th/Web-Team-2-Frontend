import { ToggleOffIcon, ToggleOnIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ToggleIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isToggled: boolean;
}

const ToggleIconButtonStyled = styled.button``;

function ToggleIconButton({
  isToggled,
  ...rest
}: ToggleIconButtonProps): ReactElement {
  return (
    <ToggleIconButtonStyled {...rest}>
      {isToggled ? <ToggleOnIcon /> : <ToggleOffIcon />}
    </ToggleIconButtonStyled>
  );
}

export default ToggleIconButton;
