import { SymbolGray96Icon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface BlankSlateProps {
  text:
    | '찾으시는 도토리가 없어요!'
    | '휴지통이 비어있어요!'
    | '아직 저장한 도토리가 없어요!';
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
