import { S3DesktopIMG, S3MobileIMG } from "assets/images";
import media from "assets/styles/media";
import { flexColumn, pagelayout } from "assets/styles/utils";
import CirclePoint from "components/CirclePoint";
import Image from "components/Image";
import SectionTemplate from "components/SectionTemplate";
import SectionTitle from "components/SectionTitle";
import Text from "components/Text";
import React, { ReactElement } from "react";
import styled from "styled-components";
import ResponsiveNewLine from "./ResponsiveNewLine";

const SectionInner = styled.div`
  ${pagelayout}
  padding: 232px 0 208px 186px;
  flex-flow: row-reverse;
  ${media.desktop} {
    width: 1300px;
    padding: 232px 0 208px 45px;
  }
  ${media.tablet} {
    padding: 80px 0 0 0;
    width: 100%;
  }
`;

const ContentBox = styled.div`
  width: 1254px;
  height: 358px;
  position: relative;
  overflow: hidden;
  ${media.tablet} {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 100%;
    height: auto;
  }
`;

const Description = styled.div`
  position: absolute;
  top: 2.956rem;
  left: 0;
  z-index: 10;
  ${flexColumn}
  ${media.tablet} {
    position: relative;
    top: inherit;
  }
`;

const ResponsiveImageBox = styled.div`
  ${media.mobile} {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const ResponsiveImage = styled(Image)`
  display: none;
  ${media.tablet} {
    display: block;
    width: 640px;
    margin-top: 76px;
  }
  ${media.mobile} {
    width: 306px;
  }
`;

const ResponsiveText = styled(Text)`
  ${media.tablet} {
    text-align: center;
  }
`;

const CirclePointStyled = styled(CirclePoint)`
  width: 78px;
  height: 48px;
  top: -4px;
  left: 283px;
  ${media.mobile} {
    width: 62px;
    height: 35px;
    top: 46px;
    left: 134px;
  }
`;

function Section3(): ReactElement {
  return (
    <SectionTemplate filled>
      <SectionInner>
        <ContentBox>
          <Image src={S3DesktopIMG} />
          <ResponsiveImageBox>
            <ResponsiveImage src={S3MobileIMG} />
          </ResponsiveImageBox>
          <Description>
            <SectionTitle variant="primary">
              ?????? ????????? <ResponsiveNewLine media="mobile" /> ?????? ?????????
            </SectionTitle>
            <ResponsiveText variant="primary">
              ???????????? ????????? ????????? ?????? ????????? ???????????????? <br />
              ???????????? ????????? ????????????, ????????? ????????? ????????????!
            </ResponsiveText>
            <CirclePointStyled />
          </Description>
        </ContentBox>
      </SectionInner>
    </SectionTemplate>
  );
}

export default Section3;
