INSERT INTO posts_helo
    (title, img, content, author_id)
VALUES
    ($1, $2, $3, $4);
SELECT *
from posts_helo