create table
    guild (
        id integer not null,
        owner_id varchar(255) not null,
        guild_id varchar(255) not null,
        primary key('id')
    );

create table
    warn (
        id integer not null,
        warn_count integer not null,
        guild_id varchar(255) not null,
        user_id varchar(255) not null,
        primary key('id')
    );

create table
    ticket (
        id integer not null,
        user_id varchar(255) not null,
        channel_id varchar(255) not null,
        closed boolean not null default 0,
        guild_id varchar(255) not null,
        create_at datetime not null default current_timestamp(),
        primary key('id')
    );