package com.simple.board.comment.controller;

import com.simple.board.comment.entity.Comment;
import com.simple.board.comment.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/.api/comments")
@AllArgsConstructor
public class CommentController {

  CommentService commentService;

  @GetMapping()
  public Page<Comment> findAll(@RequestParam int page) {
    return commentService.findAll(page);
  }

  @GetMapping("/{id}")
  public Comment findById(@PathVariable Long id) {
    return commentService.findById(id);
  }

  @PostMapping()
  public Comment create(@RequestBody Comment post) {
    return commentService.create(post);
  }

  @DeleteMapping("/{id}")
  public Long deleteById(@PathVariable Long id) {
    return commentService.deleteById(id);
  }
}
