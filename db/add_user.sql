INSERT INTO users_helo
    (username, password)
VALUES
    ($1, $2)
RETURNING *
