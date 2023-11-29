import { Command } from 'discommand'
import { english, getSmhdw, korean, localization } from '@localization'
import {
  APIEmbed,
  ApplicationCommandOptionType,
  type ChatInputCommandInteraction,
  PermissionFlagsBits,
} from 'discord.js'
import { minRegex, hourRegex, dayRegex, weekRegex, decimal } from '@utils'

export default class Timeout extends Command {
  public constructor() {
    super({
      name: english.timeout.name,
      nameLocalizations: { ko: korean.timeout.name },
      description: english.timeout.description,
      descriptionLocalizations: { ko: korean.timeout.description },
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: english.timeout.options.member.name,
          nameLocalizations: { ko: korean.timeout.options.member.name },
          description: english.timeout.options.member.description,
          descriptionLocalizations: {
            ko: korean.timeout.options.member.description,
          },
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: english.timeout.options.time.name,
          nameLocalizations: { ko: korean.timeout.options.time.name },
          description: english.timeout.options.time.description,
          descriptionLocalizations: {
            ko: korean.timeout.options.time.description,
          },
          required: true,
        },
      ],
      defaultMemberPermissions: [PermissionFlagsBits.ModerateMembers],
      dmPermission: false,
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const member = interaction.options.getMember('member')!
    const time = interaction.options.getString('time', true)
    const locale = localization(interaction.locale)
    const embed: APIEmbed = {
      title: locale.timeout.name,
      description: locale.timeout.embeds.success.replace(
        '{member}',
        member.user.username,
      ),
      color: interaction.client.colors.success,
      timestamp: new Date().toISOString(),
    }

    if (
      !interaction.guild.members.me!.permissions.has(
        PermissionFlagsBits.ModerateMembers,
      )
    ) {
      return await interaction.reply({
        embeds: [
          {
            title: locale.timeout.name,
            description: locale.if_dont_have_permission,
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
      })
    }

    if (minRegex.test(time)) {
      const min = Number(time.match(decimal)![0])

      if (min > 40320) {
        return await interaction.reply({
          embeds: [
            {
              title: locale.timeout.name,
              description: locale.max_value
                .replace('{time}', '40320')
                .replace('{smh}', getSmhdw(interaction.locale, 'minute')),
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })
      }

      await member.disableCommunicationUntil(Date.now() + min * 60 * 1000)
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } else if (hourRegex.test(time)) {
      const hour = Number(time.match(decimal)![0])

      if (hour > 672) {
        return await interaction.reply({
          embeds: [
            {
              title: locale.timeout.name,
              description: locale.max_value
                .replace('{time}', '672')
                .replace('{smh}', getSmhdw(interaction.locale, 'hour')),
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })
      }

      await member.disableCommunicationUntil(Date.now() + hour * 300 * 1000)
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } else if (dayRegex.test(time)) {
      const day = Number(time.match(decimal)![0])

      if (day > 28) {
        return await interaction.reply({
          embeds: [
            {
              title: locale.timeout.name,
              description: locale.max_value
                .replace('{time}', '28')
                .replace('{smh}', getSmhdw(interaction.locale, 'day')),
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })
      }

      await member.disableCommunicationUntil(Date.now() + day * 86400 * 1000)
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } else if (weekRegex.test(time)) {
      const week = Number(time.match(decimal)![0])

      if (week > 4) {
        return await interaction.reply({
          embeds: [
            {
              title: locale.timeout.name,
              description: locale.max_value
                .replace('{time}', '4')
                .replace('{smh}', getSmhdw(interaction.locale, 'week')),
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })
      }

      await member.disableCommunicationUntil(Date.now() + week * 604800 * 1000)
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } else {
      await interaction.reply({
        embeds: [
          {
            title: locale.timeout.name,
            description: locale.timeout.embeds.time_error,
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
      })
    }
  }
}
