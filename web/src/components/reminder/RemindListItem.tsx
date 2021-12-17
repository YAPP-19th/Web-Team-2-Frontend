import { deleteRemind } from 'api/remindAPI';
import { Symbol36Icon, X16Icon } from 'assets/icons';
import { remind } from 'models/remind';
import React, { ReactElement } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { QueryKey } from 'utils/const';

interface RemindListItemProps {
  remindData: remind.IRemindInfo;
}

const RemindListItemWrapper = styled.a`
  width: 174px;
  height: 96px;
  display: flex;
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 2px;
  border: 1px solid ${(props) => props.theme.color.grayLight};
`;

const RemindItemLeftBox = styled.div`
  width: 94px;
  height: 100%;
`;

const RemindItemDefaultImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background-color: ${(props) => props.theme.color.primaryLight};
`;

const RemindItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
`;

const RemindItemRightBox = styled.div`
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
  z-index: 105;
`;

function RemindListItem(props: RemindListItemProps): ReactElement {
  const { remindData } = props;
  const { description, image, title, link } = remindData;
  const queryClient = useQueryClient();

  const remindText = title || description; // @Note og 이미지가 없으면 title 표시

  const { mutate: mutateDeleteRemind } = useMutation(
    () => deleteRemind(remindData.id),
    {
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log('success');
      },
      onSettled: () => {
        queryClient.invalidateQueries(QueryKey.REMIND_CONTENTS);
      },
    },
  );

  return (
    <RemindListItemWrapper
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <RemindItemLeftBox>
        {image ? (
          <RemindItemImage src={image} />
        ) : (
          <RemindItemDefaultImage>
            <Symbol36Icon />
          </RemindItemDefaultImage>
        )}
      </RemindItemLeftBox>
      <RemindItemRightBox>
        <DeleteButton
          onClick={(e) => {
            e.preventDefault(); // @Note Delete 버튼은 a태그의 새창 열기를 막기 위해
            mutateDeleteRemind();
          }}
        />
        <RightBoxText>{remindText}</RightBoxText>
      </RemindItemRightBox>
    </RemindListItemWrapper>
  );
}

export default RemindListItem;
