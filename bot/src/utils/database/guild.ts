import { Base } from './base.js'
import type { RestClient } from '@utils'
import type { Snowflake } from 'discord.js'
import type { GuildRequest, GuildData, ResponseData, Response } from '@types'
import { Routes } from '@utils'

export class Guild extends Base {
  public constructor(rest: RestClient) {
    super(rest)
  }

  public async read(id: Snowflake): Promise<ResponseData<GuildData>> {
    const response = await this.rest.sendGet(Routes.guilds.get(id))
    return response.data
  }

  public async create(data: GuildRequest): Promise<Response> {
    const response = await this.rest.sendPost(Routes.guilds.create(data))
    return response.data
  }

  public async delete(id: Snowflake): Promise<Response> {
    const response = await this.rest.sendDelete(Routes.guilds.delete(id))
    return response.data
  }
}
