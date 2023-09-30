import { getInformation, localzation } from '@localization'
import {
  GuildVerificationLevel,
  Locale,
  type StringSelectMenuInteraction,
} from 'discord.js'
import { arch, platform } from 'node:os'

export function informationSelect(
  interaction: StringSelectMenuInteraction<'cached'>,
) {
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

    case 'Doremi-information$guild':
      function getGuildSecurity() {
        if (interaction.locale === Locale.Korean) {
          switch (interaction.guild.verificationLevel) {
            case GuildVerificationLevel.High:
              return '높음'
            case GuildVerificationLevel.Low:
              return '낮음'
            case GuildVerificationLevel.Medium:
              return '중간'
            case GuildVerificationLevel.None:
              return '없음'
            case GuildVerificationLevel.VeryHigh:
              return '매우 높음'
          }
        } else {
          switch (interaction.guild.verificationLevel) {
            case GuildVerificationLevel.High:
              return 'High'
            case GuildVerificationLevel.Low:
              return 'Low'
            case GuildVerificationLevel.Medium:
              return 'Medium'
            case GuildVerificationLevel.None:
              return 'None'
            case GuildVerificationLevel.VeryHigh:
              return 'Very High'
          }
        }
      }

      let bot = 0
      let user = 0
      interaction.guild!.members.cache.forEach(member => {
        if (member.user.bot) {
          bot++
        } else {
          user++
        }
      })

      interaction.update({
        embeds: [
          {
            title: locale.information.embeds.title.replace(
              '{name}',
              interaction.guild.name,
            ),
            description: getInformation(interaction.locale).guild({
              name: interaction.guild.name,
              owner: {
                name: interaction.guild.members.cache.get(
                  interaction.guild.ownerId,
                )!.user.username,
                id: interaction.guild.ownerId,
              },
              count: {
                boost: interaction.guild.premiumSubscriptionCount || 0,
                member: interaction.guild.memberCount,
                bot,
                memberOnly: user,
                emoji: interaction.guild.emojis.cache.size,
                sticky: interaction.guild.stickers.cache.size,
              },
              security: getGuildSecurity(),
            }),
            timestamp: new Date().toISOString(),
            thumbnail: {
              url: interaction.guild.iconURL()!,
            },
          },
        ],
      })
      break
  }
}
