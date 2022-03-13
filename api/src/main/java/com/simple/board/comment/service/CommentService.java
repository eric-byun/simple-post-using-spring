package com.simple.board.comment.service;

import com.simple.board.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {

  Comment create(Comment post);
  Page<Comment> findAll(Long postId, int page);
  Comment findById(Long id);
  Long deleteById(Long id);
}
