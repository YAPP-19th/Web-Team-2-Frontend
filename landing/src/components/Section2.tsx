import { S2MainIMG, S2MobileMainIMG } from "assets/images";
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
  padding: 148px 0 172px 167px;
  ${media.xlarge} {
    width: 1068px;
    padding: 148px 0 172px 0;
  }
  ${media.tablet} {
    flex-direction: column-reverse;
    padding: 84px 0 172px 0;
    width: 100%;
    align-items: center;
  }
`;

const ContentBox = styled.div`
  margin-top: 124px;
  position: relative;
  ${flexColumn}
  ${media.tablet} {
    margin-top: 0;
  }
`;

const Image = styled(ImageBox)`
  ${media.xlarge} {
    margin-right: 120px;
  }
`;

const ResponsiveImageBox = styled.div`
  ${media.mobile} {
    width: 100%;
  }
`;

const ResponsiveImage = styled(ImageBox)`
  display: none;
  ${media.tablet} {
    display: block;
    width: 533px;
    height: 404px;
    margin-top: 60px;
  }
  ${media.mobile} {
    width: 332px;
    height: 239px;
  }
`;

const CirclePointStyled = styled(CirclePoint)`
  width: 78px;
  height: 42px;
  top: 42px;
  left: -5px;
  ${media.mobile} {
    width: 60px;
    height: 33px;
    top: 47px;
    left: 20px;
  }
`;

function Section2(): ReactElement {
  return (
    <SectionTemplate>
      <SectionInner>
        <Image
          width="36.694rem"
          height="442px"
          marginRight="160px"
          src={S2MainIMG}
        />
        <ResponsiveImageBox>
          <ResponsiveImage src={S2MobileMainIMG} />
        </ResponsiveImageBox>
        <ContentBox>
          <SectionTitle variant="primary">
            북마크와 동시에 <br />
            정리해서 보관함
          </SectionTitle>
          <CirclePointStyled />

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
