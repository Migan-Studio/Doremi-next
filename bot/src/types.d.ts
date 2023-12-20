import type { GuildMember, Snowflake } from 'discord.js'

export interface KickOrBanOptions {
  member: GuildMember
  reason: string | null
}

export interface GuildData {
  id: number
  guild_id: Snowflake
  owner_id: Snowflake
}

export interface GuildRequest {
  guild_id: Snowflake
  owner_id: Snowflake
}

export interface WarnData {
  id: string
  guild_id: Snowflake
  user_id: Snowflake
  reason: string
  created_at: string
}

export interface WarnRequest {
  guild_id: Snowflake
  user_id: Snowflake
  reason: string
}

export interface TicketData {
  id: string
  guild_id: Snowflake
  user_id: Snowflake
  channel_id: Snowflake
  closed: boolean
  created_at: string
}

export interface TicketRequest {
  guild_id: Snowflake
  user_id: Snowflake
  channel_id: Snowflake
}

export interface TicketUpdateRequest {
  closed: boolean
}

export interface Response {
  code: string
  message: string
}

export interface ResponseData<T> extends Response {
  data: T
}
