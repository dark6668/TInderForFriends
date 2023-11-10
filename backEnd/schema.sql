CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(20),
    password CHAR(60) NOT NULL,
    birthYear YEAR,
    profile_image TEXT,
    instagram TEXT
);

CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activity VARCHAR(100),
    date DATETIME,
    location VARCHAR(20),
    event_organizer INT,
    FOREIGN KEY (event_organizer) REFERENCES users(id)
);

CREATE TABLE activity_registration (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    active_id INT,
    event_organizer_id INT NOT NULL,
    status TINYINT(1),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (active_id) REFERENCES activities(id),
    FOREIGN KEY (event_organizer_id) REFERENCES users(id)
);

CREATE TABLE friends (
    user_id INT,
    friend_id INT,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);