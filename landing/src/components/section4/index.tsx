import { S4MainIMG } from "assets/images";
import { flexColumn, pagelayout } from "assets/styles/utils";
import CirclePoint from "components/CirclePoint";
import ImageBox from "components/ImageBox";
import SectionTemplate from "components/SectionTemplate";
import SectionTitle from "components/SectionTitle";
import React, { ReactElement } from "react";
import styled from "styled-components";

const SectionInner = styled.div`
  ${pagelayout}
  padding: 185px 0 196px 285px;
`;

const ContentBox = styled.div`
  padding-top: 44px;
  position: relative;
  ${flexColumn}
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
          <SectionTitle variant="primary">
            중요한 북마크는 <br />
            리마인드함
          </SectionTitle>
          <CirclePoint width="146px" height="48px" top="84px" left="-3px" />

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
