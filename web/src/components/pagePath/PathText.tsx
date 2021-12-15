import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

type PathTypes = 'global' | 'folder';

interface PathTextProps {
  pathType: PathTypes;
  children: React.ReactNode;
}

const PathTextStyled = styled.span<{ pathType: PathTypes }>`
  ${(props) =>
    props.pathType === 'global'
      ? css`
          font-size: 16px;
          font-weight: normal;
          color: ${props.theme.color.grayDarkest};
        `
      : css`
          font-size: 12px;
          font-weight: 500;
          color: ${props.theme.color.black};
        `}
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

function PathText({ pathType, children }: PathTextProps): ReactElement {
  return <PathTextStyled pathType={pathType}>{children}</PathTextStyled>;
}

export default PathText;
