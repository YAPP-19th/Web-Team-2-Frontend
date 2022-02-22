import { LogoSmall } from "assets/images";
import media from "assets/styles/media";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";

const HeaderWrapper = styled.header`
  width: 100%;
  height: 48px;
  background-color: #fff;
`;

const HeaderInner = styled.div`
  width: 1068px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${media.tablet} {
    width: 100%;
  }
  ${media.mobile} {
    padding: 00 16px;
  }
`;

const HeaderLogo = styled.img``;

const HeaderButtonGroup = styled.div`
  display: flex;
`;

const ButtonStyled = css`
  width: 99px;
  height: 32px;
  font-weight: 500;
  border-radius: 24px;
  font-size: 12px;
`;

const DownloadButton = styled.a`
  ${ButtonStyled}
  margin-right: 24px;
  background-color: #48bf91;
  border: 1px solid #48bf91;
  text-align: center;
  color: #fff;
  ${media.mobile} {
    margin-right: 0;
  }
`;

const LinkButton = styled.a`
  ${ButtonStyled}
  background-color: #fff;
  border: 1px solid #aaa;
  text-align: center;
  color: #323232;
  ${media.mobile} {
    display: none;
  }
`;

const ButtonText = styled.div`
  font-size: 12px;
  height: 32px;
  line-height: 28px;
`;

function Header(): ReactElement {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <HeaderLogo src={LogoSmall} />
        <HeaderButtonGroup>
          <DownloadButton
            href="https://chrome.google.com/webstore/detail/dotoriham/bmmjockgbmhknhnojebkhghcdgpgjdim?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonText>다운로드</ButtonText>
          </DownloadButton>
          <LinkButton
            href="https://dotoriham.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonText>도토리함 가기</ButtonText>
          </LinkButton>
        </HeaderButtonGroup>
      </HeaderInner>
    </HeaderWrapper>
  );
}

export default Header;
