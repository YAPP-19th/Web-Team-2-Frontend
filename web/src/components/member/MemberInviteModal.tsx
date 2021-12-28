import ModalTemplate from 'components/common/ModalTemplate';
import React, { ReactElement } from 'react';

interface MemberInviteModalProps {
  isModal: boolean;
  onToggleModal: () => void;
}

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
      d
    </ModalTemplate>
  );
}

export default MemberInviteModal;
