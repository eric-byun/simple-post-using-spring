import { httpClient } from './http-client';

export const findPosts = (params) => {
  return httpClient.get({
    url: '/posts',
    params,
  });
};

export const getPostById = (postId) => {
  return httpClient.get({
    url: `/posts/${postId}`,
  });
};

export const createPost = (post) => {
  return httpClient.post({
    url: `/posts`,
    data: { post },
  });
};

export const updatePost = (postId, post) => {
  return httpClient.put({
    url: `/posts/${postId}`,
    data: { post },
  });
};

export const deletePost = (postId, password) => {
  return httpClient.delete({
    url: `/posts/${postId}`,
    data: { password },
  });
};

export const findCommentsByPostId = (postId, params) => {
  return httpClient.get({
    url: `/posts/${postId}/comments`,
    params,
  });
};

export const createCommentByPostId = (comment) => {
  return httpClient.post({
    url: `/posts/${comment.postId}/comments`,
    data: { comment },
  });
};
