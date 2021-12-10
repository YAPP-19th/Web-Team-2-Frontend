import { SymbolGray96Icon } from 'assets/icons';
import SimpleButton from 'components/common/SimpleButton';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPageWrapper = styled.div`
  width: 100%;
  margin-top: 273px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NotFoundContent = styled.div`
  width: 273px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled(SymbolGray96Icon)`
  margin-bottom: 16px;
`;

const StrongText = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.color.grayDarker};
  font-family: Roboto;
  margin-bottom: 16px;
`;

const Text = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.grayDarker};
`;

const HomeButton = styled(SimpleButton)`
  margin-top: 44px;
`;

function NotFoundPage(): ReactElement {
  const navigate = useNavigate();
  return (
    <NotFoundPageWrapper>
      <NotFoundContent>
        <Logo />
        <StrongText>404 : page not found</StrongText>
        <Text>페이지를 찾을 수 없어요!</Text>
      </NotFoundContent>
      <HomeButton
        variant="primary"
        label="홈으로"
        width="172px"
        height="40px"
        onClick={() => navigate('/')} // @TODO(dohyun) 라우팅 이슈 에서 Main -> "/" 로 변경후 이쪽 path.main 으로 수정 예정
      />
    </NotFoundPageWrapper>
  );
}

export default NotFoundPage;
