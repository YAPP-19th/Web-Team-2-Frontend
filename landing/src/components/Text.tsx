import media from "assets/styles/media";
import React, { ReactElement } from "react";
import styled from "styled-components";

interface TextProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

const TextStyled = styled.div<TextProps>`
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -0.1px;
  color: ${(props) => (props.variant === "primary" ? "#000" : "#323232")};
  ${media.mobile} {
    font-size: 14px;
    text-align: center;
    letter-spacing: normal;
  }
`;

function Text({ variant, children, ...rest }: TextProps): ReactElement {
  return (
    <TextStyled variant={variant} {...rest}>
      {children}
    </TextStyled>
  );
}

export default Text;
