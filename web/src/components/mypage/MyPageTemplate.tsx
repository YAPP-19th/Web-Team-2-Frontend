import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface MyPageProps {
  children: React.ReactNode;
}

const MyPageWrapper = styled.div`
  width: 667px;
  margin: 0 auto;
`;

const MyPageInner = styled.div`
  padding-top: 48px;
`;

function MyPageTemplate({ children, ...rest }: MyPageProps): ReactElement {
  return (
    <MyPageWrapper {...rest}>
      <MyPageInner>{children}</MyPageInner>
    </MyPageWrapper>
  );
}

export default MyPageTemplate;
