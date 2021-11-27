import { PlusIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface CabinetBoxProps {
  createCabinet: () => void;
}

const CabinetBoxWrapper = styled.div`
  margin-bottom: 40px;
`;

const CabinetButton = styled.button`
  width: 170px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.primaryDark};
  background-color: ${(props) => props.theme.color.white};
`;

const PlusIconStyled = styled(PlusIcon)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
`;

function CabinetBox({ createCabinet }: CabinetBoxProps): ReactElement {
  return (
    <CabinetBoxWrapper>
      <CabinetButton onClick={createCabinet}>
        <PlusIconStyled />
        <Text>보관함 추가</Text>
      </CabinetButton>
    </CabinetBoxWrapper>
  );
}

export default CabinetBox;
