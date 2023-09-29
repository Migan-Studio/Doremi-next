import { english, korean, localzation, getInformation } from '@localization'
import { Command } from 'discommand'
import { type ChatInputCommandInteraction, ComponentType } from 'discord.js'
import { platform, arch } from 'node:os'

export default class Information extends Command {
  public constructor() {
    super({
      name: english.information.name,
      nameLocalizations: { ko: korean.information.name },
      description: english.information.description,
      descriptionLocalizations: { ko: korean.information.description },
    })
  }

  public execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const locale = localzation(interaction.locale)
    const OWNER_ID = interaction.client.config.bot.owner_id

    if (interaction.channel!.isDMBased()) {
      return interaction.reply({
        content: locale.is_dm,
        ephemeral: true,
      })
    }

    interaction.reply({
      embeds: [
        {
          title: locale.information.embeds.title.replace(
            '{name}',
            interaction.user.username,
          ),
          description: getInformation(interaction.locale).bot({
            os: {
              platform: platform(),
              arch: arch(),
            },
            owner: interaction.client.users.cache.get(OWNER_ID)!.username,
            nodeJSVersion: process.version,
            pid: process.pid,
            count: {
              guild: interaction.client.guilds.cache.size,
              user: interaction.client.users.cache.size,
            },
            wsPing: interaction.client.ws.ping,
            botName: interaction.client.user.username,
            version: interaction.client.version,
          }),
          color: interaction.client.COLOR,
          timestamp: new Date().toISOString(),
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.StringSelect,
              customId: 'Doremi-select$information',
              options: [
                {
                  label: locale.information.components.label.replace(
                    '{name}',
                    interaction.client.user.username,
                  ),
                  description:
                    locale.information.components.description.replace(
                      '{name}',
                      interaction.client.user.username,
                    ),
                  value: 'Doremi-information$home',
                },
                {
                  label: locale.information.components.label.replace(
                    '{name}',
                    interaction.client.user.username,
                  ),
                  description:
                    locale.information.components.description.replace(
                      '{name}',
                      interaction.client.user.username,
                    ),
                  value: 'Doremi-information$guild',
                },
                {
                  label: locale.information.components.label.replace(
                    '{name}',
                    interaction.client.user.username,
                  ),
                  description:
                    locale.information.components.description.replace(
                      '{name}',
                      interaction.client.user.username,
                    ),
                  value: 'Doremi-information$user',
                },
              ],
            },
          ],
        },
      ],
    })
  }
}
