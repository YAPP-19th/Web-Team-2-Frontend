import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MyPageHead from './MyPageHead';

const AccountSettingWrapper = styled.div`
  padding: 28px 0 138px;
  font-size: 14px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.black1};
`;

const AccountInfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
`;

const AccountLabel = styled.div`
  width: 297px;
`;

const AccountText = styled.span`
  font-family: 'Roboto';
`;

const AccountButton = styled.button`
  width: 174px;
  height: 36px;
  border-radius: 6px;
  border: solid 1px ${(props) => props.theme.color.lightGray3};
  color: ${(props) => props.theme.color.black1};
`;

const LogoutText = styled.button`
  color: ${(props) => props.theme.color.lightGray3};
`;

function AccountSetting(): ReactElement {
  return (
    <>
      <MyPageHead headText="계정 설정" />
      <AccountSettingWrapper>
        <AccountInfoBlock>
          <AccountLabel>이메일</AccountLabel>
          <AccountText>dotoriham@naver.com</AccountText>
        </AccountInfoBlock>

        <AccountInfoBlock>
          <AccountLabel>비밀번호</AccountLabel>
          {/* @TODO(dohyun) 일반계정이면 ? 비밀번호 변경 구글계정이면 ? 비밀번호 변경 불가 */}
          <AccountButton>비밀번호 변경</AccountButton>
        </AccountInfoBlock>

        <LogoutText>로그아웃 하시겠어요?</LogoutText>
      </AccountSettingWrapper>
    </>
  );
}

export default AccountSetting;
