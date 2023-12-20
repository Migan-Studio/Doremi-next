import type { RoutesInfo } from './types.js'
import type { Snowflake } from 'discord.js'

class Guild {
  public get(id: Snowflake): RoutesInfo {
    return {
      url: `/v2/guilds/${id}`,
    }
  }

  public create(body: {
    guild_id: Snowflake
    owner_id: Snowflake
  }): RoutesInfo {
    return {
      url: '/v2/guilds/create',
      body,
    }
  }

  public delete(id: Snowflake): RoutesInfo {
    return {
      url: `/v2/guilds/${id}`,
    }
  }
}

class Warn {
  public get(guildId: Snowflake, userId: Snowflake): RoutesInfo {
    return {
      url: `/v2/warns/${guildId}/${userId}`,
    }
  }

  public create(body: {
    guild_id: Snowflake
    user_id: Snowflake
    reason: string
  }): RoutesInfo {
    return {
      url: '/v2/warns/create',
      body,
    }
  }

  public delete(id: string): RoutesInfo {
    return {
      url: `/v2/warns/${id}`,
    }
  }
}

class Ticket {
  public get(id: Snowflake): RoutesInfo {
    return {
      url: `/v2/tickets/${id}`,
    }
  }

  public create(body: {
    guild_id: Snowflake
    user_id: Snowflake
    channel_id: Snowflake
  }): RoutesInfo {
    return {
      url: '/v2/tickets/create',
      body,
    }
  }

  public update(channelId: Snowflake, closed: boolean): RoutesInfo {
    return {
      url: `/v2/warns/${channelId}`,
      body: {
        closed,
      },
    }
  }

  public delete(id: string): RoutesInfo {
    return {
      url: `/v2/tickets/${id}`,
    }
  }
}

export class Routes {
  public static readonly guilds = new Guild()
  public static readonly warns = new Warn()
  public static readonly tickets = new Ticket()
}
