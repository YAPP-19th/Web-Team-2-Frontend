import { PointerSmallIcon } from "assets/icons";
import { LogoWhite, LogoWhiteSmall } from "assets/images";
import media from "assets/styles/media";
import { flexCenter } from "assets/styles/utils";
import React, { ReactElement } from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 280px;
  background-color: #48bf91;
  ${flexCenter}
  ${media.tablet} {
    height: 140px;
  }
  ${media.mobile} {
    height: 96px;
  }
`;

const FooterLogo = styled.img`
  width: 273px;
  margin-right: 44px;
  ${media.mobile} {
    display: none;
  }
`;

const ResponsiveLogo = styled.img`
  display: none;
  ${media.mobile} {
    display: block;
    margin-right: 19px;
  }
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
  ${flexCenter}
  ${media.mobile} {
    width: 96px;
    height: 32px;
    font-size: 12px;
  }
`;

function Footer(): ReactElement {
  return (
    <FooterWrapper>
      <FooterLogo src={LogoWhite} />
      <ResponsiveLogo src={LogoWhiteSmall} />
      <DownloadButton>
        Download
        <PointerSmallIcon />
      </DownloadButton>
    </FooterWrapper>
  );
}

export default Footer;
