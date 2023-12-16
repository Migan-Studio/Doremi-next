export class DoremiError extends Error {
  public constructor(message?: string) {
    super(message)
    this.name = 'DoremiError'
  }
}
