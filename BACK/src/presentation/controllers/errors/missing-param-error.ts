export class MissingParamError extends Error {
  public readonly name = 'Parametro incorreto'

  constructor (param: string) {
    super(`Parametro incorreto: ${param}.`)
  }
}
