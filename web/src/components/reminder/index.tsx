import React, { ReactElement } from 'react';
import styled from 'styled-components';
import RemindList from './RemindList';

const ReminderWrapper = styled.div``;

const Title = styled.h2`
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  margin-bottom: 16px;
  height: 21px;
  width: 174px;
  line-height: 1.5;
`;

function Reminder(): ReactElement {
  return (
    <ReminderWrapper>
      <Title>리마인드</Title>
      <RemindList />
    </ReminderWrapper>
  );
}

export default Reminder;
