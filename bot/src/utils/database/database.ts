import { RestClient } from '@utils'
import { Guild } from './guild.js'
import { Warn } from './warn.js'
import { Ticket } from './ticket.js'

export class DoremiDatabase {
  public readonly rest = new RestClient()
  public readonly guilds = new Guild(this.rest)
  public readonly warns = new Warn(this.rest)
  public readonly tickets = new Ticket(this.rest)
}
