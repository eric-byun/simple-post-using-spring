package com.simple.board.comment.service;

import com.simple.board.comment.entity.Comment;
import com.simple.board.comment.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

  CommentRepository commentRepository;

  @Override
  public Comment create(Comment post) {
    return commentRepository.save(post);
  }

  @Override
  public Page<Comment> findAll(int page) {
    PageRequest pageRequest = PageRequest.of(page-1, 10, Sort.by("id").descending());
    return commentRepository.findAll(pageRequest);
  }

  @Override
  public Comment findById(Long id) {
    return commentRepository.findById(id).orElseThrow();
  }

  @Override
  public Long deleteById(Long id) {
    commentRepository.deleteById(id);
    return id;
  }
}
