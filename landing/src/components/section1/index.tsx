import { LogoIMG, S1MainIMG } from "assets/images";
import React, { ReactElement } from "react";
import styled from "styled-components";

const Section1Wrapper = styled.div`
  width: 100%;
  height: 762px;
  background-color: rgba(224, 255, 181, 0.5);
`;

const Section1Inner = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 108px 0 122px 0;
  display: flex;
`;

const MainImgBox = styled.img`
  width: 672px;
  height: 532px;
  margin-right: 108px;
`;

const ContentBox = styled.div`
  padding-top: 4.125rem;
  display: flex;
  flex-direction: column;
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
    <Section1Wrapper>
      <Section1Inner>
        <MainImgBox src={S1MainIMG} />
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
      </Section1Inner>
    </Section1Wrapper>
  );
}

export default Section1;
