import Footer from "components/footer";
import Header from "components/header";
import Section1 from "components/section1";
import Section2 from "components/section2";
import Section3 from "components/section3";
import Section4 from "components/section4";
import React, { ReactElement } from "react";
import styled from "styled-components";

const LandingWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function LandingPage(): ReactElement {
  return (
    <LandingWrapper>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </LandingWrapper>
  );
}

export default LandingPage;
