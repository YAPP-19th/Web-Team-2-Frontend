import SimpleButton from 'components/common/SimpleButton';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ButtonGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveButton = styled(SimpleButton)`
  font-weight: 300;
  margin-left: 24px;
`;

interface ProfileEditButtonGroupProps {
  onEditSubmit: () => void;
}

function ProfileEditButtonGroup({
  onEditSubmit,
}: ProfileEditButtonGroupProps): ReactElement {
  const navigate = useNavigate();

  return (
    <ButtonGroupWrapper>
      <SimpleButton
        label="뒤로 가기"
        width="174px"
        height="40px"
        variant="secondary"
        onClick={() => navigate(-1)}
      />

      <SaveButton
        label="변경 내용 저장"
        width="174px"
        height="40px"
        variant="primary"
        onClick={onEditSubmit}
      />
    </ButtonGroupWrapper>
  );
}

export default ProfileEditButtonGroup;
