import React, { useState } from 'react';
import styled from 'styled-components';
import { createCommentByPostId } from '../../common/api';

export const CommentWriter = ({ postId, commentReply, onCommentReplyCancel }) => {
  const [comment, setComment] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (!value) {
      return;
    }

    setComment({
      ...comment,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    if (!comment.content || comment.content.trim().length <= 0) {
      return setErrorMessage('코멘트 내용을 입력하세요.');
    }

    if (!comment.writer || comment.writer.trim().length <= 0) {
      return setErrorMessage('작성자명을 입력하세요.');
    }

    if (confirm('코멘트를 작성 하시겠습니까?')) {
      createCommentByPostId({ ...comment, postId, parentId: commentReply.id })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error);
          alert('오류가 발생하였습니다!');
        });
    }
  };

  const renderCommentTag = () => {
    if (!commentReply.id) {
      return;
    }

    return (
      <CommentTag>
        @{commentReply.writer}
        <span onClick={onCommentReplyCancel}>(취소)</span>
      </CommentTag>
    );
  };

  return (
    <div>
      {errorMessage.length > 0 && <ErrorDisplay>{errorMessage}</ErrorDisplay>}
      <CommentWriteWrap>
        <TitleWrap>
          {renderCommentTag()}
          <InputTitle
            type="text"
            name="content"
            maxLength="255"
            placeholder="코멘트를 입력하세요."
            onChange={handleForm}
          />
        </TitleWrap>
        <WriterWrap>
          <InputWriter
            type="text"
            name="writer"
            maxLength="20"
            placeholder="작성자 이름을 입력하세요."
            onChange={handleForm}
          />
          <ButtonWrite onClick={onSubmit}>쓰기</ButtonWrite>
        </WriterWrap>
      </CommentWriteWrap>
    </div>
  );
};

const Input = styled.input`
  width: calc(100% - 2rem);
  height: 2rem;
  padding: 0rem 1rem;
  border: 1px solid #ddd;
`;
const InputTitle = styled(Input)``;
const InputWriter = styled(Input)``;

const CommentWriteWrap = styled.div`
  display: flex;
  padding: 0.5rem;
`;

const CommentTag = styled.div`
  margin-right: 0.5rem;
  white-space: nowrap;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  flex: 7;
`;
const WriterWrap = styled.div`
  display: flex;
  flex: 2;
  margin-left: 0.2rem;
`;

const ButtonWrite = styled.button`
  width: 3rem;
  height: 2rem;
  margin-left: 0.2rem;
`;

const ErrorDisplay = styled.span`
  color: #ff0000;
  padding: 0rem 1rem;
  margin-top: 1rem;
`;
