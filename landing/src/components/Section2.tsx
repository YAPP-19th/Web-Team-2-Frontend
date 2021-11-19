import { S2MainIMG } from "assets/images";
import { flexColumn, pagelayout } from "assets/styles/utils";
import CirclePoint from "components/CirclePoint";
import ImageBox from "components/ImageBox";
import SectionTemplate from "components/SectionTemplate";
import SectionTitle from "components/SectionTitle";
import Text from "components/Text";
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
          <CirclePoint width="78px" height="42px" top="165px" left="-5px" />

          <Text variant="primary">
            마구잡이로 저장된 북마크, 불편하지 않나요? <br />
            원하는 분류대로 깔끔하게 정리해요.
          </Text>
        </ContentBox>
      </SectionInner>
    </SectionTemplate>
  );
}

export default Section2;
