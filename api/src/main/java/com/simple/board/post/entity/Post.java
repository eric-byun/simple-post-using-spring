package com.simple.board.post.entity;

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
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String title;

  @Column
  private String content;

  @Column
  private String writer;

  @DateTimeFormat
  private String createdAt;

  @DateTimeFormat
  private String updatedAt;

  @Column
  private String password;
}
