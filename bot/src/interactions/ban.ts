import { type ButtonInteraction } from 'discord.js'
import type { KickOrBanOptions } from '@types'
import { localization } from '@localization'

export async function banMember(
  interaction: ButtonInteraction<'cached'>,
  options: KickOrBanOptions,
) {
  const member = options.member
  const reason = options.reason
  const locale = localization(interaction.locale)

  switch (interaction.customId) {
    case 'Doremi-ban$yes':
      try {
        await member.ban({
          reason: reason!,
        })
        await interaction.update({
          embeds: [
            {
              title: locale.ban.name,
              description: locale.ban.embeds.success.replace(
                '{member}',
                member.user.username,
              ),
              color: interaction.client.colors.success,
              timestamp: new Date().toISOString(),
            },
          ],
          components: [],
        })
      } catch (err) {
        console.error(err)
        await interaction.update({
          embeds: [
            {
              title: locale.ban.name,
              description: locale.ban.embeds.fail,
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          components: [],
        })
      }
      break

    case 'Doremi-ban$cancel':
      await interaction.update({
        embeds: [
          {
            title: locale.ban.name,
            description: locale.ban.embeds.cancel.replace(
              '{member}',
              member.user.username,
            ),
            color: 0xff0000,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
      break
  }
}
