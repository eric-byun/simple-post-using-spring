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

  @Query(
    value="select * from post where title like concat('%', ?1, '%') order by id desc",
    nativeQuery = true
  )
  Page<Post> findByTitleContaining(String searchValue, PageRequest pageRequest);

  @Query(
    value="select * from post where writer like concat('%', ?1, '%') order by id desc",
    nativeQuery = true
  )
  Page<Post> findByWriterContaining(String searchValue, PageRequest pageRequest);

}
