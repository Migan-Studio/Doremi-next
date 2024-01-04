import { Listener } from 'discommand'
import { ButtonStyle, ComponentType, Events, type Guild } from 'discord.js'
import { korean } from '@localization'
import { privacyPolicy } from '@interaction'

export default class GuildCreate extends Listener {
  public constructor() {
    super(Events.GuildCreate)
  }

  public async execute(guild: Guild) {
    const guildOwner = await guild.fetchOwner()
    const response = await guildOwner.send({
      embeds: [
        {
          title: korean.guild_create.embeds.title,
          description:
            korean.guild_create.embeds.description['0'] +
            korean.guild_create.embeds.description['1'],
          color: guild.client.colors.basic,
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              customId: 'Doremi-privacy$accept',
              label: korean.guild_create.components.accept,
              style: ButtonStyle.Primary,
            },
            {
              type: ComponentType.Button,
              customId: 'Doremi-privacy$refuse',
              label: korean.guild_create.components.refuse,
              style: ButtonStyle.Secondary,
            },
          ],
        },
      ],
    })
    const confirmation =
      await response.awaitMessageComponent<ComponentType.Button>()

    await privacyPolicy(confirmation, guild)
  }
}
