import Footer from "components/Footer";
import Header from "components/Header";
import Section1 from "components/Section1";
import Section2 from "components/Section2";
import Section3 from "components/Section3";
import Section4 from "components/Section4";
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
