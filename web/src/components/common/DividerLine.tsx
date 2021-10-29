import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface DividerLineProps {
  className?: string;
}

const DividerLineWrapper = styled.div`
  width: 100%;
  height: 1px;
`;

function DividerLine({ className }: DividerLineProps): ReactElement {
  return <DividerLineWrapper className={className} />;
}

export default DividerLine;
