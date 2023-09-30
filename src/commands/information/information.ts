import { english, korean, localzation, getInformation } from '@localization'
import { Command } from 'discommand'
import { type ChatInputCommandInteraction, ComponentType } from 'discord.js'
import { platform, arch } from 'node:os'
import { informationSelect } from '@interaction'

export default class Information extends Command {
  public constructor() {
    super({
      name: english.information.name,
      nameLocalizations: { ko: korean.information.name },
      description: english.information.description,
      descriptionLocalizations: { ko: korean.information.description },
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const locale = localzation(interaction.locale)

    if (interaction.channel!.isDMBased()) {
      return interaction.reply({
        content: locale.is_dm,
        ephemeral: true,
      })
    }

    const response = await interaction.reply({
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
            owner: interaction.client.users.cache.get(
              interaction.client.OWNER_ID,
            )!.username,
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
                  value: 'Doremi-information$bot',
                },
                {
                  label: locale.information.components.label.replace(
                    '{name}',
                    interaction.guild.name,
                  ),
                  description:
                    locale.information.components.description.replace(
                      '{name}',
                      interaction.guild.name,
                    ),
                  value: 'Doremi-information$guild',
                },
                {
                  label: locale.information.components.label.replace(
                    '{name}',
                    interaction.user.username,
                  ),
                  description:
                    locale.information.components.description.replace(
                      '{name}',
                      interaction.user.username,
                    ),
                  value: 'Doremi-information$user',
                },
              ],
            },
          ],
        },
      ],
    })

    response
      .createMessageComponentCollector({
        filter: i => i.user.id === interaction.user.id,
        time: 1_800_000,
        componentType: ComponentType.StringSelect,
      })
      .on('collect', i => {
        informationSelect(i)
      })
      .on('end', () => {
        interaction.editReply({
          components: [],
        })
      })
  }
}
