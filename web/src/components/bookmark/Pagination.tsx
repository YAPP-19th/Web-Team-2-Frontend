import React, { ReactElement } from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 71px;
`;

/**  @NOTE
 * 백앤드에서 totalPages를 받아옴
 * 만약 페이지가 1개 뿐이면 페이지 수를 보여주지 않음
 * 한 페이지에 보여줄 북마크 수: size (props로 받아옴)
 * 현재 활성화 된 페이지 위치 : currentPage
 * 예를 들어서 totalPages가 56이야
 * 그러면 1~10 11~20 21~30 31~40 41~50 51~56 이렇게 보여줘야 하잖아?
 * 그럼 일단 몫을 상태로 가지고 있어야 하나?
 *  56 / 10 = 5.6 10개짜리 5개 하고 나머지 6개  반올림 하면 6
 * 10 개 단위로 상태를 가지고 있자 ex) 1, 2, 3, 4, 5
 * 그러고 그 상태가 5.6 반내림 한거랑 같아지면 나머지 값 6을 보여주면 됌
 */

function Pagination(): ReactElement {
  return <PaginationWrapper>Pagination</PaginationWrapper>;
}

export default Pagination;
