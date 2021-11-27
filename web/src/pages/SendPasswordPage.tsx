import { Symbol120Icon } from 'assets/icons';
import SimpleButton from 'components/common/SimpleButton';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from 'routes/path';
import styled from 'styled-components';

const SendPasswordPageWrapper = styled.div`
  width: 321px;
  margin: 99px auto 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LogoIcon = styled(Symbol120Icon)`
  width: 120px;
  height: 120px;
  margin-bottom: 28px;
`;

const SendPasswordMessage = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const AdditionalMessage = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.color.grayDarker};
  line-height: 1.5;
  text-align: center;
  margin-bottom: 44px;
`;

const LoginButton = styled(SimpleButton)`
  font-size: 16px;
  font-weight: 400;
`;

function SendPasswordPage(): ReactElement {
  const navigate = useNavigate();
  return (
    <SendPasswordPageWrapper>
      <LogoIcon />
      <SendPasswordMessage>
        임시 비밀번호가 발송 완료되었습니다!
      </SendPasswordMessage>
      <AdditionalMessage>
        메일을 받지 못 하셨다면 스팸메일함을 확인해주세요.
        <br />
        비밀번호는 마이페이지에서 언제든지 변경할 수 있어요!
      </AdditionalMessage>
      <LoginButton
        width="100%"
        height="56px"
        borderRadius="8px"
        label="로그인"
        variant="primary"
        onClick={() => navigate(Path.LoginPage)}
      />
    </SendPasswordPageWrapper>
  );
}

export default SendPasswordPage;
