import { getInformation, localzation } from '@localization'
import { type StringSelectMenuInteraction } from 'discord.js'
import { arch, platform } from 'node:os'

export function informationSelect(interaction: StringSelectMenuInteraction) {
  const locale = localzation(interaction.locale)

  switch (interaction.values[0]) {
    case 'Doremi-information$bot':
      interaction.update({
        embeds: [
          {
            title: locale.information.embeds.title.replace(
              '{name}',
              interaction.client.user.username,
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
      })
      break
  }
}
