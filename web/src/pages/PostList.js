import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import PostListTable from '../component/PostListTable';
import Pagination from '../component/Pagination';
import PostSearch from '../component/comment/PostSearch';

import { findPosts } from '../common/api';

export const PostList = ({ location }) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [postData, setPostData] = useState([]);
  const [postTotalCount, setPostTotalCount] = useState(0);
  const [filter, setFilter] = useState({});

  useEffect(async () => {
    const pageNum = Number(location.search.split('=')[1] ?? 1);
    setPage(pageNum);
  }, []);

  useEffect(async () => {
    const result = await findPosts({ page, filter });
    setPostData(result.data.data);
    setPostTotalCount(result.data.totalCount);
  }, [page, filter]);

  const goPostWrite = (e) => {
    history.push('/new');
  };

  const changePage = (page) => {
    setPage(page);
  };

  const onChangeSearchFilter = (params) => {
    setFilter(params);
  };

  return (
    <PostListWrap>
      목록
      <PostListTable data={postData} />
      <Pagination page={page} totalCount={postTotalCount} changePage={changePage} />
      <PostSearch onChangeSearchFilter={onChangeSearchFilter} />
      <WriteButtonWrap>
        <WriteButton onClick={goPostWrite}>글쓰기</WriteButton>
      </WriteButtonWrap>
    </PostListWrap>
  );
};

const PostListWrap = styled.div`
  width: 100%;
`;

const WriteButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WriteButton = styled.button`
  width: 6rem;
  height: 2rem;
  background-color: #ddd;
  border: none;
`;
