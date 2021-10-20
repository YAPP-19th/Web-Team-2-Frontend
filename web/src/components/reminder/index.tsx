import { ArrowUp16Icon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import RemindList from './RemindList';

const ReminderWrapper = styled.div``;

const Title = styled.div`
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  margin-bottom: 16px;
  height: 21px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftBox = styled.div`
  color: ${(props) => props.theme.color.black1};
`;

const RightBox = styled.div`
  color: ${(props) => props.theme.color.gray1};
  font-size: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RightText = styled.span`
  margin-right: 4px;
`;

function Reminder(): ReactElement {
  return (
    <ReminderWrapper>
      <Title>
        <LeftBox>리마인드</LeftBox>
        <RightBox>
          <RightText>접기</RightText>
          <ArrowUp16Icon />
        </RightBox>
      </Title>
      <RemindList />
    </ReminderWrapper>
  );
}

export default Reminder;
