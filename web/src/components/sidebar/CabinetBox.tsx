import { PlusWhiteIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import { useCabinetAction } from 'recoil/selectors/folderSelector';
import styled from 'styled-components';

const CabinetBoxWrapper = styled.div`
  margin-bottom: 40px;
`;

const CabinetButton = styled.button`
  width: 170px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.primary};
`;

const PlusIcon = styled(PlusWhiteIcon)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.color.white0};
`;

function CabinetBox(): ReactElement {
  const { create } = useCabinetAction();
  return (
    <CabinetBoxWrapper>
      <CabinetButton type="button" onClick={create}>
        <PlusIcon />
        <Text>보관함 추가</Text>
      </CabinetButton>
    </CabinetBoxWrapper>
  );
}

export default CabinetBox;
