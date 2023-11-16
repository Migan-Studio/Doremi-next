import { Command } from 'discommand'
import {
  english,
  getPermissionLocalization,
  korean,
  localization,
} from '@localization'
import {
  ApplicationCommandOptionType,
  type AutocompleteInteraction,
  ButtonStyle,
  type ChatInputCommandInteraction,
  ComponentType,
  GuildBan,
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
          name: english.unban.options.member.name,
          nameLocalizations: { ko: korean.unban.options.member.name },
          description: english.unban.options.member.description,
          descriptionLocalizations: {
            ko: korean.unban.options.member.description,
          },
          autocomplete: true,
          required: true,
        },
      ],
      defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
      dmPermission: false,
    })
  }

  public async autocompleteExecute(
    interaction: AutocompleteInteraction<'cached'>,
  ) {
    const banMembers = [
      ...(await interaction.guild.bans.fetch().then(member => member.values())),
    ]

    await interaction.respond(
      banMembers.map(member => ({
        name: member.user.username,
        value: member.user.id,
      })),
    )
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const member = interaction.guild.bans.cache.get(
      interaction.options.getString('member', true),
    )
    const locale = localization(interaction.locale)

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

    if (!member) {
      return await interaction.reply({
        embeds: [
          {
            title: locale.unban.name,
            description: locale.unban.is_none,
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
        ephemeral: true,
      })
    }

    await interaction.reply({
      embeds: [
        {
          title: locale.unban.name,
          description: locale.unban.embeds.question.replace(
            '{member}',
            member.user.username,
          ),
          color: interaction.client.colors.basic,
          timestamp: new Date().toISOString(),
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              customId: 'Doremi-unban$yes',
              style: ButtonStyle.Success,
              label: locale.unban.components.yes,
            },
            {
              type: ComponentType.Button,
              customId: 'Doremi-unban$cancel',
              style: ButtonStyle.Danger,
              label: locale.unban.components.cancel,
            },
          ],
        },
      ],
      ephemeral: true,
    })
  }
}
