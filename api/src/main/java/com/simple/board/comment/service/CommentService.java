package com.simple.board.comment.service;

import com.simple.board.comment.dto.CommentDto;
import com.simple.board.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {

  CommentDto create(Comment comment);
  Page<CommentDto> findAll(Long postId, int page);
  CommentDto findById(Long id);
  Long deleteById(Long id);
}
