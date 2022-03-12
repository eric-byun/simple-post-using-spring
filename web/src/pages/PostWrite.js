import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { createPost, updatePost, getPostById } from '../common/api';

export const PostWrite = (props) => {
  const history = useHistory();
  const [post, setPost] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(async () => {
    const postId = props.match.params.id;
    if (postId) {
      const response = await getPostById(postId);
      setPost(response.data.data);
    }
  }, [props]);

  const handleForm = (e) => {
    const { name, value } = e.target;

    setPost({
      ...post,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    if (!post.title || post.title.trim().length <= 0) {
      return setErrorMessage('제목을 입력하세요.');
    }

    if (!post.writer || post.writer.trim().length <= 0) {
      return setErrorMessage('작성자명을 입력하세요.');
    }

    if (!post.content || post.content.trim().length <= 0) {
      return setErrorMessage('내용을 입력하세요.');
    }

    if (!post.password || post.password.trim().length < 4) {
      return setErrorMessage('암호는 공백없이 4자 이상으로 입력해주세요');
    }

    const confirmMessage = (post.id ? '수정' : '저장') + '하시겠습니까?';
    if (confirm(confirmMessage)) {
      (post.id ? updatePost(post.id, post) : createPost(post))
        .then((response) => {
          history.push('/');
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    }
  };

  const goPostList = async (e) => {
    let existInputData = false;
    for (const key of Object.keys(post)) {
      if (post[key].length > 0) {
        existInputData = true;
        break;
      }
    }

    if (existInputData && !confirm('입력된 정보가 있습니다. 정말 돌아가시겠습니까?')) {
      return;
    }

    history.push('/');
  };

  return (
    <WriteWrap>
      {post.id ? '수정' : '쓰기'}
      <TableWrap>
        <WrapBox>
          <TitleBox>
            <InputTitle
              type="text"
              name="title"
              maxLength="255"
              placeholder="제목을 입력하세요."
              onChange={handleForm}
              value={post.title}
            />
          </TitleBox>
          <WriterBox>
            <InputWriter
              type="text"
              name="writer"
              maxLength="20"
              placeholder="작성자 이름을 입력하세요."
              onChange={handleForm}
              value={post.writer}
            />
          </WriterBox>
        </WrapBox>
        <WrapBox>
          <TextContent
            type="text"
            name="content"
            placeholder="내용을 입력하세요."
            onChange={handleForm}
            value={post.content}
          />
        </WrapBox>
        <WrapBox>
          <InputPassword
            type="password"
            name="password"
            placeholder="암호를 입력하세요. (4자 이상)"
            onChange={handleForm}
          />
        </WrapBox>
        {errorMessage.length > 0 && (
          <WrapBox>
            <ErrorDisplay>{errorMessage}</ErrorDisplay>
          </WrapBox>
        )}
        <ButtonBox>
          <ButtonWrite onClick={onSubmit}>{post.id ? '수정' : '저장'}</ButtonWrite>
          <ButtonList onClick={goPostList}>목록</ButtonList>
        </ButtonBox>
      </TableWrap>
    </WriteWrap>
  );
};

const WriteWrap = styled.div`
  width: 100%;
`;

const TableWrap = styled.div`
  border: 2px solid #333;
`;

const WrapBox = styled.div`
  display: flex;
`;

const TitleBox = styled.div`
  display: flex;
  flex: 8;
`;

const WriterBox = styled.div`
  display: flex;
  flex: 2;
`;

const ButtonBox = styled(WrapBox)`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Input = styled.input`
  width: calc(100% - 2rem);
  height: 2rem;
  padding: 0rem 1rem;
  border: 1px solid #ddd;
`;

const InputTitle = styled(Input)``;
const InputWriter = styled(Input)``;

const TextContent = styled.textarea`
  width: calc(100% - 2rem);
  height: 20rem;
  padding: 1rem;
  border: 1px solid #ddd;
`;

const ErrorDisplay = styled.span`
  color: #ff0000;
  padding: 0rem 1rem;
  margin-top: 1rem;
`;
const InputPassword = styled(Input)``;

const ButtonWrite = styled.button`
  width: 7rem;
  height: 2rem;
`;

const ButtonList = styled.button`
  width: 7rem;
  height: 2rem;
`;
