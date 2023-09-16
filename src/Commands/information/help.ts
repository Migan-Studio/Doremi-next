import { Command } from 'discommand'
import { english, korean, localzation } from '@localization'
import { ChatInputCommandInteraction, Locale } from 'discord.js'

export default class Help extends Command {
  public constructor() {
    super({
      name: english.help.name,
      nameLocalizations: { ko: korean.help.name },
      description: english.help.description,
      descriptionLocalizations: { ko: korean.help.description },
    })
  }

  public execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const commandNameList: string[] = []
    const locale = localzation(interaction.locale)

    interaction.client.commandHandler.modules.forEach(command => {
      if (command instanceof Command) {
        if (interaction.locale === Locale.Korean) {
          commandNameList.push(command.data.nameLocalizations!.ko!)
        } else {
          commandNameList.push(command.data.name)
        }
      }
    })

    interaction.reply({
      embeds: [
        {
          title: `${interaction.client.user.username}'s ${locale.help.name}`,
          description: `\`\`\`md\n${commandNameList
            .map(name => `- ${name}`)
            .join('\n')}\`\`\``,
          timestamp: new Date().toISOString(),
          thumbnail: {
            url: interaction.client.user.displayAvatarURL(),
          },
        },
      ],
    })
  }
}
