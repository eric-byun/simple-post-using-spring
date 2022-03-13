package com.simple.board.post.service;

import com.simple.board.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface PostService {

  Post create(Post post);
  Page<Post> findAll(int page);
  Post findById(Long id);
  Long deleteById(Long id);
}
