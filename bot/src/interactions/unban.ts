import { type ButtonInteraction, type GuildBan } from 'discord.js'
import { localization } from '@localization'

export async function unbanMember(
  interaction: ButtonInteraction<'cached'>,
  member: GuildBan,
) {
  const locale = localization(interaction.locale)

  switch (interaction.customId) {
    case 'Doremi-unban$yes':
      try {
        await interaction.guild.members.unban(member.user.id)
        await interaction.update({
          embeds: [
            {
              title: locale.unban.name,
              description: locale.unban.embeds.success.replace(
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
        console.log(err)
        await interaction.update({
          embeds: [
            {
              title: locale.unban.name,
              description: locale.unban.embeds.fail,
              color: interaction.client.colors.warn,
              timestamp: new Date().toISOString(),
            },
          ],
          components: [],
        })
      }
      break
    case 'Doremi-unban$cancel':
      await interaction.update({
        embeds: [
          {
            title: locale.unban.name,
            description: locale.unban.embeds.cancel.replace(
              '{member}',
              member.user.username,
            ),
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
      break
  }
}
