import { RestClient, Routes } from '@utils'
import type { TicketData, TicketRequest, TicketUpdateRequest } from '@types'
import { Snowflake } from 'discord.js'
import { Base } from './base.js'

export class Ticket extends Base {
  public constructor(rest: RestClient) {
    super(rest)
  }

  public async read(id: Snowflake): Promise<TicketData> {
    const response = await this.rest.sendGet(Routes.tickets.get(id))
    return response.data
  }

  public async create(data: TicketRequest) {
    await this.rest.sendPost(Routes.tickets.create(data))
  }

  public async update(channelId: Snowflake, data: TicketUpdateRequest) {
    await this.rest.sendPatch(Routes.tickets.update(channelId, data.closed))
  }

  public async delete(id: Snowflake) {
    await this.rest.sendDelete(Routes.guilds.delete(id))
  }
}
