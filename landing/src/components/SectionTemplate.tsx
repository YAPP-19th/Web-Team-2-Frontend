import media from "assets/styles/media";
import React, { ReactElement } from "react";
import styled from "styled-components";

interface SectionTemplateProps {
  filled?: boolean;
  responsiveColor?: boolean;
  children: React.ReactNode;
}

const SectionTemplateWrapper = styled.div<{
  filled?: boolean;
  responsiveColor?: boolean;
}>`
  width: 100%;
  height: 762px;
  background-color: ${(props) =>
    props.filled ? "rgba(224, 255, 181, 0.5)" : "#fff"};
  ${media.tablet} {
    height: 870px;
  }
  ${media.mobile} {
    height: 624px;
    ${(props) =>
      props.responsiveColor && "background-color: rgba(224, 255, 181, 0.2)"}
  }
`;

function SectionTemplate({
  filled,
  responsiveColor,
  children,
  ...rest
}: SectionTemplateProps): ReactElement {
  return (
    <SectionTemplateWrapper
      filled={filled}
      responsiveColor={responsiveColor}
      {...rest}
    >
      {children}
    </SectionTemplateWrapper>
  );
}

export default SectionTemplate;
