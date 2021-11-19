import { LogoSmall } from "assets/images";
import React, { ReactElement } from "react";
import styled from "styled-components";

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
`;

const HeaderLogo = styled.img``;

const HeaderButtonGroup = styled.div`
  display: flex;
`;

const DownloadButton = styled.button`
  margin-right: 24px;
  width: 99px;
  height: 32px;
  background-color: #48bf91;
  border: 1px solid #48bf91;
  color: #fff;
  font-weight: 500;
  border-radius: 24px;
  font-size: 12px;
`;

const LinkButton = styled.button`
  width: 99px;
  height: 32px;
  background-color: #fff;
  font-weight: 500;
  border: 1px solid #aaa;
  color: #323232;
  border-radius: 24px;
  font-size: 12px;
`;

const Text = styled.div`
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
          <DownloadButton>
            <Text>다운로드</Text>
          </DownloadButton>
          <LinkButton>
            <Text>도토리함 가기</Text>
          </LinkButton>
        </HeaderButtonGroup>
      </HeaderInner>
    </HeaderWrapper>
  );
}

export default Header;
