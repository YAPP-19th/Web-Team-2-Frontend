import { BellUnSelectedIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const RemindAlertMessageStyled = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.color.grayDark};
  display: flex;
  align-items: center;
  margin-bottom: 17px;
`;

const AlertMessageText = styled.span`
  margin-left: 8px;
`;

function RemindAlertMessage(): ReactElement {
  return (
    <RemindAlertMessageStyled>
      <BellUnSelectedIcon />
      <AlertMessageText>리마인드를 설정해보세요!</AlertMessageText>
    </RemindAlertMessageStyled>
  );
}

export default RemindAlertMessage;
