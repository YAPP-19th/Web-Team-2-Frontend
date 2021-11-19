import media from "assets/styles/media";
import React, { ReactElement } from "react";
import styled from "styled-components";

interface ImageBoxProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  marginRight?: string;
}

const ImageBoxStyled = styled.img<ImageBoxProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-right: ${(props) => props.marginRight};
  ${media.large} {
    display: none;
  }
`;

function ImageBox({
  height,
  width,
  marginRight,
  ...rest
}: ImageBoxProps): ReactElement {
  return (
    <ImageBoxStyled
      height={height}
      width={width}
      marginRight={marginRight}
      {...rest}
    />
  );
}

export default ImageBox;
