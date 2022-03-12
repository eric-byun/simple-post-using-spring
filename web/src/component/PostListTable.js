import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const PostListTable = ({ data }) => {
  const history = useHistory();
  const goPostView = (postId) => {
    history.push(`/${postId}`);
  };

  const renderTableData = () => {
    return data.map((item) => (
      <TableBodyRow key={item.id} onClick={(e) => goPostView(item.id)}>
        <ColNo>{item.id}</ColNo>
        <ColTitleBody>
          <Title>{item.title}</Title>
        </ColTitleBody>
        <ColWriter>{item.writer}</ColWriter>
        <ColCreatedAt>{item.createdAt}</ColCreatedAt>
      </TableBodyRow>
    ));
  };

  return (
    <div>
      <TableWrap>
        <TableHeaderRow>
          <ColNo>no</ColNo>
          <ColTitleHeader>제목</ColTitleHeader>
          <ColWriter>작성자</ColWriter>
          <ColCreatedAt>작성일</ColCreatedAt>
        </TableHeaderRow>

        {data && renderTableData()}
      </TableWrap>
    </div>
  );
};

const TableWrap = styled.div`
  max-width: 72rem;
  border: 1px solid #333;
`;

const TableHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const TableBodyRow = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #333;
`;

const ColNo = styled(Col)`
  flex: 1;
`;

const ColTitleHeader = styled(Col)`
  justify-content: center;
  flex: 6;
`;

const ColTitleBody = styled(ColTitleHeader)`
  justify-content: flex-start;
`;

const Title = styled.div`
  padding-left: 1rem;
`;

const ColWriter = styled(Col)`
  flex: 1;
  overflow: hidden;
`;

const ColCreatedAt = styled(Col)`
  flex: 1;
`;

export default PostListTable;
