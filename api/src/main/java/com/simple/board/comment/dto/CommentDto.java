package com.simple.board.comment.dto;

import com.simple.board.comment.entity.Comment;
import lombok.Data;

@Data
public class CommentDto {
  private Long id;
  private Long postId;
  private String content;
  private Long parentId;
  private String writer;
  private String createdAt;

  public CommentDto(Comment comment) {
    this.id = comment.getId();
    this.postId = comment.getPostId();
    this.content = comment.getContent();
    this.parentId = comment.getParentId();
    this.writer = comment.getWriter();
    this.createdAt = comment.getCreatedAt();
  }

}
