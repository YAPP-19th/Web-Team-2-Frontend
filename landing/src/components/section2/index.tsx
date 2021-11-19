import { S2MainIMG } from "assets/images";
import { flexColumn, pagelayout } from "assets/styles/utils";
import ImageBox from "components/ImageBox";
import SectionTemplate from "components/SectionTemplate";
import SectionTitle from "components/SectionTitle";
import React, { ReactElement } from "react";
import styled from "styled-components";

const SectionInner = styled.div`
  ${pagelayout}
  padding: 148px 0 172px 167px;
`;

const ContentBox = styled.div`
  padding-top: 124px;
  position: relative;
  ${flexColumn}
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
    <SectionTemplate>
      <SectionInner>
        <ImageBox
          width="36.694rem"
          height="442px"
          marginRight="160px"
          src={S2MainIMG}
        />

        <ContentBox>
          <SectionTitle variant="primary">
            북마크와 동시에 <br />
            정리해서 보관함
          </SectionTitle>
          <Circle />

          <Text>
            마구잡이로 저장된 북마크, 불편하지 않나요? <br />
            원하는 분류대로 깔끔하게 정리해요.
          </Text>
        </ContentBox>
      </SectionInner>
    </SectionTemplate>
  );
}

export default Section2;
