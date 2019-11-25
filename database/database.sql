CREATE TABLE users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    hashed_password TEXT NOT NULL
);

CREATE TABLE elections (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    owner INT(6) UNSIGNED NOT NULL,
    name TEXT NOT NULL,
    question TEXT,
    responses TEXT NOT NULL, # slash separates responses
    responses_len INT NOT NULL, # >= 2
    voters_count INT NOT NULL,
    public_key TEXT NOT NULL,
    tally TEXT NOT NULL,
    result TEXT,
    FOREIGN KEY (owner) REFERENCES users(id)
);

CREATE TABLE user_elections (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user INT(6) UNSIGNED NOT NULL,
    election INT(6) UNSIGNED NOT NULL,
    FOREIGN KEY (user) REFERENCES users(id),
    FOREIGN KEY (election) REFERENCES elections(id)
)

CREATE TABLE user_votes (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user INT(6) UNSIGNED NOT NULL,
    election INT(6) UNSIGNED NOT NULL,
    hashed_vote TEXT NOT NULL,
    FOREIGN KEY (user) REFERENCES users(id),
    FOREIGN KEY (election) REFERENCES elections(id)
)
