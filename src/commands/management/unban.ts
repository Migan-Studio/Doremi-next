import { Command } from 'discommand'
import {
  english,
  getPermissionLocalization,
  korean,
  localization,
} from '@localization'
import {
  ApplicationCommandOptionType,
  type ChatInputCommandInteraction,
  PermissionFlagsBits,
} from 'discord.js'

export default class Unban extends Command {
  public constructor() {
    super({
      name: english.unban.name,
      nameLocalizations: { ko: korean.unban.name },
      description: english.unban.description,
      descriptionLocalizations: { ko: korean.unban.description },
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: english.unban.options.id.name,
          nameLocalizations: { ko: korean.unban.options.id.name },
          description: english.unban.options.id.description,
          descriptionLocalizations: { ko: korean.unban.options.id.description },
          minLength: 18,
          maxLength: 19,
          required: true,
        },
      ],
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const id = interaction.options.getString('ID', true) as unknown as number
    const locale = localization(interaction.locale)

    if (interaction.channel!.isDMBased()) {
      return await interaction.reply({
        embeds: [
          {
            title: locale.is_dm,
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
        ephemeral: true,
      })
    }

    if (
      !interaction.guild.members.cache
        .get(String(id))!
        .permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      return await interaction.reply({
        embeds: [
          {
            title: locale.unban.name,
            description: locale.if_dont_have_permission.user.replace(
              '{permission}',
              getPermissionLocalization(
                interaction.locale,
                PermissionFlagsBits.ManageMessages,
              )!,
            ),
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
        ephemeral: true,
      })
    }

    if (
      !interaction.guild.members.me!.permissions.has(
        PermissionFlagsBits.ManageMessages,
      )
    ) {
      return await interaction.reply({
        embeds: [
          {
            title: locale.unban.name,
            description: locale.if_dont_have_permission.bot.replace(
              '{permission}',
              getPermissionLocalization(
                interaction.locale,
                PermissionFlagsBits.ManageMessages,
              )!,
            ),
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
        ephemeral: true,
      })
    }

    if (isNaN(id)) {
      return await interaction.reply({
        embeds: [
          {
            title: locale.unban.name,
            description: locale.unban.is_NaN,
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
        ephemeral: true,
      })
    }
  }
}
