import media from "assets/styles/media";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";

interface ResponsiveNewLineProps {
  media: "desktop" | "tablet" | "mobile";
}

const NewLine = styled.br<ResponsiveNewLineProps>`
  display: none;
  ${(props) => {
    switch (props.media) {
      case "desktop":
        return css`
          ${media.desktop} {
            display: block;
          }
        `;
      case "tablet":
        return css`
          ${media.tablet} {
            display: block;
          }
        `;
      case "mobile":
        return css`
          ${media.mobile} {
            display: block;
          }
        `;
      default:
        return css``;
    }
  }}
`;

function ResponsiveNewLine({ media }: ResponsiveNewLineProps): ReactElement {
  return <NewLine media={media} />;
}

export default ResponsiveNewLine;
