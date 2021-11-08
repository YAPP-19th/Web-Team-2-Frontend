import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;
`;

const DividerLine = styled.div`
  width: 123px;
  height: 1px;
  background-color: ${(props) => props.theme.color.grayDark};
`;

const DividerText = styled.span`
  width: 75px;
  height: 25px;
  font-size: 16px;
  text-align: center;
  line-height: 1.56;
  color: ${(props) => props.theme.color.grayDarker};
`;

function AuthDivider(): ReactElement {
  return (
    <Divider>
      <DividerLine />
      <DividerText>or</DividerText>
      <DividerLine />
    </Divider>
  );
}

export default AuthDivider;
