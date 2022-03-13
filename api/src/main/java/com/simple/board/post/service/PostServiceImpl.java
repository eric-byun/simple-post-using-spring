package com.simple.board.post.service;

import com.simple.board.post.entity.Post;
import com.simple.board.post.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

  PostRepository postRepository;

  @Override
  public Post create(Post post) {
    return postRepository.save(post);
  }

  @Override
  public Page<Post> findAll(int page, String searchType, String searchValue) {
    PageRequest pageRequest = PageRequest.of(page - 1, 10, Sort.by("id").descending());
    if (searchType == null) {
      return postRepository.findAll(pageRequest);
    }

    if (searchType.equals("title")) {
      return postRepository.findByTitleContaining(searchValue, pageRequest);
    }

    // writer
    return postRepository.findByWriterContaining(searchValue, pageRequest);
  }

  @Override
  public Post findById(Long id) {
    return postRepository.findById(id).orElseThrow();
  }

  @Override
  public Long deleteById(Long id) {
    postRepository.deleteById(id);
    return id;
  }
}
