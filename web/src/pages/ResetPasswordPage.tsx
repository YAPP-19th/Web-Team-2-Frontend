import SimpleButton from 'components/common/SimpleButton';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ResetPasswordPageWrapper = styled.div`
  width: 321px;
  margin: 186px auto 0;
`;

const ResetPageTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 24px;
  color: ${(props) => props.theme.color.black};
`;

const EmailInput = styled.input`
  font-size: 16px;
  padding: 15px 16px 16px 24px;
  border-radius: 8px;
  width: 100%;
  height: 56px;
  outline: none;
  border: 1px solid ${(props) => props.theme.color.grayLight};
  &::placeholder {
    color: ${(props) => props.theme.color.grayDark};
  }
`;

const SubmitButton = styled(SimpleButton)`
  font-size: 16px;
  font-weight: 400;
  margin-top: 32px;
`;

function ResetPasswordPage(): ReactElement {
  return (
    <ResetPasswordPageWrapper>
      <ResetPageTitle>비밀번호 재설정</ResetPageTitle>
      <EmailInput type="text" placeholder="이메일" />
      <SubmitButton
        width="100%"
        height="56px"
        borderRadius="8px"
        variant="primary"
        label="임시 비밀번호 발급"
      />
    </ResetPasswordPageWrapper>
  );
}

export default ResetPasswordPage;
