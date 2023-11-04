import { Command } from 'discommand'
import {
  english,
  isHavePermission,
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
import { kickMember } from '@interaction'

export default class Kick extends Command {
  public constructor() {
    super({
      name: english.kick.name,
      nameLocalizations: { ko: korean.kick.name },
      description: english.kick.description,
      descriptionLocalizations: { ko: korean.kick.description },
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: english.kick.options.member.name,
          nameLocalizations: { ko: korean.kick.options.member.name },
          description: english.kick.options.member.description,
          descriptionLocalizations: {
            ko: korean.kick.options.member.description,
          },
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: english.kick.options.reason.name,
          nameLocalizations: { ko: korean.kick.options.reason.name },
          description: english.kick.options.reason.description,
          descriptionLocalizations: {
            ko: korean.kick.options.reason.description,
          },
        },
      ],
    })
  }

  public async execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const member = interaction.options.getMember('member')!
    const reason = interaction.options.getString('reason')
    const locale = localization(interaction.locale)

    if (interaction.channel?.isDMBased()) {
      return await interaction.reply({
        content: locale.is_dm,
        ephemeral: true,
      })
    }

    if (
      !interaction.guild.members.cache
        .get(interaction.user.id)!
        .permissions.has(PermissionFlagsBits.KickMembers)
    ) {
      return await interaction.reply({
        content: isHavePermission({
          locale: interaction.locale,
          permission: getPermissionLocalization(
            interaction.locale,
            PermissionFlagsBits.KickMembers,
          )!,
        }),
        ephemeral: true,
      })
    }

    if (
      !interaction.guild.members.me!.permissions.has(
        PermissionFlagsBits.KickMembers,
      )
    ) {
      return await interaction.reply({
        content: isHavePermission({
          locale: interaction.locale,
          permission: getPermissionLocalization(
            interaction.locale,
            PermissionFlagsBits.KickMembers,
          )!,
          isBot: true,
        }),
        ephemeral: true,
      })
    }

    const response = await interaction.reply({
      embeds: [
        {
          title: locale.kick.name,
          description: locale.kick.embeds.question.replace(
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
              customId: 'Doremi-kick$yes',
              label: locale.kick.components.yes,
              style: ButtonStyle.Success,
            },
            {
              type: ComponentType.Button,
              customId: 'Doremi-kick$cancel',
              label: locale.kick.components.cancel,
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

    await kickMember(confirmation, {
      member,
      reason,
    })
  }
}
