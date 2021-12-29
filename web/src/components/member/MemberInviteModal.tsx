import { X16BigIcon } from 'assets/icons';
import ModalTemplate from 'components/common/ModalTemplate';
import SimpleButton from 'components/common/SimpleButton';
import SmallGreenLabel from 'components/common/SmallGreenLabel';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface MemberInviteModalProps {
  isModal: boolean;
  onToggleModal: () => void;
}

const MemberInviteModalWrapper = styled.div`
  padding: 16px 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CloseButton = styled.button``;

const InviteFormField = styled.div`
  display: flex;
  align-items: center;
`;

const InviteTextBox = styled.div``;

function MemberInviteModal({
  isModal,
  onToggleModal,
}: MemberInviteModalProps): ReactElement {
  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="310px"
      height="387px"
    >
      <MemberInviteModalWrapper>
        <ModalHeader>
          <SmallGreenLabel label="멤버 초대" fontWeight="500" />
          <CloseButton onClick={onToggleModal}>
            <X16BigIcon />
          </CloseButton>
        </ModalHeader>

        <InviteFormField>
          <InviteTextBox>asd</InviteTextBox>
          <SimpleButton
            label="초대"
            variant="primary"
            width="72px"
            height="32px"
          />
        </InviteFormField>
      </MemberInviteModalWrapper>
    </ModalTemplate>
  );
}

export default MemberInviteModal;
