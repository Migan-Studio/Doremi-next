import { type ButtonInteraction } from 'discord.js'
import type { KickOrBanOptions } from '@types'
import { localization } from '@localization'

export async function kickMember(
  interaction: ButtonInteraction<'cached'>,
  options: KickOrBanOptions,
) {
  const member = options.member
  const reason = options.reason
  const locale = localization(interaction.locale)

  switch (interaction.customId) {
    case 'Doremi-kick$yes':
      try {
        await member.kick(reason!)
        await interaction.update({
          embeds: [
            {
              title: locale.kick.name,
              description: locale.kick.embeds.success.replace(
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
              title: locale.kick.name,
              description: locale.kick.embeds.fail,
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          components: [],
        })
      }
      break

    case 'Doremi-kick$cancel':
      await interaction.update({
        embeds: [
          {
            title: locale.kick.name,
            description: locale.kick.embeds.cancel.replace(
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
