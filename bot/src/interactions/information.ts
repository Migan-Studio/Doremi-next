import { getInformation, localization, time, timeago } from '@localization'
import {
  GuildVerificationLevel,
  Locale,
  type StringSelectMenuInteraction,
} from 'discord.js'
import { arch, platform } from 'node:os'

export function informationSelect(
  interaction: StringSelectMenuInteraction<'cached'>,
) {
  const locale = localization(interaction.locale)

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
            color: interaction.client.colors.basic,
            timestamp: new Date().toISOString(),
            thumbnail: {
              url: interaction.client.user.displayAvatarURL(),
            },
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
              create: {
                date: time(
                  interaction.locale,
                  new Date(interaction.guild.createdTimestamp),
                ),
                ago: timeago(
                  interaction.guild.createdTimestamp,
                  interaction.locale,
                ),
              },
            }),
            timestamp: new Date().toISOString(),
            thumbnail: {
              url: interaction.guild.iconURL()!,
            },
            color: interaction.client.colors.basic,
          },
        ],
      })
      break

    case 'Doremi-information$user':
      const member = interaction.guild.members.cache.get(interaction.user.id)!

      function returnPresence() {
        if (interaction.locale === Locale.Korean) {
          if (!member.presence?.status) {
            return '없음'
          }
          switch (member.presence.status) {
            case 'online':
              return '온라인'
            case 'idle':
              return '자리 비움'
            case 'dnd':
              return '다른 용무 중'
            case 'offline':
              return '오프라인'
          }
        } else {
          if (!member.presence?.status) {
            return 'None'
          } else {
            return member.presence.status
          }
        }
      }

      function isBot() {
        if (interaction.locale === Locale.Korean) {
          return member.user.bot ? '봇이 맞아요' : '봇이 아니에요'
        } else {
          return member.user.bot ? 'Bot' : 'Not bot'
        }
      }
      interaction.update({
        embeds: [
          {
            title: locale.information.embeds.title.replace(
              '{name}',
              interaction.user.username,
            ),
            description: getInformation(interaction.locale).user({
              name: member.user.username,
              status: returnPresence(),
              isBot: isBot(),
              nickname:
                member.nickname || locale.information.embeds.none_nickname,
              create: {
                date: time(
                  interaction.locale,
                  new Date(member.user.createdTimestamp),
                ),
                ago: timeago(member.user.createdTimestamp, interaction.locale),
              },
              join: {
                date: time(
                  interaction.locale,
                  new Date(member.joinedTimestamp!),
                ),
                ago: timeago(member.joinedTimestamp!, interaction.locale),
              },
            }),
            color: interaction.client.colors.basic,
            timestamp: new Date().toISOString(),
            thumbnail: {
              url: member.user.displayAvatarURL(),
            },
          },
        ],
      })
      break
  }
}
