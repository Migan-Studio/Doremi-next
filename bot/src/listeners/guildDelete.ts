import { Listener } from 'discommand'
import { Events, Guild } from 'discord.js'

export default class GuildDelete extends Listener {
  public constructor() {
    super(Events.GuildDelete)
  }

  public async execute(guild: Guild) {
    await guild.client.database.guilds.delete(guild.id)
  }
}
