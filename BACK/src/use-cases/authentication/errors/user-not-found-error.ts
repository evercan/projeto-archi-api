export class UserNotFoundError extends Error {
  public readonly name = 'Usuário não existe'
  constructor () {
    super('Usuário not found.')
  }
}
