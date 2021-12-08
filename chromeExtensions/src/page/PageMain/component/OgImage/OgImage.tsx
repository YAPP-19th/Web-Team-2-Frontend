import React, { ReactElement } from 'react';

import { DotoriIcon } from '..';
import { EmptyImageBg, ImageWrapper, StyledImage } from './OgImage.styled';

interface Props {
  src: string;
  alt: string;
}

export function OgImage({ src, alt }: Props): ReactElement {
  return (
    <ImageWrapper>
      {src ? (
        <StyledImage src={src} alt={alt} />
      ) : (
        <EmptyImageBg>
          <DotoriIcon />
        </EmptyImageBg>
      )}
    </ImageWrapper>
  );
}
