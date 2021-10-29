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
  padding: 0 56px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterLeftBox = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
`;

const LogoBox = styled.div`
  width: 78px;
  height: 18px;
  margin-right: 85px;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;

const FooterMenuBlock = styled.div`
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
        <FooterLeftBox>
          <LogoBox>
            <LogoImage src={LogoBlackIMG} />
          </LogoBox>
          <FooterMenuBlock>
            <FooterMenuItem to="#">서비스 이용약관</FooterMenuItem>
            <VerticalLine />
            <FooterMenuItem to="#">개인정보 처리방침</FooterMenuItem>
            <VerticalLine />
            <FooterMenuItem to="#">피드백</FooterMenuItem>
          </FooterMenuBlock>
        </FooterLeftBox>
        <CopyRightText>Copyright © Dotoriham All rights reserved</CopyRightText>
      </FooterInner>
    </FooterWrapper>
  );
}
export default Footer;
