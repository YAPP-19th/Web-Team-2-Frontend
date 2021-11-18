import { S2MainIMG } from "assets/images";
import React, { ReactElement } from "react";
import styled from "styled-components";

const Section2Wrapper = styled.div`
  width: 100%;
  height: 762px;
  background-color: #fff;
`;

const Section2Inner = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 148px 0 172px 0;
  display: flex;
`;

const MainImgBox = styled.img`
  width: 36.694rem;
  height: 442px;
  margin-right: 160px;
`;

const ContentBox = styled.div`
  padding-top: 124px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.span`
  font-family: Cafe24Ssurround;
  font-size: 38px;
  color: #000;
  font-weight: bold;
  z-index: 10;
  margin-bottom: 24px;
`;

const Circle = styled.div`
  width: 78px;
  height: 42px;
  background-color: rgba(72, 191, 145, 0.3);
  border-radius: 50%;
  position: absolute;
  top: 165px;
  z-index: 1;
  left: -5px;
`;

const Text = styled.div`
  color: #000;
  font-size: 16px;
  line-height: 23px;
`;

function Section2(): ReactElement {
  return (
    <Section2Wrapper>
      <Section2Inner>
        <MainImgBox src={S2MainIMG} />

        <ContentBox>
          <Title>
            북마크와 동시에 <br />
            정리해서 보관함
          </Title>
          <Circle />

          <Text>
            마구잡이로 저장된 북마크, 불편하지 않나요? <br />
            원하는 분류대로 깔끔하게 정리해요.
          </Text>
        </ContentBox>
      </Section2Inner>
    </Section2Wrapper>
  );
}

export default Section2;
