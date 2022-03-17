package com.simple.board.post.service;

import com.simple.board.post.dto.PostDto;
import com.simple.board.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {

  Post create(Post post);
  Page<PostDto> findAll(int page, String searchType, String searchValue);
  PostDto findById(Long id);
  Long update(Post post);
  Long deleteById(Long id);
}
