import {
  CheckBox36Icon,
  CheckBoxIcon,
  CheckBoxSelected36Icon,
  CheckBoxSelectedIcon,
} from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface CheckedProps {
  isChecked: boolean;
}

interface CheckBoxProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CheckedProps {
  variant: 'primary' | 'secondary';
}

const CheckBoxStyled = styled.button``;

function PrimaryCheckBox({ isChecked }: CheckedProps): ReactElement {
  return <>{isChecked ? <CheckBoxSelected36Icon /> : <CheckBox36Icon />}</>;
}

function SecondaryCheckBox({ isChecked }: CheckedProps): ReactElement {
  return <>{isChecked ? <CheckBoxSelectedIcon /> : <CheckBoxIcon />}</>;
}

function CheckBox({
  variant,
  isChecked,
  ...rest
}: CheckBoxProps): ReactElement {
  return (
    <CheckBoxStyled {...rest}>
      {variant === 'primary' ? (
        <PrimaryCheckBox isChecked={isChecked} />
      ) : (
        <SecondaryCheckBox isChecked={isChecked} />
      )}
    </CheckBoxStyled>
  );
}

export default CheckBox;
