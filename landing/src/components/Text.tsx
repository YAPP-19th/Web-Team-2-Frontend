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
`;

function Text({ variant, children, ...rest }: TextProps): ReactElement {
  return (
    <TextStyled variant={variant} {...rest}>
      {children}
    </TextStyled>
  );
}

export default Text;
