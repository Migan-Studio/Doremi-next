CREATE TABLE server (
    id int(19),
    owner_id int(19),
    primary key (`id`)
);

CREATE TABLE warn (
    id int(19),
    warn_count int (9),
    server_id int(19),
    primary key (`id`)
);
