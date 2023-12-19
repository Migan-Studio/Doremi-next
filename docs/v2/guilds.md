# Guild

## Create guild

### `POST` /guilds/create

- Body

| Field    | Type                                                                  | Description |
|----------|-----------------------------------------------------------------------|-------------|
| guild_id | [Snowflake](https://discord.com/developers/docs/reference#snowflakes) | Guild's id  |
| owner_id | [Snowflake](https://discord.com/developers/docs/reference#snowflakes) | Owner's id  |

- Header

| Field        | Value            |
|--------------|------------------|
| Content-Type | application/json |

- Response example

```json
{
  "code": "201",
  "message": "Guild 1 created."
}
```

## Get guild

### `GET` /guilds/{guildId}

- Response example

```json
{
  "code": "200",
  "data": {
    "id": 1,
    "guild_id": "909768169248395274",
    "owner_id": "415135882006495242"
  },
  "message": "Guild 1 found"
}
```

## Delete guild

### `DELETE` /guilds/{guildId}

- Response example

```json
{
  "code": "200",
  "message": "Guild 1 deleted."
}
```
