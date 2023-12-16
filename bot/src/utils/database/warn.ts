import { Base } from './base.js'
import { RestClient, Routes } from '@utils'
import type { WarnData, WarnRequest } from '@types'
import { Snowflake } from 'discord.js'

export class Warn extends Base {
  public constructor(rest: RestClient) {
    super(rest)
  }

  public async read(guildId: Snowflake, userId: Snowflake): Promise<WarnData> {
    const response = await this.rest.sendGet(Routes.warns.get(guildId, userId))
    return response.data
  }

  public async create(data: WarnRequest) {
    await this.rest.sendPost(Routes.warns.create(data))
  }

  public async delete(id: Snowflake) {
    await this.rest.sendDelete(Routes.warns.delete(id))
  }
}
