import { SymbolGray22Icon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  height: 57px;
  line-height: 1.42;
  font-size: 12px;
  border-top: 1px solid ${(props) => props.theme.color.grayLight};
`;

const FooterInner = styled.div`
  height: 100%;
  width: ${(props) => props.theme.basicWidth};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterLinkGroup = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
`;

const Logo = styled.div`
  width: 170px;
  height: 22px;
  margin-right: 28px;
  display: flex;
`;

const LogoIcon = styled(SymbolGray22Icon)`
  margin-right: 0.225rem;
`;

const LogoText = styled.span`
  font-family: Cafe24Ssurround;
  font-size: 16px;
  color: ${(props) => props.theme.color.grayDarker};
  line-height: 26px;
  transform: skew(-0.1deg);
`;

const FooterMenu = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.grayDarker};
`;

const FooterMenuItem = styled.a``;

const VerticalLine = styled.div`
  width: 1px;
  height: 17px;
  margin: 0 19px 0 20px;
  background-color: ${(props) => props.theme.color.gray};
`;

const CopyRightText = styled.span`
  font-family: 'Roboto';
  color: ${(props) => props.theme.color.grayDark};
`;

function Footer(): ReactElement {
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterLinkGroup>
          <Logo>
            <LogoIcon />
            <LogoText>도토리함</LogoText>
          </Logo>

          <FooterMenu>
            <FooterMenuItem
              href="https://vintage-pizza-6f7.notion.site/0a28c30e1c9d436c80b421a753e03508"
              target="_blank"
              rel="noopener noreferrer"
            >
              서비스 이용약관
            </FooterMenuItem>
            <VerticalLine />
            <FooterMenuItem
              href="https://vintage-pizza-6f7.notion.site/db9f11ee53ff4688b9bd870beb756b21"
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보 처리방침
            </FooterMenuItem>
            <VerticalLine />
            <FooterMenuItem
              href="https://docs.google.com/forms/d/e/1FAIpQLSdH_XcTaymnaLASko_tSYu_8FlupBoXYBJWejwrb63eZHKMqA/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              피드백
            </FooterMenuItem>
          </FooterMenu>
        </FooterLinkGroup>
        <CopyRightText>Copyright © Dotoriham All rights reserved</CopyRightText>
      </FooterInner>
    </FooterWrapper>
  );
}
export default Footer;
