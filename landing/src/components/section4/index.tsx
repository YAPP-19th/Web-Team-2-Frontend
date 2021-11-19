import { S4MainIMG } from "assets/images";
import { pagelayout } from "assets/styles/common";
import ImageBox from "components/ImageBox";
import SectionTemplate from "components/SectionTemplate";
import React, { ReactElement } from "react";
import styled from "styled-components";

const SectionInner = styled.div`
  ${pagelayout}
  padding: 185px 0 196px 285px;
`;

const ContentBox = styled.div`
  padding-top: 44px;
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
  width: 146px;
  height: 48px;
  background-color: rgba(72, 191, 145, 0.3);
  border-radius: 50%;
  position: absolute;
  top: 84px;
  z-index: 1;
  left: -3px;
`;

const Text = styled.div`
  color: #000;
  font-size: 16px;
  line-height: 23px;
`;

function Section4(): ReactElement {
  return (
    <SectionTemplate>
      <SectionInner>
        <ImageBox
          width="353px"
          height="382px"
          marginRight="241px"
          src={S4MainIMG}
        />

        <ContentBox>
          <Title>
            중요한 북마크는 <br />
            리마인드함
          </Title>
          <Circle />

          <Text>
            다시 읽고 싶은 정보는 리마인드 알림을 받아요. <br />
            놓친 알림도 따로 보관해드려요.
          </Text>
        </ContentBox>
      </SectionInner>
    </SectionTemplate>
  );
}

export default Section4;
