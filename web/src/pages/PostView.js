import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { getPostById, deletePost } from '../common/api';
import { CommentViewer } from '../component/comment/CommentViewer';

export const PostView = ({ location }) => {
  const history = useHistory();
  const [post, setPost] = useState({});

  useEffect(async () => {
    const postId = location.pathname.split('/')[1];
    const post = await getPostById(postId);
    setPost(post.data.data);
  }, []);

  const onPostUpdate = () => {
    history.push(`/${post.id}/edit`);
  };

  const onPostDelete = async (e) => {
    try {
      const inputPassword = prompt('삭제하려면 게시글의 암호를 입력하세요');
      if (!inputPassword) {
        return;
      }

      if (inputPassword.length < 4) {
        return alert('암호는 4자 이상으로 입력해주세요');
      }

      if (!confirm('정말로 삭제하시겠습니까?')) {
        return;
      }

      const response = await deletePost(post.id, inputPassword);
      if (response.data.result === 'OK') {
        alert('삭제 완료');
        return history.push('/');
      }

      alert(response.data.message);
    } catch (e) {
      alert(e.message);
    }
  };

  const goPostList = async (e) => {
    history.push('/');
  };

  return (
    <ViewWrap>
      상세
      <PostViewWrap>
        <WrapBox>
          <TitleBox>
            <TextTitle>{post.title}</TextTitle>
          </TitleBox>
          <WriterBox>
            <TextWriter>{post.writer}</TextWriter>
          </WriterBox>
        </WrapBox>
        <WrapBox>
          <TextAt>
            작성일: {post.createdAt}, 최근 수정일: {post.updatedAt}
          </TextAt>
        </WrapBox>
        <ContentWrap>
          <TextContent>{post.content}</TextContent>
        </ContentWrap>
      </PostViewWrap>
      {/*comments*/}
      <CommentWrap>
        코멘트
        <CommentViewer postId={post.id} />
      </CommentWrap>
      <ButtonWrap>
        <ButtonDelete onClick={onPostDelete}>삭제</ButtonDelete>
        <ButtonUpdate onClick={onPostUpdate}>수정</ButtonUpdate>
        <ButtonList onClick={goPostList}>목록</ButtonList>
      </ButtonWrap>
    </ViewWrap>
  );
};

const ViewWrap = styled.div`
  width: 100%;
`;
const PostViewWrap = styled.div`
  border-top: 2px solid #333;
  border-left: 2px solid #333;
  border-right: 2px solid #333;
`;

const CommentWrap = styled.div`
  border: 2px solid #333;
`;

const WrapBox = styled.div`
  display: flex;
  min-height: 2rem;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
`;

const TitleBox = styled(WrapBox)`
  flex: 8;
`;

const WriterBox = styled(WrapBox)`
  flex: 2;
`;

const ContentWrap = styled(WrapBox)`
  min-height: 20rem;
  flex: 1;
`;

const ButtonWrap = styled(WrapBox)`
  justify-content: flex-end;
  border: none;
  margin-top: 1rem;
`;

const Text = styled.span`
  width: calc(100% - 2rem);
  padding: 0rem 1rem;
`;

const TextTitle = styled(Text)``;
const TextWriter = styled(Text)``;
const TextAt = styled.span`
  width: 100%;
  padding: 0rem 1rem;
`;

const TextContent = styled(Text)`
  width: calc(100% - 2rem);
  min-height: 20rem;
  padding: 1rem;
`;

const ButtonDelete = styled.button`
  width: 7rem;
  height: 2rem;
  color: #fff;
  background-color: #ff8686;
  margin-right: 0.5rem;
  border: none;
`;

const ButtonUpdate = styled.button`
  width: 7rem;
  height: 2rem;
  color: #fff;
  background-color: #9ba7ff;
  margin-right: 0.5rem;
  border: none;
`;

const ButtonList = styled.button`
  width: 7rem;
  height: 2rem;
`;
