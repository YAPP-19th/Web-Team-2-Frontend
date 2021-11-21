import { PointerIcon } from "assets/icons";
import { LogoIMG, S1MainIMG, S1MobileMainIMG } from "assets/images";
import media from "assets/styles/media";
import { flexCenter, flexColumn, pagelayout } from "assets/styles/utils";
import ImageBox from "components/ImageBox";
import SectionTemplate from "components/SectionTemplate";
import SectionTitle from "components/SectionTitle";
import Text from "components/Text";
import React, { ReactElement } from "react";
import styled from "styled-components";

const ResponsiveTemplate = styled(SectionTemplate)`
  ${media.medium} {
    height: 712px;
  }
`;

const SectionInner = styled.div`
  padding: 108px 0 122px 0;
  ${pagelayout}
  ${media.large} {
    width: 100%;
    flex-direction: column-reverse;
    padding: 48px 0 0 0;
    align-items: center;
  }
`;

const ResponsiveImageBox = styled(ImageBox)`
  display: none;
  ${media.large} {
    display: block;
    margin-top: 35px;
    width: 533px;
    height: 404px;
  }
  ${media.medium} {
    width: 360px;
    height: 256px;
  }
`;

const ContentBox = styled.div`
  padding-top: 4.125rem;
  ${flexColumn}
  ${media.xlarge} {
    align-items: center;
  }
  ${media.large} {
    padding-top: 0;
  }
`;

const Emphasis = styled.span`
  text-emphasis-style: dot;
  text-emphasis-position: over left;
  -webkit-text-emphasis-style: dot;
  -webkit-text-emphasis-position: over;
`;

const LineChange = styled.br`
  display: none;
  ${media.xlarge} {
    display: block;
  }
`;

const Logo = styled.img`
  width: 15.95rem;
  margin-bottom: 2.688rem;
  ${media.medium} {
    margin-bottom: 48px;
  }
`;

const ResponsiveText = styled(Text)`
  ${media.xlarge} {
    text-align: center;
  }
  ${media.medium} {
    color: #006054;
  }
`;

const StrongText = styled.div`
  font-weight: 500;
  margin: 10px 0 52px 0;
  ${media.large} {
    margin: 10px 0 25px 0;
  }
  ${media.medium} {
    margin: 16px 0 25px 0;
    text-decoration: underline;
  }
`;

const DownloadButton = styled.button`
  width: 156px;
  height: 3.1rem;
  border-radius: 1.975rem;
  background-color: rgba(72, 191, 145, 0.95);
  color: #fff;
  font-weight: bold;
  font-size: 1.131rem;
  margin-right: 0.281rem;
  ${flexCenter}
  ${media.medium} {
    display: none;
  }
`;

function Section1(): ReactElement {
  return (
    <ResponsiveTemplate filled responsiveColor>
      <SectionInner>
        <ImageBox
          width="672px"
          height="532px"
          marginRight="108px"
          src={S1MainIMG}
        />
        <ResponsiveImageBox src={S1MobileMainIMG} />
        <ContentBox>
          <SectionTitle variant="secondary">
            흩어진 <Emphasis>북마크</Emphasis>를 모으는
          </SectionTitle>

          <Logo src={LogoIMG} />
          <ResponsiveText variant="secondary">
            다람쥐는, 여러 군데 저장한
            <LineChange /> 도토리 중 10%만 다시 찾는다고 해요.
            <LineChange />
            <br />
            여러분도 저장한 정보를 찾기 <LineChange /> 힘들진 않으신가요?
            <StrongText>
              도토리처럼 흩어진 정보, <LineChange />
              도토리함에 북마크하세요!
            </StrongText>
          </ResponsiveText>

          <DownloadButton>
            DownLoad
            <PointerIcon />
          </DownloadButton>
        </ContentBox>
      </SectionInner>
    </ResponsiveTemplate>
  );
}

export default Section1;
