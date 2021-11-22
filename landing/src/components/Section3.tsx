import { S3MainIMG, S3MobileMainIMG } from "assets/images";
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
  padding: 232px 0 208px 186px;
  flex-flow: row-reverse;
  ${media.xlarge} {
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
  height: 332px;
  position: relative;
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
  top: 0.956rem;
  left: 0;
  z-index: 10;
  ${flexColumn}
  ${media.tablet} {
    position: relative;
    top: inherit;
  }
`;

const ResponsiveImage = styled(ImageBox)`
  display: none;
  ${media.tablet} {
    display: block;
    width: 533px;
    height: 404px;
    margin-top: 64px;
  }
  ${media.mobile} {
    width: 306px;
    height: 210px;
  }
`;

const ResponsiveText = styled(Text)`
  ${media.tablet} {
    text-align: center;
  }
`;

const LineChange = styled.br`
  display: none;
  ${media.mobile} {
    display: block;
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
          <ImageBox width="100%" height="100%" src={S3MainIMG} />
          <ResponsiveImage src={S3MobileMainIMG} />
          <Description>
            <SectionTitle variant="primary">
              좋은 정보는 <LineChange /> 함께 공유함
            </SectionTitle>
            <ResponsiveText variant="primary">
              메신저에 공유한 정보가 자꾸 묻혀서 불편한가요? <br />
              보관함에 내용을 저장하고, 멤버를 초대해 공유해요!
            </ResponsiveText>
            <CirclePointStyled />
          </Description>
        </ContentBox>
      </SectionInner>
    </SectionTemplate>
  );
}

export default Section3;
