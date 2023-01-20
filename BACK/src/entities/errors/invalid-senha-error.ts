export class InvalidSenhaError extends Error {
  public readonly name = 'Senha inválida'
  constructor () {
    super('Invalid password.')
  }
}
