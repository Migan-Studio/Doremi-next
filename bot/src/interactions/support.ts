import { StringSelectMenuInteraction } from 'discord.js'
import { korean } from '@localization'

export async function selectSupport(
  interaction: StringSelectMenuInteraction,
  content: string,
) {
  switch (interaction.values[0]) {
    case 'Doremi-support$bug-report':
      break
    case 'Doremi-support$discussion':
      break
    case 'Doremi-support$cancel':
      await interaction.update({
        embeds: [
          {
            title: korean.support.embeds.cancel.title,
            description: korean.support.embeds.cancel.description,
            color: interaction.client.colors.warn,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
      break
  }
}
