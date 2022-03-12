package com.simple.board.post.controller;

import com.simple.board.post.entity.Post;
import com.simple.board.post.service.PostService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/.api/posts")
@AllArgsConstructor
public class PostController {

  PostService postService;

  @GetMapping()
  public Page<Post> findAll(@RequestParam int page) {
    return postService.findAll(page);
  }

  @GetMapping("/{id}")
  public Post findById(@PathVariable Long id) {
    return postService.findById(id);
  }

  @PostMapping()
  public Post create(@RequestBody Post post) {
    return postService.create(post);
  }
}
