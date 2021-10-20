import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface RemindListItemProps {
  title: string;
}

const RemindListItemWrapper = styled.div`
  width: 174px;
  height: 96px;
  display: flex;
  border-radius: 10px;
  margin-right: 24px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
`;

const LeftBox = styled.div`
  width: 94px;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background-color: ${(props) => props.theme.color.lightGray0};
`;

const RightBox = styled.div`
  width: 80px;
  height: 100%;
  border-radius: 0 10px 10px 0;
`;

function RemindListItem({ title }: RemindListItemProps): ReactElement {
  return (
    <RemindListItemWrapper>
      <LeftBox />
      <RightBox>{title}</RightBox>
    </RemindListItemWrapper>
  );
}

export default RemindListItem;
