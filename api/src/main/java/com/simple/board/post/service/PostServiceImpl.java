package com.simple.board.post.service;

import com.simple.board.post.entity.Post;
import com.simple.board.post.repository.PostRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

  PostRepository postRepository;

  @Override
  public Post create(Post post) {
    return postRepository.save(post);
  }

  @Override
  public Page<Post> findAll(int page) {
    PageRequest pageRequest = PageRequest.of(page-1, 10, Sort.by("id").descending());
    return postRepository.findAll(pageRequest);
  }

  @Override
  public Post findById(Long id) {
    return postRepository.findById(id).orElseThrow();
  }
}
