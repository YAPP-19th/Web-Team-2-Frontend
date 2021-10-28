import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface MyPageHeadProps {
  headText: string;
}

const MyPageHeadWrapper = styled.div``;

const HeadTextStyled = styled.h2`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: ${(props) => props.theme.color.black1};
  margin-bottom: 15px;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.lightGray2};
`;

function MyPageHead({ headText }: MyPageHeadProps): ReactElement {
  return (
    <MyPageHeadWrapper>
      <HeadTextStyled>{headText}</HeadTextStyled>
      <DividerLine />
    </MyPageHeadWrapper>
  );
}
export default MyPageHead;
