export class UnexistingCardsError extends Error {
  public readonly name = 'UnexistingCardsError'
  constructor () {
    super('Cards não existe.')
  }
}
