import { RestClient, Routes } from '@utils'
import type {
  Response,
  ResponseData,
  TicketData,
  TicketRequest,
  TicketUpdateRequest,
} from '@types'
import { Snowflake } from 'discord.js'
import { Base } from './base.js'

export class Ticket extends Base {
  public constructor(rest: RestClient) {
    super(rest)
  }

  public async read(id: Snowflake): Promise<ResponseData<TicketData>> {
    const response = await this.rest.sendGet(Routes.tickets.get(id))
    return response.data
  }

  public async create(data: TicketRequest): Promise<Response> {
    const response = await this.rest.sendPost(Routes.tickets.create(data))
    return response.data
  }

  public async update(
    channelId: Snowflake,
    data: TicketUpdateRequest,
  ): Promise<Response> {
    const response = await this.rest.sendPatch(
      Routes.tickets.update(channelId, data.closed),
    )
    return response.data
  }

  public async delete(id: Snowflake): Promise<Response> {
    const response = await this.rest.sendDelete(Routes.guilds.delete(id))
    return response.data
  }
}
