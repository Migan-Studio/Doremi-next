import { DiscommandClient } from 'discommand'
import { GatewayIntentBits } from 'discord.js'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class DoremiClient extends DiscommandClient {
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
          command: join(__dirname, 'Commands'),
          // listener: join(__dirname, 'Listeners'),
        },
      },
    )
  }
}
