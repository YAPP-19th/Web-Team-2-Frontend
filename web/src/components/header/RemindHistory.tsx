import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface RemindHistoryProps {
  historyItem: { time: number; title: string }[];
}

const RemindHistoryBox = styled.div`
  position: absolute;
  width: 264px;
  height: 295px;
  background: ${(props) => props.theme.color.white};
  top: 45px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  border: 1px solid ${(props) => props.theme.color.grayLightest};
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.color.white};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.grayLight};
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
`;

const RemindHistoryItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 59px;
  border-bottom: 1px solid ${(props) => props.theme.color.grayLightest};
`;

const TimeAlramBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 12px 4px;
`;

const TimeAlarmMessage = styled.span`
  font-size: 10px;
  font-weight: normal;
  color: ${(props) => props.theme.color.grayDark};
`;

const RemindBookmarkTitle = styled.span`
  height: 17px;
  flex-grow: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.42;
  margin-left: 12px;
  margin-bottom: 12px;
`;

function RemindHistory(props: RemindHistoryProps): ReactElement {
  const { historyItem } = props;
  // @TODO(jekoo): change format remind time
  return (
    <RemindHistoryBox>
      {historyItem.map((data, idx) => {
        return (
          <RemindHistoryItem key={`${data.title}_${idx}`}>
            <TimeAlramBox>
              <TimeAlarmMessage>리마인드 알림이 도착했어요.</TimeAlarmMessage>
              <TimeAlarmMessage>{`${data.time}분전`}</TimeAlarmMessage>
            </TimeAlramBox>
            <RemindBookmarkTitle>{data.title}</RemindBookmarkTitle>
          </RemindHistoryItem>
        );
      })}
    </RemindHistoryBox>
  );
}

export default RemindHistory;
