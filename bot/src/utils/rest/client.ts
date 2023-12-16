import axios from 'axios'
import { backend_url } from '../../../config.json'
import { RoutesInfo } from './types.js'
import { DoremiError } from '@error'

export class RestClient {
  private _api = axios.create({
    baseURL: backend_url,
    headers: { 'Content-Type': 'application/json' },
  })

  public async sendGet(routes: RoutesInfo) {
    const response = await this._api.get(routes.url)

    if (response.status !== 200) {
      throw new DoremiError('Invalid request')
    }

    return response
  }

  public async sendPost(routes: RoutesInfo) {
    const response = await this._api.post(routes.url, routes.body)

    if (response.status !== 201) {
      throw new DoremiError('Invalid request')
    }
    return response
  }

  public async sendPatch(routes: RoutesInfo) {
    const response = await this._api.patch(routes.url, routes.body)

    if (response.status !== 200) {
      throw new DoremiError('Invalid request')
    }
    return response
  }

  public async sendDelete(routes: RoutesInfo) {
    const response = await this._api.delete(routes.url)

    if (response.status !== 200) {
      throw new DoremiError('Invalid request')
    }
    return response
  }
}
