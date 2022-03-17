package com.simple.board.post.dto;

import com.simple.board.post.entity.Post;
import lombok.Data;

@Data
public class PostDto {
  private Long id;
  private String title;
  private String content;
  private String writer;
  private String createdAt;
  private String updatedAt;

  public PostDto (Post post) {
    this.id = post.getId();
    this.title = post.getTitle();
    this.content = post.getContent();
    this.writer = post.getWriter();
    this.createdAt = post.getCreatedAt();
    this.updatedAt = post.getUpdatedAt();
  }
}
