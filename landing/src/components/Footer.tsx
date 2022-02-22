import { PointerSmallIcon } from "assets/icons";
import { LogoWhite, LogoWhiteSmall } from "assets/images";
import media from "assets/styles/media";
import { flexCenter } from "assets/styles/utils";
import React, { ReactElement } from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 392px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #48bf91;
  ${flexCenter}
  ${media.tablet} {
    height: 320px;
  }
  ${media.mobile} {
    height: 152px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterText = styled.span`
  font-family: Cafe24Ssurroundair;
  color: #fff;
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 24px;
  ${media.mobile} {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;

const FooterLogo = styled.img`
  margin-bottom: 44px;
  ${media.mobile} {
    display: none;
  }
`;

const ResponsiveLogo = styled.img`
  display: none;
  ${media.mobile} {
    display: block;
    margin-bottom: 16px;
    margin-right: 10px;
  }
`;

const DownloadButton = styled.a`
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
      <FooterContent>
        <FooterText>지금 바로 다운받으세요!</FooterText>
        <FooterLogo src={LogoWhite} />
        <ResponsiveLogo src={LogoWhiteSmall} />
        <DownloadButton
          href="https://chrome.google.com/webstore/detail/dotoriham/bmmjockgbmhknhnojebkhghcdgpgjdim?hl=ko"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
          <PointerSmallIcon />
        </DownloadButton>
      </FooterContent>
    </FooterWrapper>
  );
}

export default Footer;
