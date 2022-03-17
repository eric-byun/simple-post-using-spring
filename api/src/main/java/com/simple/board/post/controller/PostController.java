package com.simple.board.post.controller;

import com.simple.board.post.dto.PostDto;
import com.simple.board.post.entity.Post;
import com.simple.board.post.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController()
@RequestMapping("/.api/posts")
@AllArgsConstructor
public class PostController {

  PostService postService;

  @GetMapping()
  public Page<PostDto> findAll(@RequestParam HashMap<String, String> filter) {
    int page = Integer.parseInt(filter.get("page"));
    String searchType = filter.get("type");
    String searchValue = filter.get("value");

    return postService.findAll(page, searchType, searchValue);
  }

  @GetMapping("/{id}")
  public PostDto findById(@PathVariable Long id) {
    return postService.findById(id);
  }

  @PostMapping()
  public Post create(@RequestBody Post post) {
    return postService.create(post);
  }

  @PutMapping("/{id}")
  public Long update(@PathVariable Long id, @RequestBody Post post) {
    return postService.update(post);
  }

  @DeleteMapping("{id}")
  public Long delete(@PathVariable Long id) {
    return postService.deleteById(id);
  }
}
