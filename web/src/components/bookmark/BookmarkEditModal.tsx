import transitions from 'assets/styles/transitions';
import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
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
  z-index: 9999;
  background-color: ${(props) => props.theme.color.white};
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 468px;
  height: 213px;
  max-height: 255px;
  border-radius: 12px;
  animation: ${transitions.fadeIn} 0.4s ease-in-out;
`;

const Background = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.4;
`;

const ModalStyled = styled.div`
  padding: 26px 24px 24px;
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

const InputCount = styled.div`
  color: ${(props) => props.theme.color.gray};
`;

const EditInput = styled(SimpleInput)`
  margin-bottom: 24px;
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
  const [title, setTitle] = useState(isOpenMenu.title);

  const { onEditBookmark } = useHandleBookmark();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (title.length >= 100) {
      return;
    }
    setTitle(e.target.value);
  };

  return (
    <ModalTemplateWrapper onMouseDown={onToggleModal}>
      <Inner onMouseDown={(e) => e.stopPropagation()}>
        <ModalStyled>
          <ModalTitle>도토리 편집</ModalTitle>
          <ModalContent>
            <InputInfo>
              <InputText>제목</InputText>
              <InputCount>{title.length}/100</InputCount>
            </InputInfo>
            <EditInput
              width="100%"
              height="35px"
              value={title}
              onChange={onChange}
            />
          </ModalContent>
          <ModalButtonGroup>
            <CancelButton
              variant="tertiary"
              width="206px"
              height="42px"
              borderRadius="8px"
              label="취소"
              onClick={onToggleModal}
            />
            <SimpleButton
              variant="primary"
              width="206px"
              height="42px"
              borderRadius="8px"
              label="편집"
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
