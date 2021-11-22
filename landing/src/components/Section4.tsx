import { S4MainIMG, S4MobileMainIMG } from "assets/images";
import media from "assets/styles/media";
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
  padding: 185px 0 196px 285px;
  ${media.xlarge} {
    width: 1068px;
    padding: 185px 0 196px 130px;
  }
  ${media.large} {
    width: 100%;
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
    padding: 80px 0;
  }
`;

const Image = styled(ImageBox)`
  ${media.xlarge} {
    margin-right: 120px;
  }
`;

const ResponsiveImage = styled(ImageBox)`
  display: none;
  ${media.large} {
    display: block;
    width: 533px;
    height: 404px;
    margin-top: 60px;
  }
  ${media.medium} {
    width: 14.35rem;
    height: 15.669rem;
  }
`;

const ContentBox = styled.div`
  padding-top: 44px;
  position: relative;
  ${flexColumn}
  ${media.medium} {
    padding-top: 0;
  }
`;

const CirclePointStyled = styled(CirclePoint)`
  width: 146px;
  height: 48px;
  top: 84px;
  left: -3px;
  ${media.large} {
    left: 58px;
  }
  ${media.medium} {
    width: 115px;
    height: 35px;
    top: 46px;
    left: 61px;
  }
`;

function Section4(): ReactElement {
  return (
    <SectionTemplate>
      <SectionInner>
        <Image
          width="353px"
          height="382px"
          marginRight="241px"
          src={S4MainIMG}
        />
        <ResponsiveImage src={S4MobileMainIMG} />

        <ContentBox>
          <SectionTitle variant="primary">
            중요한 북마크는 <br />
            리마인드함
          </SectionTitle>
          <CirclePointStyled />

          <Text variant="primary">
            다시 읽고 싶은 정보는 리마인드 알림을 받아요. <br />
            놓친 알림도 따로 보관해드려요.
          </Text>
        </ContentBox>
      </SectionInner>
    </SectionTemplate>
  );
}

export default Section4;
