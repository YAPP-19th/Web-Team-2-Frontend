import DividerLine from 'components/common/DividerLine';
import LargeBlackLabel from 'components/common/LargeBlackLabel';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface MyPageHeadProps {
  headText: string;
}

const MyPageHeadWrapper = styled.div`
  width: 100%;
`;

const DividerLineStyled = styled(DividerLine)`
  margin-top: 15px;
  background-color: ${(props) => props.theme.color.grayLight};
`;

function MyPageHead({ headText }: MyPageHeadProps): ReactElement {
  return (
    <MyPageHeadWrapper>
      <LargeBlackLabel label={headText} />
      <DividerLineStyled />
    </MyPageHeadWrapper>
  );
}
export default MyPageHead;
