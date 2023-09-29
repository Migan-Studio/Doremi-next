import { DiscommandClient } from 'discommand'
import { GatewayIntentBits, Partials } from 'discord.js'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ComponentPlugin } from '@discommand/message-components'
import { Logger } from '@migan-studio/logger'
import { prerelease } from 'semver'
import { version } from '../package.json'
import { execSync } from 'node:child_process'
import config from '../config.json'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class DoremiClient extends DiscommandClient {
  get version() {
    const commit = execSync('git rev-parse --short HEAD').toString()
    if (prerelease(version)) return `${version}.${commit}`
    else return `${version}-${commit}`
  }
  public readonly logger = new Logger({
    name: 'Doremi',
  })
  public readonly COLOR = 0xef8723
  public readonly config = config
  public constructor() {
    super(
      {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildPresences,
        ],
        partials: [Partials.Channel],
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

interface DoremiConfig {
  bot: {
    token: string
    koreanbots_token?: string
    owner_id: string
  }
  mysql: {
    name: string
    host: string
    password: string
    database: string
    port?: number
  }
}

declare module 'discord.js' {
  interface Client {
    get version(): string
    readonly logger: Logger
    readonly COLOR: number
    readonly config: DoremiConfig
  }
}
