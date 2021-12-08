import React, { ReactElement } from 'react';

import { DotoriLogo } from '..';
import { IconWrapper, Title, Wrapper } from './CompletionSection.styled';

export function CompletionSection(): ReactElement {
  return (
    <Wrapper>
      <IconWrapper>
        <DotoriLogo />
      </IconWrapper>
      <Title>도토리가 저장되었어요!</Title>
    </Wrapper>
  );
}
