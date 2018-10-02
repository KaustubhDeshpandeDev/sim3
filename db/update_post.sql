UPDATE posts_helo SET
    content = $2
    WHERE title = $1;
SELECT *
FROM posts_helo;