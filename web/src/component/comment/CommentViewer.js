import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { findCommentsByPostId } from '../../common/api';
import { CommentWriter } from './CommentWriter';
import Pagination from '../Pagination';

export const CommentViewer = ({ postId }) => {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [commentTotalCount, setCommentTotalCount] = useState(0);
  const [commentReply, setCommentReply] = useState({});

  useEffect(async () => {
    if (!postId) {
      return;
    }

    const comments = await findCommentsByPostId(postId, { page });
    setComments(comments.data.data);

    setCommentTotalCount(comments.data.totalCount);
  }, [postId, page]);

  const renderCommentList = () => {
    return comments.map((comment) => (
      <CommentWrap parentId={comment.parentId} key={`${comment.rId}_${comment.id}`}>
        <CommentWriterWrap>{comment.writer}</CommentWriterWrap>
        <CommentContentWrap>{comment.content}</CommentContentWrap>
        <div>
          {comment.createdAt}
          {!comment.parentId && <button onClick={(e) => onClickCommentReply(comment)}>답글쓰기</button>}
        </div>
      </CommentWrap>
    ));
  };

  const onClickCommentReply = (comment) => {
    setCommentReply(comment);
  };

  const onCommentReplyCancel = () => {
    setCommentReply({});
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div>
      {renderCommentList()}
      <CommentWriter postId={postId} commentReply={commentReply} onCommentReplyCancel={onCommentReplyCancel} />

      <Pagination page={page} totalCount={commentTotalCount} changePage={changePage} />
    </div>
  );
};
const CommentWrap = styled.div`
  padding-top: 1rem;
  padding-left: ${(props) => (props.parentId ? '2rem' : '0.5rem')};
`;

const CommentWriterWrap = styled.div`
  font-weight: 700;
`;

const CommentContentWrap = styled.div`
  padding-top: 0.3rem;
`;
