import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface LargeBlackLabelProps {
  label: string;
}

const LargeBlackLabelStyled = styled.label`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: ${(props) => props.theme.color.grayDarkest};
`;

function LargeBlackLabel({ label }: LargeBlackLabelProps): ReactElement {
  return <LargeBlackLabelStyled>{label}</LargeBlackLabelStyled>;
}

export default LargeBlackLabel;
