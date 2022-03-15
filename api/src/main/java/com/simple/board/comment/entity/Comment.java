package com.simple.board.comment.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;

@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@Entity
public class Comment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private Long postId;

  @Column
  private String content;

  @Column
  private Long parentId;

  @Column
  private String writer;

  @DateTimeFormat
  private String createdAt;
}
