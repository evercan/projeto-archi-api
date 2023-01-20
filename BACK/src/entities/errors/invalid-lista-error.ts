export class InvalidListaError extends Error {
    public readonly lista = 'Lista invalida'
    constructor (lista: string) {
      super('Invalid lista: ' + lista + '.')
    }
  }