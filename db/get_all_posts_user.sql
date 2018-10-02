SELECT *
FROM posts_helo ph JOIN users_helo uh ON ph.author_id = uh.userid
WHERE uh.id = $1