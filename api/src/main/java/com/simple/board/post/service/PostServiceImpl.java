package com.simple.board.post.service;

import com.simple.board.post.dto.PostDto;
import com.simple.board.post.entity.Post;
import com.simple.board.post.repository.PostRepository;
import com.simple.board.util.PasswordUtil;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

  PostRepository postRepository;

  @Override
  public Post create(Post post) {
    post.setPassword(PasswordUtil.SHA256Encrypt(post.getPassword()));
    return postRepository.save(post);
  }

  @Override
  public Page<PostDto> findAll(int page, String searchType, String searchValue) {
    PageRequest pageRequest = PageRequest.of(page - 1, 10, Sort.by("id").descending());
    if (searchType == null) {

      return postRepository.findAll(pageRequest).map(new Function<Post, PostDto>() {
        @Override
        public PostDto apply(Post post) {
          return new PostDto(post);
        }
      });
    }

    if (searchType.equals("title")) {
      return postRepository.findPostsByTitleContaining(searchValue, pageRequest).map(new Function<Post, PostDto>() {
        @Override
        public PostDto apply(Post post) {
          return new PostDto(post);
        }
      });
    }

    // writer
    return postRepository.findPostsByWriterContaining(searchValue, pageRequest).map(new Function<Post, PostDto>() {
      @Override
      public PostDto apply(Post post) {
        return new PostDto(post);
      }
    });
  }

  @Override
  public PostDto findById(Long id) {
    return new PostDto(postRepository.findById(id).orElseThrow());
  }

  @Override
  public Long update(Post post) {
    Post oldPost = postRepository.findPostByIdAndPassword(post.getId(), PasswordUtil.SHA256Encrypt(post.getPassword()));
    if (oldPost == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "wrong password");
    }

    Post newPost = postRepository.save(post);
    return newPost.getId();
  }
  @Override
  public Long deleteById(Long id) {
    postRepository.deleteById(id);
    return id;
  }
}
