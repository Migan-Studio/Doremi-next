import type { ButtonInteraction, Guild } from 'discord.js'
import { korean } from '@localization'

export async function privacyPolicy(
  interaction: ButtonInteraction,
  guild: Guild,
) {
  switch (interaction.customId) {
    case 'Doremi-privacy$accept':
      try {
        await interaction.client.database.guilds.create({
          guild_id: guild.id,
          owner_id: guild.ownerId,
        })
        await interaction.update({
          embeds: [
            {
              title: korean.guild_create.embeds.title,
              description: korean.guild_create.embeds.description.accept,
              footer: {
                text: '동의 일시',
              },
              color: interaction.client.colors.success,
              timestamp: new Date().toISOString(),
            },
          ],
          components: [],
        })
      } catch (err) {
        console.error(err)
        await interaction.reply({
          embeds: [
            {
              title: korean.guild_create.embeds.title,
              description: korean.guild_create.embeds.description.error,
              color: interaction.client.colors.warn,
            },
          ],
          ephemeral: true,
        })
      }
      break
    case 'Doremi-privacy$refuse':
      await interaction.update({
        embeds: [
          {
            title: korean.guild_create.embeds.title,
            description: korean.guild_create.embeds.description.refuse,
            color: interaction.client.colors.warn,
            footer: {
              text: '거부 일시',
            },
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
      break
  }
}
