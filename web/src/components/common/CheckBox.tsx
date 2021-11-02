import {
  CheckBox36Icon,
  CheckBoxIcon,
  CheckBoxSelected36Icon,
  CheckBoxSelectedIcon,
} from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface CheckBoxProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  isChecked: boolean;
}

const CheckBoxStyled = styled.button``;

function CheckBox({
  variant,
  isChecked,
  ...rest
}: CheckBoxProps): ReactElement {
  if (variant === 'primary') {
    return (
      <CheckBoxStyled {...rest}>
        {isChecked ? <CheckBoxSelected36Icon /> : <CheckBox36Icon />}
      </CheckBoxStyled>
    );
  }
  return (
    <CheckBoxStyled {...rest}>
      {isChecked ? <CheckBoxSelectedIcon /> : <CheckBoxIcon />}
    </CheckBoxStyled>
  );
}

export default CheckBox;
