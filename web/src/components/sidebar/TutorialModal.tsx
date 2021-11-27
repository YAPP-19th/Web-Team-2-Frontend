import ModalTemplate from 'components/common/ModalTemplate';
import React, { ReactElement } from 'react';

interface TutorialModalProps {
  isModal: boolean;
  onToggleModal: () => void;
}

function TutorialModal({
  isModal,
  onToggleModal,
}: TutorialModalProps): ReactElement {
  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="714px"
      height="471px"
    >
      as
    </ModalTemplate>
  );
}

export default TutorialModal;
