# Warn

## Create warn

### `POST` /warn/create

- Body

| Field    | Type                                                                  | Description |
|----------|-----------------------------------------------------------------------|-------------|
| guild_id | [Snowflake](https://discord.com/developers/docs/reference#snowflakes) | Guild's id  |
| user_id  | [Snowflake](https://discord.com/developers/docs/reference#snowflakes) | User's id   |
| reason   | String                                                                | Warn reason |

- Header

| Field        | Value            |
|--------------|------------------|
| Content-Type | application/json |

## Get warn

### `GET` /warns/{guildId}/{userId}

- Response example

```json
{
  "id": "997af129-6c3d-44aa-9eb1-2693cb05aff8",
  "guild_id": "909768169248395274",
  "user_id": "415135882006495242",
  "reason": "Genius",
  "created_at": "2023-12-16T11:46:07.213677"
}
```

## Delete warn

### `DELETE` /warns/{warnId}
