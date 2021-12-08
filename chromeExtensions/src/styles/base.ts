import { css } from '@emotion/react';

export const base = css`
  // emotion-normalize h1 에만 마진이 적용 되어 있는 이슈를 해결하기 위에 전체 선택자와 함께 사용합니다.
  *,
  h1 {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;
