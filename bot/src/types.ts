import type { GuildMember, Snowflake } from 'discord.js'
import { RowDataPacket } from 'mysql2'

export interface KickOrBanOptions {
  member: GuildMember
  reason: string | null
}

export interface BassData extends RowDataPacket {
  id: Snowflake
}

export interface GuildData extends BassData {
  owner_id: Snowflake
}

export interface WarnData extends BassData {
  warn_count: number
  server_id: Snowflake
  user_id: Snowflake
}

export interface TicketData extends BassData {
  user_id: Snowflake
  channel_id: Snowflake
  closed: boolean
  create_at: Date
}
