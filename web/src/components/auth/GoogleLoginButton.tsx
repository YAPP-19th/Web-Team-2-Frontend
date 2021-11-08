import React, { ReactElement } from 'react';
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENT_ID } from 'utils/config';
import { GoogleIMG } from 'assets/images';
import styled from 'styled-components';

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
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      onSuccess={() => console.log('oo')}
      onFailure={() => console.log('xx')}
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
