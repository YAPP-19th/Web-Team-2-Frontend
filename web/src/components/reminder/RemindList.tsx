import React, { ReactElement } from 'react';
import styled from 'styled-components';
import RemindListItem from './RemindListItem';

const mockData = [
  {
    id: 1,
    title: 'Reminder 1',
  },
  {
    id: 2,
    title: 'Reminder 2',
  },
  {
    id: 3,
    title: 'Reminder 3',
  },
  {
    id: 4,
    title: 'Reminder 4',
  },
];

const RemindListWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

function RemindList(): ReactElement {
  return (
    <RemindListWrapper>
      {mockData.map((data) => (
        <RemindListItem key={data.id} title={data.title} />
      ))}
    </RemindListWrapper>
  );
}

export default RemindList;
