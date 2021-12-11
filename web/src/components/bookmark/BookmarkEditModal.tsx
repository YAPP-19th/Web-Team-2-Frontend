import ModalTemplate from 'components/common/ModalTemplate';
import SimpleButton from 'components/common/SimpleButton';
import SimpleInput from 'components/common/SimpleInput';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

interface BookmarkEditModalProps {
  isModal: boolean;
  onToggleModal: () => void;
}

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
  justify-content: space-between;
  font-size: 12px;
  color: ${(props) => props.theme.color.grayDarkest};
  font-family: 'Roboto';
  margin-bottom: 8px;
`;

const InputCount = styled.div`
  color: ${(props) => props.theme.color.grayDark};
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
  isModal,
  onToggleModal,
}: BookmarkEditModalProps): ReactElement {
  const [editForm, setEditForm] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm.length >= 100) {
      return;
    }
    setEditForm(e.target.value);
  };

  return (
    <ModalTemplate
      width="328px"
      height="213px"
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <ModalStyled>
        <ModalTitle>도토리 편집</ModalTitle>
        <ModalContent>
          <InputInfo>
            제목 <InputCount>{editForm.length}/100</InputCount>
          </InputInfo>
          <EditInput
            width="280px"
            height="35px"
            value={editForm}
            onChange={onChange}
          />
        </ModalContent>
        <ModalButtonGroup>
          <CancelButton
            variant="tertiary"
            width="136px"
            height="42px"
            borderRadius="8px"
            label="취소"
            onClick={onToggleModal}
          />
          <SimpleButton
            variant="primary"
            width="136px"
            height="42px"
            borderRadius="8px"
            label="편집"
            onClick={() => {
              onToggleModal();
            }}
          />
        </ModalButtonGroup>
      </ModalStyled>
    </ModalTemplate>
  );
}

export default BookmarkEditModal;
