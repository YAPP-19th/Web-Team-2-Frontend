import { LogoWhite } from "assets/images";
import { flexCenter } from "assets/styles/utils";
import React, { ReactElement } from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 280px;
  background-color: #48bf91;
  ${flexCenter}
`;

const FooterLogo = styled.img`
  width: 273px;
  margin-right: 44px;
`;

const DownloadButton = styled.button`
  width: 174px;
  height: 3.463rem;
  border: solid 2px #fff;
  background-color: rgba(72, 191, 145, 0.95);
  border-radius: 2.2rem;
  color: #fff;
  font-size: 1.256rem;
  font-weight: bold;
`;

function Footer(): ReactElement {
  return (
    <FooterWrapper>
      <FooterLogo src={LogoWhite} />
      <DownloadButton>Download {"->"}</DownloadButton>
    </FooterWrapper>
  );
}

export default Footer;
