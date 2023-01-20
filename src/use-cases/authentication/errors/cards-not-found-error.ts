export class CardsNotFoundError extends Error {
  public readonly name = 'CardsNotFoundError'
  constructor () {
    super('Cards not found.')
  }
}
