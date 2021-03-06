import React, { ReactElement } from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleIMG } from 'assets/images';
import styled from 'styled-components';
import useGoogleLogin from 'hooks/auth/useGoogleLogin';

const GoogleImg = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 8px;
`;

const GoogleButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.grayDarkest};
  border: 1.5px solid ${(props) => props.theme.color.gray};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoogleButtonText = styled.span`
  font-size: 16px;
  font-weight: 500;
  height: 36px;
  line-height: 32px;
`;

function GoogleLoginButton(): ReactElement {
  const { clientId, onGoogleLogin } = useGoogleLogin();

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onGoogleLogin}
      render={(renderProps) => (
        <GoogleButton onClick={renderProps.onClick}>
          <GoogleImg src={GoogleIMG} alt="google" />
          <GoogleButtonText>구글 계정으로 원클릭 로그인</GoogleButtonText>
        </GoogleButton>
      )}
    />
  );
}

export default GoogleLoginButton;
