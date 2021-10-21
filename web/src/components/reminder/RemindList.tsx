import { Back24Icon, Next24Icon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import RemindListItem from './RemindListItem';

const mockData = [
  {
    id: 1,
    title: 'Reminder 1',
  },
  {
    id: 2,
    title: 'Reminder 2asdasdasdas zdasdaasdasdasdsdasdasdasdasd',
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
  margin-bottom: 19px;
`;

const commonIconBlockStyle = css`
  position: relative;
  width: 24px;
`;

const BackIconBlock = styled.div`
  ${commonIconBlockStyle}
`;

const NextIconBlock = styled.div`
  ${commonIconBlockStyle}
  margin-left:24px;
`;

const commonButtonStyle = css`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const BackButton = styled(Back24Icon)`
  ${commonButtonStyle}
`;

const NextButton = styled(Next24Icon)`
  ${commonButtonStyle}
`;

function RemindList(): ReactElement {
  return (
    <RemindListWrapper>
      <BackIconBlock>
        <BackButton />
      </BackIconBlock>
      {mockData.map((data) => (
        <RemindListItem key={data.id} title={data.title} />
      ))}
      <NextIconBlock>
        <NextButton />
      </NextIconBlock>
    </RemindListWrapper>
  );
}

export default RemindList;
