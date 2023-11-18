import { Command } from 'discommand'
import {
  english,
  getPermissionLocalization,
  getSmhdw,
  korean,
  localization,
} from '@localization'
import {
  ApplicationCommandOptionType,
  type ChatInputCommandInteraction,
  PermissionFlagsBits,
  type APIEmbed,
} from 'discord.js'
import { secRegex, minRegex, hourRegex, decimal } from '@utils'

export default class Slowmode extends Command {
  constructor() {
    super({
      name: english.slowmode.name,
      nameLocalizations: { ko: korean.slowmode.name },
      description: english.slowmode.description,
      descriptionLocalizations: { ko: korean.slowmode.description },
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: english.slowmode.options.time.name,
          nameLocalizations: { ko: korean.slowmode.options.time.name },
          description: english.slowmode.options.time.description,
          descriptionLocalizations: {
            ko: korean.slowmode.options.time.description,
          },
          required: true,
        },
      ],
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.ManageChannels],
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const time = interaction.options.getString('time', true)
    const locale = localization(interaction.locale)
    const embed: APIEmbed = {
      title: locale.slowmode.name,
      description: locale.slowmode.embeds.success.replace('{time}', time),
      color: interaction.client.colors.success,
      timestamp: new Date().toISOString(),
    }

    if (
      !interaction.guild.members.me!.permissions.has(
        PermissionFlagsBits.ManageChannels,
      )
    ) {
      return interaction.reply({
        embeds: [
          {
            title: locale.slowmode.name,
            description: locale.if_dont_have_permission.bot.replace(
              '{permission}',
              getPermissionLocalization(
                interaction.locale,
                PermissionFlagsBits.ManageChannels,
              )!,
            ),
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
        ephemeral: true,
      })
    }

    if (secRegex.test(time)) {
      const sec = Number(time.match(decimal)![0])
      if (sec > 21600) {
        return interaction.reply({
          embeds: [
            {
              title: locale.slowmode.name,
              description: locale.slowmode.embeds.max_value
                .replace('{time}', '21600')
                .replace('{smh}', getSmhdw(interaction.locale, 'sec')),
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })
      }

      interaction.channel!.setRateLimitPerUser(sec)
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } else if (minRegex.test(time)) {
      const min = Number(time.match(decimal)![0])
      if (min > 360) {
        return interaction.reply({
          embeds: [
            {
              title: locale.slowmode.name,
              description: locale.slowmode.embeds.max_value
                .replace('{time}', '360')
                .replace('{smh}', getSmhdw(interaction.locale, 'minute')),
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })
      }

      interaction.channel!.setRateLimitPerUser(min * 60)
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } else if (hourRegex.test(time)) {
      const hour = Number(time.match(decimal)![0])
      if (hour > 6) {
        return interaction.reply({
          embeds: [
            {
              title: locale.slowmode.name,
              description: locale.slowmode.embeds.max_value
                .replace('{time}', '6')
                .replace('{smh}', getSmhdw(interaction.locale, 'hour')),
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })
      }

      interaction.channel!.setRateLimitPerUser(hour * 3600)
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } else {
      await interaction.reply({
        embeds: [
          {
            title: locale.slowmode.name,
            description: locale.slowmode.embeds.time_error,
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
        ephemeral: true,
      })
    }
  }
}
