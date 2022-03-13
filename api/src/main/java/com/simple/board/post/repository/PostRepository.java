package com.simple.board.post.repository;

import com.simple.board.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

  Page<Post> findPostsByTitleContaining(String searchValue, Pageable pageRequest);
  Page<Post> findPostsByWriterContaining(String searchValue, PageRequest pageRequest);

}
