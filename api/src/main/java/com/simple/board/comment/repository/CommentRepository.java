package com.simple.board.comment.repository;

import com.simple.board.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

  @Query(
    value = "SELECT id, 0 AS `parent_id`, 0 AS `r_id`, `id` AS `s_id`, `content` AS `content`, `writer` AS `writer`, `created_at` AS `created_at` FROM `comment` WHERE `parent_id` IS NULL AND `post_id` = ?1 UNION ALL SELECT r.id, `c`.`id` AS `parent_id`, `r`.`id` AS `r_id`, `r`.`parent_id` AS `s_id`, `r`.`content` AS `content`, `r`.`writer` AS `writer`, `r`.`created_at` AS `created_at` FROM `comment` AS `c` INNER JOIN `comment` AS `r` ON `c`.`id` = `r`.`parent_id` WHERE `c`.`post_id` = ?1 ORDER BY `s_id` DESC, `r_id` ASC",
    nativeQuery = true
  )
  Page<Comment> findAllWithParentComments(Long postId, Pageable pageable);
}
