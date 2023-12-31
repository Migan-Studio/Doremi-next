import { DiscommandClient } from 'discommand'
import { GatewayIntentBits, Partials, Snowflake } from 'discord.js'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Logger } from '@migan-studio/logger'
import config from '../config.json'
import { DoremiDatabase } from '@utils'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class DoremiClient extends DiscommandClient {
  public readonly logger = new Logger({
    name: 'Doremi',
  })
  public readonly colors = {
    basic: 0xef8723,
    warn: 0xff0000,
    success: 0x00ff00,
  }
  public readonly OWNER_ID = config.bot.owner_id
  public readonly config = config
  public readonly database = new DoremiDatabase()
  public constructor() {
    super(
      {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildPresences,
          GatewayIntentBits.GuildModeration,
        ],
        partials: [Partials.Channel],
      },
      {
        directory: {
          command: join(__dirname, 'commands'),
          listener: join(__dirname, 'listeners'),
        },
      },
    )
  }
}

interface DoremiConfig {
  bot: {
    token: string
    koreanbots_token?: string
    owner_id: string
  }
}

declare module 'discord.js' {
  interface Client {
    get version(): string
    readonly logger: Logger
    readonly colors: {
      basic: number
      warn: number
      success: number
    }
    readonly OWNER_ID: Snowflake
    readonly config: DoremiConfig
    readonly database: DoremiDatabase
  }
}
