import { type GuildMember } from 'discord.js'

export interface KickOrBanOptions {
  member: GuildMember
  reason: string | null
}
