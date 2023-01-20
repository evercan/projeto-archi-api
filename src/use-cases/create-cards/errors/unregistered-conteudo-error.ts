export class UnregisteredConteudoError extends Error {
  public readonly name = 'UnregisteredConteudoError'
  constructor () {
    super('Unregistered Conteudo.')
  }
}
