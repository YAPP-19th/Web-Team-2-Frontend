import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MyPageHead from './MyPageHead';

const ConfigurationWrapper = styled.div``;

function Configuration(): ReactElement {
  return (
    <ConfigurationWrapper>
      <MyPageHead headText="환경 설정" />
    </ConfigurationWrapper>
  );
}

export default Configuration;
