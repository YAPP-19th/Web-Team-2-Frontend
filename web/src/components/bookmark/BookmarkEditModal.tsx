import ModalTemplate from 'components/common/ModalTemplate';
import React, { ReactElement } from 'react';

interface BookmarkEditModalProps {
  isModal: boolean;
  onToggleModal: () => void;
}

function BookmarkEditModal({
  isModal,
  onToggleModal,
}: BookmarkEditModalProps): ReactElement {
  return (
    <ModalTemplate
      width="328px"
      height="213px"
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      asd
    </ModalTemplate>
  );
}

export default BookmarkEditModal;
