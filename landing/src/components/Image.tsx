import media from "assets/styles/media";
import React, { ReactElement } from "react";
import styled from "styled-components";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  marginRight?: string;
}

const ImageStyled = styled.img<ImageProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-right: ${(props) => props.marginRight};
  ${media.tablet} {
    display: none;
  }
`;

function Image({
  height,
  width,
  marginRight,
  ...rest
}: ImageProps): ReactElement {
  return (
    <ImageStyled
      height={height}
      width={width}
      marginRight={marginRight}
      {...rest}
    />
  );
}

export default Image;
