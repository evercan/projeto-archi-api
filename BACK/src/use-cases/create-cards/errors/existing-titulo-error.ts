export class ExistingTituloError extends Error {
  public readonly name = 'ExistingTituloError'
  constructor () {
    super('já existe titulo.')
  }
}
