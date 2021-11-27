import React, { ReactElement } from "react";
import styled from "styled-components";

const CirclePointStyled = styled.div`
  background-color: rgba(72, 191, 145, 0.3);
  border-radius: 50%;
  position: absolute;
  z-index: 1;
`;

function CirclePoint({ ...rest }): ReactElement {
  return <CirclePointStyled {...rest} />;
}

export default CirclePoint;
