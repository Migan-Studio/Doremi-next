import { DiscommandClient } from 'discommand'
import { GatewayIntentBits } from 'discord.js'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ComponentPlugin } from '@discommand/message-components'
import { Logger } from '@migan-studio/logger'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class DoremiClient extends DiscommandClient {
  public readonly logger = new Logger({
    name: 'Doremi',
  })
  public constructor() {
    super(
      {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildPresences,
        ],
      },
      {
        directory: {
          command: join(__dirname, 'commands'),
          listener: join(__dirname, 'listeners'),
        },
        plugins: [
          new ComponentPlugin({
            directory: join(__dirname, 'components'),
          }),
        ],
      },
    )
  }
}

declare module 'discord.js' {
  interface Client {
    readonly logger: Logger
  }
}
