import media from "assets/styles/media";
import React, { ReactElement } from "react";
import styled from "styled-components";

interface SectionTemplateProps {
  filled?: boolean;
  children: React.ReactNode;
}

const SectionTemplateWrapper = styled.div<{ filled?: boolean }>`
  width: 100%;
  height: 762px;
  background-color: ${(props) =>
    props.filled ? "rgba(224, 255, 181, 0.5)" : "#fff"};
  ${media.large} {
    height: 870px;
  }
`;

function SectionTemplate({
  filled,
  children,
}: SectionTemplateProps): ReactElement {
  return (
    <SectionTemplateWrapper filled={filled}>{children}</SectionTemplateWrapper>
  );
}

export default SectionTemplate;
