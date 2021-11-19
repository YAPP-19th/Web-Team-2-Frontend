import { LogoIMG, S1MainIMG } from "assets/images";
import { flexColumn, pagelayout } from "assets/styles/common";
import ImageBox from "components/ImageBox";
import SectionTemplate from "components/SectionTemplate";
import React, { ReactElement } from "react";
import styled from "styled-components";

const SectionInner = styled.div`
  ${pagelayout}
  padding: 108px 0 122px 0;
`;

const ContentBox = styled.div`
  padding-top: 4.125rem;
  ${flexColumn}
`;

const Title = styled.span`
  font-family: Cafe24SsurroundAir;
  font-size: 1.863rem;
  color: #0baa78;
  margin-bottom: 15px;
`;

const Emphasis = styled.span`
  text-emphasis-style: dot;
  text-emphasis-position: over left;
  -webkit-text-emphasis-style: dot;
  -webkit-text-emphasis-position: over;
`;

const Logo = styled.img`
  width: 15.95rem;
  margin-bottom: 2.688rem;
`;

const Text = styled.div`
  color: #323232;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -0.1px;
  margin-bottom: 10px;
`;

const StrongText = styled.div`
  color: #323232;
  font-size: 16px;
  letter-spacing: -0.1px;
  margin-bottom: 10px;
  font-weight: 500;
  margin-bottom: 52px;
`;

const DownloadButton = styled.button`
  width: 156px;
  height: 3.1rem;
  border-radius: 1.975rem;
  background-color: rgba(72, 191, 145, 0.95);
  color: #fff;
  font-weight: bold;
  font-size: 1.131rem;
`;

function Section1(): ReactElement {
  return (
    <SectionTemplate filled>
      <SectionInner>
        <ImageBox
          width="672px"
          height="532px"
          marginRight="108px"
          src={S1MainIMG}
        />
        <ContentBox>
          <Title>
            흩어진 <Emphasis>북마크</Emphasis>를 모으는
          </Title>
          <Logo src={LogoIMG} />
          <Text>
            다람쥐는, 여러 군데 저장한 도토리 중 10%만 다시 찾는다고 해요.
            <br />
            여러분도 저장한 정보를 찾기 힘들진 않으신가요?
          </Text>
          <StrongText>
            도토리처럼 흩어진 정보, 도토리함에 북마크하세요!
          </StrongText>
          <DownloadButton>DownLoad {"->"}</DownloadButton>
        </ContentBox>
      </SectionInner>
    </SectionTemplate>
  );
}

export default Section1;
