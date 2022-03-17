package com.simple.board.comment.service;

import com.simple.board.comment.dto.CommentDto;
import com.simple.board.comment.entity.Comment;
import com.simple.board.comment.repository.CommentRepository;
import com.simple.board.post.dto.PostDto;
import com.simple.board.post.entity.Post;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

  CommentRepository commentRepository;

  @Override
  public CommentDto create(Comment comment) {
    return new CommentDto(commentRepository.save(comment));
  }

  @Override
  public Page<CommentDto> findAll(Long postId, int page) {
    Pageable pageRequest = PageRequest.of(page-1, 10);
    return commentRepository.findAllWithParentComments(postId, pageRequest).map(new Function<Comment, CommentDto>() {
      @Override
      public CommentDto apply(Comment comment) {
        return new CommentDto(comment);
      }
    });
  }

  @Override
  public CommentDto findById(Long id) {
    return new CommentDto(commentRepository.findById(id).orElseThrow());
  }

  @Override
  public Long deleteById(Long id) {
    commentRepository.deleteById(id);
    return id;
  }
}
