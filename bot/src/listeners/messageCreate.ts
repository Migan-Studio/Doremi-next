import { Listener } from 'discommand'
import { ComponentType, Events, Message } from 'discord.js'
import { korean } from '@localization'

export default class MessageCreate extends Listener {
  public constructor() {
    super(Events.MessageCreate)
  }

  public execute(msg: Message) {
    if (msg.channel.isDMBased()) {
      const supportContent = msg.content

      msg.channel.send({
        embeds: [
          {
            title: korean.support.embeds.direct_message.title,
            description: korean.support.embeds.direct_message.description,
            color: msg.client.colors.basic,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.StringSelect,
                customId: 'Doremi-select$support',
                options: [
                  {
                    label: korean.support.components.select_menus.bug_report,
                    value: 'Doremi-support$bug_report',
                    emoji: '🐛',
                  },
                  {
                    label: korean.support.components.select_menus.discussion,
                    value: 'Doremi-support$discussion',
                    emoji: '✉️',
                  },
                  {
                    label: korean.support.components.select_menus.cancel,
                    value: 'Doremi-support$cancel',
                    emoji: '❌',
                  },
                ],
                placeholder: korean.support.components.select_menus.placeholder,
              },
            ],
          },
        ],
      })
    }
  }
}
