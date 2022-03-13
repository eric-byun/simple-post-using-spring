package com.simple.board.comment.controller;

import com.simple.board.comment.entity.Comment;
import com.simple.board.comment.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/.api/posts/{postId}/comments")
@AllArgsConstructor
public class CommentController {

  CommentService commentService;

  @GetMapping()
  public Page<Comment> findAll(@PathVariable Long postId, @RequestParam int page) {
    return commentService.findAll(postId, page);
  }

  @GetMapping("/{id}")
  public Comment findById(@PathVariable Long postId, @PathVariable Long id) {
    return commentService.findById(id);
  }

  @PostMapping()
  public Comment create(@PathVariable Long postId, @RequestBody Comment post) {
    return commentService.create(post);
  }

  @DeleteMapping("/{id}")
  public Long deleteById(@PathVariable Long postId, @PathVariable Long id) {
    return commentService.deleteById(id);
  }
}
