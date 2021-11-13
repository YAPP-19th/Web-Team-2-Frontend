import DividerLine from 'components/common/DividerLine';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const AuthDividerStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;
`;

const Divider = styled(DividerLine)`
  width: 123px;
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
    <AuthDividerStyled>
      <Divider />
      <DividerText>or</DividerText>
      <Divider />
    </AuthDividerStyled>
  );
}

export default AuthDivider;
