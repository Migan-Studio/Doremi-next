import type { RestClient } from '@utils'

export abstract class Base {
  protected constructor(public readonly rest: RestClient) {}
}
