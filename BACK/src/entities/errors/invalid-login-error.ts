export class InvalidLoginError extends Error {
  public readonly name = 'Login inválido'
  constructor (login: string) {
    super('Invalid login: ' + login + '.')
  }
}
