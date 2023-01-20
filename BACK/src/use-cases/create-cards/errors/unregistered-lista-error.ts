export class UnregisteredListaError extends Error {
  public readonly name = 'UnregisteredListaError'
  constructor () {
    super('Unregistered Lista.')
  }
}
