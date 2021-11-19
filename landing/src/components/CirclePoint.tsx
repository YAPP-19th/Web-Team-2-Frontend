import React, { ReactElement } from "react";
import styled from "styled-components";

interface CirclePointProps {
  width: string;
  height: string;
  top: string;
  left: string;
}

const CirclePointStyled = styled.div<CirclePointProps>`
  background-color: rgba(72, 191, 145, 0.3);
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

function CirclePoint({
  width,
  height,
  left,
  top,
}: CirclePointProps): ReactElement {
  return (
    <CirclePointStyled width={width} height={height} left={left} top={top} />
  );
}

export default CirclePoint;
