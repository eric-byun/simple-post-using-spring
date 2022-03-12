import React from 'react';
import styled from 'styled-components';

const Pagination = ({ page, totalCount, changePage }) => {
  const renderPageNumber = () => {
    const startNum = page - 1 <= 2 ? 1 : page - 2;
    let endNum = Math.ceil(totalCount / 10);

    if (page + 2 < endNum) {
      endNum = page + 2;
    }

    const pagination = [];
    for (let i = startNum; i <= endNum; i++) {
      pagination.push(i);
    }

    return pagination.map((pageNum) => (
      <PageButton onClick={(e) => changePage(pageNum)} isActive={page === pageNum} key={pageNum}>
        {pageNum}
      </PageButton>
    ));
  };

  return (
    <PaginationWrap>
      <ButtonWrap>{renderPageNumber()}</ButtonWrap>
    </PaginationWrap>
  );
};

const PaginationWrap = styled.div`
  margin: 2rem 0rem;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  width: 2rem;
  height: 2rem;

  border: none;
  margin: 0rem 0.2rem;
  font-weight: 600;

  background-color: ${(props) => (props.isActive ? '#ff0000' : '#ddd')};
  color: ${(props) => (props.isActive ? '#fff' : '#333')};
`;

export default Pagination;
