import { Command } from 'discommand'
import {
  english,
  korean,
  localization,
  getPermissionLocalization,
} from '@localization'
import {
  ApplicationCommandOptionType,
  type ChatInputCommandInteraction,
  ComponentType,
  PermissionFlagsBits,
  ButtonStyle,
} from 'discord.js'
import { banMember } from '@interaction'

export default class Ban extends Command {
  public constructor() {
    super({
      name: english.ban.name,
      nameLocalizations: { ko: korean.ban.name },
      description: english.ban.description,
      descriptionLocalizations: { ko: korean.ban.description },
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: english.ban.options.member.name,
          nameLocalizations: { ko: korean.ban.options.member.name },
          description: english.ban.options.member.description,
          descriptionLocalizations: {
            ko: korean.ban.options.member.description,
          },
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: english.ban.options.reason.name,
          nameLocalizations: { ko: korean.ban.options.reason.name },
          description: english.ban.options.reason.description,
          descriptionLocalizations: {
            ko: korean.ban.options.reason.description,
          },
        },
      ],
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const member = interaction.options.getMember('member')!
    const reason = interaction.options.getString('reason')
    const locale = localization(interaction.locale)

    if (
      !interaction.guild.members.me!.permissions.has(
        PermissionFlagsBits.BanMembers,
      )
    ) {
      return await interaction.reply({
        embeds: [
          {
            title: locale.ban.name,
            description: locale.if_dont_have_permission.replace(
              '{permission}',
              getPermissionLocalization(
                interaction.locale,
                PermissionFlagsBits.BanMembers,
              )!,
            ),
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
      })
    }

    const response = await interaction.reply({
      embeds: [
        {
          title: locale.ban.name,
          description: locale.ban.embeds.question.replace(
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
              customId: 'Doremi-ban$yes',
              label: locale.ban.components.yes,
              style: ButtonStyle.Success,
            },
            {
              type: ComponentType.Button,
              customId: 'Doremi-ban$cancel',
              label: locale.ban.components.cancel,
              style: ButtonStyle.Danger,
            },
          ],
        },
      ],
      ephemeral: true,
    })

    const confirmation =
      await response.awaitMessageComponent<ComponentType.Button>({
        filter: i => i.user.id === interaction.user.id,
        time: 600_000,
      })

    await banMember(confirmation, {
      member,
      reason,
    })
  }
}
