import { S3MainIMG } from "assets/images";
import SectionTemplate from "components/SectionTemplate";
import React, { ReactElement } from "react";
import styled from "styled-components";

const Section3Inner = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 232px 0 208px 186px;
  display: flex;
  flex-flow: row-reverse;
`;

const ContentBox = styled.div`
  width: 1254px;
  height: 332px;
  position: relative;
`;

const MainImgBox = styled.img`
  width: 100%;
  height: 100%;
`;

const Description = styled.div`
  position: absolute;
  top: 0.956rem;
  left: 0;
  z-index: 10;
`;

const Title = styled.div`
  font-family: Cafe24Ssurround;
  font-size: 38px;
  color: #000;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Circle = styled.div`
  width: 78px;
  height: 48px;
  background-color: rgba(72, 191, 145, 0.3);
  border-radius: 50%;
  position: absolute;
  top: 11px;
  left: 283px;
  z-index: 1;
`;

const Text = styled.div`
  color: #000;
  font-size: 16px;
  line-height: 23px;
`;

function Section3(): ReactElement {
  return (
    <SectionTemplate filled>
      <Section3Inner>
        <ContentBox>
          <MainImgBox src={S3MainIMG} />
          <Description>
            <Title>좋은 정보는 함께 공유함</Title>
            <Text>
              메신저에 공유한 정보가 자꾸 묻혀서 불편한가요? <br />
              보관함에 내용을 저장하고, 멤버를 초대해 공유해요!
            </Text>
          </Description>
          <Circle />
        </ContentBox>
      </Section3Inner>
    </SectionTemplate>
  );
}

export default Section3;
