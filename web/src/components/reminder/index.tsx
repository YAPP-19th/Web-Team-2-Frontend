import { ArrowDown16Icon, ArrowUp16Icon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import useToggle from 'hooks/common/useToggle';
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

const RightBox = styled.button`
  color: ${(props) => props.theme.color.gray1};
  font-size: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RightText = styled.span`
  margin-right: 4px;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.color.lightGray1};
`;

function Reminder(): ReactElement {
  const [isOpen, onToggleRemind] = useToggle(true);

  return (
    <ReminderWrapper>
      <Title>
        <LeftBox>리마인드</LeftBox>
        <RightBox onClick={onToggleRemind}>
          <RightText>{isOpen ? '접기' : '펼치기'}</RightText>
          {isOpen ? <ArrowUp16Icon /> : <ArrowDown16Icon />}
        </RightBox>
      </Title>
      {isOpen && <RemindList />}
      <DividerLine />
    </ReminderWrapper>
  );
}

export default Reminder;
