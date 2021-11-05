import { LogoBlackIMG } from 'assets/images';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  height: 57px;
  line-height: 1.42;
  font-size: 12px;
  border-top: 1px solid ${(props) => props.theme.color.border0};
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
  height: 18px;
  margin-right: 28px;
`;

const LogoImage = styled.img`
  width: 78px;
  height: 18px;
`;

const FooterMenu = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.gray1};
`;

const FooterMenuItem = styled(Link)``;

const VerticalLine = styled.div`
  width: 1px;
  height: 17px;
  margin: 0 19px 0 20px;
  background-color: ${(props) => props.theme.color.lightGray3};
`;

const CopyRightText = styled.span`
  font-family: 'Roboto';
  color: ${(props) => props.theme.color.gray0};
`;

function Footer(): ReactElement {
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterLinkGroup>
          <Logo>
            <LogoImage src={LogoBlackIMG} />
          </Logo>

          <FooterMenu>
            <FooterMenuItem to="#">서비스 이용약관</FooterMenuItem>
            <VerticalLine />
            <FooterMenuItem to="#">개인정보 처리방침</FooterMenuItem>
            <VerticalLine />
            <FooterMenuItem to="#">피드백</FooterMenuItem>
          </FooterMenu>
        </FooterLinkGroup>
        <CopyRightText>Copyright © Dotoriham All rights reserved</CopyRightText>
      </FooterInner>
    </FooterWrapper>
  );
}
export default Footer;
