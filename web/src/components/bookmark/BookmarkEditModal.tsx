import transitions from 'assets/styles/transitions';
import SimpleButton from 'components/common/SimpleButton';
import TextareaAutosize from 'react-textarea-autosize';
import useHandleBookmark from 'hooks/bookmark/useHandleBookmark';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { IBookmarkOpenMenu } from './BookmarkList';

interface BookmarkEditModalProps {
  onToggleModal: () => void;
  isOpenMenu: IBookmarkOpenMenu;
}

const ModalTemplateWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: ${(props) => props.theme.color.white};
  width: 468px;
  border-radius: 12px;
  animation: ${transitions.fadeIn} 0.4s ease-in-out;
`;

const Background = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.black};
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.4;
`;

const ModalStyled = styled.div`
  padding: 26px 24px 24px;
  height: 100%;
`;

const ModalTitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.color.black};
  height: 23px;
  line-height: normal;
  margin-bottom: 14px;
`;

const InputInfo = styled.div`
  display: flex;
  font-size: 12px;
  color: ${(props) => props.theme.color.grayDarkest};
  font-weight: 500;
  font-family: 'Roboto';
  margin-bottom: 8px;
`;

const InputText = styled.div`
  margin-right: 6px;
`;

const InputCount = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? props.theme.color.primary : props.theme.color.gray};
`;

const EditInput = styled(TextareaAutosize)`
  margin-bottom: 24px;
  resize: none;
  outline: none;
  width: 100%;
  border-radius: 4px;
  border: solid 1px ${(props) => props.theme.color.grayLight};
  padding: 6px 10px;
`;

const ModalContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
`;

const ModalButtonGroup = styled.div`
  display: flex;
`;

const CancelButton = styled(SimpleButton)`
  color: ${(props) => props.theme.color.grayDark};
  margin-right: 8px;
`;

function BookmarkEditModal({
  onToggleModal,
  isOpenMenu,
}: BookmarkEditModalProps): ReactElement {
  const TEXT_MAX_LENGTH = 100;
  const [title, setTitle] = useState(isOpenMenu.title);
  const { onEditBookmark } = useHandleBookmark();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > TEXT_MAX_LENGTH) {
      return;
    }
    setTitle(e.target.value);
  };

  return (
    <ModalTemplateWrapper onMouseDown={onToggleModal}>
      <Inner onMouseDown={(e) => e.stopPropagation()}>
        <ModalStyled>
          <ModalTitle>????????? ??????</ModalTitle>
          <ModalContent>
            <InputInfo>
              <InputText>??????</InputText>
              <InputCount active={title.length === TEXT_MAX_LENGTH}>
                {title.length}/{TEXT_MAX_LENGTH}
              </InputCount>
            </InputInfo>
            <EditInput value={title} onChange={onChange} />
          </ModalContent>
          <ModalButtonGroup>
            <CancelButton
              variant="tertiary"
              width="206px"
              height="42px"
              borderRadius="8px"
              label="??????"
              onClick={onToggleModal}
            />
            <SimpleButton
              variant="primary"
              width="206px"
              height="42px"
              borderRadius="8px"
              label="??????"
              onClick={() => {
                onEditBookmark(isOpenMenu.id, title, !!isOpenMenu.remindTime);
                onToggleModal();
              }}
            />
          </ModalButtonGroup>
        </ModalStyled>
      </Inner>
      <Background />
    </ModalTemplateWrapper>
  );
}

export default BookmarkEditModal;
