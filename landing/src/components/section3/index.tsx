import { S3MainIMG } from "assets/images";
import { flexColumn, pagelayout } from "assets/styles/utils";
import CirclePoint from "components/CirclePoint";
import ImageBox from "components/ImageBox";
import SectionTemplate from "components/SectionTemplate";
import SectionTitle from "components/SectionTitle";
import React, { ReactElement } from "react";
import styled from "styled-components";

const SectionInner = styled.div`
  ${pagelayout}
  padding: 232px 0 208px 186px;
  flex-flow: row-reverse;
`;

const ContentBox = styled.div`
  width: 1254px;
  height: 332px;
  position: relative;
`;

const Description = styled.div`
  position: absolute;
  top: 0.956rem;
  left: 0;
  z-index: 10;
  ${flexColumn}
`;

const Text = styled.div`
  color: #000;
  font-size: 16px;
  line-height: 23px;
`;

function Section3(): ReactElement {
  return (
    <SectionTemplate filled>
      <SectionInner>
        <ContentBox>
          <ImageBox width="100%" height="100%" src={S3MainIMG} />
          <Description>
            <SectionTitle variant="primary">
              좋은 정보는 함께 공유함
            </SectionTitle>
            <Text>
              메신저에 공유한 정보가 자꾸 묻혀서 불편한가요? <br />
              보관함에 내용을 저장하고, 멤버를 초대해 공유해요!
            </Text>
          </Description>
          <CirclePoint width="78px" height="48px" top="11px" left="283px" />
        </ContentBox>
      </SectionInner>
    </SectionTemplate>
  );
}

export default Section3;
