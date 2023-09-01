CREATE TABLE users (
    "id" INT IDENTITY(1,1) PRIMARY KEY,
    "full_name" VARCHAR(20),
    "password" INT,
    "age" INT,
    "profile_image" TEXT,
    "instagram" TEXT
);


CREATE TABLE activities (
    "id" INT IDENTITY(1,1) PRIMARY KEY,
    "activity" VARCHAR(100),
    "date" DATE,
    "location" VARCHAR(20),
    "event_organizer" INT,
    PRIMARY KEY (id),
    FOREIGN KEY (event_organizer) REFERENCES users(id)
);

  CREATE TABLE activity_registration (
    "id" INT IDENTITY(1,1) PRIMARY KEY,
    "user_id" INT,
    "active_id" INT,
    "event_organizer_id" INT,
    status TINYINT(1),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (active_id) REFERENCES activities(id),
    FOREIGN KEY (event_organizer_id) REFERENCES activities(event_organizer)
);

CREATE TABLE friends (
    "user_id" INT,
    "friend_id" INT,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);