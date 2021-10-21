import { Symbol36Icon, X16Icon } from 'assets/icons';
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
  margin-left: 24px;
  margin-bottom: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 94px;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background-color: ${(props) => props.theme.color.lightGray0};
`;

const RightBox = styled.div`
  width: 80px;
  height: 100%;
  border-radius: 0 10px 10px 0;
  display: flex;
  align-items: flex-end;
  padding: 42px 12px 12px 10px;
  position: relative;
`;

const RightBoxText = styled.p`
  word-break: break-all;
  margin: 0;
  overflow-wrap: break-word;
  font-size: 10px;
  line-height: 1.5;
  max-height: 42px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteButton = styled(X16Icon)`
  position: absolute;
  top: 8px;
  right: 10px;
  cursor: pointer;
`;

function RemindListItem({ title }: RemindListItemProps): ReactElement {
  return (
    <RemindListItemWrapper>
      <LeftBox>
        <Symbol36Icon />
      </LeftBox>
      <RightBox>
        <DeleteButton />
        <RightBoxText>{title}</RightBoxText>
      </RightBox>
    </RemindListItemWrapper>
  );
}

export default RemindListItem;
