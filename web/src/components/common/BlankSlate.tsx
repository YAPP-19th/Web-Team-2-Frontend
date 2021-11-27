import { SymbolGray96Icon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface BlankSlateProps {
  text: string;
}

const BlankSlateStyled = styled.div`
  width: 273px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled(SymbolGray96Icon)`
  margin-bottom: 16px;
`;

const Text = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.grayDarker};
`;

function BlankSlate({ text }: BlankSlateProps): ReactElement {
  return (
    <BlankSlateStyled>
      <Logo />
      <Text>{text}</Text>
    </BlankSlateStyled>
  );
}

export default BlankSlate;
