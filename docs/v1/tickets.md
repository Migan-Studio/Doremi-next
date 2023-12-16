# Tickets

## Create ticket

### `POST` /tickets/create

- Body

| Field      | Type                                                                  | Description         |
|------------|-----------------------------------------------------------------------|---------------------|
| guild_id   | [Snowflake](https://discord.com/developers/docs/reference#snowflakes) | Guild's id          |
| user_id    | [Snowflake](https://discord.com/developers/docs/reference#snowflakes) | User's id           |
| channel_id | [Snowflake](https://discord.com/developers/docs/reference#snowflakes) | Ticket channel's id |

- Header

| Field        | Value            |
|--------------|------------------|
| Content-Type | application/json |

## Get ticket

### `GET` /tickets/{channelId}

- Response example

```json
{
  "id": "7168898a-ad4c-4253-8c71-95e02e422328",
  "guild_id": "909768169248395274",
  "user_id": "415135882006495242",
  "channel_id": "863380859121303563",
  "closed": false,
  "created_at": "2023-12-13T21:39:24.793001"
}
```

## Update tickets

### `PATCH` /tickets/{channelId}

- Body

| Field  | Type    | Description         |
|--------|---------|---------------------|
| closed | Boolean | Guild's id          |

- Header

| Field        | Value            |
|--------------|------------------|
| Content-Type | application/json |

## Delete tickets

### `DELETE` /tickets/{channelId}
