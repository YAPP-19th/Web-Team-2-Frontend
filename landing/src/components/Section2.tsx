import { S2DesktopIMG, S2MobileIMG } from "assets/images";
import media from "assets/styles/media";
import { flexColumn, pagelayout } from "assets/styles/utils";
import CirclePoint from "components/CirclePoint";
import Image from "components/Image";
import SectionTemplate from "components/SectionTemplate";
import SectionTitle from "components/SectionTitle";
import Text from "components/Text";
import React, { ReactElement } from "react";
import styled from "styled-components";

const SectionInner = styled.div`
  ${pagelayout}
  padding: 148px 0 172px 167px;
  ${media.desktop} {
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

const ImageStyled = styled(Image)`
  ${media.desktop} {
    margin-right: 120px;
  }
`;

const ResponsiveImageBox = styled.div`
  ${media.mobile} {
    width: 100%;
  }
`;

const ResponsiveImage = styled(Image)`
  display: none;
  ${media.tablet} {
    display: block;
    width: 630px;
    margin-top: 60px;
  }
  ${media.mobile} {
    width: 332px;
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
        <ImageStyled
          width="36.694rem"
          height="442px"
          marginRight="160px"
          src={S2DesktopIMG}
        />
        <ResponsiveImageBox>
          <ResponsiveImage src={S2MobileIMG} />
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
