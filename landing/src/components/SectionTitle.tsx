import media from "assets/styles/media";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";

interface SectionTitleProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

const SectionTitleStyled = styled.span<SectionTitleProps>`
  ${(props) =>
    props.variant === "primary"
      ? css`
          font-family: Cafe24Ssurround;
          font-size: 38px;
          color: #000;
          font-weight: bold;
          z-index: 10;
          margin-bottom: 24px;
        `
      : css`
          font-family: Cafe24SsurroundAir;
          font-size: 1.863rem;
          color: #0baa78;
          margin-bottom: 15px;
          ${media.xlarge} {
            font-size: 25px;
          }
        `}
`;

function SectionTitle({ variant, children }: SectionTitleProps): ReactElement {
  return <SectionTitleStyled variant={variant}>{children}</SectionTitleStyled>;
}

export default SectionTitle;
