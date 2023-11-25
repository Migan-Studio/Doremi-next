CREATE TABLE
    guild (
        id INTEGER NOT NULL,
        owner_id VARCHAR(255 NOT NULL),
        PRIMARY KEY('id') NOT NULL
    );

CREATE TABLE
    warn (
        id INTEGER NOT NULL,
        warn_count INTEGER NOT NULL,
        server_id VARCHAR(255) NOT NULL,
        PRIMARY KEY('id')
    );

CREATE TABLE
    ticket (
        id INTEGER NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        channel_id VARCHAR(255) NOT NULL,
        closed BOOLEAN NOT NULL DEFAULT 0,
        create_at DATETIME NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY('id')
    );